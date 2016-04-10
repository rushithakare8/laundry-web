import { post } from 'jquery';

// ------------------------------------
// UPDATE USER REDUCER
// ------------------------------------
export const UPDATE_USER = 'UPDATE_USER';

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const updateUserReducer = (user, action) => action.payload;

// ------------------------------------
// ADD ADDRESS REDUCER
// ------------------------------------
export const ADD_USER_ADDRESS = 'ADD_USER_ADDRESS';

export const addUserAddressAction = (address) => ({
  type: ADD_USER_ADDRESS,
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
  post('/api/v1/adduseraddress', values).done((result) => {
    dispatch(addUserAddressAction(result));
    resolve(result);
  });
});

// ------------------------------------
// ADD ADDRESS REDUCER
// ------------------------------------
export const ADD_USER_PAYMENT_INFO = 'ADD_USER_PAYMENT_INFO';

export const addUserPaymentIntoAction = (paymentInfo) => ({
  type: ADD_USER_PAYMENT_INFO,
  payload: paymentInfo,
});

export const addUserPaymentIntoReducer = (user, action) => {
  const clientPaymentInfos = user.clientPaymentInfos || [];
  clientPaymentInfos.push(action.payload);
  return Object.assign({}, user, {
    clientPaymentInfos,
  });
};

export const addUserPaymentInto = (values, dispatch) => new Promise(resolve => {
  post('/api/v1/adduseraddress', values).done((result) => {
    dispatch(addUserPaymentIntoAction(result));
    resolve(result);
  });
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_USER]: updateUserReducer,
  [ADD_USER_ADDRESS]: addUserAddressReducer,
  [ADD_USER_PAYMENT_INFO]: addUserPaymentIntoReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
