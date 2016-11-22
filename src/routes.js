import R from "ramda";
import React, {Component} from "react";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import Helpers from "./helpers/index";

import Layout from "./components/layout";
import AddEntryContainer from "./components/add-entry/container";
import LandingContainer from "./components/landing/container";
import LoginContainer from "./components/login/container";
import SettingsContainer from "./components/settings/container";
import SignUpContainer from "./components/signup/container";

const history = browserHistory;
const onEnterApp = (nextState, replace) => {
  console.log("onEnterApp");
  const sessionId = Helpers.LocalStorage.get("sessionId"); console.log(R.isEmpty(sessionId), R.type(sessionId) != "String");
  if (R.isEmpty(sessionId) || R.type(sessionId) != "String") {
    replace("/login");
  }
  return nextState;
};
const isLoggedIn = (nextState, replace) => {
  console.log("isLoggedIn")
  const sessionId = Helpers.LocalStorage.get("sessionId");
  if (!R.isEmpty(sessionId) && R.type(sessionId) == "String") {
    replace("/landing");
  }
  return nextState;
};
const getRoutes = () => (
  <Route path="/" component={Layout}>
    <Route component={LoginContainer} path="login" />
    <Route component={SignUpContainer} path="signup" />

    <Route component={LandingContainer} path="landing" onEnter={onEnterApp} />
    <Route component={AddEntryContainer} path="add-entry" onEnter={onEnterApp} />
    <Route component={SettingsContainer} path="settings" onEnter={onEnterApp} />
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
