import moment from "moment";
import R from "ramda";
import React, {PropTypes} from "react";

import Helpers from "../../helpers";
import ChartsFilters from "./charts-filters";

const Charts = (props) => {
  return (
    <ChartsFilters
      form={props.form}
      activeTab={props.activeTab}
      onChangeFilter={props.onChangeFilter}
      onFilter={props.onFilter}
      onReset={props.onReset}
    />
  );
};

Charts.propTypes = {
  activeTab: PropTypes.string,
  chart: PropTypes.object,
  form: PropTypes.object.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Charts;