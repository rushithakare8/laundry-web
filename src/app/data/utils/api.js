import { ajax } from 'jquery';
import {
  onAjaxStartedAction,
  onAjaxFinishedAction,
} from '../actions/config';
import {
  onErrorsAction,
} from '../actions/errors';
import {
  ERROR_MSG,
} from '../constants/utils';

export const dispatcher = (data, actions, dispatch) => {
  if (Array.isArray(actions)) {
    for (let i = 0; i < actions.length; i += 1) {
      const func = actions[i];
      dispatch(func(data));
    }
  } else {
    dispatch(actions(data));
  }
};

export const ajaxCall = (method, url, inputData, actionData, actions, dispatch, resolve, reject) => {
  const data = inputData ? JSON.stringify(inputData) : null;
  dispatch(onAjaxStartedAction());
  return ajax({
    url,
    data,
    method,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
  }).done((result) => {
    const resultData = result ? Object.assign({}, result, actionData) : actionData;
    // console.log(resultData);
    if (resolve) {
      resolve(resultData);
    }
    return dispatcher(resultData, actions, dispatch);
  }).fail(() => {
    if (reject) {
      reject(ERROR_MSG);
    }
    dispatch(onErrorsAction([ERROR_MSG]));
  }).always(() => dispatch(onAjaxFinishedAction()));
};

export const get = (url, actionData, actions, dispatch, resolve, reject) => {
  ajaxCall('GET', url, null, actionData, actions, dispatch, resolve, reject);
};

export const post = (url, data, actionData, actions, dispatch, resolve, reject) => {
  ajaxCall('POST', url, data, actionData, actions, dispatch, resolve, reject);
};

export const put = (url, data, actionData, actions, dispatch, resolve, reject) => {
  ajaxCall('PUT', url, data, actionData, actions, dispatch, resolve, reject);
};

export const del = (url, actionData, actions, dispatch, resolve, reject) => {
  ajaxCall('DELETE', url, null, actionData, actions, dispatch, resolve, reject);
};
