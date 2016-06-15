import types from 'constants/actions';
import * as m from 'constants/messages';
import { resetForm } from 'actions/form';

export const createCandidateRequest = () => ({
  type: types.CREATE_CANDIDATE_REQUEST
});

export const createCandidateSucceed = () => ({
  type: types.CREATE_CANDIDATE_SUCCESS
});

export const createCandidateFailure = () => ({
  type: types.CREATE_CANDIDATE_FAILURE
});

export const addCandidate = candidate => {
  return function(dispatch) {
    dispatch(createCandidateRequest());

    const candidateStorage = Backendless.Persistence.of('Candidates');

    return candidateStorage.save(candidate)
      .then((success) => {
        if (success) {
          dispatch(createCandidateSucceed());
          dispatch(resetForm());
          toastr.success(m.CANDIDATE_ADDED);
        } else {
          Error(m.UNKNOWN_ERROR_OCCURRED, success);
        }
      })
      .catch((e) => {
        dispatch(createCandidateFailure(e));
      });
  };
};
