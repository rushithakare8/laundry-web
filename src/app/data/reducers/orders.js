import {
  GET_CURRENT_ORDERS,
} from '../constants/actionTypes';

// ------------------------------------
// GET CURRENT ORDERS
// ------------------------------------
export const getOrdersReducer = (orders, action) => action.orders;

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CURRENT_ORDERS]: getOrdersReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ordersReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
