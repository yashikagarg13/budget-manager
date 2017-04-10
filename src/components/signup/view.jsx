import R from "ramda";
import React, {PropTypes} from "react";
import Link from "react-router/lib/Link";

import Helpers from "../../helpers/index";

const SignUp = (props) => (
  <div className="col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4 margin-top-xlg">
    <h4 className="text-center">
      Please create your BM Account
    </h4>
    <div className="well">
      {props.signUpError
        ? <div className="alert alert-danger" role="alert">
            {props.signUpError}
          </div>
        : null
      }
      <form noValidate>
        <div className="form-group">
          <label className="control-label">Email</label>
          <div className="controls">
            <input type="email" className="input-md form-control" id="email" name="email"
              value={props.email} onChange={props.updateEmailHandler}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <div className="controls">
            <input type="password" className="input-md form-control" id="password" name="password"
              onChange={props.updatePasswordHandler} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Currency</label>
          <div className="controls">
            <select name="currency" id="currency" className="input-md form-control"
              onChange={props.updateCurrency} value={props.currency}>
              {R.map(item =>
                <option key={item} value={item}>{item}</option>,
              R.append(null, Helpers.Constants.currency))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-md center-block"
          onClick={props.signUpHandler}>Sign Up</button>

        <hr />
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <a href="api/authenticate/facebook" className="btn btn-facebook btn-md btn-block margin-bottom-xs">
              <i className="fa fa-facebook margin-right-sm"></i>
              Sign Up with Facebook
            </a>
            <a href="api/authenticate/google" className="btn btn-google btn-md btn-block">
              <i className="fa fa-google-plus margin-right-xs"></i>
              Sign Up with Google
            </a>
          </div>
        </div>
      </form>
    </div>
    <p className="text-center">Already have an account? <Link to="/login">Log In!</Link></p>
  </div>
);

SignUp.propTypes = {
  email: PropTypes.string,
  updateEmailHandler: PropTypes.func.isRequired,

  updatePasswordHandler: PropTypes.func.isRequired,

  currency: PropTypes.string,
  updateCurrency: PropTypes.func.isRequired,

  signUpError: PropTypes.string,
  signUpHandler: PropTypes.func.isRequired,
};

export default SignUp;
