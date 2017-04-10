import moment from "moment";
import R from "ramda";
import React, {PropTypes} from "react";

import Helpers from "../../helpers";

const ChartsFilters = (props) => {
  const {yearType, year, quarter, month} = props.form.values;
  const {activeTab, onChangeFilter, onReset} = props;
  const {yearTypes, maxYears, quarters, months} = Helpers.Constants;
  const currentYear = moment().year();

  return (
    <form>
      <div className="icon-container">
        <button type="button" className="btn btn-icon" onClick={onReset} title="Refresh">
          <i className="fa fa-refresh"></i>
        </button>
      </div>
      <div className="row text-left">
        {activeTab == "yearly" || activeTab == "quarterly"
          ? <div className="form-group col-sm-6">
              <label className="control-label" htmlFor="yearType">Year type:</label>
              <div className="controls">
                <select id="yearType" name="yearType" value={yearType}
                  onChange={onChangeFilter.bind(null, "yearType")} className="form-control input-sm">
                  {R.map(key => <option key={`year-type-${key }`} value={key}>{yearTypes[key]}</option>, R.keys(yearTypes))}
                </select>
              </div>
            </div>
          : null
        }

        <div className="form-group col-sm-6">
          <label className="control-label" htmlFor="year">Year:</label>
          <div className="controls">
            <select id="year" name="year" value={year}
              onChange={onChangeFilter.bind(null, "year")} className="form-control input-sm">
              {R.map(year => <option key={`year-${year}`} value={year}>{year}</option>, R.range(currentYear - maxYears, currentYear + 1))}
            </select>
          </div>
        </div>

        {activeTab == "quarterly"
          ? <div className="form-group col-sm-6">
              <label className="control-label" htmlFor="quarter">Quarter:</label>
              <div className="controls">
                <select id="quarter" name="quarter" value={quarter}
                  onChange={onChangeFilter.bind(null, "quarter")} className="form-control input-sm">
                  {R.map(key => <option key={`qtr-${key}`} value={key}>{quarters[key]}</option>, R.keys(quarters))}
                </select>
              </div>
            </div>
          : null
        }

        {activeTab == "monthly"
          ? <div className="form-group col-sm-6">
              <label className="control-label" htmlFor="month">Month:</label>
              <div className="controls">
                <select id="month" name="month" value={month}
                  onChange={onChangeFilter.bind(null, "month")} className="form-control input-sm">
                  {R.map(monthIndex => <option key={`month-${monthIndex}`} value={monthIndex}>{months[monthIndex]}</option>, R.keys(months))}
                </select>
              </div>
            </div>
          : null
        }
      </div>
    </form>
  );
};

ChartsFilters.propTypes = {
  activeTab: PropTypes.string,
  form: PropTypes.object.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ChartsFilters;