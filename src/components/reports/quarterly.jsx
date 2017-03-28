import React from "react";
import ChartsContainer from "./charts-container";

const QuarterlyPieChart = (props) => (
  <div className="chart-view">
    <div className="container filter-container">
      <ChartsContainer activeTab="quarterly" />
    </div>
  </div>
);

export default QuarterlyPieChart;