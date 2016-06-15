import types from 'constants/actions';
import { CALL_API } from 'utils/api';
import { resetForm } from 'actions/form';
import { invalidateForm } from 'actions/form';
import { browserHistory } from 'react-router';
const NO_EMAIL_ERROR_CODE = 10002;

export const userLogout = () => ({
  type: types.USER_LOGOUT
});

export const authRequest = () => ({
  type: types.AUTH_REQUEST
});

export const authSucceed = user => ({
  type: types.AUTH_SUCCESS,
  user
});

export const authFailure = error => ({
  type: types.AUTH_FAILURE,
  error
});

export const askEmail = ({userId, provider}) => ({
  type: types.ASK_EMAIL,
  userId,
  provider
});

export const sendEmail = (email, toConfirm) => dispatch => {
  const data = {
    userId: toConfirm.userId,
    email
  };

  proceedSocialLogin(dispatch, toConfirm.provider + '/register', data);
};

export const loginSocial = provider => {
  return function(dispatch) {
    if (provider === 'google') {
      googleLogin.grantOfflineAccess({redirect_uri: 'postmessage'})
        .then((response) => {
          proceedSocialLogin(dispatch, provider, {code: response.code});
        });
    }

    if (provider === 'facebook') {
      if (!!FB) {
        FB.login((response) => {
          if (response.status === 'connected') {
            proceedSocialLogin(dispatch, provider, {
              token: response.authResponse.accessToken
            });
          }
        }, {scope: 'public_profile,email'});
      }
    }
  };
};

const proceedSocialLogin = (dispatch, provider, data) => {
  dispatch(authRequest());

  const params = {
    method: 'post',
    body  : JSON.stringify(data)
  };

  return CALL_API(`auth/social/${provider}`, params)
    .then(finishLogin.bind(this, dispatch))
    .catch(response => {
      const error = response.error;
      if (error.errorCode === NO_EMAIL_ERROR_CODE) {
        dispatch(askEmail(error.content));
        browserHistory.push('ask-email');
      } else {
        dispatch(authFailure());
        dispatch(invalidateForm(error));
      }
    });
};

const finishLogin = (dispatch, user) => {
  dispatch(resetForm());
  dispatch(authSucceed(user));
  toastr.success('Welcome to Overman!');
  browserHistory.push('/');
};

export const authUser = (data, type) => {
  return function(dispatch) {
    dispatch(authRequest());

    const params = {
      method: 'post',
      body  : data
    };

    return CALL_API(`auth/${type}`, params)
      .then(finishLogin.bind(this, dispatch))
      .catch(response => {
        dispatch(authFailure());
        dispatch(invalidateForm(response.error));
      });
  };
};
