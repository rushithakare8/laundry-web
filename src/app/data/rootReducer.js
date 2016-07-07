import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import services from './reducers/services';
import errors from './reducers/errors';
import orders from './reducers/orders';
import user from './reducers/user';
import cart from './reducers/cart';

export default combineReducers({
  // Boilerplate reducers
  form,
  router,
  // Custom reducers
  cart,
  user,
  orders,
  errors,
  services,
});
