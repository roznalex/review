import React from 'react';
import { If, Then, Else } from 'react-if';
import { browserHistory } from 'react-router';
import {
  Navbar,
  NavItem,
  DropdownToggle,
  DropdownMenu
} from 'components';

const Header = props => {
  const options = props.options || {};

  return (
    <Navbar brand="Overman">
      <If condition={options.showAuthButton !== false}>
        <Then>
          <If condition={!props.auth.loggedIn}>
            <Then>
              <NavItem>
                <a onClick={() => browserHistory.push('/login')} className="login-btn">Войти</a>
              </NavItem>
            </Then>
            <Else>
              <NavItem dropdown={true} className="profile">
                <DropdownToggle>Профиль</DropdownToggle>
                <DropdownMenu>
                  <a onClick={() => browserHistory.push('/profile')} className="dropdown-item">
                    Редактировать
                  </a>
                  <a onClick={props.onLogout} className="dropdown-item">
                    Выйти
                  </a>
                </DropdownMenu>
              </NavItem>
            </Else>
          </If>
        </Then>
      </If>
    </Navbar>
  );
};

export default Header;