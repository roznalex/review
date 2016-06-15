import types from 'constants/actions';

export const updateRequest = () => ({
  type: types.UPDATE_PROFILE_REQUEST
});

export const updateSucceed = () => ({
  type: types.UPDATE_PROFILE_SUCCESS
});

export const updateFailure = () => ({
  type: types.UPDATE_PROFILE_FAILURE
});

export const updateUser = (userToUpdate, fieldsToUpdate) => {
  return function(dispatch) {
    dispatch(updateRequest());

    const fields = JSON.parse(JSON.stringify(fieldsToUpdate));

    function* entries(obj) {
      for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
      }
    }

    for (const [key, value] of entries(fields)) {
      if (userToUpdate.hasOwnProperty(key)) {
        userToUpdate[key] = value;
      }
    }

    return Backendless.UserService.update(userToUpdate)
      .then((user) => {
        dispatch(updateSucceed(user));
        Backendless.LocalCache.set('overman-user', user);
        toastr.success('Profile updated successfully');
      })
      .catch((e) => {
        dispatch(updateFailure(e));
      });
  };
};
