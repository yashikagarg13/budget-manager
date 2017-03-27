import moment from "moment";
import R from "ramda";
import React, {PropTypes} from "react";

import Helpers from "../../helpers";

const ChartsFilters = (props) => {
  const {yearType, year, quarter, month} = props.form.values;
  const {activeTab, onChangeFilter, onFilter, onReset} = props;
  const {yearTypes, maxYears, quarters, months} = Helpers.Constants;
  const currentYear = moment().year();

  return (
    <form>
      <div className="row text-left">
        <div className="form-group col-sm-6">
          <label className="control-label" htmlFor="yearType">Year type:</label>
          <div className="controls">
            <select id="yearType" name="yearType" value={yearType} defaultValue={yearType}
              onChange={onChangeFilter.bind(null, "yearType")} className="form-control input-sm">
              {R.map(key => <option value={key}>{yearTypes[key]}</option>, R.keys(yearTypes))}
            </select>
          </div>
        </div>

        <div className="form-group col-sm-6">
          <label className="control-label" htmlFor="year">Year:</label>
          <div className="controls">
            <select id="year" name="year" value={year} defaultValue={year}
              onChange={onChangeFilter.bind(null, "year")} className="form-control input-sm">
              {R.map(year => <option value={year}>{year}</option>, R.range(currentYear - maxYears, currentYear + 1))}
            </select>
          </div>
        </div>

        {activeTab == "quarterly"
          ? <div className="form-group col-sm-6">
              <label className="control-label" htmlFor="quarter">Quarter:</label>
              <div className="controls">
                <select id="quarter" name="quarter" value={quarter} defaultValue={quarter}
                  onChange={onChangeFilter.bind(null, "quarter")} className="form-control input-sm">
                  {R.map(key => <option value={key}>{quarters[key]}</option>, R.keys(quarters))}
                </select>
              </div>
            </div>
          : null
        }

        {activeTab == "monthly"
          ? <div className="form-group col-sm-6">
              <label className="control-label" htmlFor="month">Month:</label>
              <div className="controls">
                <select id="month" name="month" value={month} defaultValue={month}
                  onChange={onChangeFilter.bind(null, "month")} className="form-control input-sm">
                  {R.map(month => <option value={month}>{month}</option>, months)}
                </select>
              </div>
            </div>
          : null
        }
      </div>
      <div className="controls">
        <button className="btn btn-primary margin-right-xs" onClick={onFilter}>Filter</button>
        <button className="btn btn-default" onClick={onReset}>Cancel</button>
      </div>
    </form>
  );
}

ChartsFilters.propTypes = {
  activeTab: PropTypes.string,
  form: PropTypes.object.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ChartsFilters;