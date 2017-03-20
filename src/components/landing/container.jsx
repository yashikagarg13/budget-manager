import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers/index";
import Landing from "./view";

class LandingContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      entries: [],
    };

    this.onClickExpenseEdit = this.onClickExpenseEdit.bind(this);
    this.onClickExpenseRemove = this.onClickExpenseRemove.bind(this);
  }
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
    this.loadData(0);
  }

  loadData (page) {
    Helpers.API.getExpenseEnteriesByUser(Helpers.Constants.perPage, page)
    .then(response => {
      Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
      if (response.success) {
        this.setState({
          entries: response.data,
        });
      }
    })
    .catch((error) => {
      console.log(error); // eslint-disable-line
    });
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
      <Landing
        entries={this.state.entries}
        updateExpenseEntry={this.onClickExpenseEdit}
        removeExpenseEntry={this.onClickExpenseRemove}
      />
    );
  }
}

LandingContainer.propTypes = {
  router: PropTypes.object,
};

export default LandingContainer;