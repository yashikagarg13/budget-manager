import R from "ramda";
import React, {PropTypes, Component} from "react";

import Helpers from "../helpers";

class Layout extends Component {
  componentDidMount() {
    if (this.props.location.pathname === "/") {
      const token = Helpers.Utils.getToken();
      if (R.type(token) == "String" && !R.isEmpty(token)) {
        this.props.router.push("/landing");
      } else {
        this.props.router.push("/login");
      }
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default Layout;
