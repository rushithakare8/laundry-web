import { get } from 'jquery';

// ------------------------------------
// GET CURRENT ORDERS
// ------------------------------------
export const getOrdersAction = (orders) => ({
  type: 'GET_CURRENT_ORDERS',
  orders,
});

export const getOrdersReducer = (orders, action) => action.orders;

export const getOrders = (idClient) => (dispatch) => {
  get(`/api/v1/getcurrentorders/${idClient}`, (data) => {
    dispatch(getOrdersAction(data.orders));
  });
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  GET_CURRENT_ORDERS: getOrdersReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ordersReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
