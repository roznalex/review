import React from 'react';
import { Provider } from 'react-redux';
import { DevTools } from 'containers';
import { Router } from 'react-router';
import getRoutes from 'routes';

const Root = ({store, history}) =>
  <Provider store={store} key="provider">
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {getRoutes(store, history)}
      {typeof __DEV__ !== 'undefined' && <DevTools />}
    </Router>
  </Provider>;

export default Root;