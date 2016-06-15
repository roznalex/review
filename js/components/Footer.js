import React from 'react';
import { Container, Row, Col } from 'helpers/bootstrap';

const Footer = props => {
  if (props.doNotShow) {
    return null;
  }

  const renderSocialIcon = (iconClass, url) => {
    if (!url || !iconClass) {
      return null;
    }

    return (
      <li className={'nav-item overman-footer-social-icon'}>
        <a href={url} target="_blank">
          <span className="fa-stack">
            <i className={`fa ${iconClass} fa-stack-1x`}/>
          </span>
        </a>
      </li>
    );
  };

  const renderSocialIcons = () => {
    return (
      <ul className='nav navbar-nav overman-footer-social pull-right'>
        { renderSocialIcon('fa-facebook', 'http://www.facebook.com') }
        { renderSocialIcon('fa-google-plus', 'http://www.twitter.com') }
        { renderSocialIcon('fa-linkedin', 'https://github.com') }
      </ul>
    );
  };

  return (
    <footer className="overman-footer navbar">
      <Container>
        <Row>
          <Col size={['xs-12', 'md-4']}>
            <p className="overman-footer-copyright">
              Overman &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </Col>
          <Col size={['xs-12', 'md-4']}>
          </Col>
          <Col size={['xs-12', 'md-4']}>
            {renderSocialIcons()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export const FooterAddress = props => {
  return (
    <div className="overman-footer-address">
      { props.children }
    </div>
  );
};

export default Footer;
