import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import Invoice from './components/invoice';
import Subscription from './components/subscription';
import Logout from './components/logout';
import Help from './components/help';
import Settings from './components/settings';
import InvoiceCreate from './components/invoice/create';
import InvoiceEdit from './components/invoice/edit';
import Client from './components/client';
import ClientForm from './components/client/client-form';

import './App.css';

import { connect } from 'react-redux';

class App extends Component {
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
              render={ (props) => <Invoice invoices={this.props.invoices} clients={this.props.clients} {...props} /> }
            />
            <Route
              exact path="/invoices"
              render={ (props) => <Invoice invoices={this.props.invoices} clients={this.props.clients} {...props} /> }
            />
            <Route
              exact path="/invoices/create"
              render={ (props) => <InvoiceCreate invoices={this.props.invoices} clients={this.props.clients} {...props} /> }
            />
            <Route
              exact path="/invoices/edit/:id"
              render={(props) => <InvoiceEdit invoices={this.props.invoices}{...props} />}
            />
            <Route exact path="/subscriptions" component={Subscription} />
            <Route exact path="/clients" component={Client} />
            <Route exact path="/clients/create" component={ClientForm} />
            <Route exact path="/clients/edit/:id" component={ClientForm} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/logout" component={Logout} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(App);
