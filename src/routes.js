import React, {Component} from "react";
import {Router, hashHistory, Route, IndexRoute} from "react-router";

import Layout from "./components/layout";
import LandingContainer from "./components/landing/container";
import LoginContainer from "./components/login/container";
import SignUpContainer from "./components/signUp/container";


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
