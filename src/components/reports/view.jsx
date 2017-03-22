import R from "ramda";
import React, {PropTypes} from "react";

import ChartsTabulator from "./charts-tabulator";

const Reports = (props) => (
  <div className="reports-view text-center">
    <ChartsTabulator />
  </div>
);


Reports.propTypes = {
};

export default Reports;