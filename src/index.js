import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import configureStore from './store';


let initialState = {
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
          quantity: 1,
        },
        {
          id: 2,
          description: 'test',
          currentType: 'USD',
          amount: 20.00,
          quantity: 1,
        }
      ]
    }
  ],
  clients: [],
  subscriptions: [],
  settings: {},
}

let store = configureStore(initialState);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
