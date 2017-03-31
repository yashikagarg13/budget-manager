import React, {PropTypes} from "react";

const ChangePassword = (props) => (
  <div className="well nomargin-bottom">
    Change Password Form
  </div>
);

ChangePassword.propTypes = {
  form: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ChangePassword;