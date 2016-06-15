import { AskEmail } from 'components';
import { connect } from 'react-redux';
import * as formActions from 'actions/form';
import * as auth from 'actions/auth';

const mapStateToProps = state => ({
  form: state.form,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  onSubmit(email, toConfirm) {
    dispatch(auth.sendEmail(email, toConfirm));
  },

  onFieldChange(name, e) {
    dispatch(formActions.fieldChange(name, e.target.value));
  },

  onValidationFail(error) {
    dispatch(formActions.invalidateForm(error));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AskEmail);