import R from "ramda";
import React, {Component, PropTypes} from "react";
import * as d3 from "d3";

class PieChart extends Component {
  componentDidMount () {
    const {data} = this.props;

    if(R.type(data) == "Array" && !R.isEmpty(data)) {
      const totalWidth = 800;

      const pieChartDim = {
        svgHeight: (totalWidth - 100) / 2,
        svgWidth: (totalWidth - 100) / 2,
        radius: (totalWidth - 200) / 4,
      };

      const labelsDim = {
        svgHeight: data.length * 30,
        svgWidth: (totalWidth - 50) / 4,
      };

      this.createPieChart(pieChartDim, data);
      this.createLabels(labelsDim, data);
    }
  }

  createLabels ({svgHeight, svgWidth}, data) {
    // 1. Create svg
    let svg = d3
      .select(".pie-chart-labels")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth)
      .append("g");

    // Add p tags
    let color = d3.scaleOrdinal(d3.schemeCategory20);
    let g = svg
      .selectAll("path")
      .data(data)
      .enter()
      .append("g");

    g.append("rect")
      .attr("x", 10)
      .attr("y", function (d, i) {
        return (i * 30) + 10;
      })
      .attr("height", 20)
      .attr("width", 20)
      .attr("fill", function(d) {
        return color(d.label);
      })
      .attr("rx", 3)
      .attr("ry", 3);

    g.append("text")
      .attr("x", 40)
      .attr("y", function (d, i) {
        return (i * 30) + 25;
      })
      .text(function(d) {
        return d.label;
      });

  }

  createPieChart ({svgHeight, svgWidth, radius}, data) {
    // 1. Create svg
    let svg = d3
      .select(".pie-chart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth)
      .append("g")
      .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

    // 2. Draw an arc and label arc
    let arc = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(0);

    // 3. Add data to pie
    let pie = d3
      .pie()
      .value(function(d) {
        return d.value;
      });

    // 4. Colors
    let color = d3.scaleOrdinal(d3.schemeCategory20);

    // 5. Create path
    let g = svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("g");

    g.append("path")
      .attr("id", function(d,i) {
        return "pieArc_" + i;
      })
      .attr("d", arc)
      .attr("fill", function(d) {
        return color(d.data.label);
      });

    // 6. Add label
    g.append("text")
      .attr("x", function(d) {
        let angle = (d.endAngle - d.startAngle) * (180 / Math.PI);
        let arcCircumference =  (angle/360) * (2 * Math.PI * radius);
        return ((arcCircumference/2) - 20);
      })
      .attr("dy", function(d) {
        return 30;
      })
      .append("textPath")
      .attr("xlink:href",function(d,i) {
        return "#pieArc_" + i;
      })
      .text(function(d) {
        return d.data.value + "%";
      });
  }

  render () {
    return (
      <div className="pie-chart-container">
        <div className="pie-chart"></div>
        <div className="pie-chart-labels"></div>
      </div>
    );
  }
}

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PieChart;