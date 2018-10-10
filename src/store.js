import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import invoices from './reducers/invoices';
import settings from './reducers/settings';
import clients from './reducers/clients';
import subscriptions from './reducers/subscriptions';


export default function configureStore(state) {
  return createStore(combineReducers({
    invoices,
    settings,
    clients,
    subscriptions,
  }), state, applyMiddleware(thunk));
}
