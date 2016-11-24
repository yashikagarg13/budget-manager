import React from "react";
import {Link} from "react-router";

import Header from "../common/header";

const Landing = (props) => (
  <div>
    <Header actions={["Settings", "Add"]}/>
  </div>
);

export default Landing;
// <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>