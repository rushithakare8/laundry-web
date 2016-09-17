/* global Stripe */
import {
  post,
  put,
  del,
} from '../utils/api';
import {
  ADD_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  ADD_USER_PAYMENT_INFO,
  DELETE_USER_PAYMENT_INFO,
  UPDATE_USER_INFO,
} from '../constants/actions';
import {
  ADD_USER_ADDRESS_URL,
  DELETE_USER_ADDRESS_URL,
  UPDATE_USER_ADDRESS_URL,
  ADD_USER_PAYMENT_URL,
  DELETE_USER_PAYMENT_URL,
  UPDATE_USER_INFO_URL,
} from '../constants/endpoints';
import {
  onAjaxStartedAction,
  onAjaxFinishedAction,
} from './config';


// ------------------------------------
// ADD ADDRESS
// ------------------------------------
export const addUserAddressAction = address => ({
  type: ADD_USER_ADDRESS,
  address,
});

export const addUserAddress = (values, dispatch) => new Promise((resolve, reject) => {
  post(ADD_USER_ADDRESS_URL, values, null, addUserAddressAction, dispatch, resolve, reject);
});

// ------------------------------------
// DELETE ADDRESS
// ------------------------------------
export const deleteUserAddressAction = address => ({
  type: DELETE_USER_ADDRESS,
  address,
});

export const deleteUserAddress = idAddress => (dispatch) => {
  del(`${DELETE_USER_ADDRESS_URL}/${idAddress}`, { idAddress }, deleteUserAddressAction, dispatch);
};

// ------------------------------------
// UPDATE ADDRESS
// ------------------------------------
export const updateUserAddressAction = address => ({
  type: UPDATE_USER_ADDRESS,
  address,
});

export const updateUserAddress = (values, dispatch) => new Promise((resolve, reject) => {
  const { idAddress } = values;
  put(`${UPDATE_USER_ADDRESS_URL}/${idAddress}`, values, null, updateUserAddressAction, dispatch, resolve, reject);
});

// ------------------------------------
// ADD PAYMENT INFO TO USER
// ------------------------------------
export const addUserPaymentInfoAction = paymentInfo => ({
  type: ADD_USER_PAYMENT_INFO,
  paymentInfo,
});

export const addUserPaymentInfo = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(onAjaxStartedAction());
  Stripe.card.createToken({
    number: values.cardNumber,
    cvc: values.cardCvc,
    exp_month: values.cardExpMonth,
    exp_year: values.cardExpYear,
  }, (status, response) => {
    if (response.error) {
      dispatch(onAjaxFinishedAction());
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
    return post(ADD_USER_PAYMENT_URL, paymentInfo, null, addUserPaymentInfoAction, dispatch, resolve, reject);
  });
});

// ------------------------------------
// DELETE PAYMENT INFO
// ------------------------------------
export const deleteUserPaymentInfoAction = card => ({
  type: DELETE_USER_PAYMENT_INFO,
  card,
});

export const deleteUserPaymentInfo = (customerId, cardId) => (dispatch) => {
  del(`${DELETE_USER_PAYMENT_URL}/${customerId}/${cardId}`, { cardId }, deleteUserPaymentInfoAction, dispatch);
};

// ------------------------------------
// UPDATE INFO
// ------------------------------------
export const updateUserInfoAction = user => ({
  type: UPDATE_USER_INFO,
  user,
});

export const updateUserInfo = (values, dispatch) => new Promise((resolve, reject) => {
  const { idClient } = values;
  put(`${UPDATE_USER_INFO_URL}/${idClient}`, values, null, updateUserInfoAction, dispatch, resolve, reject);
});
