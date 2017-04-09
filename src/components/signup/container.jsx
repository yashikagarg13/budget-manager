import React, {Component, PropTypes} from "react";

import SignUp from "./view";
import Helpers from "../../helpers/index";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      currency: "",
      signUpError: "",
    };

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
  }
  componentWillMount () {
    Helpers.Utils.redirectToLandingIfTokenExists(this.props.router);
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
          Helpers.LocalStorage.set("token", response.token);
          Helpers.LocalStorage.set("currency", response.currency);
        } else {
          this.setState({
            signUpError: response.message,
          });
        }
      })
      .then(() => Helpers.API.setupForUser())
      .then((response) => {
        if (response.success) {
          this.props.router.push("/landing");
        } else {
          this.setState({
            signUpError: response.message,
          });
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
      });

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

SignUpContainer.propTypes = {
  router: PropTypes.object,
};

export default SignUpContainer;