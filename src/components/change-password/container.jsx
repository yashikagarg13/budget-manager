import R from "ramda";
import React, {Component, PropTypes} from "react";
import {withRouter} from "react-router";

import Helpers from "../../helpers";

import ChangePassword from "./view";

class ChangePasswordContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      form: {
        values: {
          newPassword: "",
          confirmPassword: "",
        },
        errors: {},
        disabled: false,
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validation (form) {
    form.errors = {};
    const {newPassword, confirmPassword} = form.values;

    if (R.type(newPassword) == "String" && !R.isEmpty(newPassword) &&
        R.type(confirmPassword) == "String" && !R.isEmpty(confirmPassword) &&
        newPassword !== confirmPassword) {
      form.errors.confirmPassword = Helpers.Notifictaions.passwordsDoNotMatch;
    }
    return form;
  }

  onChange(key, event) {
    let form = this.state.form;
    form.values[key] = event.target.value;
    this.setState({form});
  }

  onSubmit(event) {
    event.preventDefault();

    let form = this.state.form;
    form = this.validation(form);
    this.setState({form});

    if (R.length(R.keys(form.errors)) > 0) return;

    form.disabled = true;
    this.setState({form});

    Helpers.API.updatePassword(form.values.confirmPassword)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          console.log("Password updated"); //eslint-disable-line
          form.disabled = false;
          this.setState({form});
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        form.disabled = false;
        this.setState({form});
      });
  }

  render () {
    return (
      <ChangePassword
        form={this.state.form}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

ChangePasswordContainer.propTypes = {
  router: PropTypes.object,
};

export default withRouter(ChangePasswordContainer);