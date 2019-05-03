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

const socketMiddleware = () => {
  let socket = null;

  return ({dispatch}) => next => action => {
    switch (action.type) {
      case SOCKETS_DISCONNECT:
        if (socket !== null) {
          console.log("SOCKETS_DISCONNECT");
          dispatch(socketsDisconnecting());
          socket.send("disconnect");
        }
        socket = null;
        break;
      case SOCKETS_CONNECT:
        console.log("SOCKETS_CONNECT");
        dispatch(socketsConnecting());
        socket = socketIOClient(endpoint);
        socket.on("new message", data => {
          dispatch(socketsMessageReceiving(data));
        });
        break;
      case SOCKETS_ADD_USER:
        if (socket !== null) {
          socket.on("login", ({ numUsers }) => {
            dispatch(setUsername({ username: action.payload, numUsers }));
          });
          socket.on("user joined", ({ numUsers }) => {
            dispatch(socketsUpdateNumUsers({ numUsers }));
          });
          socket.on("user left", data => {
            dispatch(socketsUpdateNumUsers(data));
          });
          socket.emit("add user", action.payload);
        }
        break;
      case SOCKETS_MESSAGE_SEND:
        if (socket !== null) {
          socket.emit("chat message", action.payload);
          dispatch(socketMessageSending(action.payload));
        }
        break;
      default:
        console.log(socket, action);
        return next(action);
    }
  };
};

export default socketMiddleware;
