import React, {Component, PropTypes} from "react";
import Login from "./view";
import Helpers from "../../helpers/index";

class LoginContainer extends Component {
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
  onLoginClick(event) {
    event.preventDefault();

    this.timeoutInstance = setTimeout(() => {
      const {email, password} = this.state;
      return Helpers.API.login(email, password)
      .then((response) => {
        if (response.success) {
          Helpers.LocalStorage.set("token", response.token);
          this.props.router.push("/landing");
        } else {
          this.setState({
            loginError: response.message
          });
        }
        clearTimeout(this.timeoutInstance);
      })
      .catch((error) => {
        console.log(error);
        clearTimeout(this.timeoutInstance);
      });
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

LoginContainer.propTypes = {
  router: PropTypes.object,
};

export default LoginContainer;