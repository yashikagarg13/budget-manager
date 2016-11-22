import R from "ramda";
import React, {Component} from "react";

import SignUp from "./view";
import Helpers from "../../helpers/index";

export default class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      currency: "",
    };

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
  }
  componentWillMount () {
    const sessionId = Helpers.LocalStorage.get("sessionId");
    if (!R.isEmpty(sessionId) && R.type(sessionId) == "String") {
      this.props.router.push("/landing");
    }
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
  onChangeCurrency(event) {
    this.setState({
      currency: event.target.value,
    });
  }
  onSignUpClick(event) {
    event.preventDefault();

    this.timeoutInstance = setTimeout(() => {
      const {email, password, currency} = this.state;
      Helpers.API.signUp(email, password, currency)
      .then((response) => {
        if (response.success) {
          Helpers.LocalStorage.set("sessionId", response.token);
          this.props.router.push("/landing");
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
