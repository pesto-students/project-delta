import { API_URL } from '../config';

export const HTTP = {
  POST: (url, body, headers = {}) => fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json()),
};
