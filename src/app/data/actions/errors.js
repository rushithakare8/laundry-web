import {
  ON_ERROR,
} from '../constants/actionTypes';

// ------------------------------------
// ON ERRORS ORDERS
// ------------------------------------
export const onErrorsAction = (errors) => ({
  type: ON_ERROR,
  errors,
});

export const onErrors = (errors) => (dispatch) => {
  dispatch(onErrorsAction(errors));
};
