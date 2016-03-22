import { get } from 'jquery';

export const GET_CURRENT_ORDERS = 'GET_CURRENT_ORDERS';

export const getOrdersAction = (orders) => ({
  type: GET_CURRENT_ORDERS,
  payload: orders,
});

export const getCurrentOrdersReducer = (state, action) => action.payload;

export const getCurrentOrders = () => (dispatch) => {
  console.log(dispatch);
  get('/api/v1/getcurrentorders/2', (data) => {
    dispatch(getOrdersAction(data.orders));
  });
};

export const actions = {
  getCurrentOrders,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CURRENT_ORDERS]: getCurrentOrdersReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function ordersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
