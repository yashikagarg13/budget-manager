import R from "ramda";
import React, {PropTypes} from "react";
import {Modal} from "react-bootstrap";


const ChooseCategory = (props) => (
  <Modal show={props.show} animation={true}>
    <Modal.Header>
      <h6>Action for Affected expense entries</h6>
    </Modal.Header>

    <Modal.Body>
      <span>Either delete OR choose category for expense entries related to this category.</span>
      <div className="form-group">
        <label className="control-label">Category</label>
        <div className="controls">
          <select id="category" name="category" className="input-sm form-control"
            onChange={props.updateCategoryInput}>
            {R.map(category =>
              <option key={`category-${category._id}`} value={category._id}>{category.title}</option>,
            R.filter(category => category._id != props.oldCategoryId, props.categories))}
          </select>
        </div>
      </div>
    </Modal.Body>

    <Modal.Footer>
      <button type="button" className="btn btn-primary"
              onClick={props.onChoose.bind(null, props.oldCategoryId)}>Update Category</button>
      <button type="button" className="btn btn-accent"
              onClick={props.onDelete.bind(null, props.oldCategoryId)}>Delete Expense Entries</button>
      <button type="button" className="btn btn-default" onClick={props.onHide}>Close</button>
    </Modal.Footer>
  </Modal>
);

ChooseCategory.propTypes = {
  categories: PropTypes.array.isRequired,
  oldCategoryId: PropTypes.string.isRequired,
  onChoose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.onDelete,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  updateCategoryInput: PropTypes.func.isRequired,
};

export default  ChooseCategory;