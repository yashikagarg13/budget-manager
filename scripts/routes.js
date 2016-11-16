import React, {Component} from "react";
import {Router, hashHistory, Route, IndexRoute} from "react-router";

import Layout from "./layout";
import LandingContainer from "./containers/landing";
import LoginContainer from "./containers/login";
import SignUpContainer from "./containers/signUp";


const getRoutes = () => (
  <Route path="/" component={Layout}>
    <IndexRoute component={LandingContainer} />
    <Route component={LoginContainer} path="login" />
    <Route component={SignUpContainer} path="signup" />
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

export {history};
