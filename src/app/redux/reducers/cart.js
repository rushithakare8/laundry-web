
// ------------------------------------
// ADD SERVICE TO CART REDUCER
// ------------------------------------
export const ADD_SERVICE_TO_CART = 'ADD_SERVICE_TO_CART';

export const addServiceToCartAction = (service) => ({
  type: ADD_SERVICE_TO_CART,
  payload: service,
});

export const addServiceToCartReducer = (cart, action) => {
  const service = action.payload;
  const services = cart.services.concat(service.idServiceType);
  return Object.assign({}, cart, {
    total: cart.total + service.price,
    services,
  });
};

export const addServiceToCart = (service) => (dispatch) => {
  dispatch(addServiceToCartAction(service));
};

// ------------------------------------
// REMOVE SERVICE FROM CART REDUCER
// ------------------------------------
export const REMOVE_SERVICE_FROM_CART = 'REMOVE_SERVICE_FROM_CART';

export const removeServiceFromCartAction = (service) => ({
  type: REMOVE_SERVICE_FROM_CART,
  payload: service,
});

export const removeServiceFromCartReducer = (cart, action) => {
  const service = action.payload;
  const services = cart.services.filter(idServiceType => idServiceType !== service.idServiceType);
  // TODO: Remove also specs that got added
  return Object.assign({}, cart, {
    total: cart.total - service.price,
    services,
  });
};

export const removeServiceFromCart = (service) => (dispatch) => {
  dispatch(removeServiceFromCartAction(service));
};

// ------------------------------------
// UPDATE SERVICE ON CART REDUCER
// ------------------------------------
export const UPDATE_SERVICE_ON_CART = 'UPDATE_SERVICE_ON_CART';

export const updateServiceOnCartAction = (payload) => ({
  type: UPDATE_SERVICE_ON_CART,
  payload,
});

export const updateServiceOnCartReducer = (cart) => cart;

export const updateServiceOnCart = (spec, idServiceType, adding) => (dispatch) => {
  dispatch(updateServiceOnCartAction({ spec, idServiceType, adding }));
};

// -----------------------------------------------------------------------
// UPDATE INFO LIKE ADDRESS AND TIME ON CART REDUCER
// -----------------------------------------------------------------------
export const UPDATE_CART_INFO = 'UPDATE_CART_INFO';

export const updateCartInfoAction = (payload) => ({
  type: UPDATE_CART_INFO,
  payload,
});

export const updateCartInfoReducer = (cart, action) => Object.assign({}, cart, action.payload);

export const updateCartInfo = (values) => (dispatch) => {
  dispatch(updateCartInfoAction(values));
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_SERVICE_TO_CART]: addServiceToCartReducer,
  [REMOVE_SERVICE_FROM_CART]: removeServiceFromCartReducer,
  [UPDATE_SERVICE_ON_CART]: updateServiceOnCartReducer,
  [UPDATE_CART_INFO]: updateCartInfoReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function cartReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
