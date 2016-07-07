import { int } from '../utils/utils';

// ------------------------------------
// ADD SERVICE TO CART REDUCER
// ------------------------------------
export const addServiceToCartReducer = (services, action) => [...services, action.payload];

// ------------------------------------
// REMOVE SERVICE FROM CART REDUCER
// ------------------------------------
export const removeServiceFromCartReducer = (services, action) =>
  services.filter(service => service.idServiceType !== action.payload.idServiceType);

// ------------------------------------
// UPDATE SERVICE ON CART REDUCER
// ------------------------------------
export const getUpdatedCartSpec = (spec, option) => Object.assign({}, spec, {
  key: option.key,
  specPrice: option.specPrice,
  serviceIncrement: option.serviceIncrement,
});

export const getUpdatedCartService = (service, idSpecs, option) => Object.assign({}, service, {
  specs: service.specs.map(spec => (int(spec.idSpecs) === int(idSpecs) ? getUpdatedCartSpec(spec, option) : spec)),
});

export const updateSpecOnCartReducer = (services, action) => {
  const { idServiceType, idSpecs, option } = action.payload;
  return services.map(service => (int(service.idServiceType) === int(idServiceType) ? getUpdatedCartService(service, idSpecs, option) : service));
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ADD_SERVICE_TO_CART: addServiceToCartReducer,
  REMOVE_SERVICE_FROM_CART: removeServiceFromCartReducer,
  UPDATE_SPEC_ON_CART: updateSpecOnCartReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function servicesReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
