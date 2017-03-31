import React, {Component} from "react";
import {Router, Route, IndexRedirect, browserHistory} from "react-router";

import Layout from "./components/layout";
import ExpenseEntryContainer from "./components/expense-entry/container";
import FBLoginSuccess from "./components/login/fb-login-success";
import LandingContainer from "./components/landing/container";
import LoginContainer from "./components/login/container";
import ReportsContainer from "./components/reports/container";
import SettingsContainer from "./components/settings/container";
import SignUpContainer from "./components/signup/container";

const history = browserHistory;

const getRoutes = () => (
  <Route path="/" component={Layout}>
    <IndexRedirect to="login" />
    <Route component={LoginContainer} path="login" />
    <Route component={FBLoginSuccess} path="facebook/success/:token" />
    <Route component={SignUpContainer} path="signup" />

    <Route component={LandingContainer} path="landing" />
    <Route component={ExpenseEntryContainer} path="add-entry" />
    <Route component={ExpenseEntryContainer} path="edit-entry/:expenseId" />
    <Route component={ReportsContainer} path="reports" />
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
