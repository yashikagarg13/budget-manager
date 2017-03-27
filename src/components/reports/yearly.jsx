import React from "react";
import ChartsFiltersContainer from "./charts-filters-container";

const YearlyPieChart = (props) => (
  <div className="chart-view">
    <div className="container filter-container">
      <ChartsFiltersContainer activeTab="yearly" />
    </div>
  </div>
);

export default YearlyPieChart;