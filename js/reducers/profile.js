import types from 'constants/actions';

const initialState = {
  isFetching: false
};

export default function update(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}