import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Invoice from './components/invoice';
import Subscription from './components/subscription';
import Client from './components/client';
import Logout from './components/logout';
import Help from './components/help';
import Settings from './components/settings';
import InvoiceCreate from './components/invoice/create';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [
        {
          id: '001',
          clientName: 'Joe Smith',
          clientEmail: 'jsmith@booboo.com',
          total: 35.00,
          currencyType: 'USD',
          status: 'Paid',
          sendDate: '10/2/18',
          createdOn: '10/1/18',
          items: [
            {
              id: 1,
              description: 'asdf',
              currentType: 'USD',
              amount: 35.00,
            },
            {
              id: 2,
              description: 'test',
              currentType: 'USD',
              amount: 20.00,
            }
          ]
        }
      ],
      clients: [
        {
          id: '10001',
          clientName: 'Joe Smith',
          clientEmail: 'jsmith@booboo.com',
          clientAddress: '123 Boo St, San Jose, CA 95645',
          defaultCurrency: 'USD',
          defaultLanguage: 'English',
          creditCard: '',
        }
      ],
      subscriptions: [],
      settings: {},
    }
  }
  render() {
    return (
      <Router>
        <div className="main-app">
          <div className="menu">
            <Link to="/" className="menu-item"><div>Simple Invoices</div></Link>
            <Link to="/invoices" className="menu-item"><div>Invoices</div></Link>
            <Link to="/subscriptions" className="menu-item"><div>Subscriptions</div></Link>
            <Link to="/clients" className="menu-item"><div>Clients</div></Link>
            <Link to="/settings" className="menu-item"><div>Settings</div></Link>
            <Link to="/help" className="menu-item"><div>Help</div></Link>
            <Link to="/logout" className="menu-item"><div>Logout</div></Link>
          </div>
          <div className="app">
            <Route
              exact path="/"
              render={ (props) => <Invoice invoices={this.state.invoices} clients={this.state.clients} {...props} /> }
            />
            <Route
              exact path="/invoices"
              render={ (props) => <Invoice invoices={this.state.invoices} clients={this.state.clients} {...props} /> }
            />
            <Route
              exact path="/invoices/create"
              render={ (props) => <InvoiceCreate invoices={this.state.invoices} clients={this.state.clients} {...props} /> }
            />
            <Route
              exact path="/invoices/edit/:id"
              render={(props) => <InvoiceCreate edit="true" {...props} />}
            />
            <Route exact path="/subscriptions" component={Subscription} />
            <Route exact path="/clients" component={Client} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/logout" component={Logout} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
