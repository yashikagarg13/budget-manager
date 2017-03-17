import moment from "moment";
import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers/index";

import ExpenseEntry from "./view";
import Loading from "../common/loading";

class ExpenseEntryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      form: {
        values: {
          amount: 0,
          category: "",
          currency: Helpers.LocalStorage.get("currency"),
          date: moment(),
          description: "",
        },
        errors: {},
        disabled: false,
      },
      loading: true,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSave = this.onSave.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);

    this.loadData();
  }
  componentWillMount () {
    Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
  }

  loadData () {
    const expenseId = this.props.params.expenseId;

    return Helpers.API.getExpenseCategoriesByUser()
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          this.setState({
            categories: response.data,
          });
        }
        if (expenseId) {
          return Helpers.API.getExpenseEntry(expenseId);
        } else {
          return response;
        }
      })
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          let form = this.state.form;
          form.values = {
            amount: response.data.amount,
            category: response.data.category,
            currency: response.data.currency,
            date: moment(response.data.date),
            description: response.data.description,
          };
          this.setState({form});
        }

        this.setState({loading: false});
        return response;
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        this.setState({loading: false});
      });
  }
  validation(form) {
    form.errors = {};

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
    if (R.isEmpty(form.values.date) || R.type(form.values.date) != "Object") {
      form.errors.date = Helpers.Notifictaions.fieldIsRequired;
    }

    return form;
  }
  redirectToHomePage() {
    this.props.router.push("/landing");
  }
  resetForm() {
    let form = this.state.form;
    form.values = {
      amount: 0,
      category: "",
      currency: Helpers.LocalStorage.get("currency"),
      date: moment(),
      description: "",
    };
    form.errors = {};
    form.disabled = false;
    this.setState({form});
  }

  onChangeDate(date) {
    let form = this.state.form;
    form.values.date = date;
    this.setState({form});
  }
  onChangeInput (key, type, event) {
    let form = this.state.form;
    form.values[key] = Helpers.Form.typeCastValue(event.target.value, type);
    this.setState({form});
  }
  onSave (addAnother=false) {
    let form = this.state.form;
    form = this.validation(form);
    this.setState({form});

    if(R.type(form.errors) == "Object" && !R.isEmpty(form.errors)) return;

    form.disabled = true;
    this.setState({form});

    const expenseId = this.props.params.expenseId;

    (expenseId
      ? Helpers.API.updateExpenseEntry(expenseId, form.values)
      : Helpers.API.addExpenseEntry(form.values))
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          if (addAnother) {
            this.resetForm();
          } else {
            this.redirectToHomePage();
          }
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        form.disabled = false;
        this.setState({form});
      });
  }

  render () {
    if (this.state.loading) return <Loading />;

    return (
      <ExpenseEntry
        categories={this.state.categories}

        form={this.state.form}

        cancel={this.redirectToHomePage}
        save={this.onSave}
        updateInput={this.onChangeInput}
        updateDate={this.onChangeDate}
      />
    );
  }
}

ExpenseEntryContainer.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
};

export default ExpenseEntryContainer;