import * as socials from 'utils/socials';
import types from 'constants/actions';

export const fetchRequest = () => ({
  type: types.FETCH_REQUEST
});

export const fetchSuccess = () => ({
  type: types.FETCH_SUCCESS
});

export const fetchFailure = error => ({
  type: types.FETCH_FAILURE,
  error
});

export const loadSdk = () => {
  return dispatch => {
    dispatch(fetchRequest());
    Promise.all(['facebook', 'google'].map(socials.loadSdk))
      .then(() => dispatch(fetchSuccess()))
      .catch(error => dispatch(fetchFailure(error)));
  };
};