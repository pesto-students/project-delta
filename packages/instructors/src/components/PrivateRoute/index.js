import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { validateLogin } from './action';
import { PrivateRouteComponent } from './PrivateRoute';

const mapStateToProps = state => ({
  authUser: state.authUser,
});

const mapDispatchToProps = dispatch => ({
  validateLogin: bindActionCreators(validateLogin, dispatch),
});

export const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(PrivateRouteComponent);
