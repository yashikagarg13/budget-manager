import React, {PropTypes} from "react";
import Tabulator from "../common/Tabulator";

const Reports = (props) => (
  <Tabulator
    tabs={props.tabs}
    onClickTabLink={props.onClickTabLink}
    theme="tab-group"
  />
);

Reports.propTypes = {
  tabs: PropTypes.array.isRequired,
  onClickTabLink: PropTypes.func.isRequired,
};

export default Reports;