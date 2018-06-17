import "./styles/styles.less";
import "font-awesome/css/font-awesome.css";
import "react-datepicker/dist/react-datepicker.css";

import React, {Component} from "react";
import {Provider} from "react-redux";
import configureStore from "./configureStore";
import ReactDOM from "react-dom";
import Router from "react-router/lib/Router";

import {history, getRoutes} from "./routes";
const initialState = window.__INITIAL_STATE__;

export default class App extends Component {
  render () {
    const store = configureStore(initialState);
    return (
      <Provider store={store}>
        <Router history={history} routes={getRoutes()}>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
