import React, {PropTypes} from "react";

import Header from "../common/header";
import Tabulator from "../common/Tabulator";

const Landing = (props) => (
  <div className="landing-view">
    <Header actions={["Settings", "Add"]}/>
    <Tabulator
      tabs={props.tabs}
      onClickTabLink={props.onClickTabLink}
    />
  </div>
);


Landing.propTypes = {
  tabs: PropTypes.array.isRequired,
  onClickTabLink: PropTypes.array.isRequired,
};

export default Landing;