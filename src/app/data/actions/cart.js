import { push } from 'react-router-redux';
import { post } from '../utils/api';
import { validate } from '../validators/order';
import { CHECKOUT_URL } from '../constants/endpoints';
import {
  ADD_SERVICE_TO_CART,
  REMOVE_SERVICE_FROM_CART,
  ADD_SPEC_ON_CART,
  REMOVE_SPEC_ON_CART,
  UPDATE_SPEC_ON_CART,
  UPDATE_CART_INFO,
  CHECKOUT,
  SET_USER,
} from '../constants/actions';
import {
  onErrorsAction,
} from './errors';

// ------------------------------------
// ADD SERVICE TO CART
// ------------------------------------
export const addServiceToCartAction = service => ({
  type: ADD_SERVICE_TO_CART,
  service,
});

export const addServiceToCart = service => (dispatch) => {
  dispatch(addServiceToCartAction(service));
};

// ------------------------------------
// REMOVE SERVICE FROM CART
// ------------------------------------
export const removeServiceFromCartAction = service => ({
  type: REMOVE_SERVICE_FROM_CART,
  service,
});

export const removeServiceFromCart = service => (dispatch) => {
  dispatch(removeServiceFromCartAction(service));
};

// ------------------------------------
// ADD SERVICE ON CART
// ------------------------------------
export const addSpecOnCartAction = (idServiceType, spec) => ({
  type: ADD_SPEC_ON_CART,
  idServiceType,
  spec,
});

export const addSpecOnCart = (idServiceType, spec) => (dispatch) => {
  dispatch(addSpecOnCartAction(idServiceType, spec));
};

// ------------------------------------
// REMOVE SERVICE ON CART
// ------------------------------------
export const removeSpecOnCartAction = (idServiceType, idSpecs) => ({
  type: REMOVE_SPEC_ON_CART,
  idServiceType,
  idSpecs,
});

export const removeSpecOnCart = (idServiceType, idSpecs) => (dispatch) => {
  dispatch(removeSpecOnCartAction(idServiceType, idSpecs));
};

// ------------------------------------
// UPDATE SERVICE ON CART
// ------------------------------------
export const updateSpecOnCartAction = (idServiceType, idSpecs, option) => ({
  type: UPDATE_SPEC_ON_CART,
  idServiceType,
  idSpecs,
  option,
});

export const updateSpecOnCart = (idServiceType, idSpecs, option) => (dispatch) => {
  dispatch(updateSpecOnCartAction(idServiceType, idSpecs, option));
};

// -----------------------------------------------------------------------
// UPDATE INFO LIKE ADDRESS AND TIME ON CART
// -----------------------------------------------------------------------
export const updateCartInfoAction = values => ({
  type: UPDATE_CART_INFO,
  values,
});

export const updateCartInfo = values => (dispatch) => {
  dispatch(updateCartInfoAction(values));
};

// -----------------------------------------------------------------------
// SET USER CART
// -----------------------------------------------------------------------
export const setUserAction = idClient => ({
  type: SET_USER,
  idClient,
});

export const setUser = idClient => (dispatch) => {
  dispatch(setUserAction(idClient));
};

// -----------------------------------------------------------------------
// CHECKOUT CART
// -----------------------------------------------------------------------
export const checkoutAction = order => ({
  type: CHECKOUT,
  order,
});

export const checkout = cart => (dispatch) => {
  const errors = validate(cart);
  if (errors.length > 0) {
    return dispatch(onErrorsAction(errors));
  }
  post(CHECKOUT_URL, cart, null, checkoutAction, dispatch);
  return dispatch(push('/main'));
};
