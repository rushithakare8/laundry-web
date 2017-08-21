import {
  CENTER_MAP,
  SELECT_ROUTE,
  POSITION_TO_ADDRESS,
} from '../constants/actions';
import {
  onAjaxStartedAction,
  onAjaxFinishedAction,
} from './config';
import {
  getRouteDirections,
  getAddressByPosition,
} from '../utils/map';

export const centerMapAction = position => ({ type: CENTER_MAP, position });

export const positionToAddressAction = address => ({ type: POSITION_TO_ADDRESS, address });

export const selectRouteAction = directions => ({ type: SELECT_ROUTE, directions });

export const centerMap = (position, address, dispatch) => {
  dispatch(centerMapAction(position));
  dispatch(positionToAddressAction(address));
};

export const positionToAddress = position => (dispatch) => {
  dispatch(onAjaxStartedAction());
  getAddressByPosition(position).then((address) => {
    dispatch(onAjaxFinishedAction());
    centerMap(position, address, dispatch);
  }).catch(err => console.error(err));
};

export const selectRoute = route => (dispatch) => {
  dispatch(onAjaxStartedAction());
  getRouteDirections(route).then((directions) => {
    dispatch(onAjaxFinishedAction());
    dispatch(selectRouteAction(directions));
  }).catch(err => console.error(err));
};
