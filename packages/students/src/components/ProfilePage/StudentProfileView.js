import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { BlockButton } from '../../../../shared-components/BlockButton';
import { HeaderComponent } from '../../../../shared-components/Header';
import { FooterComponent } from '../../../../shared-components/Footer';
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
      <Grid item xs={12} md={8}><HeaderComponent /></Grid>

      <Grid item xs={12} md={8} className="navigation">
        <NavigateToDashboardComponent />
      </Grid>

      <Grid className="profile" container justify="center" item xs={12} md={8} spacing={40}>
        <Grid
          container
          justify="center"
          item
          xs={12}
          sm={5}
          className="profile-pic"
        >
          <div
            className="profile-pic-holder"
            style={{
              backgroundImage: `url('${profilePicUrl}')`,
              backgroundSize: 'cover',
              height: '250px',
              width: '250px',
            }}
          />
        </Grid>

        <Grid
          direction="column"
          alignItems="center"
          item
          xs={12}
          sm={7}
          className="profile-details"
        >
          <ProfileDetailComponent name="Name" value={`${userData.firstName} ${userData.lastName}`} />
          <ProfileDetailComponent name="Email" value={userData.email} />
          <ProfileDetailComponent name="Batch" value={`${userData.batchCity} #${userData.batchNumber}`} />
          <ProfileDetailComponent name="DOB" value={userData.dob || 'Unknown (very old)'} />
          <ProfileDetailComponent name="Sex" value={sex} />

          <BlockButton onClick={handleEditBtnClick}>EDIT</BlockButton>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8} style={{ paddingTop: '30px' }}><FooterComponent /></Grid>
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
    <Paper style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      marginBottom: '20px',
    }}
    >
      <span>{`${name}:`}</span>
      <span>{value}</span>
    </Paper>
  );
}

ProfileDetailComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
