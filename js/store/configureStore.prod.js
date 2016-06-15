import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from 'reducers';
import { loadState, saveState } from 'utils/localStorage';
import throttle from 'lodash/throttle';

const enhancer = compose(
  applyMiddleware(thunkMiddleware, loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
  }))
);

export default function configureStore() {
  const persistedState = loadState();
  const store = createStore(rootReducer, persistedState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  store.subscribe(throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }), 1000);

  return store;
}
