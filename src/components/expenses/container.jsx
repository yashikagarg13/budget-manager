import R from "ramda";
import React, {Component, PropTypes} from "react";
import withRouter from "react-router/lib/withRouter";
import {connect} from "react-redux";

import * as Actions from "../../actions/expenses";
import Helpers from "../../helpers/index";

import Expenses from "./view";

class ExpensesContainer extends Component {
  constructor (props) {
    super(props);
    this.total = 0;
    this.state = {
      entries: [],
      loading: false,
      page: 0,
    };

    this.onClickExpenseEdit = this.onClickExpenseEdit.bind(this);
    this.onClickExpenseRemove = this.onClickExpenseRemove.bind(this);
    this.onEnterWaypoint = this.onEnterWaypoint.bind(this);
    this.loadDataSuccessCb = this.loadDataSuccessCb.bind(this);
    this.loadDataFailureCb = this.loadDataFailureCb.bind(this);
  }
  componentDidMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
    this.loadData(this.state.page);
  }

  getOffset(page, perPage, total) {
    let offset = page * perPage;

    if (page < 0) {
      return 0;
    }

    if (offset >= total)  {
      return this.total;
    }

    if (page >= 0 && offset < this.total) {
      return offset;
    }
  }
  loadData (page) {
    console.log('this.props', this.props);
    this.props.fetchExpenseEntries(Helpers.Constants.perPage, page)
    // .then(response => Helpers.API.successHandler(response, this.props.router, this.loadDataSuccessCb))
    // .catch(error => Helpers.API.errorHandler(error, this.props.router, this.loadDataFailureCb));
  }
  loadDataSuccessCb (response) {
    this.total = response.total;
    this.setState({
      entries: R.concat(this.state.entries, response.data),
      loading: false,
    });
  }
  loadDataFailureCb () {
    this.setState({loading: false});
  }

  onEnterWaypoint() {
    if (this.state.loading) return;
    this.setState({loading: true});

    let page = this.state.page;

    if (this.getOffset(page, Helpers.Constants.perPage, this.total) < this.total) {
      this.setState({page: page + 1});
      this.loadData(page + 1);
    } else {
      this.setState({loading: false});
    }
  }
  onClickExpenseEdit (expenseId) {
    this.props.router.push(`edit-entry/${expenseId}`);
  }
  onClickExpenseRemove (expenseId) {
    Helpers.API.removeExpenseEntry(expenseId)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          const index = R.findIndex(expense => expense._id == expenseId, this.state.entries);
          let entries = this.state.entries;
          entries = R.remove(index, 1, entries);
          this.setState({entries});
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
      });
  }

  render () {
    return (
      <Expenses
        entries={this.state.entries}
        isLoading={this.state.loading}
        showWaypoint={this.total > this.getOffset(this.state.page, Helpers.Constants.perPage, this.total)}
        enterWaypoint={this.onEnterWaypoint}
        updateExpenseEntry={this.onClickExpenseEdit}
        removeExpenseEntry={this.onClickExpenseRemove}
      />
    );
  }
}

ExpensesContainer.propTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    expenses: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExpenseEntries: (offset, limit, filters, sortBy, fields) => {
      dispatch(Actions.fetchExpenseEntries(offset, limit, filters, sortBy, fields));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesContainer));