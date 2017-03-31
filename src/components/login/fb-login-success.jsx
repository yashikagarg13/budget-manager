import R from "ramda";
import React, {Component, PropTypes} from "react";
import Helpers from "../../helpers/index";

class FBLoginSuccess extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
    const token = this.props.params.token;
    if (R.type(token) === "String" && !R.isEmpty(token)) {
      Helpers.LocalStorage.set("token", token);
    }
    Helpers.Utils.redirectToLandingIfTokenExists(this.props.router);
  }

  render() {
    return (
      <span></span>
    );
  }
}

FBLoginSuccess.propTypes = {
  params: PropTypes.object,
};

export default FBLoginSuccess;