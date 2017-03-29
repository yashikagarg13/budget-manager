import R from "ramda";
import React, {PropTypes} from "react";

import ChartsFilters from "./charts-filters";
import Loading from "../common/loading";
import PieChart from "./pie-chart";

const Charts = (props) => {
  if(props.isLoading)
    return <Loading />;

  const data = props.chartData[props.activeTab];
  return (
    <div className="chart-view">
      <div className="container filter-container">
        <ChartsFilters
          form={props.form}
          activeTab={props.activeTab}
          onChangeFilter={props.onChangeFilter}
          onReset={props.onReset}
        />

        <hr className="nomargin-bottom" />

        {R.type(data) == "Array" && !R.isEmpty(data)
          ? <PieChart data={data} />
          : <div className="padding-top accent sm text">No expense entries added for selected time period</div>
        }
      </div>
    </div>
  );
};

Charts.propTypes = {
  activeTab: PropTypes.string.isRequired,
  chartData: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  onChangeFilter: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Charts;