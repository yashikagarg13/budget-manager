import R from "ramda";
import React, {PropTypes} from "react";
import Link from "react-router/lib/Link";
import {Collapse} from "react-bootstrap";

import Helpers from "../../helpers";

import Header from "../common/header";
import ChangePasswordContainer from "../change-password/container";

const Settings = (props) => (
  <div className="settings-view">
    <Header actions={props.token ? ["Home"] : ["Back", "Add"]}/>
    <div className="container">
      <div className="list-group padding-top-lg">

        <div className="list-group-item" onClick={props.onToggleCollapse.bind(null, "changePassword")}>
          Change password
          <div className="pull-right">
            <i className={`fa ${props.isOpen.changePassword ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
          </div>
        </div>
        <Collapse in={props.isOpen.changePassword}>
          <div><ChangePasswordContainer /></div>
        </Collapse>

        <div className="list-group-item" onClick={props.onToggleCollapse.bind(null, "changeDefaultCurrency")}>
          Change default currency
          <div className="pull-right">
            <i className={`fa ${props.isOpen.changeDefaultCurrency ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
          </div>
        </div>
        <Collapse in={props.isOpen.changeDefaultCurrency}>
          <div className="fieldset noborder-radius noborder-bottom">
            <div className="form-group nomargin-bottom">
              <div className="controls">
                <select name="defaultCurrency" id="defaultCurrency" className="input-md form-control"
                        onChange={props.onUpdateCurrency} value={props.defaultCurrency || ""}>
                  {R.map(item =>
                      <option key={item} value={item}>{item}</option>,
                    R.append(null, Helpers.Constants.currency))}
                </select>
              </div>
            </div>
          </div>
        </Collapse>

        <Link to="/manage-categories" className="list-group-item primary text">
          Manage Categories
          <div className="pull-right">
            <i className="fa fa-chevron-right"></i>
          </div>
        </Link>

      </div>
    </div>
  </div>
);

Settings.propTypes = {
  defaultCurrency: PropTypes.string,
  isOpen: PropTypes.object.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  onUpdateCurrency: PropTypes.func.isRequired,
  token: PropTypes.string,
};

export default Settings;