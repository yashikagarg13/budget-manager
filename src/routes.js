import React, {Component} from "react";
import {Router, Route, IndexRedirect, browserHistory} from "react-router";

import Layout from "./components/layout";
import AddEntryContainer from "./components/add-entry/container";
import LandingContainer from "./components/landing/container";
import LoginContainer from "./components/login/container";
import SettingsContainer from "./components/settings/container";
import SignUpContainer from "./components/signup/container";

const history = browserHistory;

const getRoutes = () => (
  <Route path="/" component={Layout}>
    <IndexRedirect to="login" />
    <Route component={LoginContainer} path="login" />
    <Route component={SignUpContainer} path="signup" />

    <Route component={LandingContainer} path="landing" />
    <Route component={AddEntryContainer} path="add-entry" />
    <Route component={SettingsContainer} path="settings" />
  </Route>
);

export default class App extends Component {
  render () {
    return (
      <Router history={history}>
        {getRoutes()}
      </Router>
    );
  }
}

export {getRoutes, history};
