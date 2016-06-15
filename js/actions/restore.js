import types from 'constants/actions';
import * as m from 'constants/messages';
import { resetForm } from 'actions/form';

export const restoreRequest = email => ({
  type : types.RESTORE_REQUEST,
  email: email
});

export const restoreSucceed = () => ({
  type: types.RESTORE_SUCCESS
});

export const restoreFailure = () => ({
  type: types.RESTORE_FAILURE
});

export const restorePassword = email => {
  return function(dispatch) {
    dispatch(restoreRequest());

    return Backendless.UserService.restorePassword(email)
      .then((success) => {
        if (success) {
          dispatch(restoreSucceed());
          dispatch(resetForm());
          toastr.success(m.EMAIL_SENT);
        } else {
          Error(m.UNKNOWN_ERROR_OCCURRED, success);
        }
      })
      .catch((e) => {
        dispatch(restoreFailure(e));
      });
  };
};