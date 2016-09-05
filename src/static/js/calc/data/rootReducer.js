import { combineReducers } from 'redux';
import cart from './reducers/cart';
import services from './reducers/services';

export default combineReducers({
  cart,
  services,
});
