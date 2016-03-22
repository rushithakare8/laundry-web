import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const Root = ({ store, history, routes }) => (
  <Provider store={ store }>
    <Router history={ history }>
      { routes }
    </Router>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired,
};

export default Root;
