import { AuthForm } from 'components';
import { connect } from 'react-redux';
import * as authActions from 'actions/auth';
import * as fetchActions from 'actions/fetch';
import * as formActions from 'actions/form';

const mapStateToProps = state => ({
  auth   : state.auth,
  loadSdk: state.loadSdk,
  form   : state.form
});

const mapDispatchToProps = dispatch => ({
  onSocialClick(provider) {
    dispatch(authActions.loginSocial(provider));
  },

  onSubmit(data, type) {
    dispatch(authActions.authUser(data, type));
  },

  onFieldChange(name, e) {
    dispatch(formActions.fieldChange(name, e.target.value));
  },

  onValidationFail(error) {
    dispatch(formActions.invalidateForm(error));
  },

  onSdkLoad() {
    dispatch(fetchActions.loadSdk());
  }
});

const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);

export default Auth;
