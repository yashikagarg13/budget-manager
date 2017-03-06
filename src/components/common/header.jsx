import R from "ramda";
import React, {PropTypes} from "react";
import {browserHistory, Link} from "react-router";

function goBack() {
  browserHistory.goBack();
}

const Header = (props) => (
  <header className="header bg-primary">
    <div className="row">
      <div className="col-sm-4">
        {R.indexOf("Back", props.actions) > -1
          ? <button type="button" className="btn btn-default" aria-label="Back"
              onClick={goBack}>
              Back
            </button>
          : null }
      </div>
      <div className="header-title col-sm-4 text-center margin-top-xs">
        <Link to="/">Budget Manager</Link>
      </div>
      <div className="col-sm-4 text-right">
        {R.indexOf("Settings", props.actions) > -1
          ? <button type="button" className="btn btn-default margin-right-xs" aria-label="Settings">
              <Link to="/settings">
                Settings
              </Link>
            </button>
          : null }
        {R.indexOf("Add", props.actions) > -1
          ? <button type="button" className="btn btn-default" aria-label="Add">
              <Link to="/add-entry">
                Add
              </Link>
            </button>
          : null }
      </div>
    </div>
  </header>
);

Header.propTypes = {
  actions: PropTypes.array,
};

export default Header;