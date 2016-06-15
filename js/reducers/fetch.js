import types from 'constants/actions';

export default function loadSdk(state = {isFetching: true}, action = {}) {
  switch (action.type) {
    case types.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case types.FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}