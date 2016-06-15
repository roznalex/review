import React from 'react';
import { render } from 'react-dom';
import Root from 'components/Root';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as AppConfigs from 'config';
import configureStore from 'store/configureStore';
toastr.options = AppConfigs.toastrOptions;

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('app')
);