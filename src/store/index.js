import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { socketMiddleware } from "./socketMiddleware";

const store = createStore(rootReducer, applyMiddleware(socketMiddleware()));

export default store;
