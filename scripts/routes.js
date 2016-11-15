import React, {Component} from "react";
import {Router, hashHistory, Route, IndexRoute} from "react-router";

import Layout from "./layout";
import LoginContainer from "./containers/login";


const getRoutes = () => (
  <Route path="/" component={Layout}>
    <IndexRoute component={LoginContainer} />
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
