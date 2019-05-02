import {
  SET_USERNAME,
  SOCKETS_CONNECTING,
  SOCKETS_DISCONNECTING,
  SOCKETS_MESSAGE_SENDING,
  SOCKETS_MESSAGE_RECEIVING,
  SOCKETS_UPDATE_NUM_USERS
} from "../constants/action-types";

const initialState = {
  loaded: false,
  message: "Just created",
  connected: false,
  username: "",
  isAuthorized: false,
  numUsers: 0,
  messages: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        user: action.payload.username,
        numUsers: action.payload.numUsers,
        isAuthorized: true
      };
    case SOCKETS_MESSAGE_RECEIVING:
      return { ...state, messages: [...state.messages, action.payload] };
    case SOCKETS_UPDATE_NUM_USERS:
      return { ...state, numUsers: action.payload.numUsers };
    case SOCKETS_MESSAGE_SENDING:
      return {
        ...state,
        messages: [
          ...state.messages,
          { username: state.username, message: action.payload }
        ]
      };
    case SOCKETS_CONNECTING:
      return {
        ...state,
        loaded: true,
        message: "Connecting ...",
        connected: false
      };
    case SOCKETS_DISCONNECTING:
      return {
        ...state,
        loaded: true,
        message: "Disconnecting ...",
        connected: true
      };
  }
  return state;
};

export default rootReducer;

