import React from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

export const NavItem = props => {
  const _className = classNames('nav-item', {dropdown: props.dropdown}, props.className);
  return (
    <li {...props} className={_className}>
      { props.children }
    </li>
  );
};

export const DropdownToggle = props => {
  return (
    <a className="nav-link" data-toggle="dropdown" role="button" {...props}>
      {props.children}
    </a>);
};

export const DropdownMenu = props => {
  return <div className="dropdown-menu" {...props}>{props.children}</div>;
};

export const Navbar = props => {
  const _className = classNames('navbar overman-navbar', props.className);

  return (
    <header className="overman-navbar-wrapper">
      <nav className={_className}>
        <div className="container">
          <button className="navbar-toggler hidden-md-up" type="button" data-toggle="collapse"
                  data-target="#mobile-nav">
            &#9776;
          </button>
          <a className="navbar-brand hidden-sm-down" style={{cursor: 'pointer'}}
             onClick={() => browserHistory.push('/')}><img src="assets/img/logo.png" alt="Overman"/></a>

          <div className="navbar-toggleable-sm hidden-sm-down" id="header-nav">
            <ul className="nav navbar-nav pull-right">
              {props.children}
            </ul>
          </div>
          <div className="collapse navbar-toggleable-sm hidden-md-up overman-mobile-nav" id="mobile-nav">
            <ul className="nav navbar-nav">
              {props.children}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

NavItem.propTypes = {
  dropdown: React.PropTypes.bool
};