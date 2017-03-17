import R from "ramda";
import React, {PropTypes} from "react";

import Helpers from "../../helpers/index";

import Settings from "./view";

class SettingsContainer extends React.Component {
  // Lifecycle Methods
  constructor (props) {
    super(props);

    this.originalCategories = [];
    this.state = {
      categories: [],
      chooseCategoryModalData: null,
      confirmModalData: null,
      isConfirmModalVisible: false,
      isChooseCategoryModalVisible: false,
      newCategoryIdForExpenses: null,
      newCategoryTitle: "",
    };

    this.onChangeCategoryTitleInput = this.onChangeCategoryTitleInput.bind(this);
    this.onChangeNewCategoryTitleInput = this.onChangeNewCategoryTitleInput.bind(this);
    this.onChangeNewCategoryInput = this.onChangeNewCategoryInput.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickEditDone = this.onClickEditDone.bind(this);
    this.onEditCategory = this.onEditCategory.bind(this);
    this.onHideConfirmModal = this.onHideConfirmModal.bind(this);
    this.onHideChooseCategoryModal = this.onHideChooseCategoryModal.bind(this);
    this.onUpdateExpensesWithCategory = this.onUpdateExpensesWithCategory.bind(this);

    this.onLoadData();
  }
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
  }

  // Event Listeners
  hasExpenseEnteriesByCategory(categoryId) {
    return Helpers.API.getExpenseEnteriesByCategoryAndUser(categoryId)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          return response.data.length;
        }
      })
      .catch((error) => {
        console.log(error);  // eslint-disable-line
        return 0;
      });
  }
  onChangeCategoryTitleInput (categoryId) {
    let categories = this.state.categories;
    const index = R.findIndex(R.propEq("_id", categoryId), categories);
    categories[index].title = event.target.value;

    this.setState({
      categories: categories,
    });
  }
  onChangeNewCategoryTitleInput (event) {
    this.setState({
      newCategoryTitle: event.target.value,
    });
  }
  onChangeNewCategoryInput (event) {
    this.setState({
      newCategoryIdForExpenses: event.target.value,
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
          this.setState({categories, newCategoryTitle: ""});
        }
      })
      .catch((error) => {
        console.log(error);  // eslint-disable-line
      });
  }
  onClickDelete (category) {
    const categoryId = category._id;
    if(R.type(categoryId) == "String" && !R.isEmpty(categoryId)) {
      this.hasExpenseEnteriesByCategory(categoryId)
        .then((length) => {
          if (length > 0) {
            this.onShowChooseCategoryModal(categoryId);
          } else {
            this.onDeleteCategory(categoryId);
          }
        });
    } else {
      let categories = this.state.categories;
      let index = R.findIndex(R.propEq("title", category.title), categories);
      this.deleteCategoryFromCategories(index, categories);
    }
    // call api to get expense entries of given category of logged in user
    // if expense entries exists
    //    show modal to choose category for all those expenses
    //      - bulk update expenses
    //        - delete category
    // else
    //    delete category
  }
  onClickEdit (categoryId) {
    let categories = this.state.categories;
    this.setCategoryEditMode(categoryId, categories, true);
  }
  onClickEditDone(category) {
    if (this.isCategoryTitleUpdated(category, this.originalCategories)) {
      this.setState({
        isConfirmModalVisible: true,
        confirmModalData: category,
      });
    } else {
      this.setCategoryEditMode(category._id, this.state.categories, false);
    }
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
        console.log(error);  // eslint-disable-line
        this.setCategoryEditMode(category._id, categories, false);
        this.onHideConfirmModal();
      });
  }
  onDeleteCategory (categoryId) {
    let categories = this.state.categories;
    Helpers.API.deleteCategory(categoryId)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if(response.success) {
          const index = R.findIndex(R.propEq("_id", categoryId), categories);
          this.deleteCategoryFromCategories(index, categories);
          if (this.state.isChooseCategoryModalVisible) {
            this.onHideChooseCategoryModal();
          }
        }
      })
      .catch((error) => {
        console.log(error);  // eslint-disable-line
      });
  }
  onHideConfirmModal() {
    this.setState({
      isConfirmModalVisible: false,
      confirmModalData: null
    });
  }
  onLoadData () {
    Helpers.API.getExpenseCategoriesByUser()
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
        console.log(error);  // eslint-disable-line
      });
  }
  onShowChooseCategoryModal (categoryId) {
    this.setState({
      isChooseCategoryModalVisible: true,
      chooseCategoryModalData: categoryId,
    });
  }
  onHideChooseCategoryModal () {
    this.setState({
      isChooseCategoryModalVisible: false,
      chooseCategoryModalData: null,
    });
  }
  onUpdateExpensesWithCategory (oldCategoryId) {
    const newCategoryId = this.state.newCategoryIdForExpenses;
    Helpers.API.updateExpenseEntriesWithCategory(oldCategoryId, newCategoryId)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if(response.success) {
          this.onDeleteCategory(oldCategoryId);
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
      });
  }

  // Helper Methods
  addEditModeToCategories (categories) {
    return R.map(category => {
      category.editMode = false;
      return category;
    }, categories);
  }
  deleteCategoryFromCategories (index, categories) {
    categories = R.remove(index, 1, categories);
    this.setState({categories});
  }
  isCategoryTitleUpdated(category, originalCategories) {
    const oldCategory = R.find(R.propEq("_id", category._id), originalCategories);
    return oldCategory.title != category.title;
  }
  setCategoryEditMode(categoryId, categories, isEditMode) {
    const index = R.findIndex(R.propEq("_id", categoryId), categories);
    categories[index].editMode = isEditMode;

    this.setState({categories});
  }

  render () {
    return (
      <Settings
        addNewCategory={this.onClickAdd}
        categories={this.state.categories}
        newCategoryTitle={this.state.newCategoryTitle}
        updateNewCategoryTitleInput={this.onChangeNewCategoryTitleInput}

        confirmMsgText={Helpers.Notifictaions.confirmEditCategory}
        editCategory={this.onEditCategory}
        hideConfirmModal={this.onHideConfirmModal}
        isConfirmModalVisible={this.state.isConfirmModalVisible}
        confirmModalData={this.state.confirmModalData}
        showConfirmModal={this.onClickEditDone}
        showEditMode={this.onClickEdit}
        updateCategoryTitleInput={this.onChangeCategoryTitleInput}
        
        checkExpenses={this.onClickDelete}
        isChooseCategoryModalVisible={this.state.chooseCategoryModalData}
        chooseCategoryModalData={this.state.chooseCategoryModalData}
        hideChooseCategoryModal={this.onHideChooseCategoryModal}
        updateNewCategoryInput={this.onChangeNewCategoryInput}
        updateExpensesWithCategory={this.onUpdateExpensesWithCategory}
      />
    );
  }
}

SettingsContainer.propTypes = {
  router: PropTypes.object,
};

export default SettingsContainer;