import { combineReducers } from 'redux';
import services from './reducers/services';
import cart from './reducers/cart';

export default combineReducers({
  cart,
  services,
});
