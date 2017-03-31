import React, {Component} from "react";

import Helpers from "../../helpers";

import Settings from "./view";

class SettingsContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: {
        changePassword: false,
        changeDefaultCurrency: false,
      },
      defaultCurrency: Helpers.LocalStorage.get("currency"),
    };

    this.onToggleCollapse = this.onToggleCollapse.bind(this);
    this.onUpdateCurrency = this.onUpdateCurrency.bind(this);
  }

  onToggleCollapse(tabId) {
    let isOpen = this.state.isOpen;
    isOpen[tabId] = !isOpen[tabId];
    this.setState({isOpen});
  }

  onUpdateCurrency() {
    let defaultCurrency = event.target.value;
    this.setState({defaultCurrency});

    // API call
  }

  render () {
    return (
      <Settings
        defaultCurrency={this.state.defaultCurrency}
        isOpen={this.state.isOpen}
        onToggleCollapse={this.onToggleCollapse}
        onUpdateCurrency={this.onUpdateCurrency}
      />
    );
  }
}

export default SettingsContainer;