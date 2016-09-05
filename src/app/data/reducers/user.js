/* global Stripe */
import {
  ADD_USER_ADDRESS,
  ADD_USER_PAYMENT_INFO,
  UPDATE_USER_INFO,
} from '../constants/actionTypes';

// ------------------------------------
// ADD ADDRESS REDUCER
// ------------------------------------
export const addUserAddressReducer = (user, action) => {
  const addresses = user.addresses || [];
  addresses.push(action.address);
  return Object.assign({}, user, {
    addresses,
  });
};

// ------------------------------------
// ADD PAYMENT INFO TO USER REDUCER
// ------------------------------------
export const addUserPaymentInfoReducer = (user, action) => {
  const prevInfos = user.paymentInfos || [];
  const paymentInfos = [...prevInfos, action.paymentInfo];
  return Object.assign({}, user, { paymentInfos });
};

// ------------------------------------
// ADD ADDRESS REDUCER
// ------------------------------------
export const updateUserInfoReducer = (user) => user;

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_USER_ADDRESS]: addUserAddressReducer,
  [ADD_USER_PAYMENT_INFO]: addUserPaymentInfoReducer,
  [UPDATE_USER_INFO]: updateUserInfoReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function userReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
