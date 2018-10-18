import { API_URL } from '../config';

// adds json-content-type and origin headers if not present
const processHeaders = (headers) => {
  const defaultHeaders = {
    'content-type': 'application/json; charset=utf-8',
    origin: window.origin,
  };

  return { ...defaultHeaders, ...headers };
};

// JSON.stringifies if appropriate, else passes it through
const processBody = (body, headers) => (
  /^application\/json/.test(headers['content-type'])
    && typeof body === 'object'
    ? JSON.stringify(body)
    : body
);

export const HTTP = {
  POST: (urlPath, body, headers = {}) => {
    const finalHeaders = processHeaders(headers);

    return fetch(`${API_URL}${urlPath}`, {
      method: 'POST',
      headers: finalHeaders,
      body: processBody(body, finalHeaders),
      credentials: 'include',
    }).then(response => response.json());
  },
};
