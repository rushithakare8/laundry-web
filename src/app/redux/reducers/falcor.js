export const INIT_FALCOR_MODEL = 'INIT_FALCOR_MODEL';

export const initFalcorModel = (value) => ({
  type: INIT_FALCOR_MODEL,
  payload: value,
});

export const actions = {
  initFalcorModel,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_FALCOR_MODEL]: (state, action) => state + action.payload,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
