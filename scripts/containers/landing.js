import R from "ramda";
import React, {Component} from "react";
import {hashHistory} from "react-router";

import Helpers from "../helpers/index";
import Landing from "../components/landing";

export default class LandingContainer extends Component {
  componentWillMount() {
    const sessionId = Helpers.LocalStorage.get("sessionId");
    if (R.isEmpty(sessionId) || R.type(sessionId) != "String") {
      hashHistory.push("/login");
    }
  }

  render () {
    return <Landing />;
  }
}
