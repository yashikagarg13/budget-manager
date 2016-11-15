import React, {Component} from "react";

import Login from "../components/login";
import Helpers from "../helpers/index"; console.log(Helpers);

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwordHash: "",
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
      passwordHash: Helpers.Utils.createHash(event.target.value),
    });
  }
  onLoginClick(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <Login
        email={this.state.email}
        password={this.state.password}
        updateEmailHandler={this.onChangeEmail}
        updatePasswordHandler={this.onChangePassword}
        loginHandler={this.onLoginClick} />
    );
  }
}
