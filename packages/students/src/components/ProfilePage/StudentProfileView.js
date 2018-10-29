import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { LoginHeader, LoginFooter } from '../../../../shared-components/LoginComponents';
import { getAppropriateDefaultProfilePic, userProfilePropType } from './shared';
import { NavigateToDashboardComponent } from './NavigateToDashboard';

export function StudentProfileViewComponent({ handleEditBtnClick, userData }) {
  const profilePicUrl = userData.profilePicUrl
    || getAppropriateDefaultProfilePic(userData.sex);

  let sex;
  if (userData.sex === 'm') sex = 'Male';
  else if (userData.sex === 'f') sex = 'Female';
  else sex = 'A real mystery';

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}><LoginHeader /></Grid>

      <Grid item xs={12} md={8} className="navigation">
        <NavigateToDashboardComponent />
      </Grid>

      <Grid className="profile" container justify="center" item xs={12} md={8}>
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          xs={10}
          md={5}
          className="profile-pic"
        >
          <div
            className="profile-pic-holder"
            style={{
              backgroundImage: `url('${profilePicUrl}')`,
              backgroundSize: 'cover',
              minHeight: '250px',
              minWidth: '250px',
            }}
          />
        </Grid>

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          item
          xs={12}
          md={7}
          className="profile-details"
          style={{ margin: '20px' }}
        >
          <ProfileDetailComponent name="Name" value={`${userData.firstName} ${userData.lastName}`} />
          <ProfileDetailComponent name="Email" value={userData.email} />
          <ProfileDetailComponent name="Batch" value={`${userData.batchCity} #${userData.batchNumber}`} />
          <ProfileDetailComponent name="DOB" value={userData.dob || 'Unknown (very old)'} />
          <ProfileDetailComponent name="Sex" value={sex} />

          <Grid container justify="center" item xs={12} sm={5} style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditBtnClick}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8} style={{ paddingTop: '30px' }}><LoginFooter /></Grid>
    </Grid>
  );
}

StudentProfileViewComponent.propTypes = {
  handleEditBtnClick: PropTypes.func.isRequired,
  userData: userProfilePropType,
};

StudentProfileViewComponent.defaultProps = {
  userData: {},
};

function ProfileDetailComponent({ name, value }) {
  return (
    <Grid container justify="space-evenly" style={{ marginBottom: '10px' }}>
      <Grid container justify="flex-end" item xs={2} sm={6} style={{ paddingRight: '30px' }}>
        {name}
        :
      </Grid>
      <Grid item xs={8} sm={6}>{value}</Grid>
    </Grid>
  );
}

ProfileDetailComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
