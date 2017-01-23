import { combineReducers } from 'redux';
import map from './reducers/map';
import config from './reducers/config';
import routes from './reducers/routes';

export default combineReducers({
  map,
  config,
  routes,
});
