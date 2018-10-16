import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../misc/header';
import { CURRENCIES } from '../../constants';

import { deleteInvoiceAction, saveInvoiceAction } from '../../actions/invoices';
import { getAllClientsAction } from '../../actions/clients';

class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInvoice: {
        items: []
      },
      options: {},
      selectedTab: "one",
      totalAmount: 0,
    }
  }

  componentWillMount = () => {
    this.id = this.props.match.params.id || null;
    if (this.props.invoices.length <= 0) {
      window.location = "/invoices";
    }
    if (this.id) {
      let invoice = this.props.invoices.find(item => {
        return item.id === this.props.match.params.id;
      });
      let client = this.props.clients.find(item => {
        return item.id === invoice.clientId;
      });
      this.setState({
        currentInvoice: invoice,
        selectedClient: client,
      });
    }
  }

  deleteOnClick = (evt) => {
    this.props.deleteInvoiceAction(this.state.currentInvoice.id);
  }

  handleAddItem = () => {
    let currentInvoice = {...this.state.currentInvoice};
    currentInvoice.items = currentInvoice.items.concat({
      id: Date.now(),
      description: '',
      amount: 0.00,
      quantity: 1,
    });
    this.setState({
      currentInvoice
    });
  }

  handleOnChange = evt => {
    const value = evt.target.value;
    const keyname = evt.target.dataset.keyname;
    let currentInvoice = {...this.state.currentInvoice};
    currentInvoice[keyname] = value;
    this.setState({
      currentInvoice
    });
  }

  handleOnChangeAmount = (evt) => {
    const index = evt.target.dataset.index;
    let currentInvoice = {...this.state.currentInvoice};
    currentInvoice.items[index].amount = evt.target.value;
    currentInvoice.total = currentInvoice.items.reduce((acc, item) => {
      return parseFloat(Number(acc) + Number(item.amount) * Number(item.quantity)).toFixed(2);
    }, 0)
    this.setState({
      currentInvoice,
    });
  }

  handleOnChangeTax = (evt) => {
    const value = evt.target.value;
    const keyname = evt.target.dataset.keyname;
    let currentInvoice = {...this.state.currentInvoice};
    currentInvoice[keyname] = value;
    let total = currentInvoice.items.reduce((acc, item) => {
      return Number(acc) + Number(item.amount) * Number(item.quantity);
    }, 0);
    total = total * (1 - ((+currentInvoice.discount || 0) / 100));
    total = total * (1 - ((+currentInvoice.salesTax || 0) / 100));
    total = total * (1 - ((+currentInvoice.secondTax || 0) / 100));
    currentInvoice.total = parseFloat(total).toFixed(2);
    this.setState({
      currentInvoice,
    });
  }

  handleOnChangeCurrency = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.currentInvoice.items];
    items[index].currency = evt.target.value;
    this.setState({
      items
    });
  }

  handleOnChangeDescription = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.currentInvoice.items];
    items[index].description = evt.target.value;
    this.setState({
      items
    });
  }

  handleOnChangeQuantity = (evt) => {
    const index = evt.target.dataset.index;
    let currentInvoice = {...this.state.currentInvoice};
    currentInvoice.items[index].quantity = evt.target.value;
    currentInvoice.total = currentInvoice.items.reduce((acc, item) => {
      return (parseFloat(Number(acc) + Number(item.amount) * Number(item.quantity))).toFixed(2);
    }, 0)
    this.setState({
      currentInvoice,
    });
  }

  handleOnClickDeleteItem = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.currentInvoice.items];
    items.splice(+index, 1);
    this.setState({
      items
    });
  }

  // handles change of client to invoice
  handleOnClient = evt => {
    const value = evt.target.value;
    let currentInvoice = {...this.state.currentInvoice};
    let client = this.props.clients.find(client => {
      return client.id === value;
    }) || {};
    currentInvoice.clientName = client.clientName || "";
    currentInvoice.clientEmail = client.clientEmail || "";
    currentInvoice.clientId = value || "";
    this.setState({
      currentInvoice: currentInvoice || {},
      selectedClient: client,
    });
  }

  saveOnClick = (evt) => {
    this.props.saveInvoiceAction(this.state.currentInvoice.id);
  }

  selectClient = (evt) => {
    const value = evt.target.value;
    this.setState(prevState => {
      return {
        selectedClient: this.props.clients.find(item => {
          return item.id === value;
        }) || {},
      }
    })
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

  render = () => {
    return (
      <div>
        <Header title="Edit Invoice" />
        <div className="flex-me">
          <div>
            <div className="tab-header">
              <div className="selected pointer border-bottom" ref='tab-one' onClick={() => this.showTab("one")}>Client</div>
              <div className="pointer border-bottom" ref='tab-two' onClick={() => this.showTab("two") }>Items</div>
              <div className="pointer border-bottom" ref='tab-three' onClick={() => this.showTab("three") }>Options</div>
            </div>
            <div ref="one" className="small-pad">
              <div className="tab-form">
                <div className="form-group">
                  <label>Client</label>
                  <select
                    data-keyname="clientId"
                    onChange={ this.handleOnClient }
                    defaultValue={this.state.currentInvoice.clientId || ""}
                  >
                    <option value=""></option>
                    {
                      this.props.clients.map(item => {
                        return (
                          <option key={ item.id } value={ item.id }>{ item.clientName }</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    readOnly
                    value={ this.state.currentInvoice.clientName || "" }
                  />
                </div>
                <div className="form-group">
                  <label>Client Email</label>
                  <input type="text" readOnly value={ this.state.currentInvoice.clientEmail || ""} />
                </div>
              </div>
            </div>
            <div ref="two" className="hidden">
              {
                this.state.currentInvoice.items.map((item, i) => {
                  return (
                    <div key={ item.id } className="flex-me small-pad vertical-align-center">
                      <input
                        data-index={i}
                        onChange={ this.handleOnChangeDescription }
                        className="item-description"
                        type="text"
                        placeholder="Description"
                        value={ item.description }
                      />
                      <div
                        data-index={i}
                        className="item-currency align-center pointer"
                      >
                        { this.state.currentInvoice.currencyType || this.state.selectedClient.defaultCurrency }
                      </div>
                      <input
                        data-index={i}
                        onChange={this.handleOnChangeAmount}
                        className="item-amount"
                        type="number"
                        autoComplete="off"
                        placeholder="0.00"
                        value={ item.amount }
                        min="0.01"
                        step="0.01"
                      />
                      <div className="align-center">x</div>
                      <input
                        data-index={i}
                        onChange={this.handleOnChangeQuantity}
                        className="item-quantity"
                        type="number"
                        autoComplete="off"
                        placeholder=""
                        value={ item.quantity }
                        min=".01"
                        step="1"
                      />
                      <div
                        data-index={i}
                        className="align-center pointer"
                        onClick={this.handleOnClickDeleteItem}
                      >
                        Del
                      </div>
                    </div>
                  )
                })
              }
              <button className="add-btn" onClick={ this.handleAddItem }>Add Item</button>
            </div>
            <div ref="three" className="hidden small-pad">
              <div className="form-group">
                <label>Currency</label>
                <select
                  onChange={ this.handleOnChange }
                  defaultValue={this.state.currentInvoice.currencyType || ''}
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
                <label>Notes</label>
                <textarea
                  data-keyname="notes"
                  rows="6"
                  value={ this.state.currentInvoice.notes || "" }
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Discount</label>
                <input
                  data-keyname="discount"
                  onChange={this.handleOnChangeTax}
                  type="number"
                  autoComplete="off"
                  placeholder="0.0000"
                  value={this.state.currentInvoice.discount || "" }
                  min="0.01"
                  step="0.01"
                />
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
                    value={ this.state.currentInvoice.salesTaxId || "" }
                  />
                  <input
                    data-keyname="salesTax"
                    onChange={this.handleOnChangeTax}
                    type="number"
                    autoComplete="off"
                    placeholder="0.0000"
                    value={ this.state.currentInvoice.salesTax || "" }
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
                    value={ this.state.currentInvoice.secondTaxId }
                  />
                  <input
                    data-keyname="secondTax"
                    onChange={this.handleOnChangeTax}
                    type="number"
                    autoComplete="off"
                    placeholder="0.0000"
                    value={ this.state.currentInvoice.secondTax || "" }
                    min="0.0001"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="save-tab align-center">
            <h2>{this.state.currentInvoice.status}</h2>
            <p>Client: {this.state.currentInvoice.clientName}</p>
            <p>Total: {this.state.currentInvoice.currencyType} {this.state.currentInvoice.total}</p>
            <button className="primary btn-lg">Save</button>
            <button className="btn-lg">Send</button>
            <button className="btn-lg">Paid</button>
            {/*<button className="primary btn-lg">View</button>*/}
            <button className="btn-lg">Refund</button>
            <button className="btn-lg">Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  invoices: state.invoices,
  clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
  deleteInvoiceAction: (id) => dispatch(deleteInvoiceAction(id)),
  saveInvoiceAction: (id) => dispatch(saveInvoiceAction(id)),
  getAllClientsAction: (id) => dispatch(getAllClientsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
