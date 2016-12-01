import R from "ramda";
import React from "react";
import ReactRouter from "react-router"; console.log(ReactRouter);

import Helpers from "../../helpers/index";

import Settings from "./view";

export default class SettingsContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      categories: [],
      newCategoryTitle: "",
    };

    this.onChangeNewCategoryTitle = this.onChangeNewCategoryTitle.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
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

  onChangeNewCategoryTitle (event) {
    this.setState({
      newCategoryTitle: event.target.value,
    });
  }

  onClickAdd () {
    const categoryTitle =  this.state.newCategoryTitle;

    if (R.isEmpty(categoryTitle) || R.type(categoryTitle) != "String") return;

    Helpers.API.addCategory(categoryTitle)
    .then(response => {
      Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
      if(response.success) {
        let categories = this.state.categories;
        categories = R.prepend(response.data, categories);
        this.setState({categories});
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <Settings
        categories={this.state.categories}
        updateNewCategoryTitle={this.onChangeNewCategoryTitle}
        addNewCategory={this.onClickAdd}
      />
    );
  }
}