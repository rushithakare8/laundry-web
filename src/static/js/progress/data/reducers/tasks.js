import {
  GET_TASKS,
  GET_TASKS_ERROR,
} from '../constants/actions';

// ------------------------------------
// STATE CONFIG SUPPORT REDUCER
// ------------------------------------
export const getTasksReducer = (tasks, action) => action.tasks;

export const getTasksErrorReducer = () => [];

const ACTION_HANDLERS = {
  [GET_TASKS]: getTasksReducer,
  [GET_TASKS_ERROR]: getTasksErrorReducer,
};

export default function tasksReducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
