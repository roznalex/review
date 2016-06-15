import fetch from 'isomorphic-fetch';
const API_ROOT = 'http://api.overman.io/';
const INVALIDATE_SERVER_CODE = 422;

export const CALL_API = (endpoint, options = {}) => {
  const fullUrl = endpoint.includes(API_ROOT) ? endpoint : API_ROOT + endpoint;

  const defaultOptions = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type'    : 'application/json'
    },
    mode: 'cors'
  };

  const body = options.body;

  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }

  const fetchParams = Object.assign({}, defaultOptions, options);

  return fetch(fullUrl, fetchParams)
    .then(response =>
      response.json()
        .then(json => ({
          json,
          response
        }))
    )
    .then(({json, response}) => {
      if (!response.ok) {
        if (response.status !== INVALIDATE_SERVER_CODE) {
          toastr.error(json.errorMessage);
        }
        return Promise.reject({
          error: json,
          response
        });
      }
      return json;
    });
};