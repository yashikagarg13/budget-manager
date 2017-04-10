import React, {PropTypes} from "react";
import Link from "react-router/lib/Link";

import ForgotPasswordPopup from "./forgot-password-popup";

const Login = (props) => (
  <div className="col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4 margin-top-xlg">
    <h5 className="text-center">
      Please log in to your BM Account
    </h5>
    <div className="well">
      {props.loginError
        ? <div className="alert alert-danger" role="alert">
            {props.loginError}
          </div>
        : null
      }
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label className="control-label">Email</label>
          <div className="controls">
            <input type="email" className="input-md form-control" id="email" name="email"
              value={props.email} onChange={props.onUpdate.bind(null, "email")}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <div className="controls">
            <input type="password" className="input-md form-control" id="password" name="password"
              onChange={props.onUpdate.bind(null, "password")}/>
          </div>
        </div>
        <div className="controls clearfix">
          <button type="submit" className="btn btn-primary btn-md btn-block">Log In</button>
          <button type="button" className="btn btn-link pull-right nopadding margin-top-xs"
                  onClick={props.onClickForgotPwd}>Forgot Password?</button>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <a href="api/authenticate/facebook" className="btn btn-facebook btn-md btn-block margin-bottom-xs">
              <i className="fa fa-facebook margin-right-sm"></i>
              Log In with Facebook
            </a>
            <a href="api/authenticate/google" className="btn btn-google btn-md btn-block">
              <i className="fa fa-google-plus margin-right-xs"></i>
              Sign in with Google
            </a>
          </div>
        </div>
      </form>
    </div>
    <p className="text-center margin-top">Do not have an account? <Link to="/signup">Sign up!</Link></p>
    {props.showForgotPwdModal
      ? <ForgotPasswordPopup
          apiInProgress={props.apiInProgress}
          show={props.showForgotPwdModal}
          onHide={props.onHideModal}
          onClick={props.onRequestLink}
        />
      : null
    }
  </div>
);

Login.propTypes = {
  apiInProgress: PropTypes.bool,
  email: PropTypes.string.isRequired,
  loginError: PropTypes.string,
  showForgotPwdModal: PropTypes.bool,
  onClickForgotPwd: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onRequestLink: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Login;
