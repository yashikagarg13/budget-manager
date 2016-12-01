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
            <span>{category.title}</span>
            <div className="actions pull-right">
              <i className="material-icons margin-right-sm">mode_edit</i>
              <i className="material-icons">remove_circle_outline</i>
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
};

export default Settings;
// https://material.io/icons/