import React, {PropTypes} from "react";
import {Modal} from "react-bootstrap";

const ConfirmPopup = (props) => (
  <Modal bsSize="small" show={props.show} animation={true}>
    <Modal.Header>
      <Modal.Title>
        {props.modalTitle}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>{props.modalText}</p>
    </Modal.Body>

    <Modal.Footer>
      <button type="button" className="btn btn-primary" onClick={props.onConfirm.bind(null, props.modalData)}>Ok</button>
      <button type="button" className="btn btn-default" onClick={props.onHide}>Close</button>
    </Modal.Footer>
  </Modal>
);

ConfirmPopup.propTypes = {
  modalText: PropTypes.string.isRequired,
  modalData: PropTypes.object,
  modalTitle: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default ConfirmPopup;