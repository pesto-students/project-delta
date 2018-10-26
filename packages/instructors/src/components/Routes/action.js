import { getCookie } from '../../../../shared-utils/services/cookie';
import { RECEIVE_LOGIN_VERIFY, REQUEST_LOGIN_VERIFY } from '../../constants/PrivateRoute';
import { verifyToken } from '../../services/authWaiting';

const requestLoginVerify = () => ({
  type: REQUEST_LOGIN_VERIFY,
});

const receiveLoginVerify = isUserLogged => ({
  type: RECEIVE_LOGIN_VERIFY,
  isUserLogged,
});

const validateLogin = () => async (dispatch) => {
  dispatch(requestLoginVerify());

  if (getCookie('token') === null) {
    dispatch(receiveLoginVerify(false));
    return;
  }

  try {
    const { authentication } = await verifyToken();
    dispatch(receiveLoginVerify(authentication === 'success'));
  } catch (error) {
    dispatch(receiveLoginVerify(false));
  }
};

export { validateLogin };
