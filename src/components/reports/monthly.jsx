import React from "react";
import ChartsContainer from "./charts-container";

const MonthlyPieChart = (props) => (
  <div className="chart-view">
    <div className="container filter-container">
      <ChartsContainer activeTab="monthly" />
    </div>
  </div>
);

export default MonthlyPieChart;