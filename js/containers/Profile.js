import { ProfileForm } from 'components';
import { connect } from 'react-redux';
import * as formActions from 'actions/form';
import * as profileActions from 'actions/profile';

const mapStateToProps = state => ({
  auth   : state.auth,
  form   : state.form,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({

  onSubmit(user, fields) {
    dispatch(profileActions.updateUser(user, fields));
  },
  onFieldChange(name, e) {
    dispatch(formActions.fieldChange(name, e.target.value));
  }
});

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);

export default Profile;
