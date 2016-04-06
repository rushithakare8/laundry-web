export const UPDATE_OBJECT = 'UPDATE_OBJECT';

export const updateObjectAction = (object) => ({
  type: UPDATE_OBJECT,
  payload: object,
});

export const updateObjectReducer = (state, action) => action.payload;

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_OBJECT]: updateObjectReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function objectReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
