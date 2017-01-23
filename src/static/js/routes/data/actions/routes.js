import {
  GET_ROUTES,
} from '../constants/actions';

export const getRoutesAction = () => ({ type: GET_ROUTES });

export const getRoutes = () => dispatch => dispatch(getRoutesAction());
