import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../misc/header';
import { CURRENCIES } from '../../constants';

import { getSettingsAction } from '../../actions/settings';
import { saveSettingsAction } from '../../actions/settings';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "one",
      currentSettings: {},
    }
  }

  componentWillMount = () => {
    this.props.getSettingsAction();
    this.setState({
      currentSettings: {...this.props.settings},
    });
  }

  handleOnChange = evt => {
    const value = evt.target.value;
    const keyname = evt.target.dataset.keyname;
    let currentSettings = {...this.state.currentSettings};
    currentSettings[keyname] = value;
    this.setState({
      currentSettings
    });
  }

  save = () => {
    this.props.saveSettingsAction();
  }

  showTab = (num) => {
    this.refs[this.state.selectedTab].classList.add('hidden');
    this.refs["tab-" + this.state.selectedTab].classList.remove('selected');
    this.refs[num].classList.remove('hidden');
    this.refs["tab-" + num].classList.add('selected');
    this.setState({
      selectedTab: num,
    });
  }

  render() {
    return (
      <div>
        <Header title="Settings"></Header>
        <div className="flex-me">
          <div className="settings-panel no-justify flex-me">
            <button className="selected pointer border-bottom" ref='tab-one' onClick={() => this.showTab("one")}>Invoice Settings</button>
            <button className="pointer border-bottom" ref='tab-two' onClick={() => this.showTab("two") }>Paypal Setup</button>
            <button className="pointer border-bottom" ref='tab-three' onClick={() => this.showTab("three") }>My Account</button>
            <button className="pointer save-settings border-bottom primary" onClick={this.save}>Save Settings</button>
          </div>
          <div className="settings-list">
            <div ref="one" className="small-pad">
              <div className="form-group">
                <label>Default Currency</label>
                <select
                  onChange={ this.handleOnChange }
                  defaultValue={this.state.currentSettings.currencyType || ''}
                  data-keyname="currencyType"
                >
                  {
                    CURRENCIES.map(currency => {
                      return (
                        <option
                          key={ currency.key }
                          value={ currency.key }
                        >
                          {currency.key + ' - ' + currency.value }
                        </option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Sales Tax</label>
                <div className="flex-me">
                  <input
                    data-keyname="salesTaxId"
                    onChange={this.handleOnChange}
                    type="text"
                    autoComplete="off"
                    placeholder="Tax Name (Tax ID)"
                    value={ this.state.currentSettings.salesTaxId }
                  />
                  <input
                    data-keyname="salesTax"
                    onChange={this.handleOnChange}
                    type="number"
                    autoComplete="off"
                    placeholder="0.0000"
                    value={ this.state.currentSettings.salesTax || "" }
                    min="0.0001"
                    step="0.1"
                  />
                  {/*<span>%</span>*/}
                </div>
              </div>
              <div className="form-group">
                <label>Second Tax</label>
                <div className="flex-me">
                  <input
                    data-keyname="secondTaxId"
                    onChange={this.handleOnChange}
                    type="text"
                    autoComplete="off"
                    placeholder="Tax Name (Tax ID)"
                    value={ this.state.currentSettings.secondTaxId || "" }
                  />
                  <input
                    data-keyname="secondTax"
                    onChange={this.handleOnChange}
                    type="number"
                    autoComplete="off"
                    placeholder="0.0000"
                    value={ this.state.currentSettings.secondTax || "" }
                    min="0.0001"
                    step="0.1"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>My Address</label>
                <textarea
                  data-keyname="address"
                  rows="6"
                  value={ this.state.currentSettings.address || "" }
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Invoice Notes</label>
                <textarea
                  data-keyname="notes"
                  rows="6"
                  value={ this.state.currentSettings.notes || "" }
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div ref="two" className="small-pad hidden">

            </div>
            <div ref="three" className="small-pad hidden">
              <div className="form-group">
                <label>Name / Company</label>
                <input
                  data-keyname="name"
                  onChange={this.handleOnChange}
                  type="text"
                  autoComplete="off"
                  placeholder="Name"
                  value={ this.state.currentSettings.name }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  data-keyname="email"
                  onChange={this.handleOnChange}
                  type="email"
                  autoComplete="off"
                  placeholder="email@foo.com"
                  value={ this.state.currentSettings.email }
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  data-keyname="password"
                  onChange={this.handleOnChange}
                  type="password"
                  autoComplete="off"
                  placeholder=""
                  value={ this.state.currentSettings.password }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  getSettingsAction: () => dispatch(getSettingsAction()),
  saveSettingsAction: () => dispatch(saveSettingsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
