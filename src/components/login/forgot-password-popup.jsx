import React, {PropTypes} from "react";
import {Modal} from "react-bootstrap";

import Loading from "../common/loading";

const ForgotPasswordPopup = (props) => {
  let input;
  return (
    <Modal show={props.show} backdrop={true} animation={true}>
      <Modal.Header>
        <h4>
          Request reset password link
        </h4>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group">
          <label className="control-label" htmlFor="email">Email</label>
          <div className="controls">
            <input type="email" className="input-md form-control" id="email" name="email"
                   ref={node => {input = node;}} />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary"
                onClick={() => {
                  if (!input.value.trim())
                    return;

                  props.onClick(input.value);
                }}>
          {props.apiInProgress ? <Loading /> : "Get reset password link"}
        </button>
        <button type="button" className="btn btn-default" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};



ForgotPasswordPopup.propTypes = {
  apiInProgress: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default ForgotPasswordPopup;