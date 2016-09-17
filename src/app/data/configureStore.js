import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
  const logger = createLogger();
  const router = routerMiddleware(browserHistory);
  const middleware = applyMiddleware(ReduxThunk, logger, router);
  const store = middleware(createStore)(rootReducer, initialState);
  return store;
}
