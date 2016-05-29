// ------------------------------------
// ON ERRORS ORDERS
// ------------------------------------
export const onErrorsAction = (errors) => ({
  type: 'ON_ERROR',
  errors,
});

export const onErrorsReducer = (errors, action) => [...action.errors];

export const onErrors = (errors) => (dispatch) => {
  dispatch(onErrorsAction(errors));
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ON_ERROR: onErrorsReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function errorsReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
