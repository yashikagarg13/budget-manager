import React from "react";

import Header from "../common/header";

const Settings = (props) => (
  <div>
    <Header actions={["Back", "Add"]}/>
    <pre><code>{JSON.stringify(props.categories, null, 4)}</code></pre>
  </div>
);

export default Settings;