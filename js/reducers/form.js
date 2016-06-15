import types from 'constants/actions';

const initialState = {};

export default function form(state = initialState, action = {}) {
  switch (action.type) {
    case types.FIELD_CHANGE:
      return {
        ...state,
        [action.name]: action.value
      };
    case types.INVALIDATE_FORM:
      return {
        ...state,
        error: action.error
      };
    case types.RESET_FORM:
      return initialState;
    default:
      return state;
  }
}