import {
  ADD_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  ADD_USER_PAYMENT_INFO,
  DELETE_USER_PAYMENT_INFO,
  UPDATE_USER_INFO,
} from '../constants/actions';
import {
  int,
} from '../utils/utils';

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
// DELETE ADDRESS REDUCER
// ------------------------------------
export const deleteUserAddressReducer = (user, action) => Object.assign({}, user, { addresses: user.addresses.filter(adds => int(adds.idAddress) !== int(action.address.idAddress)) });

// ------------------------------------
// DELETE ADDRESS REDUCER
// ------------------------------------
export const updateUserAddressReducer = (user, action) => Object.assign({}, user, { addresses: user.addresses.map(addrs => (int(addrs.idAddress) === int(action.address.idAddress) ? action.address : addrs)) });

// ------------------------------------
// ADD PAYMENT INFO TO USER REDUCER
// ------------------------------------
export const addUserPaymentInfoReducer = (user, action) => {
  const prevInfos = user.paymentInfos || [];
  const paymentInfo = action.paymentInfo.id ? action.paymentInfo : action.paymentInfo[0];
  const paymentInfos = [...prevInfos, paymentInfo];
  return Object.assign({}, user, { paymentInfos });
};

// ------------------------------------
// DELETE PAYMENT INFO USER REDUCER
// ------------------------------------
export const deleteUserPaymentInfoReducer = (user, action) => Object.assign({}, user, { paymentInfos: user.paymentInfos.filter(card => card.id !== action.card.cardId) });

// ------------------------------------
// ADD ADDRESS REDUCER
// ------------------------------------
export const updateUserInfoReducer = (user, action) => Object.assign({}, user, action.user);

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_USER_ADDRESS]: addUserAddressReducer,
  [DELETE_USER_ADDRESS]: deleteUserAddressReducer,
  [UPDATE_USER_ADDRESS]: updateUserAddressReducer,
  [ADD_USER_PAYMENT_INFO]: addUserPaymentInfoReducer,
  [DELETE_USER_PAYMENT_INFO]: deleteUserPaymentInfoReducer,
  [UPDATE_USER_INFO]: updateUserInfoReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function userReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
