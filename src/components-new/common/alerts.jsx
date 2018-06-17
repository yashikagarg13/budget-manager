import R from "ramda";
import React, {PropTypes} from "react";

const Alerts = ({alert}) => {
  if (R.type(alert) != "Object" || R.isEmpty(alert)) {
    return <span></span>;
  }

  return (
    <div className="alert-container">
      <div className={`alert alert-${alert.type} text-center`}>
        {alert.message}
      </div>
    </div>
  );
};

Alerts.propTypes = {
  alert: PropTypes.object,
};

export default Alerts;