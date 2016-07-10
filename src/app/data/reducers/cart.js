import { ajax } from 'jquery';
import { onErrorsAction } from './errors';
import { validate } from '../validators/order';
import { int } from '../utils/utils';
import { CHECKOUT_URL } from '../constants/endpoints';

export const getCartSpec = (spec, option) => ({
  key: option.key,
  idSpecs: spec.idSpecs,
  specPrice: option.specPrice,
  quantity: spec.quantity || 1,
  serviceIncrement: option.serviceIncrement,
});

export const getCartService = (service) => ({
  price: service.price,
  idServiceType: service.idServiceType,
  specs: service.specs ? service.specs.filter(spec => spec.optional === 0).map(spec => getCartSpec(spec, spec.options[spec.idSpecs][0])) : [],
});

export const updateCartPrices = (cart, services) => {
  let price = services.reduce((sub, service) => sub + service.price, 0);
  const increment = services.reduce((inc, service) => inc + (service.specs.reduce((sInc, spec) => sInc + (spec.serviceIncrement * spec.quantity), 0) * service.price), 0);
  const priceIncrement = services.reduce((inc, service) => inc + (service.specs.reduce((sInc, spec) => sInc + (spec.specPrice * spec.quantity), 0)), 0);
  price = price + increment + priceIncrement;
  return Object.assign({}, cart, { services, price, increment });
};

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
  const services = [...prevServices, getCartService(service)];
  return updateCartPrices(cart, services);
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
    price: cart.price - service.price,
    services,
  });
};

export const removeServiceFromCart = (service) => (dispatch) => {
  dispatch(removeServiceFromCartAction(service));
};

// ------------------------------------
// ADD SERVICE ON CART REDUCER
// ------------------------------------
export const addSpecOnCartAction = (payload) => ({
  type: 'ADD_SPEC_ON_CART',
  payload,
});

export const addSpecOnCartReducer = (cart, action) => {
  const { idServiceType, spec } = action.payload;
  const services = cart.services.reduce((acc, serv) => {
    let newServ = serv;
    if (int(serv.idServiceType) === int(idServiceType)) {
      let isNewSpec = true;
      let specs = serv.specs.reduce((accSpec, sp) => {
        let newSpec = sp;
        if (int(sp.idSpecs) === int(spec.idSpecs)) {
          isNewSpec = false;
          // Existing Spec, add one to quantity
          newSpec = Object.assign({}, sp, { quantity: (sp.quantity + 1) });
        }
        return [...accSpec, newSpec];
      }, []);
      // There was no spec we need to add it to the specs array
      if (isNewSpec) {
        const option = {
          key: spec.key,
          specPrice: spec.specPrice,
          serviceIncrement: spec.serviceIncrement,
        };
        specs = [...specs, getCartSpec(spec, option)];
      }
      newServ = Object.assign({}, serv, { specs });
    }
    return [...acc, newServ];
  }, []);
  return updateCartPrices(cart, services);
};

export const addSpecOnCart = (idServiceType, spec) => (dispatch) => {
  dispatch(addSpecOnCartAction({ idServiceType, spec }));
};

// ------------------------------------
// REMOVE SERVICE ON CART REDUCER
// ------------------------------------
export const removeSpecOnCartAction = (payload) => ({
  type: 'REMOVE_SPEC_ON_CART',
  payload,
});

export const removeSpecOnCartReducer = (cart, action) => {
  const { idServiceType, idSpecs } = action.payload;
  const services = cart.services.reduce((acc, serv) => {
    let newServ = serv;
    if (int(serv.idServiceType) === int(idServiceType)) {
      const specs = serv.specs.reduce((accSpec, sp) => {
        // Existing Spec, remove from quantity
        const newSpec = (int(sp.idSpecs) === int(idSpecs)) ? Object.assign({}, sp, { quantity: (sp.quantity - 1) }) : sp;
        return newSpec.quantity > 0 ? [...accSpec, newSpec] : newSpec;
      }, []);
      // There was no spec we need to add it to the specs array
      newServ = Object.assign({}, serv, { specs });
    }
    return [...acc, newServ];
  }, []);
  return updateCartPrices(cart, services);
};

export const removeSpecOnCart = (idServiceType, idSpecs) => (dispatch) => {
  dispatch(removeSpecOnCartAction({ idServiceType, idSpecs }));
};

// ------------------------------------
// UPDATE SERVICE ON CART REDUCER
// ------------------------------------
export const getUpdatedCartService = (service, idSpecs, option) => ({
  price: service.price,
  idServiceType: service.idServiceType,
  specs: service.specs.map(spec => (int(spec.idSpecs) === int(idSpecs) ? getCartSpec(spec, option) : spec)),
});

export const updateSpecOnCartAction = (payload) => ({
  type: 'UPDATE_SPEC_ON_CART',
  payload,
});

export const updateSpecOnCartReducer = (cart, action) => {
  const { idServiceType, idSpecs, option } = action.payload;
  const services = cart.services.map(service => (int(service.idServiceType) === int(idServiceType) ? getUpdatedCartService(service, idSpecs, option) : service));
  return updateCartPrices(cart, services);
};

export const updateSpecOnCart = (idServiceType, idSpecs, option) => (dispatch) => {
  dispatch(updateSpecOnCartAction({ idServiceType, idSpecs, option }));
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
  console.log(action);
  return Object.assign({}, cart, action.order);
};

export const checkout = (cart) => (dispatch) => {
  const errors = validate(cart);
  dispatch(onErrorsAction(errors));
  if (errors.length < 1) {
    console.log(cart);
    ajax({
      type: 'POST',
      dataType: 'json',
      url: CHECKOUT_URL,
      data: JSON.stringify(cart),
      contentType: 'application/json',
    }).done((order) => {
      dispatch(checkoutAction(order));
    });
  }
};

// -----------------------------------------------------------------------
// SET USER CART REDUCER
// -----------------------------------------------------------------------
export const setUserAction = (idClient) => ({
  type: 'SET_USER',
  idClient,
});

export const setUserReducer = (cart, action) => Object.assign({}, cart, { idClient: action.idClient });

export const setUser = (idClient) => (dispatch) => {
  dispatch(setUserAction(idClient));
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ADD_SERVICE_TO_CART: addServiceToCartReducer,
  REMOVE_SERVICE_FROM_CART: removeServiceFromCartReducer,
  UPDATE_CART_INFO: updateCartInfoReducer,
  ADD_SPEC_ON_CART: addSpecOnCartReducer,
  UPDATE_SPEC_ON_CART: updateSpecOnCartReducer,
  REMOVE_SPEC_ON_CART: removeSpecOnCartReducer,
  CHECKOUT: checkoutReducer,
  SET_USER: setUserReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function cartReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
