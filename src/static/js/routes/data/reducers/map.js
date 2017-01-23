import {
  CENTER_MAP,
  SELECT_ROUTE,
  POSITION_TO_ADDRESS,
} from '../constants/actions';

const centerMapReducer = (map, action) => Object.assign({}, map, {
  center: action.position,
});

const positionToAddressReducer = (map, action) => Object.assign({}, map, {
  marker: Object.assign({}, map.marker, {
    address: action.address,
  }),
  directions: null,
});

const selectRouteReducer = (map, action) => Object.assign({}, map, {
  directions: action.directions,
  marker: null,
});

const ACTION_HANDLERS = {
  [CENTER_MAP]: centerMapReducer,
  [POSITION_TO_ADDRESS]: positionToAddressReducer,
  [SELECT_ROUTE]: selectRouteReducer,
};

export default function mapReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
