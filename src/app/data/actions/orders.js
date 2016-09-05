import { get } from 'jquery';
import {
  GET_CURRENT_ORDERS,
} from '../constants/actionTypes';

// ------------------------------------
// GET CURRENT ORDERS
// ------------------------------------
export const getOrdersAction = (orders) => ({
  type: GET_CURRENT_ORDERS,
  orders,
});

export const getOrders = (idClient) => (dispatch) => {
  get(`/api/v1/getcurrentorders/${idClient}`, (data) => {
    dispatch(getOrdersAction(data.orders));
  });
};
