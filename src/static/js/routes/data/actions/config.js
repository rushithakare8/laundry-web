import {
  ON_AJAX_STARTED,
  ON_AJAX_FINISHED,
} from '../constants/actions';

export const onAjaxStartedAction = () => ({ type: ON_AJAX_STARTED });

export const onAjaxFinishedAction = () => ({ type: ON_AJAX_FINISHED });
