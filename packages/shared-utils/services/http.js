import { API_URL } from '../config';
import { getToken, hasToken } from './loginToken';

// adds json-content-type and origin headers if not present
const addDefaultReqHeaders = (headers) => {
  const defaultHeaders = {
    'content-type': 'application/json; charset=utf-8',
    origin: window.origin,
  };

  if (hasToken()) {
    defaultHeaders.authorization = getToken();
  }

  return { ...defaultHeaders, ...headers };
};

// JSON.stringifies if appropriate, else passes it through
const processReqBody = (body, headers) => (
  /^application\/json/.test(headers['content-type'])
    && typeof body === 'object'
    ? JSON.stringify(body)
    : body
);

const extractResponseBody = (res) => {
  if (/application\/json/.test(res.headers.get('content-type'))) {
    return res.json();
  }
  return res.text();
};

export const HTTP = {
  GET: (urlPath, headers = {}, shouldExtractResponseBody = true) => {
    const finalHeaders = addDefaultReqHeaders(headers);

    return fetch(`${API_URL}${urlPath}`, {
      headers: finalHeaders,
      credentials: 'include',
    }).then((response) => {
      if (shouldExtractResponseBody) {
        return extractResponseBody(response);
      }

      return response;
    });
  },

  POST: (urlPath, body, headers = {}, shouldExtractResponseBody = true) => {
    const finalHeaders = addDefaultReqHeaders(headers);

    return fetch(`${API_URL}${urlPath}`, {
      method: 'POST',
      headers: finalHeaders,
      body: processReqBody(body, finalHeaders),
      credentials: 'include',
    }).then((response) => {
      if (shouldExtractResponseBody) {
        return extractResponseBody(response);
      }

      return response;
    });
  },

  PUT: (urlPath, body, headers = {}, shouldExtractResponseBody = true) => {
    const finalHeaders = addDefaultReqHeaders(headers);

    return fetch(`${API_URL}${urlPath}`, {
      method: 'PUT',
      headers: finalHeaders,
      body: processReqBody(body, finalHeaders),
      credentials: 'include',
    }).then((response) => {
      if (shouldExtractResponseBody) {
        return extractResponseBody(response);
      }

      return response;
    });
  },

  DELETE: (urlPath, body, headers = {}, shouldExtractResponseBody = true) => {
    const finalHeaders = addDefaultReqHeaders(headers);

    return fetch(`${API_URL}${urlPath}`, {
      method: 'DELETE',
      headers: finalHeaders,
      body: processReqBody(body, finalHeaders),
      credentials: 'include',
    }).then((response) => {
      if (shouldExtractResponseBody) {
        return extractResponseBody(response);
      }

      return response;
    });
  },
};
