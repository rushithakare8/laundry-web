export const UPDATE_USER = 'UPDATE_USER';

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const updateUserReducer = (state, action) => action.payload;

export const actions = {
  updateUserAction,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_USER]: updateUserReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
