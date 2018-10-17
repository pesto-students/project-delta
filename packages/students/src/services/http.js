import { mapObj } from '@ack_inc/util';
import { API_URL } from '../config';

const makeObjKeysLowerCase = obj => mapObj(obj, key => key.toLowerCase());

// adds json-content-type and origin headers if not present
const processHeaders = headers => ({
  'content-type': 'application/json; charset=utf-8',
  origin: window.origin,
  ...makeObjKeysLowerCase(headers),
});

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
    }).then(response => response.json());
  },
};
