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
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickEditDone = this.onClickEditDone.bind(this);
    this.onChangeCategoryTitle = this.onChangeCategoryTitle.bind(this);
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
          categories: this.addEditModeToCaetgories(response.data),
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  addEditModeToCaetgories (categories) {
    return R.map(category => {
      category.editMode = false;
      return category;
    }, categories);
  }
  onClickEdit (categoryId) {
    let categories = this.state.categories;
    const index = R.findIndex(R.propEq("_id", categoryId), categories);
    categories[index].editMode = true;

    this.setState({
      categories: categories,
    });
  }
  onChangeCategoryTitle (categoryId, event) {
    let categories = this.state.categories;
    const index = R.findIndex(R.propEq("_id", categoryId), categories);
    categories[index].title = event.target.value;

    this.setState({
      categories: categories,
    });
  }
  onClickEditDone (category, event) {
    const categoryTitle =  category.title;

    Helpers.API.updateCategory(category)
    .then(response => {
      Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
      if(response.success) {
        let categories = this.state.categories;
        const index = R.findIndex(R.propEq("_id", category._id), categories);
        categories[index] = category;
        categories[index].editMode = false;
        this.setState({categories});
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

        showEditMode={this.onClickEdit}
        editCategory={this.onClickEditDone}
        updateCategoryTitle={this.onChangeCategoryTitle}
      />
    );
  }
}