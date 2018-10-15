import { API_URL } from '../config';

export const HTTP = {
  POST: (url, body, headers = {}) => fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
    .then(response => response.json()),
};
