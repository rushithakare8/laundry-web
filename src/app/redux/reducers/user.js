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
export const ADD_ADDRESS = 'ADD_ADDRESS';

export const addUserAddressAction = (address) => ({
  type: ADD_ADDRESS,
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
  console.log(values);
  post('/api/v1/adduseraddress', values).done((result) => {
    console.log(result);
    dispatch(addUserAddressAction(result));
    resolve(result);
  });
});

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
