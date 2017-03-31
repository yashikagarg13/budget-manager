import React, {PropTypes} from "react";

import Loading from "../common/loading";

const ChangePassword = ({form, onChange, onSubmit}) => {
  const {newPassword, confirmPassword} = form.values;

  return (
    <div className="fieldset noborder-radius noborder-bottom">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="newPassword">Password</label>
          <div className="controls">
            <input type="password" name="newPassword" id="newPassword"
                   className="input-md form-control"
                   onChange={onChange.bind(null, "newPassword")} value={newPassword} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="confirmPassword">Confirm Password</label>
          <div className="controls">
            <input type="password" name="confirmPassword" id="confirmPassword"
                   className="input-md form-control"
                   onChange={onChange.bind(null, "confirmPassword")} value={confirmPassword} />
            {form.errors.confirmPassword
              ? <p className="error">{form.errors.confirmPassword}</p>
              : null
            }
          </div>
        </div>
        <div className="controls">
          <button type="submit" className="btn btn-primary"
                  disabled={form.disabled ? true : false}>
            {form.disabled ? <Loading attachToParent={true} /> : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

ChangePassword.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChangePassword;