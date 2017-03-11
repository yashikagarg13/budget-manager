import moment from "moment";
import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers/index";

import AddEntry from "./view";

class AddEntryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      form: {
        values: {
          amount: 0,
          category: null,
          currency: Helpers.LocalStorage.get("currency"),
          date: moment(),
          description: null,
        },
        errors: {},
      },
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.loadData();
  }
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
  }

  loadData () {
    Helpers.API.getExpenseCategoriesByUser()
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          this.setState({
            categories: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  validation(form) {
    if (R.isEmpty(form.values.amount) || form.values.amount == 0) {
      form.errors.amount = Helpers.Notifictaions.fieldIsRequired;
    } else if (R.type(form.values.amount) != "Number" || form.values.amount <= 0) {
      form.errors.amount = Helpers.Notifictaions.fieldIncorrectFormat;
    }

    if (R.isEmpty(form.values.category) || R.type(form.values.category) != "String") {
      form.errors.category = Helpers.Notifictaions.fieldIsRequired;
    }
    if (R.isEmpty(form.values.currency) || R.type(form.values.currency) != "String") {
      form.errors.currency = Helpers.Notifictaions.fieldIsRequired;
    }
    if (R.isEmpty(form.values.date) || R.type(form.values.date) != "Date") {
      form.errors.date = Helpers.Notifictaions.fieldIsRequired;
    }

    return form;
  }

  onChangeDate(date) {
    let form = this.state.form;
    form.values.date = date;
    this.setState({form});
  }
  onChangeInput (key, type, event) {
    let form = this.state.form;
    form.values[key] = Helpers.Form.typeCastValue(event.target.value, type);

    // form = this.validation(form);

    this.setState({form});
  }

  render () {
    return (
      <AddEntry
        categories={this.state.categories}
        form={this.state.form}
        updateAmount={this.onChangeInput}
        updateCategory={this.onChangeInput}
        updateCurrency={this.onChangeInput}
        updateDate={this.onChangeDate}
        updateDescription={this.onChangeInput}
      />
    );
  }
}

AddEntryContainer.propTypes = {
  router: PropTypes.object,
};

export default AddEntryContainer;