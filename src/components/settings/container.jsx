import React from "react";

import Helpers from "../../helpers/index";

import Settings from "./view";

export default class SettingsContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
    this.loadData();
  }

  loadData () {
    Helpers.API.getExpensCategoriesByUser()
    .then(response => {
      Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
      if (response.success) {
        this.setState({
          categories: response.data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <Settings
        categories={this.state.categories} />
    );
  }
}