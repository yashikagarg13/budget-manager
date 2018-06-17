import R from "ramda";
import React, {Component} from "react";

import ExpensesContainer from "../../components-new/expenses/container";
import ReportsContainer from "../reports/container";
import Landing from "./view";

class LandingContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tabs: [{
        id: "expenseList",
        title: "Expenses",
        component: ExpensesContainer,
        componentProps: {},
        active: true,
      }, {
        id: "reports",
        title: "Reports",
        component: ReportsContainer,
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
      <Landing
        tabs={this.state.tabs}
        onClickTabLink={this.onClickTabLink}/>
    );
  }
}

export default LandingContainer;