
// ------------------------------------
// ADD SERVICE TO CART REDUCER
// ------------------------------------
export const ADD_SERVICE_TO_CART = 'ADD_SERVICE_TO_CART';

export const addServiceToCartAction = (service) => ({
  type: ADD_SERVICE_TO_CART,
  payload: service,
});

export const addServiceToCartReducer = (state, action) => {
  const service = action.payload;
  const services = state.services.concat(service.idServiceType);
  return Object.assign({}, state, {
    total: state.total + service.price,
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

export const removeServiceFromCartReducer = (state, action) => {
  const service = action.payload;
  const services = state.services.filter(idServiceType => idServiceType !== service.idServiceType);
  // TODO: Remove also specs that got added
  return Object.assign({}, state, {
    total: state.total - service.price,
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

export const updateServiceOnCartAction = (spec) => ({
  type: UPDATE_SERVICE_ON_CART,
  payload: spec,
});

export const updateServiceOnCartReducer = (state, action) => {
  const spec = action.payload;
  return state;
};

export const updateServiceOnCart = (spec) => (dispatch) => {
  dispatch(updateServiceOnCartAction(spec));
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_SERVICE_TO_CART]: addServiceToCartReducer,
  [UPDATE_SERVICE_ON_CART]: updateServiceOnCartReducer,
  [REMOVE_SERVICE_FROM_CART]: removeServiceFromCartReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function cartReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
