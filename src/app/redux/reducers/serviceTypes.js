// import { Map } from 'immutable';
import { get } from 'jquery';

export const GET_SERVICE_TYPES = 'GET_SERVICE_TYPES';

export const getServiceTypesAction = (serviceTypes) => ({
  type: GET_SERVICE_TYPES,
  payload: serviceTypes,
});

export const getServiceTypesReducer = (state, action) => action.payload;

export const getServiceTypes = () => (dispatch) => {
  get('/api/v1/getcurrentorders', (data) => {
    dispatch(getServiceTypesAction(data.orders));
  });
};

export const actions = {
  getServiceTypes,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SERVICE_TYPES]: getServiceTypesReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function serviceTypesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
