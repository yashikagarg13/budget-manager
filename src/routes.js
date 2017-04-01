import React, {Component} from "react";
import {Router, Route, IndexRedirect, browserHistory} from "react-router";

import Layout from "./components/layout";
import ExpenseEntryContainer from "./components/expense-entry/container";
import LandingContainer from "./components/landing/container";
import LoginContainer from "./components/login/container";
import ManageCategories from "./components/manage-categories/container";
import ReportsContainer from "./components/reports/container";
import SettingsContainer from "./components/settings/container";
import SignUpContainer from "./components/signup/container";
import SocialLoginSuccess from "./components/login/social-login-success";

const history = browserHistory;

const getRoutes = () => (
  <Route path="/" component={Layout}>
    <IndexRedirect to="login" />
    <Route component={LoginContainer} path="login" />
    <Route component={SocialLoginSuccess} path="social/success/:token" />
    <Route component={SignUpContainer} path="signup" />

    <Route component={LandingContainer} path="landing" />
    <Route component={ExpenseEntryContainer} path="add-entry" />
    <Route component={ExpenseEntryContainer} path="edit-entry/:expenseId" />
    <Route component={ReportsContainer} path="reports" />
    <Route component={SettingsContainer} path="settings/:token" />
    <Route component={ManageCategories} path="manage-categories" />
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
