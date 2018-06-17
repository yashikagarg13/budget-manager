import React, {Component, PropTypes} from "react";
import withRouter from "react-router/lib/withRouter";
import {connect} from "react-redux";

import * as Actions from "../../actions/expenses";
import {getExpenses, getPage, getIsFetching, getAllFetched} from "../../reducers/expenses";

import Expenses from "./view.jsx";

class ExpensesContainer extends Component {
  constructor(props) {
    super(props);

    this.fetchMore = this.fetchMore.bind(this);
  }
  componentWillMount () {
    this.fetchData();
  }

  fetchData () {
    const {page, fetchExpenseEntries} = this.props;
    fetchExpenseEntries(["category"]);
  }
  fetchMore () {
    const {page, fetchExpenseEntries, setPage} = this.props;
    setPage(page + 1);
    fetchExpenseEntries(["category"]);
  }

  render () {
    const {entries, isFetching, allFetched} = this.props;

    return (
      <Expenses
       entries={entries || []}
       isFetching={isFetching}
       showWaypoint={!allFetched}
       enterWaypoint={this.fetchMore}
       removeExpenseEntry={() => {}}
       updateExpenseEntry={() => {}}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: getExpenses(state.expenses),
    page: getPage(state.expenses),
    isFetching: getIsFetching(state.expenses),
    allFetched: getAllFetched(state.expenses),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExpenseEntries: (paginate, fields) => {
      dispatch(Actions.fetchExpenseEntries(paginate, fields));
    },
    setPage: (page) => {
      dispatch(Actions.setPage(page));
    }
  };
};

ExpensesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesContainer);

ExpensesContainer.propTypes = {
  entries: PropTypes.array,
  fetchExpenseEntries: PropTypes.func,
  page: PropTypes.number,
};

export default ExpensesContainer;