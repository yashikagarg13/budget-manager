import R from "ramda";
import React, {PropTypes} from "react";

import Header from "../common/header";

const Settings = (props) => (
  <div className="settings-view">
    <Header actions={["Back", "Add"]}/>
    <div className="container">
      <div className="list-group no-border-radius">
        <div className="list-group-item" key="new-category">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="New category"
              onChange={props.updateNewCategoryTitle}/>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button"
                onClick={props.addNewCategory}>Add</button>
            </span>
          </div>
        </div>
        {R.map(category =>
          <div className="list-group-item" Key={category._id}>
            <div className="row">
              <div className="col-sm-8 margin-top-xs">
                {category.editMode
                  ? <input type="text" className="form-control" placeholder="Category title"
                      value={category.title} onChange={props.updateCategoryTitle.bind(null, category._id)} />
                  : <span>{category.title}</span>
                }
              </div>
              <div className="actions col-sm-4 text-right">
                {category.editMode
                  ? <button className="icon-btn" onClick={props.editCategory.bind(null, category)}>
                      <i className="material-icons md-18">done</i></button>
                  : <button className="icon-btn" onClick={props.showEditMode.bind(null, category._id)}>
                      <i className="material-icons md-18">mode_edit</i></button>
                }
                <button className="icon-btn">
                  <i className="material-icons md-18">remove_circle_outline</i>
                </button>
              </div>
            </div>
          </div>,
        props.categories)}
      </div>
    </div>
  </div>
);

Settings.propTypes = {
  addNewCategory: PropTypes.func.isRequired,
  categories: PropTypes.array,
  updateNewCategoryTitle: PropTypes.func.isRequired,

  showEditMode: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  updateCategoryTitle: PropTypes.func.isRequired,
};

export default Settings;
// https://material.io/icons/