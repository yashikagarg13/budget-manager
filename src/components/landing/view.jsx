import React, {PropTypes} from "react";

import Header from "../common/header";

const Landing = (props) => (
  <div>
    <Header actions={["Settings", "Add"]}/>
    <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>
  </div>
);

Landing.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default Landing;
// <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>