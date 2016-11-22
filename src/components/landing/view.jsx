import React from "react";
import {Link} from "react-router";

const Landing = (props) => (
  <div>
    <header>
      <h3>BM</h3>
      <div>
        <button type="button">
          <Link to="/settings">Settings</Link>
        </button>
        <button type="button">
          <Link to="/add-entry">Add</Link>
        </button>
      </div>
    </header>
  </div>
);

export default Landing;
// <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>