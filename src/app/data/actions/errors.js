import {
  ON_ERROR,
  CLEAR_ERRORS,
} from '../constants/actions';

// ------------------------------------
// ON ERRORS
// ------------------------------------
export const onErrorsAction = errors => ({
  type: ON_ERROR,
  errors,
});

export const onErrors = errors => (dispatch) => {
  dispatch(onErrorsAction(errors));
};

// ------------------------------------
// CLEAR ERRORS
// ------------------------------------
export const clearErrorsAction = () => ({ type: CLEAR_ERRORS });

export const clearErrors = () => (dispatch) => {
  dispatch(clearErrorsAction());
};
