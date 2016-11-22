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
    this.loadData();
  }

  loadData () {
    Helpers.API.getExpenseEnteriesByUser()
    .then(response => {
      if (response.success == false) {
        this.props.router.push("/login");
      } else {
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
