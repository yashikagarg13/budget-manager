import R from "ramda";
import React, {PropTypes, Component} from "react";

import Helpers from "../helpers";

import Alerts from "./common/alerts";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: Helpers.LocalStorage.get("alert") || null,
    };

    this.storageEventListener = this.storageEventListener.bind(this);
  }
  componentDidMount() {
    if (typeof window !== "undefined") {
      addEventListener("storage", this.storageEventListener);
    }

    if (this.props.location.pathname === "/") {
      const token = Helpers.Utils.getToken();
      if (R.type(token) == "String" && !R.isEmpty(token)) {
        this.props.router.push("/landing");
      } else {
        this.props.router.push("/login");
      }
    }
  }

  storageEventListener(event) {
    if (event.key === "alert") {
      const alert = Helpers.LocalStorage.get("alert");
      this.setState({alert});

      if (R.type(alert) == "Object" && !R.isEmpty(alert)) {
        this.timeoutInstance = setTimeout(() => {
          Helpers.LocalStorage.remove("alert");
          this.setState({alert: null});
          this.timeoutInstance.clear();
        }, 5000);
      }
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
        <Alerts alert={this.state.alert} />
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
