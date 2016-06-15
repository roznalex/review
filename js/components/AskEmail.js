import React from 'react';
import { Page, Section } from 'components';
import showError from 'utils/showError';
import validate from './validation/AskEmailValidation';

const AskEmail = props => {
  const form = props.form;
  const auth = props.auth;
  const error = form.error;
  const toConfirm = auth.toConfirm || {};

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: props.form.email
    };

    const error = validate(data);

    if (!error) {
      props.onSubmit(data.email, toConfirm);
    } else {
      props.onValidationFail(error);
    }
  };

  return (
    <Page isFetching={auth.isFetching} showFooter={false}>
      <Section>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="email">Нам нужем Ваш email, чтобы мы смогли отправлять вам письма. Обещаем, что
                      никакого спама от нас не будет!</label>
                    <input type="email"
                           name="email"
                           id="email"
                           className="form-control"
                           value={form.email || ''}
                           onChange={props.onFieldChange.bind(this, 'email')}/>
                    {showError(error, 'email')}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-success btn-lg form_btn"
                  type='submit'
                  disabled={ auth.isFetching }>
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </Page>
  );
};

export default AskEmail;