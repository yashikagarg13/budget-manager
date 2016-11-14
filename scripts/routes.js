import React, {Component} from "react";
import {Router, hashHistory, Route, IndexRoute} from "react-router";

import Layout from "./layout";
import Login from "./login";


const getRoutes = () => (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login} />
  </Route>
);

export default class App extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        {getRoutes()}
      </Router>
    );
  }
}
