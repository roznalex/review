import { RestorePasswordForm } from 'components';
import { connect } from 'react-redux';
import * as formActions from 'actions/form';
import * as restoreActions from 'actions/restore';

const mapStateToProps = state => ({
  form           : state.form,
  restorePassword: state.restorePassword
});

const mapDispatchToProps = dispatch => ({
  onSubmit(email) {
    dispatch(restoreActions.restorePassword(email));
  },
  onFieldChange(name, e) {
    dispatch(formActions.fieldChange(name, e.target.value));
  }
});

const RestorePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestorePasswordForm);

export default RestorePassword;
