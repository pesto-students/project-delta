import { UPDATE_TITLE, ADD_ALERT, REMOVE_ALERT } from '../../constants/AppLayout';

const initialState = {
  hasAlert: false,
  alertType: '',
  message: '',
  title: '',
};


export const appLayout = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };

    case ADD_ALERT:
      return {
        ...state,
        hasAlert: true,
        alertType: action.alertType,
        message: action.message,
      };

    case REMOVE_ALERT:
      return {
        ...state,
        hasAlert: false,
        alertType: '',
        message: '',
      };

    default:
      return state;
  }
};
