import { onErrorsAction } from './errors';
import { validate } from '../validators/order.js';

// ------------------------------------
// ADD SERVICE TO CART REDUCER
// ------------------------------------
export const addServiceToCartAction = (service) => ({
  type: 'ADD_SERVICE_TO_CART',
  payload: service,
});

export const addServiceToCartReducer = (cart, action) => {
  const service = action.payload;
  const prevServices = cart.services || [];
  const services = [...prevServices, service];
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
export const removeServiceFromCartAction = (service) => ({
  type: 'REMOVE_SERVICE_FROM_CART',
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
export const updateServiceOnCartAction = (payload) => ({
  type: 'UPDATE_SERVICE_ON_CART',
  payload,
});

export const updateServiceOnCartReducer = (cart) => cart;

export const updateServiceOnCart = (spec, idServiceType, adding) => (dispatch) => {
  dispatch(updateServiceOnCartAction({ spec, idServiceType, adding }));
};

// -----------------------------------------------------------------------
// UPDATE INFO LIKE ADDRESS AND TIME ON CART REDUCER
// -----------------------------------------------------------------------
export const updateCartInfoAction = (payload) => ({
  type: 'UPDATE_CART_INFO',
  payload,
});

export const updateCartInfoReducer = (cart, action) => Object.assign({}, cart, action.payload);

export const updateCartInfo = (values) => (dispatch) => {
  dispatch(updateCartInfoAction(values));
};

// -----------------------------------------------------------------------
// CHECKOUT CART REDUCER
// -----------------------------------------------------------------------
export const checkoutAction = (order) => ({
  type: 'CHECKOUT',
  order,
});

export const checkoutReducer = (cart, action) => {
  console.log(cart);
  return Object.assign({}, cart, action.order);
};

export const checkout = (cart) => (dispatch) => {
  const errors = validate(cart);
  dispatch(onErrorsAction(errors));
  if (errors.length < 1) {
    dispatch(checkoutAction(cart));
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ADD_SERVICE_TO_CART: addServiceToCartReducer,
  REMOVE_SERVICE_FROM_CART: removeServiceFromCartReducer,
  UPDATE_SERVICE_ON_CART: updateServiceOnCartReducer,
  UPDATE_CART_INFO: updateCartInfoReducer,
  CHECKOUT: checkoutReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function cartReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
