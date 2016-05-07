// ------------------------------------
// ADD SERVICE TO CART REDUCER
// ------------------------------------
export const ADD_SERVICE_TO_CART = 'ADD_SERVICE_TO_CART';

export const addServiceToCartReducer = (services, action) => [...services, action.payload];

// ------------------------------------
// REMOVE SERVICE FROM CART REDUCER
// ------------------------------------
export const REMOVE_SERVICE_FROM_CART = 'REMOVE_SERVICE_FROM_CART';

export const removeServiceFromCartReducer = (services, action) =>
  services.filter(service => service.idServiceType !== action.payload.idServiceType);

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_SERVICE_TO_CART]: addServiceToCartReducer,
  [REMOVE_SERVICE_FROM_CART]: removeServiceFromCartReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function serviceTypesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
