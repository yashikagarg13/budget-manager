import React from "react";

const Settings = (props) => (
  <div> Settings
    <pre><code>{JSON.stringify(props.categories, null, 4)}</code></pre>
  </div>
);

export default Settings;