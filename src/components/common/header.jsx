import R from "ramda";
import React, {Component, PropTypes} from "react";
import {browserHistory, Link} from "react-router";

// import Helpers from "../../helpers";

class Header extends Component {

  goBack() {
    browserHistory.goBack();
  }
  logout() {

  }

  render () {
    return (
      <header className="header">
        <div className="row">
          <div className="col-sm-4">
            {R.indexOf("Back", this.props.actions) > -1
              ? <button type="button" className="btn btn-default accent text" aria-label="Back"
                        onClick={this.goBack}>
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </button>
              : null }
          </div>
          <div className="header-title col-sm-4 text-center margin-top-xs">
            <Link to="/">Budget Manager</Link>
          </div>
          <div className="col-sm-4 text-right">
            {R.indexOf("Settings", this.props.actions) > -1
              ? <button type="button" className="btn btn-default margin-right-xs" aria-label="Settings">
                <Link to="/settings">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </Link>
              </button>
              : null }
            {R.indexOf("Add", this.props.actions) > -1
              ? <button type="button" className="btn btn-default margin-right-xs" aria-label="Add">
                <Link to="/add-entry">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </Link>
              </button>
              : null }

            <button type="button" className="btn btn-default accent text" aria-label="Logout"
                    onClick={this.logout}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.array,
};

export default Header;