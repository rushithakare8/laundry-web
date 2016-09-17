import { Map } from 'immutable';
import {
  CHECKOUT,
  GET_CURRENT_ORDERS,
} from '../constants/actions';

// ------------------------------------
// GET CURRENT ORDERS
// ------------------------------------
export const checkoutReducer = (orders, action) => [...orders, action.order];

// ------------------------------------
// GET CURRENT ORDERS
// ------------------------------------
export const getOrdersReducer = (orders, action) => new Map(action.orders).toArray();

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHECKOUT]: checkoutReducer,
  [GET_CURRENT_ORDERS]: getOrdersReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ordersReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
