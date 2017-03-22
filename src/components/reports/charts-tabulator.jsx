import R from "ramda";
import React, {Component} from "react";

import YearlyPieChart from "./yearly";
import QuarterlyPieChart from "./quarterly";
import MonthlyPieChart from "./monthly";
import Tabulator from "../common/Tabulator";

class ChartsTabulator extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tabs: [{
        id: "yearly",
        title: "Yearly",
        component: YearlyPieChart,
        componentProps: {},
        active: true,
      },{
        id: "quarterly",
        title: "Quarterly",
        component: QuarterlyPieChart,
        componentProps: {},
        active: false,
      }, {
        id: "monthly",
        title: "Monthly",
        component: MonthlyPieChart,
        componentProps: {},
        active: false,
      }]
    };

    this.onClickTabLink = this.onClickTabLink.bind(this);
  }

  onClickTabLink (tabId) {
    let tabs = this.state.tabs;
    this.setState({
      tabs: R.map(tab => {
        tab.active = (tab.id === tabId ? true : false);
        return tab;
      }, tabs),
    });
  }

  render () {
    return (
      <Tabulator
        tabs={this.state.tabs}
        onClickTabLink={this.onClickTabLink}
        theme="tab-group"
      />
    );
  }
}

export default ChartsTabulator;