import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../misc/header';
import { CURRENCIES } from '../../constants';
import { CLIENT_STATUS } from '../../constants';

import { deleteClientAction, saveClientAction, getAllClientsAction } from '../../actions/clients';

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClient: {},
    }
  }

  componentWillMount = () => {
    this.id = this.props.match.params.id || null;
    if (this.props.clients.length <= 0) {
      window.location = "/clients";
    }
    if (this.id) {
      let client = this.props.clients.find(item => {
        return item.id === this.props.match.params.id
      });
      this.setState({
        selectedClient: client || {},
      });
    }
  }

  handleCcOnChange = evt => {
    const value = evt.target.value;
    const isGoodValue = /([0-9])/;
    if (value.length > 0 && (!isGoodValue.test(value) || value.length > 16)) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false
      });
    }
    let selectedClient = {...this.state.selectedClient};
    selectedClient.creditCard = value;
    this.setState({
      selectedClient
    });
  }

  handleOnChange = evt => {
    const value = evt.target.value;
    const keyname = evt.target.dataset.keyname;
    let selectedClient = {...this.state.selectedClient};
    selectedClient[keyname] = value;
    this.setState({
      selectedClient
    });
  }

  deleteOnClick = (evt) => {
    this.props.deleteClient(this.state.selectedClient.id);
  }

  saveOnClick = (evt) => {
    this.props.saveClient(this.state.selectedClient.id);
  }

  render = () => {
    return (
      <div>
        <Header title={this.id ? "Edit Client" : "New Client"} />
        <div className="flex-me">
          <div>
            <div className="small-pad">
              <div className="tab-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    data-keyname="clientName"
                    type="text"
                    value={ this.state.selectedClient.clientName || "" }
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    data-keyname="clientEmail"
                    value={ this.state.selectedClient.clientEmail || "" }
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    data-keyname="clientAddress"
                    rows="6"
                    value={ this.state.selectedClient.clientAddress || "" }
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label>Default Currency</label>
                  <select onChange={ this.selectCurrency } defaultValue={'USD'}>
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
                  <label>Status</label>
                  <select
                    onChange={ this.selectStatus }
                    defaultValue={this.state.selectedClient.status ? this.state.selectedClient.status.toLowerCase() : ""}
                  >
                    {
                      CLIENT_STATUS.map(status => {
                        return (
                          <option key={ status } value={ status.toLowerCase() }>{status}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Credit Card</label>
                  <input
                    type="text"
                    data-keyname="creditCard"
                    className={this.state.error ? "error" : ""}
                    value={ this.state.selectedClient.creditCard}
                    onChange={this.handleCcOnChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="save-tab align-center">
            <div className="flex-me save-tab-vertical vertical-align-center">
              <h3 className="client-status">{this.state.selectedClient.status}</h3>
              <button
                className={"primary btn-lg margin-5px" + (this.state.error ? " btn-disable" : "")}
                onClick={this.saveOnClick}
              >
                Save
              </button>
              {
                this.id ?
                  <button
                    className={"primary btn-lg margin-5px" + (this.state.error ? " btn-disable" : "")}
                    onClick={this.deleteOnClick}
                  >
                    Delete
                  </button> :
                  ""
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
  deleteClient: (id) => dispatch(deleteClientAction(id)),
  saveClient: (id) => dispatch(saveClientAction(id)),
  getAllClientsAction: (id) => dispatch(getAllClientsAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);
