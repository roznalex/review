import { GOOGLE_SDK_SOURCE, GOOGLE_CLIENT_ID, FACEBOOK_SDK_SOURCE, FACEBOOK_APP_ID } from 'constants/config';

export const loadSdk = provider => {
  const sdkParams = getParams(provider);

  if (provider === 'facebook' && typeof FB !== 'undefined') {
    return;
  }
  if (provider === 'google' && typeof gapi !== 'undefined') {
    return;
  }

  if (sdkParams) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;

    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          if (sdkParams.callback && typeof sdkParams.callback === 'function') {
            sdkParams.callback();
            return Promise.resolve();
          }
        }
      };
    } else {
      script.onload = () => {
        if (sdkParams.callback && typeof sdkParams.callback === 'function') {
          sdkParams.callback();
        }
      };
    }
    script.src = sdkParams.src;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
  }
};

const googleAuth2Init = () => {
  gapi.load('auth2', () => {
    if (!window.googleLogin) {
      window.googleLogin = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID
      });
    }
  });
};

const facebookAuth2Init = () => {
  window.fbAsyncInit = function() {
    FB.init({
      appId  : FACEBOOK_APP_ID,
      cookie : true,
      xfbml  : true,
      version: 'v2.2'
    });
  };
};

const getParams = provider => {
  const SOCIAL_PROVIDERS = {
    google: {
      src     : GOOGLE_SDK_SOURCE,
      callback: googleAuth2Init
    },
    facebook: {
      src     : FACEBOOK_SDK_SOURCE,
      callback: facebookAuth2Init
    }
  };

  return SOCIAL_PROVIDERS[provider];
};