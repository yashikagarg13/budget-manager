import React from "react";

const Login = (props) => (
  <div className="col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4 margin-top">
    <h4 className="text-center">
      Please log in to your BM Account
    </h4>
    <div className="well">
      <form>
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
        <button type="submit" className="btn btn-primary btn-md center-block"
          onClick={props.loginHandler}>Log In</button>
      </form>
    </div>
  </div>
);

export default Login;
