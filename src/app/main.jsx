/* global Stripe */

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import makeRoutes from './routes';
import Root from './routes/Root';
import configureStore from './data/configureStore';

const initialState = window.initialState;
const store = configureStore(initialState);
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: (''),
});
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

const routes = makeRoutes(store);

ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('container')
);

Stripe.setPublishableKey('pk_test_b8SZC99Ac6LFHWr18HmLKPB5');
