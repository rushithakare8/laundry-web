import {
  ON_AJAX_STARTED,
  ON_AJAX_FINISHED,
  GET_TASKS_ERROR,
} from '../constants/actions';

// ------------------------------------
// STATE CONFIG SUPPORT REDUCER
// ------------------------------------
export const onAjaxStartedAction = () => ({ type: ON_AJAX_STARTED });

export const onAjaxFinishedAction = () => ({ type: ON_AJAX_FINISHED });

export const getTasksErrorAction = msg => ({ type: GET_TASKS_ERROR, msg });
