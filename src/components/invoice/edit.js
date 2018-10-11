import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../misc/header';

class InvoiceEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedClient: {},
      selectedTab: "one",
      options: {},
      currentInvoice: {},
    }
  }

  componentWillMount = () => {
    let invoice = this.props.invoices.find(item => item.id === this.props.match.params.id);
    this.setState({
      currentInvoice: invoice,
      selectedClient: invoice,
    });
  }

  handleAddItem = () => {
    this.setState({
      items: this.state.items.concat({
        id: this.state.items.length,
        description: '',
        currencyType: '',
        amount: 0,
        quantity: 1,
      })
    })
  }

  handleOnChangeAmount = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.items];
    items[index].amount = evt.target.value;
    this.setState({
      items
    });
  }

  handleOnChangeCurrency = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.items];
    items[index].currency = evt.target.value;
    this.setState({
      items
    });
  }

  handleOnChangeDescription = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.items];
    items[index].description = evt.target.value;
    this.setState({
      items
    });
  }

  handleOnChangeQuantity = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.items];
    items[index].quantity = evt.target.value;
    this.setState({
      items
    });
  }

  handleOnClickDeleteItem = (evt) => {
    const index = evt.target.dataset.index;
    let items = [...this.state.items];
    items.splice(+index, 1);
    this.setState({
      items
    });
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
              <div className="selected pointer border-bottom" ref="tab-one" onClick={() => this.showTab("one")}>Client</div>
              <div className="pointer border-bottom" ref="tab-two" onClick={() => this.showTab("two") }>Items</div>
              <div className="pointer border-bottom" ref="tab-three" onClick={() => this.showTab("three") }>Options</div>
            </div>
            <div ref="one" className="small-pad">
              <div className="tab-form">
                <div className="form-group">
                  <label>Client</label>
                  <select onChange={ this.selectClient } defaultValue={this.state.client.id}>
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
                  <input type="text" readOnly value={ this.state.selectedClient.clientName || "" } />
                </div>
                <div className="form-group">
                  <label>Client Email</label>
                  <input type="text" readOnly value={ this.state.selectedClient.clientEmail || ""} />
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
                      <input
                        data-index={i}
                        onChange={this.handleOnChangeCurrency}
                        className="item-currency align-center pointer"
                        readOnly
                        type="text"
                        value={ this.state.options.currency || 'USD' }
                      />
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
                        placeholder="1"
                        value={ item.quantity }
                        min=".01"
                        step=".01"
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
            <div ref="three" className="hidden">

            </div>
          </div>
          <div className="save-tab align-center">
            <h2>Invoice</h2>
            <p>Client: {this.state.currentInvoice.clientName}</p>
            <p>Total: {this.state.currentInvoice.items.reduce((acc, item) => {
              return (parseFloat(Number(acc) + Number(item.amount)) * Number(item.quantity)).toFixed(2);
            }, 0) }</p>
            <button className="primary btn-lg">Save as Draft</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients,
  invoices: state.invoices,
})

export default connect(mapStateToProps)(InvoiceEdit);
