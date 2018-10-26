import {
  REQUEST_LOGIN_VERIFY,
  RECEIVE_LOGIN_VERIFY,
} from '../../constants/PrivateRoute';

const initialState = {
  isLoggingIn: true,
  isUserLogged: false,
};

export const authUser = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_VERIFY:
      return {
        ...state,
        isLoggingIn: true,
      };

    case RECEIVE_LOGIN_VERIFY:
      return {
        ...state,
        isLoggingIn: false,
        isUserLogged: action.isUserLogged,
      };

    default:
      return state;
  }
};
