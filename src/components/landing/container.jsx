import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers/index";

import Landing from "./view";

class LandingContainer extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <Landing  />
    );
  }
}

LandingContainer.propTypes = {
  location: PropTypes.object,
};

export default LandingContainer;