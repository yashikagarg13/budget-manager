import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers/index";
import AddEntry from "./view";

class AddEntryContainer extends Component {
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
  }

  render () {
    return (
      <AddEntry />
    );
  }
}

AddEntryContainer.propTypes = {
  router: PropTypes.object,
};

export default AddEntryContainer;