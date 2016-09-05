/* global Stripe */
import { post, ajax } from 'jquery';
import {
  ADD_USER_ADDRESS,
  ADD_USER_PAYMENT_INFO,
  UPDATE_USER_INFO,
} from '../constants/actionTypes';
import {
  ADD_USER_ADDRESS_URL,
  ADD_USER_PAYMENT_URL,
  UPDATE_USER_INFO_URL,
} from '../constants/endpoints';
import {
  onErrorsAction,
} from './errors';

// ------------------------------------
// ADD ADDRESS
// ------------------------------------
export const addUserAddressAction = (address) => ({
  type: ADD_USER_ADDRESS,
  address,
});

export const addUserAddress = (values, dispatch) => new Promise(resolve => {
  post(ADD_USER_ADDRESS_URL, values).done((result) => {
    dispatch(addUserAddressAction(result));
    resolve(result);
  });
});

// ------------------------------------
// ADD PAYMENT INFO TO USER
// ------------------------------------
export const addUserPaymentInfoAction = (paymentInfo) => ({
  type: ADD_USER_PAYMENT_INFO,
  paymentInfo,
});

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
// UPDATE INFO
// ------------------------------------
export const updateUserInfoAction = (user) => ({
  type: UPDATE_USER_INFO,
  user,
});

export const updateUserInfo = (values, dispatch) => new Promise((resolve, reject) => {
  const { idClient } = values;
  const url = `${UPDATE_USER_INFO_URL}/${idClient}`;
  ajax({
    url,
    data: values,
    method: 'PUT',
  }).done((result) => {
    dispatch(updateUserInfoAction(result));
    resolve(result);
  }).fail(err => {
    dispatch(onErrorsAction([err]));
    reject(err);
  });
});
