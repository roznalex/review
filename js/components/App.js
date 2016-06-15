import React from 'react';
import { GoogleAnalytics } from './index';

const App = props => {
  const googleAnalyticsKey = props.googleAnalyticsKey;
  const history = props.history;

  return (
    <div className="overman-app">
      { props.children }
      { googleAnalyticsKey ? <GoogleAnalytics account={googleAnalyticsKey} history={history}/> : null }
    </div>
  );
};

App.propTypes = {
  googleAnalyticsKey: React.PropTypes.string,
  history           : React.PropTypes.object
};

export default App;
