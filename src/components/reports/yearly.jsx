import React from "react";
import ChartsContainer from "./charts-container";

const YearlyPieChart = (props) => (
  <div className="chart-view">
    <div className="container filter-container">
      <ChartsContainer activeTab="yearly" />
    </div>
  </div>
);

export default YearlyPieChart;