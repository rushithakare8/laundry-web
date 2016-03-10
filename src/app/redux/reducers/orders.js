import { Map } from 'immutable';

export const GET_CURRENT_ORDERS = 'GET_CURRENT_ORDERS';

export const getOrders = (orders) => ({
  type: GET_CURRENT_ORDERS,
  payload: orders,
});

export const currentOrdersReducer = (state, action) => action.payload;

export const getCurrentOrders = () => (dispatch, getState) => {
  const falcor = getState().falcor;
  falcor.get(['myorders', { from: 0, to: 3 }, ['city', 'streetAddress']]).then((value) => {
    dispatch(getOrders(new Map(value.json.myorders)));
  });
};

export const actions = {
  getCurrentOrders,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CURRENT_ORDERS]: currentOrdersReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function ordersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
