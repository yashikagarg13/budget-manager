import React from "react";
import {Link} from "react-router";

const Landing = (props) => (
  <div>
    <header className="text-center">
      <h3>BM</h3>
      <div className="pull-right">
        <button type="button" class="btn btn-default" aria-label="Settings">
          <Link to="/settings">
            <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
          </Link>
        </button>
        <button type="button" class="btn btn-default" aria-label="Add">
          <Link to="/add-entry">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </Link>
        </button>
      </div>
    </header>
  </div>
);

export default Landing;
// <pre><code>{JSON.stringify(props.entries, null, 4)}</code></pre>