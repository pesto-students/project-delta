import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeAlert } from './action';
import { AppLayout } from './AppLayout';

const mapStateToProps = (state) => {
  const {
    hasAlert, alertType, message, title,
  } = state.appLayout;
  return {
    hasAlert,
    alertType,
    message,
    title,
  };
};

const mapDispatchToProps = dispatch => ({
  removeAlert: bindActionCreators(removeAlert, dispatch),
});

export const AppLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(AppLayout);
