import {
  GET_ROUTES_COMPLETED,
} from '../constants/actions';

const getRoutesReducer = (routes, action) => [...action.data];

const ACTION_HANDLERS = {
  [GET_ROUTES_COMPLETED]: getRoutesReducer,
};

export default function routesReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
