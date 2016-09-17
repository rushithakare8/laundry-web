import {
  get,
} from '../utils/api';
import {
  GET_CURRENT_ORDERS,
} from '../constants/actions';
import {
  GET_CURRENT_ORDERS_URL,
} from '../constants/endpoints';

// ------------------------------------
// GET CURRENT ORDERS
// ------------------------------------
export const getOrdersAction = orders => ({
  type: GET_CURRENT_ORDERS,
  orders,
});

export const getOrders = idClient => (dispatch) => {
  get(`${GET_CURRENT_ORDERS_URL}/${idClient}`, null, getOrdersAction, dispatch);
};
