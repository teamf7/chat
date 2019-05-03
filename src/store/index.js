import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import socketMiddleware from "../middleware";

const store = createStore(rootReducer, applyMiddleware(socketMiddleware()));

export default store;
