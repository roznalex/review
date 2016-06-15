import React, { PropTypes } from 'react';
import { Page, Section } from 'components';
import validate from './validation/AuthFormValidation';
import showError from 'utils/showError';
import { If, Then, Else } from 'react-if';
import { Link } from 'react-router';
import classNames from 'classnames';

export class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.headerOptions = {
      showAuthButton: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const data = {
      email   : this.props.form.email,
      password: this.props.form.password
    };

    const error = validate(data);

    if (!error) {
      this.props.onSubmit(data, this.type);
    } else {
      this.props.onValidationFail(error);
    }
  };

  componentWillMount() {
    this.props.onSdkLoad();
  }

  render() {
    const props = this.props;
    const auth = props.auth;
    const form = props.form;
    const error = form.error;
    const loadSdk = props.loadSdk;
    this.type = props.route.path;

    return (
      <Page isFetching={auth.isFetching} showFooter={false} headerOptions={this.headerOptions}>
        {loadSdk.isFetching ? <div>LOADING</div> :
          <Section>
            <form onSubmit={this.handleSubmit.bind(this)} defaultIsVisible={true}>
              <div className="row">
                <div className="col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2 loginpage-wrapper">
                  <div className="page-header">
                    <h1>
                      {this.type === 'login' ? 'Вход на' : 'Регистрация в'} Overman
                    </h1>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-login-email">
                      <div className={classNames('form-group', {'has-danger': error && error.email})}>
                        <input className="form-control"
                               type="email"
                               placeholder="Email"
                               required="true"
                               value={form.email || ''}
                               onChange={props.onFieldChange.bind(this, 'email')}/>
                        {showError(error, 'email')}
                      </div>
                      <div className={classNames('form-group', {'has-danger': error && error.password})}>
                        <input className="form-control"
                               type="password"
                               placeholder="Пароль"
                               required=""
                               value={form.password || ''}
                               onChange={props.onFieldChange.bind(this, 'password')}/>
                        {showError(error, 'password')}
                      </div>
                      <If condition={this.type === 'login'}>
                        <Then>
                          <div>
                            <div>
                              <button
                                className="btn btn-primary btn-lg signIn-btn"
                                type='submit'
                                disabled={ auth.isFetching }>
                                Войти
                              </button>
                            </div>
                          </div>
                        </Then>
                        <Else>
                          <div>
                            <button
                              className="btn btn-primary btn-lg signIn-btn"
                              type='submit'
                              disabled={ auth.isFetching }>
                              Зарегистрироваться
                            </button>
                          </div>
                        </Else>
                      </If>
                    </div>
                    <div className="col-sm-6 col-social-login">
                      <p className="no-overman">
                        <button type="button"
                                className="btn btn-default btn-lg btn-social-login"
                                name="social_auth"
                                value="google"
                                onClick={props.onSocialClick.bind(this, 'google')}>
                          <i className="icon-social-login icon-social-login__google btn-social-login"/>
                          Войти через Google
                        </button>
                      </p>
                      <p className="no-overman">
                        <button type="button"
                                className="btn btn-default btn-lg btn-social-login"
                                name="social_auth"
                                value="facebook"
                                onClick={props.onSocialClick.bind(this, 'facebook')}>
                          <i className="icon-social-login icon-social-login__facebook btn-social-login"> </i>
                          Войти через Facebook
                        </button>
                      </p>
                      <p className="no-overman">
                        <button type="button"
                                className="btn btn-default btn-lg btn-social-login"
                                name="social_auth"
                                value="linkedin"
                                onClick={props.onSocialClick.bind(this, 'linkedin')}>
                          <i className="icon-social-login icon-social-login__linkedin btn-social-login"/>
                          Войти через LinkedIn
                        </button>
                      </p>
                    </div>
                  </div>
                  <br/><br/>
                  <If condition={this.type === 'login'}>
                    <Then>
                      <p className="text-center"><Link to="/register">Зарегистрироваться</Link> / <Link
                        to="/restore-password">Забыли
                        пароль?</Link></p>
                    </Then>
                    <Else>
                      <div>
                        Уже есть аккаунт? <Link to="/login">Войти на Overman</Link>
                      </div>
                    </Else>
                  </If>
                </div>
              </div>
            </form>
          </Section>}
      </Page>);
  }
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AuthForm;
