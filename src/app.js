import "./styles/styles.less";
import "font-awesome/css/font-awesome.css";
import "react-datepicker/dist/react-datepicker.css";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import Router from "react-router/lib/Router";


import {history, getRoutes} from "./routes";

export default class App extends Component {
  render () {
    return (
      <Router history={history} routes={getRoutes()}>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
