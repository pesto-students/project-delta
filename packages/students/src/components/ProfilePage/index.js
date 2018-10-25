import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { LoadingIndicator } from '../../../../shared-components/LoadingIndicator/index';
import { getUserProfile, updateUserProfile } from '../../services/user';
import { StudentProfileViewComponent } from './StudentProfileView';
import { userProfilePropType } from './userProfilePropType';

function StudentProfileEditComponent() {
  return <div />;
}

export class ProfilePageComponent extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment
    this.state = {
      authFailure: false,
      editing: true,
      loading: true,
      user: {},
      ...this.props.location.state,
    };

    this.toggleState = this.toggleState.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    if (!this.state.editing) {
      // We got here from the dashboard, so the profile page should be pre-filled
      //   with the current user's data
      getUserProfile()
        .then(userData => this.setState({ loading: false, user: userData }))
        .catch((e) => {
          if (e.name === 'AuthError') {
            this.setState({ authFailure: true, loading: false });
          } else {
            alert('There was an error retrieving your data from server!'); // eslint-disable-line no-alert
            console.error(e); // eslint-disable-line no-console
          }
        });
    }
  }

  toggleState() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  updateProfile(newData) {
    updateUserProfile(newData)
      .then(userData => this.setState({ editing: false, user: userData }))
      .catch(console.error); // eslint-disable-line no-console
  }

  render() {
    if (this.state.loading) {
      return (
        <Grid container justify="center" style={{ height: '100%' }}>
          <LoadingIndicator />
        </Grid>
      );
    }

    if (this.state.authFailure) {
      return <Redirect to="/" />;
    }

    if (this.state.editing) {
      return (
        <StudentProfileEditComponent
          handleSaveBtnClick={this.updateProfile}
          handleCancelBtnClick={this.toggleState}
          userData={this.state.user}
        />
      );
    }

    return (
      <StudentProfileViewComponent
        handleEditBtnClick={this.toggleState}
        userData={this.state.user}
      />
    );
  }
}

ProfilePageComponent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      editing: PropTypes.bool,
      loading: PropTypes.bool,
      user: userProfilePropType,
    }),
  }),
};

ProfilePageComponent.defaultProps = {
  location: { state: { editing: false, loading: true, user: {} } },
};
