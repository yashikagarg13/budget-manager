import DatePicker from "react-datepicker";
import R from "ramda";
import React, {PropTypes} from "react";

import Helpers from "../../helpers/index";

import Header from "../common/header";

const ExpenseEntry = (props) => (
  <div className="add-expense-view">
    <Header actions={["Back"]}/>
    <div className="container">
      <div className="padding-top-lg">
        <form className="fieldset">
          <div className="form-group">
            <label className="control-label" htmlFor="date">Date <span className="required">*</span></label>
            <div className="controls">
              <DatePicker
                id="date" name="date" className="input-sm form-control"
                selected={props.form.values.date} onChange={props.updateDate}
              />
              {props.form.errors.date ? <p className="error">{props.form.errors.date}</p> : null}
            </div>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="category">Category <span className="required">*</span></label>
            <div className="controls">
              <select id="category" name="category" className="input-sm form-control"
                     value={props.form.values.category}
                     onChange={props.updateInput.bind(null, "category", "text")}>
                {R.map((category) =>
                  <option key={`catgeory-${category._id}`} value={category._id}>{category.title}</option>
                , R.prepend({_id: ""}, props.categories))}
              </select>
              {props.form.errors.category ? <p className="error">{props.form.errors.category}</p> : null}
            </div>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="amount">Amount <span className="required">*</span></label>
            <div className="controls">
              <div className="row">
                <div className="col-sm-8 margin-bottom">
                  <input type="number" id="amount" name="amount" className="input-sm form-control"
                         value={props.form.values.amount} defaultValue={props.form.values.amount}
                         onChange={props.updateInput.bind(null, "amount", "number")} min="0"
                  />
                  {props.form.errors.amount ? <p className="error">{props.form.errors.amount}</p> : null}
                </div>
                <div className="col-sm-4 margin-bottom">
                  <select id="currency" name="currency" className="input-sm form-control"
                         value={props.form.values.currency} defaultValue={props.form.values.currency}
                         onChange={props.updateInput.bind(null, "currency", "text")}>
                    {R.map(item =>
                      <option key={item} value={item}>{item}</option>,
                    R.prepend(null, Helpers.Constants.currency))}
                  </select>
                  {props.form.errors.currency ? <p className="error">{props.form.errors.currency}</p> : null}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="description">Description</label>
            <div className="controls">
              <textarea id="description" name="description" className="input-sm form-control"
                     value={props.form.values.description} defaultValue={props.form.values.description}
                     onChange={props.updateInput.bind(null, "description", "text")}
              />
              {props.form.errors.description ? <p className="error">{props.form.errors.description}</p> : null}
            </div>
          </div>

          <div className="form-group text-center">
            <button type="button" className="btn btn-primary margin-right-sm"
                    onClick={props.save.bind(null, false)} disabled={props.form.disabled}>
              Save
            </button>
            {R.isEmpty(props.expenseId) || R.type(props.expenseId) != "Number"
              ? <button type="button" className="btn btn-accent margin-right-sm"
                      onClick={props.save.bind(null, true)} disabled={props.form.disabled}>
                  Add Another
                </button>
              : null }
            <button type="button" className="btn btn-default margin-right-sm"
                    onClick={props.cancel} disabled={props.form.disabled}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);

ExpenseEntry.propTypes = {
  categories: PropTypes.array.isRequired,
  expenseId: PropTypes.string,

  form: PropTypes.object.isRequired,

  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
};

export default ExpenseEntry;