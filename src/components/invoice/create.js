import React, { Component } from 'react';
import Header from '../misc/header';

class InvoiceCreate extends Component {
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
        currentType: '',
        amount: 0.00,
      })
    })
  }

  handleOnChange = () => {

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
        <Header title={this.props.edit ? "Edit Invoice" : "New Invoice"} />
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
                  <select onChange={ this.selectClient }>
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
                this.state.items.map(item => {
                  return (
                    <div key={ item.id }>
                      <input
                        onChange={ this.handleOnChange }
                        className="item-description"
                        type="text"
                        placeholder="Description"
                        value={ item.description }
                      />
                      <input
                        className="item-currency align-center"
                        readOnly
                        type="text"
                        value={ this.state.options.currency || 'USD' }
                      />
                      <input
                        className="item-amount"
                        type="number"
                        placeholder="0.00"
                        value={ item.amount }
                      />
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
            <p>Client: {this.state.selectedClient.clientName}</p>
            <p>Total: {this.state.items.reduce((acc, item) => {
              return acc + item.amount;
            }, 0) }</p>
            <button className="primary btn-lg">Save as Draft</button>
          </div>
        </div>
      </div>
    )
  }
}

export default InvoiceCreate;
