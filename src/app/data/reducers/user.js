/* global Stripe */

import { post } from 'jquery';
import {
  ADD_USER_ADDRESS_URL,
  ADD_USER_PAYMENT_URL,
} from '../constants/endpoints';

// ------------------------------------
// ADD ADDRESS REDUCER
// ------------------------------------
export const addUserAddressAction = (address) => ({
  type: 'ADD_USER_ADDRESS',
  payload: address,
});

export const addUserAddressReducer = (user, action) => {
  const addresses = user.addresses || [];
  addresses.push(action.payload);
  return Object.assign({}, user, {
    addresses,
  });
};

export const addUserAddress = (values, dispatch) => new Promise(resolve => {
  post(ADD_USER_ADDRESS_URL, values).done((result) => {
    dispatch(addUserAddressAction(result));
    resolve(result);
  });
});

// ------------------------------------
// ADD PAYMENT INFO TO USER REDUCER
// ------------------------------------
export const addUserPaymentInfoAction = (paymentInfo) => ({
  type: 'ADD_USER_PAYMENT_INFO',
  paymentInfo,
});

export const addUserPaymentInfoReducer = (user, action) => {
  const prevInfos = user.paymentInfos || [];
  const paymentInfos = [...prevInfos, action.paymentInfo];
  return Object.assign({}, user, { paymentInfos });
};

export const addUserPaymentInfo = (values, dispatch) => new Promise((resolve, reject) => {
  Stripe.card.createToken({
    number: values.cardNumber,
    cvc: values.cardCvc,
    exp_month: values.cardExpMonth,
    exp_year: values.cardExpYear,
  }, (status, response) => {
    if (response.error) {
      return reject(response);
    }
    const paymentInfo = {
      token: response.id,
      idClient: values.idClient,
      stripeCustumerId: values.stripeCustumerId,
      country: response.card.country,
      exp_month: response.card.exp_month,
      exp_year: response.card.exp_year,
      last4: response.card.last4,
      object: response.card.object,
      brand: response.card.brand,
      funding: response.card.funding,
    };
    return post(ADD_USER_PAYMENT_URL, paymentInfo).done((result) => {
      dispatch(addUserPaymentInfoAction(result));
      resolve(result);
    });
  });
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ADD_USER_ADDRESS: addUserAddressReducer,
  ADD_USER_PAYMENT_INFO: addUserPaymentInfoReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function userReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
