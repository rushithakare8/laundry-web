import { combineReducers } from 'redux';
import config from './reducers/config';
import tasks from './reducers/tasks';

export default combineReducers({
  config,
  tasks,
});
