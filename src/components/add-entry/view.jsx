import DatePicker from "react-datepicker";
import R from "ramda";
import React, {PropTypes} from "react";

import Helpers from "../../helpers/index";

import Header from "../common/header";

const AddEntry = (props) => (
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
                     value={props.form.values.category} defaultValue={props.form.values.category}
                     onChange={props.updateCategory.bind(null, "category", "text")}>
                {R.map((category) =>
                  <option key={`catgeory-${category._id}`} value={category._id}>{category.title}</option>
                , R.append({}, props.categories))}
              </select>
              {props.form.errors.category ? <p className="error">{props.form.errors.category}</p> : null}
            </div>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="amount">Amount <span className="required">*</span></label>
            <div className="controls">
              <div className="row">
                <div className="col-sm-8">
                  <input type="number" id="amount" name="amount" className="input-sm form-control"
                         value={props.form.values.amount} defaultValue={props.form.values.amount}
                         onChange={props.updateAmount.bind(null, "amount", "number")} min="0"
                  />
                  {props.form.errors.amount ? <p className="error">{props.form.errors.amount}</p> : null}
                </div>
                <div className="col-sm-4 nopadding-left">
                  <select id="currency" name="currency" className="input-sm form-control"
                         value={props.form.values.currency} defaultValue={props.form.values.currency}
                         onChange={props.updateCurrency.bind(null, "currency", "text")}>
                    {R.map(item =>
                      <option key={item} value={item}>{item}</option>,
                    R.append(null, Helpers.Constants.currency))}
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
                     onChange={props.updateDescription.bind(null, "description", "text")}
              />
              {props.form.errors.description ? <p className="error">{props.form.errors.description}</p> : null}
            </div>
          </div>

          <div className="form-group text-center">
            <button type="button" className="btn btn-primary margin-right-sm" onClick={props.save}>Save</button>
            <button type="button" className="btn btn-accent margin-right-sm" onClick={props.addAnother}>Add Another</button>
            <button type="button" className="btn btn-default margin-right-sm" onClick={props.cancel}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  </div>
);

AddEntry.propTypes = {
  categories: PropTypes.array.isRequired,

  form: PropTypes.object.isRequired,

  updateAmount: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  updateCurrency: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
};

export default AddEntry;