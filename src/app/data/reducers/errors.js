import {
  ON_ERROR,
} from '../constants/actionTypes';

// ------------------------------------
// ON ERRORS ORDERS
// ------------------------------------
export const onErrorsReducer = (errors, action) => [...errors, ...action.errors];

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ON_ERROR]: onErrorsReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function errorsReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
