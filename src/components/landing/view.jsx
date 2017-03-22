import R from "ramda";
import React, {PropTypes} from "react";

import Header from "../common/header";
import ListReportTabulator from "../common/list-report-tabulator";

const Landing = (props) => (
  <div className="landing-view">
    <Header actions={["Settings", "Add"]}/>
    <ListReportTabulator />
  </div>
);


Landing.propTypes = {
};

export default Landing;