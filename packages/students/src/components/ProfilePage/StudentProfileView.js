import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import format from 'date-fns/format';

import { BlockButton } from '../../../../shared-components/BlockButton';
import { ImageBoxComponent } from '../../../../shared-components/ImageBox';
import { getAppropriateDefaultProfilePic, userProfilePropType } from './shared';
import { NavigateToDashboardComponent } from './NavigateToDashboard';

export function StudentProfileViewComponent({ handleEditBtnClick, userData }) {
  const profilePicUrl = userData.profilePicUrl
    || getAppropriateDefaultProfilePic(userData.sex);

  let sex;
  if (userData.sex === 'm') sex = 'Male';
  else if (userData.sex === 'f') sex = 'Female';
  else sex = 'A real mystery';

  const dob = userData.dob ? format(userData.dob, 'Do MMMM, YYYY') : 'Unknown (very old)';

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <NavigateToDashboardComponent />

      <Grid className="profile" container direction="row" justify="center" spacing={40}>
        <Grid
          container
          justify="center"
          item
          xs={12}
          md={5}
          className="profile-pic"
        >
          <ImageBoxComponent
            bgUrl={profilePicUrl}
            style={{
              height: '250px',
              width: '250px',
            }}
          />
        </Grid>

        <Grid
          container
          direction="column"
          item
          xs={12}
          sm={11}
          md={7}
          className="profile-details"
        >
          <ProfileDetailComponent name="Name" value={`${userData.firstName} ${userData.lastName}`} />
          <ProfileDetailComponent name="Email" value={userData.email} />
          <ProfileDetailComponent name="Batch" value={`${userData.city} #${userData.batchNumber}`} />
          <ProfileDetailComponent name="DOB" value={dob} />
          <ProfileDetailComponent name="Sex" value={sex} />

          <BlockButton onClick={handleEditBtnClick} style={{ marginBottom: '20px' }}>EDIT</BlockButton>
        </Grid>
      </Grid>
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
