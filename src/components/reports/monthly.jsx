import React from "react";
import ChartsFiltersContainer from "./charts-filters-container";

const MonthlyPieChart = (props) => (
  <div className="chart-view">
    <div className="container filter-container">
      <ChartsFiltersContainer activeTab="monthly" />
    </div>
  </div>
);

export default MonthlyPieChart;