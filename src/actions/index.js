import {
  SET_USERNAME,
  SOCKETS_CONNECTING,
  SOCKETS_CONNECT,
  SOCKETS_DISCONNECTING,
  SOCKETS_DISCONNECT,
  SOCKETS_MESSAGE_RECEIVING,
  SOCKETS_MESSAGE_SENDING,
  SOCKETS_MESSAGE_SEND,
  SOCKETS_ADD_USER,
  SOCKETS_UPDATE_NUM_USERS
} from "../constants/action-types";

export const socketsUpdateNumUsers = payload => {
  return { type: SOCKETS_UPDATE_NUM_USERS, payload };
};

export const socketsAddUser = payload => {
  return { type: SOCKETS_ADD_USER, payload };
};

export const setUsername = payload => {
  return { type: SET_USERNAME, payload };
};

export const socketMessageSend = payload => {
  return { type: SOCKETS_MESSAGE_SEND, payload };
};

export const socketMessageSending = payload => {
  return { type: SOCKETS_MESSAGE_SENDING, payload };
};

export const socketsMessageReceiving = payload => {
  return { type: SOCKETS_MESSAGE_RECEIVING, payload };
};

export const socketsConnecting = () => {
  return { type: SOCKETS_CONNECTING };
};

export const socketsDisconnecting = () => {
  return { type: SOCKETS_DISCONNECTING };
};

export const socketsConnect = () => {
  return { type: SOCKETS_CONNECT };
};

export const socketsDisconnect = () => {
  return { type: SOCKETS_DISCONNECT };
};
