import R from "ramda";
import React, {PropTypes} from "react";

import Helpers from "../../helpers/index";

import Settings from "./view";

class SettingsContainer extends React.Component {
  constructor (props) {
    super(props);

    this.originalCategories = [];
    this.state = {
      categories: [],
      newCategoryTitle: "",
      isConfirmModalVisible: false,
    };

    this.onChangeCategoryTitle = this.onChangeCategoryTitle.bind(this);
    this.onChangeNewCategoryTitle = this.onChangeNewCategoryTitle.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onEditCategory = this.onEditCategory.bind(this);
    this.onHideConfirmModal = this.onHideConfirmModal.bind(this);
    this.onShowEditMode = this.onShowEditMode.bind(this);
    this.onShowConfirmModal = this.onShowConfirmModal.bind(this);
  }
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
    this.loadData();
  }

  addEditModeToCategories (categories) {
    return R.map(category => {
      category.editMode = false;
      return category;
    }, categories);
  }
  isCategoryTitleUpdated(category, originalCategories) {
    const oldCategory = R.find(R.propEq("_id", category._id), originalCategories);
    return oldCategory.title != category.title;
  }
  onChangeCategoryTitle (categoryId) {
    let categories = this.state.categories;
    const index = R.findIndex(R.propEq("_id", categoryId), categories);
    categories[index].title = event.target.value;

    this.setState({
      categories: categories,
    });
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
      });
  }
  onHideConfirmModal() {
    this.setState({
      isConfirmModalVisible: false,
      modalData: null
    });
  }
  onEditCategory (category) {
    let categories = this.state.categories;
    Helpers.API.updateCategory(category)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if(response.success) {
          this.setCategoryEditMode(category._id, categories, false);
          this.onHideConfirmModal();
        }
      })
      .catch((error) => {
        console.log(error);
        this.setCategoryEditMode(category._id, categories, false);
        this.onHideConfirmModal();
      });
  }
  onShowConfirmModal(category) {
    if (this.isCategoryTitleUpdated(category, this.originalCategories)) {
      this.setState({
        isConfirmModalVisible: true,
        modalData: category,
      });
    } else {
      this.setCategoryEditMode(category._id, this.state.categories, false);
    }
  }
  onShowEditMode (categoryId) {
    let categories = this.state.categories;
    this.setCategoryEditMode(categoryId, categories, true);
  }
  loadData () {
    Helpers.API.getExpensCategoriesByUser()
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          this.originalCategories = this.addEditModeToCategories(response.data);
          this.setState({
            categories: R.clone(this.originalCategories),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setCategoryEditMode(categoryId, categories, isEditMode) {
    const index = R.findIndex(R.propEq("_id", categoryId), categories);
    categories[index].editMode = isEditMode;

    this.setState({categories});
  }

  render () {
    return (
      <Settings
        categories={this.state.categories}
        updateNewCategoryTitle={this.onChangeNewCategoryTitle}
        addNewCategory={this.onClickAdd}

        confirmMsgText={Helpers.Notifictaions.confirmEditCategory}
        editCategory={this.onEditCategory}
        hideConfirmModal={this.onHideConfirmModal}
        isConfirmModalVisible={this.state.isConfirmModalVisible}
        modalData={this.state.modalData}
        showConfirmModal={this.onShowConfirmModal}
        showEditMode={this.onShowEditMode}
        updateCategoryTitle={this.onChangeCategoryTitle}
      />
    );
  }
}

SettingsContainer.propTypes = {
  router: PropTypes.object,
};

export default SettingsContainer;