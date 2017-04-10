import moment from "moment";
import React, {Component, PropTypes} from "react";
import withRouter from "react-router/lib/withRouter";

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
      chartData: {},
      loading: true,
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  componentWillMount() {
    this.filterData();
  }

  onChangeFilter(key) {
    let form = this.state.form;
    form.values[key] = event.target.value;
    this.setState({form});

    this.filterData();
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
    this.filterData();
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
      $lt = moment(yearQuery).add(moment.duration(1, "year"));
    } else if (activeTab === "quarterly") {
      const quarterToMonth = ((quarter - 1) * 3);
      let quarterQuery = yearType === "cal"
        ? `${year}-${quarterToMonth + 1}`
        : `${year}-${quarterToMonth + 4}`;

      $gte = moment(quarterQuery);
      $lt = moment(quarterQuery).add(moment.duration(3, "months"));
    } else if (activeTab === "monthly") {
      $gte = moment(`${year}-${Number(month) + 1}`);
      $lt = moment(`${year}-${Number(month) + 1}`).add(moment.duration(1, "months"));
    }

    filters.date.$gte = $gte.format("YYYY-MM-DD");
    filters.date.$lt = $lt.format("YYYY-MM-DD");

    return filters;
  }

  filterData () {
    this.setState({loading: true});
    let filters = this.getFilterForAPI();
    Helpers.API.getExpenseEntriesByDate(filters)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          let chartData = this.state.chartData;
          chartData[this.props.activeTab] = Helpers.Utils.transformToPieChartData(response.data, response.total);
          this.setState({chartData, loading: false});
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        this.setState({loading: true});
      });
  }

  render () {
    return (
      <Charts
        activeTab={this.props.activeTab}
        chartData={this.state.chartData}
        form={this.state.form}
        isLoading={this.state.loading}
        onChangeFilter={this.onChangeFilter}
        onReset={this.onReset}
      />
    );
  }
}

ChartsContainer.propTypes = {
  activeTab: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(ChartsContainer);