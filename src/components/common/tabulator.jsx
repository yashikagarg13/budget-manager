import R from "ramda";
import React, {PropTypes} from "react";

const Tabulator = (props) => (
  <div className={`tabulator ${props.theme || ""}`}>
    <div className="tab-link-group">
      {R.map(tab =>
        <div key={tab.id} className={`tab-link ${tab.active ? "active" : ""}`}
          onClick={props.onClickTabLink.bind(null, tab.id)}>{tab.title}</div>,
      props.tabs)}
    </div>
    <div className="tab-content-group">
      {R.map(tab =>
        React.createElement(tab.component, tab.componentProps),
      R.filter(tab => tab.active, props.tabs))}
    </div>
  </div>
);

Tabulator.propTypes = {
  onClickTabLink: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
  theme: PropTypes.string,
};

export default Tabulator;