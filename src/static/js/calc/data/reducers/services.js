import { get } from 'jquery';
import {
  updateCartPriceAction,
  updateCartServiceAction,
  updateCartServiceTypeAction,
} from './cart';

export const int = val => parseInt(val, 10);

// ------------------------------------
// UPDATE SELECTED SERVICE TYPE
// ------------------------------------
export const updateServiceTypeAction = idServiceType => ({
  type: 'UPDATE_SERVICE_TYPE',
  idServiceType,
});

export const updateServiceTypeReducer = (services, action) => Object.assign({}, services, {
  idServiceType: action.idServiceType,
});

export const updateServiceType = idServiceType => (dispatch) => {
  dispatch(updateServiceTypeAction(idServiceType));
  dispatch(updateCartServiceTypeAction(idServiceType));
  dispatch(updateCartPriceAction());
};

// ------------------------------------
// UPDATE SELECTED SERVICE
// ------------------------------------
export const updateServiceAction = idServiceCategory => ({
  type: 'UPDATE_SERVICE',
  idServiceCategory,
});

export const updateServiceReducer = (services, action) => Object.assign({}, services, {
  idServiceCategory: action.idServiceCategory,
});

export const updateService = idServiceCategory => (dispatch, getState) => {
  const { services } = getState();
  const selectedService = services.services.filter(serv => int(serv.idServiceCategory) === int(idServiceCategory))[0];
  const selectedServiceType = selectedService.serviceTypes[0];
  dispatch(updateServiceAction(idServiceCategory));
  dispatch(updateServiceTypeAction(selectedServiceType.idServiceType));
  dispatch(updateCartServiceAction(selectedService));
  dispatch(updateCartServiceTypeAction(selectedServiceType.idServiceType));
  dispatch(updateCartPriceAction());
};

// ------------------------------------
// GET SERVICES FROM BE
// ------------------------------------
export const getServicesRequestAction = () => ({ type: 'GET_SERVICES_REQUEST' });

export const getServicesRequestReducer = services => Object.assign({}, services, { loading: true });

export const getServicesAction = services => ({
  type: 'GET_SERVICES',
  services,
});

export const getServicesReducer = (services, action) => Object.assign({}, services, { services: action.services, loading: false });

export const getServices = () => (dispatch) => {
  dispatch(getServicesRequestAction());
  get('/api/v1/getservices', (data) => {
    const services = data || [];
    const selectedService = services[0];
    dispatch(getServicesAction(services));
    dispatch(updateService(selectedService.idServiceCategory));
  });
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  UPDATE_SERVICE_TYPE: updateServiceTypeReducer,
  UPDATE_SERVICE: updateServiceReducer,
  GET_SERVICES_REQUEST: getServicesRequestReducer,
  GET_SERVICES: getServicesReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  services: [],
  idServiceCategory: 1,
  idServiceType: 1,
};
export default function servicesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
