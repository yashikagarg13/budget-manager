import R from "ramda";
import React, {Component} from "react";

import Helpers from "../../helpers/index";
import Landing from "./view";

export default class LandingContainer extends Component {
  componentWillMount() {
    const sessionId = Helpers.LocalStorage.get("sessionId");
    if (R.isEmpty(sessionId) || R.type(sessionId) != "String") {
      this.props.router.push("/login");
    }
  }

  render () {
    return <Landing />;
  }
}
