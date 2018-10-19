import React from 'react';
import PropTypes from 'prop-types';

import { getUserProfile, updateUserProfile } from '../../services/user';

function StudentProfileEditComponent() {
  return <div />;
}

function StudentProfileViewComponent() {
  return <div />;
}

export class ProfilePageComponent extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment
    this.state = {
      ...this.props.location.state,
      user: null,
    };

    if (!this.state.editing) {
      // We got here from the dashboard, so the profile page should be pre-filled
      //   with the current user's data
      getUserProfile()
        .then(userData => this.setState({ user: userData }))
        .catch(console.error); // eslint-disable-line no-console
    }

    this.toggleState = this.toggleState.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
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
    }),
  }),
};

ProfilePageComponent.defaultProps = {
  location: { state: { editing: false } },
};
