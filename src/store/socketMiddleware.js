import socketIOClient from "socket.io-client";

import {
  SOCKETS_ADD_USER,
  SOCKETS_CONNECT,
  SOCKETS_DISCONNECT,
  SOCKETS_MESSAGE_SEND
} from "../constants/action-types";
import {
  socketsDisconnecting,
  socketsConnecting,
  socketsMessageReceiving,
  socketMessageSending,
  setUsername,
  socketsUpdateNumUsers
} from "../actions";

const endpoint = "http://localhost:3000";

export const socketMiddleware = () => {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case SOCKETS_DISCONNECT:
        if (socket !== null) {
          console.log("SOCKETS_DISCONNECT");
          store.dispatch(socketsDisconnecting());
          socket.send("disconnect");
        }
        socket = null;
        break;
      case SOCKETS_CONNECT:
        console.log("SOCKETS_CONNECT");
        store.dispatch(socketsConnecting());
        socket = socketIOClient(endpoint);
        socket.on("new message", data => {
          onMessage(store, data);
        });
        break;
      case SOCKETS_ADD_USER:
        if (socket !== null) {
          socket.on("login", ({ numUsers }) => {
            store.dispatch(setUsername({ username: action.payload, numUsers }));
          });
          socket.on("user joined", ({ numUsers }) => {
            store.dispatch(socketsUpdateNumUsers({ numUsers }));
          });
          socket.on("user left", data => {
            store.dispatch(socketsUpdateNumUsers(data));
          });
          socket.emit("add user", action.payload);
        }
        break;
      case SOCKETS_MESSAGE_SEND:
        if (socket !== null) {
          socket.emit("chat message", action.payload);
          store.dispatch(socketMessageSending(action.payload));
        }
        break;
      default:
        console.log(store, socket, action);
        return next(action);
    }
  };
};

const onMessage = (store, message) => {
  store.dispatch(socketsMessageReceiving(message));
};

const onOpen = token => evt => {
  console.log("WS is onOpen");
  console.log("token " + token);
  console.log("evt " + evt.data);
};

const onClose = () => evt => {
  console.log("WS is onClose");
  console.log("evt " + evt.data);
};
