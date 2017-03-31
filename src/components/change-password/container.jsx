import React, {Component} from "react";
import ChangePassword from "./view";

class ChangePasswordContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      form: {
        values: {
          oldPassword: "",
          newPassword: "",
        },
        errors: {},
        disabled: false,
      },
    };

    this.onClick = this.onClick.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(key) {
    let form = this.state.form;
    form[key] = event.target.value;
    this.setState({form});
  }

  onClick() {

  }

  render () {
    return (
      <ChangePassword
        form={this.state.form}
        onClick={this.onClick}
        onUpdate={this.onUpdate}
      />
    );
  }
}

export default ChangePasswordContainer;