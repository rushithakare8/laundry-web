// import { post } from 'jquery';

export const UPDATE_USER = 'UPDATE_USER';
export const ADD_ADDRESS = 'ADD_ADDRESS';

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const addUserAddressAction = (address) => ({
  type: ADD_ADDRESS,
  payload: address,
});

export const updateUserReducer = (user, action) => action.payload;

export const addUserAddressReducer = (user, action) => {
  const addresses = user.addresses || [];
  addresses.push(action.payload);
  return Object.assign({}, user, {
    addresses,
  });
};

export const addUserAddress = (values, dispatch) => new Promise(resolve => {
  setTimeout(() => {
    dispatch(addUserAddressAction(values));
    resolve(values);
  }, 500);
});

export const actions = {
  updateUserAction,
  addUserAddressAction,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_USER]: updateUserReducer,
  [ADD_ADDRESS]: addUserAddressReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
