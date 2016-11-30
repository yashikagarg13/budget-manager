import R from "ramda";
import React, {Component} from "react";

import Helpers from "../../helpers/index";
import Landing from "./view";

export default class LandingContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      entries: [],
    };
  }
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
    this.loadData();
  }

  loadData () {
    Helpers.API.getExpenseEnteriesByUser()
    .then(response => {
      Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
      if (response.success) {
        this.setState({
          entries: response.data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <Landing
        entries={this.state.entries} />
    );
  }
}
