import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
  const logger = createLogger();
  const middleware = applyMiddleware(ReduxThunk, logger);
  const store = middleware(createStore)(rootReducer, initialState);
  return store;
}
