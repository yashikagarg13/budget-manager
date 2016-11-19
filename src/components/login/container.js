import React, {Component} from "react";
import {hashHistory} from "react-router";

import Login from "./view";
import Helpers from "../../helpers/index";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: "",
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  onLoginClick(event) {
    event.preventDefault();

    this.timeoutInstance = setTimeout(() => {
      const {email, password} = this.state;
      Helpers.API.login(email, password)
      .then((response) => {
        if (response.success) {
          Helpers.LocalStorage.set("sessionId", response.token);
          hashHistory.push("/");
        } else {
          this.setState({
            loginError: response.message
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })

      clearTimeout(this.timeoutInstance);
    }, 0);
  }

  render() {
    return (
      <Login
        email={this.state.email}
        updateEmailHandler={this.onChangeEmail}
        updatePasswordHandler={this.onChangePassword}
        loginError={this.state.loginError}
        loginHandler={this.onLoginClick} />
    );
  }
}
