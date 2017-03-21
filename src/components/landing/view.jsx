import R from "ramda";
import React, {PropTypes} from "react";

import Header from "../common/header";
import ExpensesContainer from "../expenses/container";

const Landing = (props) => (
  <div className="landing-view">
    <Header actions={["Settings", "Add"]}/>
    <ExpensesContainer />
  </div>
);


Landing.propTypes = {
};

export default Landing;