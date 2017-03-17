import R from "ramda";
import React, {PropTypes} from "react";

import ConfirmPopup from "../common/confirm-popup";
import Header from "../common/header";

import ChooseCategory from "./choose-category-popup";

const Settings = (props) => (
  <div className="settings-view">
    <Header actions={["Back", "Add"]}/>
    <div className="container">
      <div className="list-group no-border-radius">
        <div className="list-group-item" key="new-category">
          <form id="addItemForm" method="POST" onSubmit={props.addNewCategory}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="New category"
                onChange={props.updateNewCategoryTitleInput} value={props.newCategoryTitle}/>
              <span className="input-group-btn">
                <button className="btn btn-primary" type="submit">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
        {R.map(category =>
          <div className="list-group-item" Key={category._id}>
            <div className="row">
              <div className="col-sm-8 margin-top-xs">
                {category.editMode
                  ? <input type="text" className="form-control" placeholder="Category title"
                      value={category.title} onChange={props.updateCategoryTitleInput.bind(null, category._id)} />
                  : <span>{category.title}</span>
                }
              </div>
              <div className="actions col-sm-4 text-right">
                {category.editMode
                  ? <button className="btn-icon" onClick={props.showConfirmModal.bind(null, category)}>
                      <i className="fa fa-check" aria-hidden="true"></i></button>
                  : <button className="btn-icon" onClick={props.showEditMode.bind(null, category._id)}>
                      <i className="fa fa-pencil" aria-hidden="true"></i></button>
                }
                <button className="btn-icon" onClick={props.checkExpenses.bind(null, category)}>
                  <i className="fa fa-minus-circle" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>,
        props.categories)}
      </div>
    </div>
    {props.isConfirmModalVisible
      ? <ConfirmPopup
          modalText={props.confirmMsgText}
          modalData={props.confirmModalData}
          modalTitle="Alert"
          onConfirm={props.editCategory}
          onHide={props.hideConfirmModal}
          show={props.isConfirmModalVisible}
        />
      : null
    }

    {props.isChooseCategoryModalVisible
      ? <ChooseCategory
          categories={props.categories}
          oldCategoryId={props.chooseCategoryModalData}
          onDelete={props.removeAllExpenses}
          onChoose={props.updateExpensesWithCategory}
          onHide={props.hideChooseCategoryModal}
          show={props.isChooseCategoryModalVisible}
          updateCategoryInput={props.updateNewCategoryInput}
      />
      : null
    }
  </div>
);

Settings.propTypes = {
  addNewCategory: PropTypes.func.isRequired,
  categories: PropTypes.array,
  newCategoryTitle: PropTypes.string,
  updateNewCategoryTitleInput: PropTypes.func.isRequired,

  confirmMsgText: PropTypes.string.isRequired,
  editCategory: PropTypes.func.isRequired,
  hideConfirmModal: PropTypes.func.isRequired,
  isConfirmModalVisible: PropTypes.bool,
  confirmModalData: PropTypes.object,
  showConfirmModal: PropTypes.func.isRequired,
  showEditMode: PropTypes.func.isRequired,
  updateCategoryTitleInput: PropTypes.func.isRequired,

  checkExpenses: PropTypes.func.isRequired,
  isChooseCategoryModalVisible: PropTypes.bool,
  chooseCategoryModalData: PropTypes.string.isRequired,
  hideChooseCategoryModal: PropTypes.func.isRequired,
  removeAllExpenses: PropTypes.func.isRequired,
  updateNewCategoryInput: PropTypes.func.isRequired,
  updateExpensesWithCategory: PropTypes.func.isRequired,
};

export default Settings;