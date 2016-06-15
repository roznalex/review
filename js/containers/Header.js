import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Header } from 'components';
import * as AuthActions from 'actions/auth';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(AuthActions.userLogout());
    browserHistory.push('/');
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);