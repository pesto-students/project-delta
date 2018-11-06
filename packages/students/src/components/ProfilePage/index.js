import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { removeToken } from '../../../../shared-utils/services/loginToken';
import { LoadingIndicator } from '../../../../shared-components/LoadingIndicator/index';
import { getUserProfile, updateUserProfile } from '../../services/user';
import { StudentProfileViewComponent } from './StudentProfileView';
import { StudentProfileEditComponent } from './StudentProfileEdit';
import { userProfilePropType } from './shared';

export class ProfilePageComponent extends React.Component {
  constructor(props) {
    super(props);

    const isLoggedIn = !!props.user.email;
    const isNewUser = !props.user._id;
    const profileAlreadyRetrieved = !!props.user.firstName;

    // eslint-disable-next-line react/destructuring-assignment
    this.state = {
      authFailure: !isLoggedIn,
      editing: isNewUser,
      loading: !isNewUser && !profileAlreadyRetrieved,
    };

    this.toggleEditState = this.toggleEditState.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    if (!this.state.authFailure && this.state.loading) {
      getUserProfile()
        .then((data) => {
          this.props.setUserData(data);
          this.setState({ loading: false });
        })
        .catch((e) => {
          if (e.name === 'AuthError') {
            removeToken();
            this.setState({ loading: false, authFailure: true });
          } else if (e.name === 'UserNotFoundError') {
            this.setState({ loading: false, editing: true });
          } else {
            alert('There was an error retrieving your data from server!'); // eslint-disable-line no-alert
            console.error(e); // eslint-disable-line no-console
          }
        });
    }
  }

  toggleEditState() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  updateProfile(newData) {
    updateUserProfile(newData)
      .then((userData) => {
        this.props.setUserData({
          ...userData,
          ...newData, // batchCity and batchNumber come from here
          _id: userData._id,
        });
        this.setState({ editing: false });
      })
      .catch(console.error); // eslint-disable-line no-console
  }

  render() {
    if (this.state.authFailure) {
      return <Redirect to="/" />;
    }

    if (this.state.loading) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
          <LoadingIndicator />
        </Grid>
      );
    }

    if (this.state.editing) {
      return (
        <StudentProfileEditComponent
          handleSaveBtnClick={this.updateProfile}
          handleCancelBtnClick={this.toggleEditState}
          userData={this.props.user}
        />
      );
    }

    return (
      <StudentProfileViewComponent
        handleEditBtnClick={this.toggleEditState}
        userData={this.props.user}
      />
    );
  }
}

ProfilePageComponent.propTypes = {
  user: userProfilePropType.isRequired,
  setUserData: PropTypes.func.isRequired,
};
