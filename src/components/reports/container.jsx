import R from "ramda";
import React, {Component} from "react";

import Reports from "./view";
import ChartsContainer from "./charts-container";

class ReportsContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tabs: [{
        id: "yearly",
        title: "Yearly",
        component: ChartsContainer,
        componentProps: {activeTab: "yearly"},
        active: true,
      },{
        id: "quarterly",
        title: "Quarterly",
        component: ChartsContainer,
        componentProps: {activeTab: "quarterly"},
        active: false,
      }, {
        id: "monthly",
        title: "Monthly",
        component: ChartsContainer,
        componentProps: {activeTab: "monthly"},
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
      <Reports
        tabs={this.state.tabs}
        onClickTabLink={this.onClickTabLink}/>
    );
  }
}

export default ReportsContainer;