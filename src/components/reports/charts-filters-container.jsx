import moment from "moment";
import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers";

import ChartsFilters from "./charts-filters";

class ChartsFiltersContainer extends Component {
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
      }
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

  onFilter() {

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
      <ChartsFilters
        form={this.state.form}
        activeTab={this.props.activeTab}
        onChangeFilter={this.onChangeFilter}
        onFilter={this.onFilter}
        onReset={this.onReset}
      />
    );
  }
}

ChartsFiltersContainer.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default ChartsFiltersContainer;