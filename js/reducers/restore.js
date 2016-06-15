import types from 'constants/actions';

const initialState = {
  isFetching: false
};

export default function update(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESTORE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.RESTORE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case types.RESTORE_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}
