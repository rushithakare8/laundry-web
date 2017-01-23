import { applyMiddleware, createStore } from 'redux';
import io from 'socket.io';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import socketIoMiddleware from './utils/socketIo';
import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
  const socket = io();
  const logger = createLogger();
  const socketIo = socketIoMiddleware(socket, 'ROUTES/');
  const middleware = applyMiddleware(ReduxThunk, logger, socketIo);
  const store = middleware(createStore)(rootReducer, initialState);
  return store;
}
