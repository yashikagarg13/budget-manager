import R from "ramda";
import React, {PropTypes} from "react";
import {Modal} from "react-bootstrap";


const ChooseCategory = (props) => (
  <div className="static-modal">
    <Modal.Dialog show={props.show}>
      <Modal.Header>
        <h6>Choose a category for affected expense entries</h6>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group">
          <label className="control-label">Category</label>
          <div className="controls">
            <select id="category" name="category" className="input-sm form-control"
              onChange={props.updateCategoryInput}>
              {R.map(category =>
                <option key={`category-${category._id}`} value={category._id}>{category.title}</option>,
              props.categories)}
            </select>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary"
                onClick={props.onChoose.bind(null, props.oldCategoryId)}>OK</button>
        <button type="button" className="btn btn-default" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
);

ChooseCategory.propTypes = {
  categories: PropTypes.array.isRequired,
  oldCategoryId: PropTypes.string.isRequired,
  onChoose: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  updateCategoryInput: PropTypes.func.isRequired,
};

export default  ChooseCategory;