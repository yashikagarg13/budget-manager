import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers/index";

import Reports from "./view";

class ReportsContainer extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <Reports  />
    );
  }
}

ReportsContainer.propTypes = {
  location: PropTypes.object,
};

export default ReportsContainer;