import React from "react";

const Landing = (props) => (
  <div>
    <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>
  </div>
);

export default Landing;
