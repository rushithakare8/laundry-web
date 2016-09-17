import {
  ON_AJAX_STARTED,
  ON_AJAX_FINISHED,
  GET_TASKS_ERROR,
  GET_TASKS,
} from '../constants/actions';

export const onAjaxStartedReducer = config => Object.assign({}, config, { loading: true, error: false });

export const onAjaxFinishedReducer = config => Object.assign({}, config, { loading: false });

export const getTasksErrorReducer = (config, action) => Object.assign({}, config, { error: true, msg: action.msg });

export const getTasksReducer = config => Object.assign({}, config, { error: false });

const ACTION_HANDLERS = {
  [ON_AJAX_STARTED]: onAjaxStartedReducer,
  [ON_AJAX_FINISHED]: onAjaxFinishedReducer,
  [GET_TASKS_ERROR]: getTasksErrorReducer,
  [GET_TASKS]: getTasksReducer,
};

export default function configReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
