import { HTTP as httpService } from '../../../shared-utils/services/http';
import { AuthError, ServerError, UserNotFoundError } from '../constants/errors';

// Returns a Promise that
//   resolves to:
//   - user data if valid token and user found in DB
//   rejects with:
//   - AuthError if invalid/expired token
//   - UserNotFoundError if valid token, but user not in DB
export function getUserProfile(id = 'me') { // eslint-disable-line no-unused-vars
  return httpService.GET(`/user/${id}`, undefined, undefined, false)
    .then((res) => {
      if (res.status === 500) {
        throw new ServerError();
      }

      if (res.status === 404) {
        throw new UserNotFoundError();
      }

      if (res.status === 401) {
        throw new AuthError();
      }

      return res.json();
    });
}

export function updateUserProfile(newData, id = 'me') { // eslint-disable-line no-unused-vars
  return httpService.POST(`/user/${id}`, newData);
}
