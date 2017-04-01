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
      showForgotPwdModal: false,
      apiInProgress: false,
    };

    this.onClickForgotPwd = this.onClickForgotPwd.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.onRequestLink = this.onRequestLink.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  componentWillMount () {
    Helpers.Utils.redirectToLandingIfTokenExists(this.props.router);
  }

  onClickForgotPwd() {
    this.setState({
      showForgotPwdModal: true,
    });
  }
  onHideModal() {
    this.setState({
      showForgotPwdModal: false,
    });
  }
  onRequestLink(email) {
    this.setState({
      apiInProgress: true,
    });
    return Helpers.API.requestResetPasswordLink(email)
      .then((response) => {
        if (!response.success) {
          this.setState({
            loginError: response.message
          });
        }
        this.setState({
          showForgotPwdModal: false,
        });
        this.onHideModal();
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        this.setState({
          showForgotPwdModal: false,
        });
        this.onHideModal();
      });
  }
  onSubmit(event) {
    event.preventDefault();

    this.timeoutInstance = setTimeout(() => {
      const {email, password} = this.state;
      return Helpers.API.login(email, password)
      .then((response) => {
        if (response.success) {
          Helpers.LocalStorage.set("token", response.token);
          Helpers.LocalStorage.set("currency", response.currency);
          this.props.router.push("/landing");
        } else {
          this.setState({
            loginError: response.message
          });
        }
        clearTimeout(this.timeoutInstance);
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        clearTimeout(this.timeoutInstance);
      });
    }, 0);
  }
  onUpdate(key, event) {
    let state = this.state;
    state[key] = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <Login
        apiInProgress={this.state.apiInProgress}
        email={this.state.email}
        loginError={this.state.loginError}
        showForgotPwdModal={this.state.showForgotPwdModal}
        onClickForgotPwd={this.onClickForgotPwd}
        onHideModal={this.onHideModal}
        onRequestLink={this.onRequestLink}
        onSubmit={this.onSubmit}
        onUpdate={this.onUpdate}
      />
    );
  }
}

LoginContainer.propTypes = {
  router: PropTypes.object,
};

export default LoginContainer;