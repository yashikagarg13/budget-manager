import React, {PropTypes} from "react";

const Loading = (props) => (
  <div className={"loading " + (props.attachToParent ? "relative" : "fixed") }>
    <div className="content">
      <div className="progress">
        <div className="elem1"></div>
        <div className="elem2"></div>
        <div className="elem3"></div>
        <div className="elem4"></div>
        <div className="elem5"></div>
        <div className="elem6"></div>
        <div className="elem7"></div>
        <div className="elem8"></div>
        <div className="elem9"></div>
        <div className="elem10"></div>
        <div className="elem11"></div>
        <div className="elem12"></div>
      </div>
      <div className="text">Please wait...</div>
    </div>
  </div>
);

Loading.propTypes = {
  attachToParent: PropTypes.bool,
};

export default Loading;