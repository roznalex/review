import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth';
import form from './form';
import loadSdk from './fetch';
import profile from './profile';
import candidate from './candidate';
import restorePassword from './restore';

const rootReducer = combineReducers({
  routing   : routerReducer,
  loadingBar: loadingBarReducer,
  form,
  auth,
  loadSdk,
  profile,
  restorePassword,
  candidate
});

export default rootReducer;
