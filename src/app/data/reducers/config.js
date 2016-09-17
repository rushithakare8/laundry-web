import {
  ON_AJAX_STARTED,
  ON_AJAX_FINISHED,
} from '../constants/actions';

export const onAjaxStartedReducer = config => Object.assign({}, config, { loading: true });

export const onAjaxFinishedReducer = config => Object.assign({}, config, { loading: false });

const ACTION_HANDLERS = {
  [ON_AJAX_STARTED]: onAjaxStartedReducer,
  [ON_AJAX_FINISHED]: onAjaxFinishedReducer,
};

export default function configReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
