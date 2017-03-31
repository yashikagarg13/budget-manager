import React, {PropTypes} from "react";
import {Link} from "react-router";

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
      <form onSubmit={props.loginHandler}>
        <div className="form-group">
          <label className="control-label">Email</label>
          <div className="controls">
            <input type="email" className="input-mf form-control" id="email" name="email"
              value={props.email} onChange={props.updateEmailHandler}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <div className="controls">
            <input type="password" className="input-mf form-control" id="password" name="password"
              onChange={props.updatePasswordHandler}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-md btn-block">Log In</button>

        <hr />
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <a href="api/authenticate/facebook" className="btn btn-facebook btn-md btn-block margin-bottom-xs">
              <i className="fa fa-facebook margin-right-sm"></i>
              Log In with Facebook
            </a>
            <button type="button" className="btn btn-google btn-md btn-block"
              onClick={props.loginWithFBHandler}>
              <i className="fa fa-google-plus margin-right-xs"></i>
              Sign in with Google
            </button>
          </div>
        </div>
      </form>
    </div>
    <p className="text-center margin-top">Do not have an account? <Link to="/signup">Sign up!</Link></p>
  </div>
);

Login.propTypes = {
  email: PropTypes.string,
  updateEmailHandler: PropTypes.func.isRequired,

  updatePasswordHandler: PropTypes.func.isRequired,

  loginError: PropTypes.string,
  loginHandler: PropTypes.func.isRequired,
  loginWithFBHandler: PropTypes.func.isRequired,
};

export default Login;
