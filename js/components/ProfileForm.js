import React, { PropTypes } from 'react';
import { Page, Section } from 'components';

const ProfileForm = props => {
  const handleSubmit = e => {
    e.preventDefault();

    const fields = {
      name           : props.form.name,
      jobTitle       : props.form.jobTitle,
      skype          : props.form.skype,
      linkedinAddress: props.form.linkedinAddress
    };

    props.onSubmit(props.auth.user, fields);
  };

  const user = props.auth.user;
  const form = props.form;
  const profile = props.profile;

  return (
    <Page isFetching={profile.isFetching}>
      <Section>
        <div className="row">
          <div className="col-sm-6">
            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-sm-9">
                  <div className="form-group">
                    <label htmlFor="name">Имя и фамилия</label>
                    <input type="text"
                           name="name"
                           id="name"
                           className="form-control"
                           defaultValue={user.name || ''}
                           onChange={props.onFieldChange.bind(null, 'name')}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="linkedin_headline">
                      Ваша должность и место работы</label>
                    <input type="text"
                           name="linkedin_headline"
                           id="linkedin_headline"
                           placeholder="Director at Google Inc."
                           className="form-control"
                           defaultValue={user.jobTitle || ''}
                           onChange={props.onFieldChange.bind(null, 'jobTitle')}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="skype">Skype</label>
                    <input type="text"
                           name="skype"
                           id="skype"
                           className="form-control"
                           defaultValue={user.skype || ''}
                           onChange={props.onFieldChange.bind(null, 'skype')}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="linkedin">Ваш профиль LinkedIn</label>
                    <input type="url"
                           name="linkedin"
                           id="linkedin"
                           className="form-control"
                           defaultValue={user.linkedinAddress || ''}
                           onChange={props.onFieldChange.bind(null, 'linkedinAddress')}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                           name="email"
                           id="email"
                           className="form-control"
                           defaultValue={user.email || ''}
                           readOnly/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-success btn-lg form_btn"
                  type='submit'
                  disabled={ profile.isFetching }>
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </Page>
  );
};

ProfileForm.propTypes = {
  onSubmit     : PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired
};

export default ProfileForm;
