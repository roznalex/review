import types from 'constants/actions';

export const fieldChange = (name, value) => ({
  type: types.FIELD_CHANGE,
  name,
  value
});

export const resetForm = () => ({
  type: types.RESET_FORM
});

export const invalidateForm = error => ({
  type: types.INVALIDATE_FORM,
  error
});