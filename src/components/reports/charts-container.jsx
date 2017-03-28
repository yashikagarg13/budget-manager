import moment from "moment";
import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers";

import Charts from "./charts";

class ChartsContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      form: {
        values: {
          yearType: "cal",
          year: moment().year(),
          quarter: moment().quarter(),
          month: moment().month(),
        },
        errors: {},
        disabled: false,
      },
      chart: {},
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChangeFilter(key) {
    let form = this.state.form;
    form.values[key] = event.target.value;
    console.log(form.values[key]);
    this.setState({form});
  }

  getFilterForAPI() {
    const {yearType, year, month, quarter} = this.state.form.values;
    const {activeTab} = this.props;
    let filters = {
      date: {
        $gte: "",
        $lt: "",
      },
    };

    let $gte, $lt;
    if (activeTab === "yearly") {
      let yearQuery = yearType === "cal"
        ? `${year}-01`
        : `${year-1}-04`;

      $gte = moment(yearQuery);
      $lt = moment(yearQuery).add(moment.duration(1, 'year'));
    } else if (activeTab === "quarterly") {
      const quarterToMonth = ((quarter - 1) * 3);
      let quarterQuery = yearType === "cal"
        ? `${year}-${quarterToMonth + 1}`
        : `${year}-${quarterToMonth + 4}`;

      $gte = moment(quarterQuery);
      $lt = moment(quarterQuery).add(moment.duration(3, 'months'));
    } else if (activeTab === "monthly") {
      $gte = moment(`${year}-${Number(month) + 1}`);
      $lt = moment(`${year}-${Number(month) + 1}`).add(moment.duration(1, 'months'));
    }

    filters.date.$gte = $gte.format("YYYY-MM-DD");
    filters.date.$lt = $lt.format("YYYY-MM-DD");

    return filters;
  }

  onFilter () {
    let filters = this.getFilterForAPI();
    Helpers.API.getExpenseEntriesByDate(filters)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          let chart = this.state.chart;
          chart[this.props.activeTab] = Helpers.Utils.transformToPieChartData(response.data);
          this.setState({chart});
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
      });
  }

  onReset() {
    let form = this.state.form;
    form.values = {
      yearType: "cal",
      year: moment().year(),
      quarter: moment().quarter(),
      month: moment().month(),
    };

    this.setState({form});
  }

  render () {
    return (
      <Charts
        chart={this.state.chart}
        form={this.state.form}
        activeTab={this.props.activeTab}
        onChangeFilter={this.onChangeFilter}
        onFilter={this.onFilter}
        onReset={this.onReset}
      />
    );
  }
}

ChartsContainer.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default ChartsContainer;