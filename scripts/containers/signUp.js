import React, {Component} from "react";

import SignUp from "../components/signUp";
import Helpers from "../helpers/index";

export default class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwordHash: "",
      currency: "",
    };

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
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
  onChangeCurrency(event) {
    this.setState({
      currency: event.target.value,
    });
  }
  onSignUpClick(event) {
    event.preventDefault();
    Helpers.API.signUp(...this.state)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <SignUp
        email={this.state.email}
        updateEmailHandler={this.onChangeEmail}
        updatePasswordHandler={this.onChangePassword}
        currency={this.state.currency}
        updateCurrency={this.onChangeCurrency}
        signUpHandler={this.onSignUpClick} />
    );
  }
}
