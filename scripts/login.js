import React from "react";

const Login = (props) => (
  <div className="col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4 margin-top">
    <h1 className="login-title text-center">
      Please log in to your Budget Manager Account.
    </h1>
    <div className="well">
      <form>
        <div className="form-group">
          <label className="control-label">Email</label>
          <div className="controls">
            <input type="email" className="input-mf form-control" id="email" name="email" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <div className="controls">
            <input type="password" className="input-mf form-control" id="password" name="password" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-md center-block">Log In</button>
      </form>
    </div>
  </div>
);

export default Login;
