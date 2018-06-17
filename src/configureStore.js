import {createStore, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import bm from "./reducers";


const configureStore = (initialState = {}) => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }

  return createStore(
    bm,
    initialState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;