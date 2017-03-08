import R from "ramda";
import React, {PropTypes} from "react";
import {Modal} from "react-bootstrap";


const ChooseCategory = (props) => (
  <div className="static-modal">
    <Modal.Dialog bsSize="small" show={props.show}>
      <Modal.Header>
        <Modal.Title>
          Choose a category for affected expense entries
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group">
          <label className="control-label">Category</label>
          <select id="category" name="category" className="input-sm"
            onChange={props.updateCategoryInput}>
            {R.map(category =>
              <option key={`category-${category._id}`} value={category._id}>{category.title}</option>,
            props.categories)}
          </select>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary"
                onClick={props.onChoose.bind(null, props.oldCategoryId)}>Ok</button>
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