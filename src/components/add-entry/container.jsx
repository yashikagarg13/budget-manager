import React from "react";

import Helpers from "../../helpers/index";
import AddEntry from "./view";

export default class AddEntryContainer extends React.Component {
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
  }

  render () {
    return (
      <AddEntry />
    );
  }
}