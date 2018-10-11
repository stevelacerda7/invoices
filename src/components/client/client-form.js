import React, { Component } from 'react';
import Header from '../misc/header';
import { CURRENCIES } from '../../constants';

class ClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedClient: {},
      selectedTab: "one",
      items: [],
      options: {},
    }
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
    const id = this.props.match.params.id || null;
    return (
      <div>
        <Header title={id ? "Edit Client" : "New Client"} />
        <div className="flex-me">
          <div>
            <div className="small-pad">
              <div className="tab-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={ this.state.selectedClient.clientName || "" } />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={ this.state.selectedClient.clientName || "" } />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea rows="6" value={ this.state.selectedClient.clientName || "" } />
                </div>
                <div className="form-group">
                  <label>Default Currency</label>
                  <select onChange={ this.selectCurrency } defaultValue={'USD'}>
                    {
                      CURRENCIES.map(currency => {
                        return (
                          <option key={ currency.key } value={ currency.key }>{currency.key + ' - ' + currency.value }</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Credit Card</label>
                  <input type="text" value={ this.state.selectedClient.clientEmail || ""} />
                </div>
              </div>
            </div>
          </div>
          <div className="save-tab align-center">
            <div className="flex-me save-tab-vertical vertical-align-center">
              <button className="primary btn-lg margin-5px">Save</button>
              {
                id ? <button className="primary btn-lg margin-5px">Delete</button> : ""
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientForm;
