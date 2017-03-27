import React from "react";
import ChartsFiltersContainer from "./charts-filters-container";

const QuarterlyPieChart = (props) => (
  <div className="chart-view">
    <div className="container filter-container">
      <ChartsFiltersContainer activeTab="quarterly" />
    </div>
  </div>
);

export default QuarterlyPieChart;