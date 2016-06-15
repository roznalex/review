import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  HomePage,
  AskEmail,
  Auth,
  NotFound,
  Profile,
  RestorePassword
} from 'containers';
import { App } from 'components';

const getRoutes = (store) => {
  function requireLogin(nextState, replace, cb) {
    if (!store.getState().auth.loggedIn) {
      replace({
        pathname: '/login',
        state   : {nextPathname: nextState.location.pathname}
      });
    }

    cb();
  }

  function notLoggedIn(nextState, replace, cb) {
    if (store.getState().auth.loggedIn) {
      replace({
        pathname: '/',
        state   : {nextPathname: nextState.location.pathname}
      });
    }

    cb();
  }

  function emailNotConfirmed(nextState, replace, cb) {
    if (!store.getState().auth.noEmail) {
      replace({
        pathname: '/',
        state   : {nextPathname: nextState.location.pathname}
      });
    }

    cb();
  }

  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={HomePage}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="profile" component={Profile}/>
      </Route>

      { /* Routes requiring to be not logged in */ }
      <Route onEnter={notLoggedIn}>
        <Route path="login" component={Auth}/>
        <Route path="register" component={Auth}/>
        <Route path="restore-password" component={RestorePassword}/>
        <Route path="ask-email" component={AskEmail} onEnter={emailNotConfirmed}/>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};

export default getRoutes;