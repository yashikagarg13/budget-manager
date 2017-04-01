import R from "ramda";
import React, {Component, PropTypes} from "react";
import {browserHistory, Link} from "react-router";

import Helpers from "../../helpers";

class Header extends Component {
  goBack() {
    browserHistory.goBack();
  }

  logout() {
    Helpers.LocalStorage.remove("token");
    Helpers.LocalStorage.remove("currency");
    browserHistory.push("/");
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
            {R.indexOf("Home", this.props.actions) > -1
              ? <Link to="/">
                  <button type="button" className="btn btn-default accent text margin-right-xs" aria-label="Home">
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </button>
                </Link>
              : null }
          </div>
          <div className="header-title col-sm-4 text-center margin-top-xs">
            <Link to="/">Budget Manager</Link>
          </div>
          <div className="col-sm-4 text-right">
            {R.indexOf("Settings", this.props.actions) > -1
              ? <Link to="/settings">
                  <button type="button" className="btn btn-default accent text margin-right-xs" aria-label="Settings">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                  </button>
                </Link>
              : null }
            {R.indexOf("Add", this.props.actions) > -1
              ? <Link to="/add-entry">
                  <button type="button" className="btn btn-default accent text margin-right-xs" aria-label="Add">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </Link>
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