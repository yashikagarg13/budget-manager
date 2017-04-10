import R from "ramda";
import React, {Component, PropTypes} from "react";

import Helpers from "../../helpers";

import Settings from "./view";

class SettingsContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: {
        changePassword: true,
        changeDefaultCurrency: false,
      },
      defaultCurrency: Helpers.LocalStorage.get("currency"),
    };

    this.onToggleCollapse = this.onToggleCollapse.bind(this);
    this.onUpdateCurrency = this.onUpdateCurrency.bind(this);
  }
  componentWillMount () {
    const token = this.props.params.token;
    const currency = this.props.location.query.currency;
    if (R.type(token) === "String" && !R.isEmpty(token)) {
      Helpers.LocalStorage.set("token", token);
      Helpers.LocalStorage.set("currency", currency);
      this.setState({defaultCurrency: currency});
    } else {
      Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
    }
  }

  onToggleCollapse(tabId) {
    let isOpen = this.state.isOpen;
    isOpen[tabId] = !isOpen[tabId];
    this.setState({isOpen});
  }

  onUpdateCurrency() {
    let defaultCurrency = event.target.value;
    this.setState({defaultCurrency});

    Helpers.API.updateCurrency(defaultCurrency)
      .then(response => {
        Helpers.Utils.redirectToLoginIfTokenExpired(this.props.router);
        if (response.success) {
          console.log("Currency updated"); //eslint-disable-line
          Helpers.LocalStorage.set("currency", defaultCurrency);
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
      });
  }

  render () {
    return (
      <Settings
        defaultCurrency={this.state.defaultCurrency}
        isOpen={this.state.isOpen}
        onToggleCollapse={this.onToggleCollapse}
        onUpdateCurrency={this.onUpdateCurrency}
        token={this.props.params.token}
      />
    );
  }
}

SettingsContainer.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
};


export default SettingsContainer;