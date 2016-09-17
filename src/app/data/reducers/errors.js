import {
  ON_ERROR,
  CLEAR_ERRORS,
} from '../constants/actions';

// ------------------------------------
// ON ERRORS
// ------------------------------------
export const onErrorsReducer = (errors, action) => [...errors, ...action.errors];

// ------------------------------------
// CLEAR ERRORS
// ------------------------------------
export const clearErrorsReducer = () => [];

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ON_ERROR]: onErrorsReducer,
  [CLEAR_ERRORS]: clearErrorsReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function errorsReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
