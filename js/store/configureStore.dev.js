import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { DevTools } from 'containers';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';
import { loadState, saveState } from 'utils/localStorage';
import throttle from 'lodash/throttle';

const enhancer = compose(
  applyMiddleware(thunkMiddleware, loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
  })),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
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
