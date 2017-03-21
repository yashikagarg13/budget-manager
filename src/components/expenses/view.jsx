import R from "ramda";
import React, {PropTypes} from "react";
import Waypoint from "react-waypoint";

import Loading from "../common/loading";

const Expenses = (props) => (
  <div className="landing-view">
    <div className="container">
      <div className="list-group padding-top padding-bottom">
        {R.map(expense =>
          <div className="list-group-item" key={`expense${expense._id}`}>
            <div className="row">
              <div className="col-sm-8">
                <span className="xlg bold text">{expense.category ? expense.category.title : ""}</span><br/>
                <span className="sm light-imp text">{expense.description}</span>
              </div>
              <div className="col-sm-4 text-right">
                <div className="accent xlg text">
                  {expense.currency ? <i className={`fa fa-${R.toLower(expense.currency)}`}></i> : null}&nbsp;
                  <span className="xxlg text">{expense.amount}</span>
                </div>
                <div>
                  <button className="btn-icon"
                    onClick={props.updateExpenseEntry.bind(null, expense._id)}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button className="btn-icon"
                    onClick={props.removeExpenseEntry.bind(null, expense._id)}>
                    <i className="fa fa-minus-circle" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>,
        props.entries)}
      </div>
      {props.showWaypoint
        ? <Waypoint onEnter={props.enterWaypoint}>
            <div>
              {props.isLoading ? <Loading attachToParent/> : null}
            </div>
          < /Waypoint>
        : null}
    </div>
  </div>
);

Expenses.propTypes = {
  entries: PropTypes.array.isRequired,

  isLoading: PropTypes.bool,
  showWaypoint: PropTypes.bool,
  enterWaypoint: PropTypes.func.isRequired,

  removeExpenseEntry: PropTypes.func.isRequired,
  updateExpenseEntry: PropTypes.func.isRequired,
};

export default Expenses;
// <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>