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
      if (response.success == false) {
        this.props.router.push("/login");
      } else {
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
    console.log(this.state.categories);
    return (
      <Settings
        categories={this.state.categories} />
    );
  }
}