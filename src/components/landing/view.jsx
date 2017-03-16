import R from "ramda";
import React, {PropTypes} from "react";

import Header from "../common/header";

const Landing = (props) => (
  <div className="landing-view">
    <Header actions={["Settings", "Add"]}/>
    <div className="container">
      <div className="list-group padding-top padding-bottom">
        {R.map(expense =>
          <div className="list-group-item" key={`expense${expense._id}`}>
            <div className="pull-right accent xlg text">
              <i className={`fa fa-${R.toLower(expense.currency)}`}></i>&nbsp;
              <span className="xxlg text">{expense.amount}</span>
            </div>
            <span className="xlg bold text">{expense.category.title}</span><br/>
            <span className="sm light-imp text">{expense.description}</span>
          </div>,
        R.filter(expense => hasCategory(expense), props.entries))}
      </div>
    </div>
    <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>
  </div>
);

function hasCategory(expense) {
  return !R.isEmpty(expense.category) && R.type(expense.category) == "Object";
}

Landing.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default Landing;
// <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>