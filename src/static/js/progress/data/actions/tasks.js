import { ajax } from 'jquery';
import {
  GET_TASKS,
} from '../constants/actions';
import {
  GET_TASKS_BY_ID_URL,
} from '../constants/constants';
import {
  onAjaxStartedAction,
  onAjaxFinishedAction,
  getTasksErrorAction,
} from './config';

export const getTasksAction = tasks => ({ type: GET_TASKS, tasks });

export const getTasks = idOrder => (dispatch) => {
  dispatch(onAjaxStartedAction());
  ajax({
    url: `${GET_TASKS_BY_ID_URL}/${idOrder}`,
    method: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
  }).done((result) => {
    if (result) {
      return dispatch(getTasksAction(result));
    }
    return dispatch(getTasksErrorAction('Order no Encontrada'));
  }).fail(() =>
    dispatch(getTasksErrorAction('Order no Encontrada'))
  ).always(() =>
    dispatch(onAjaxFinishedAction())
  );
};
