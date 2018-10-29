import { UPDATE_TITLE, ADD_ALERT, REMOVE_ALERT } from '../../constants/AppLayout';

const updateTitle = title => ({
  type: UPDATE_TITLE,
  title,
});

const showAlert = (alertType, message) => ({
  type: ADD_ALERT,
  alertType,
  message,
});

const removeAlert = () => ({
  type: REMOVE_ALERT,
});

export { updateTitle, showAlert, removeAlert };
