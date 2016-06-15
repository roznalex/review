import React, { PropTypes } from 'react';
import { Page, Section } from 'components';

const RestorePasswordForm = props => {
  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit(props.form.email);
  };

  const form = props.form;
  const restorePassword = props.restorePassword;

  return (
    <Page isFetching={restorePassword.isFetching} showFooter={false}>
      <Section>
        <div className="row">
          <div className="col-sm-6">
            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-sm-9">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                           name="email"
                           id="email"
                           className="form-control"
                           value={form.email || ''}
                           onChange={props.onFieldChange.bind(this, 'email')}/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-success btn-lg form_btn"
                  type='submit'
                  disabled={ restorePassword.isFetching }>
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

RestorePasswordForm.propTypes = {
  onSubmit     : PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired
};

export default RestorePasswordForm;
