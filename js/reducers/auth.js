import types from 'constants/actions';

export default function auth(state = {}, action = {}) {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        user      : action.user,
        loggedIn  : true,
        isFetching: false,
        noEmail   : false
      };
    case types.AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        loggedIn  : false
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        isFetching: false,
        loggedIn  : false,
        user      : {},
        noEmail   : false
      };
    case types.ASK_EMAIL:
      return {
        ...state,
        isFetching: false,
        loggedIn  : false,
        user      : {},
        noEmail   : true,
        toConfirm : {
          userId  : action.userId,
          provider: action.provider
        }
      };
    default:
      return state;
  }
}