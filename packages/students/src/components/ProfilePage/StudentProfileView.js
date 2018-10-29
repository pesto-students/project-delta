import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { LoginHeader, LoginFooter } from '../../../../shared-components/LoginComponents';
import { DEFAULT_PROFILE_PIC_URLS as defaultProfilePicUrls } from '../../config';
import { userProfilePropType } from './userProfilePropType';

import './StudentProfileView.css';

export function StudentProfileViewComponent({ handleEditBtnClick, userData }) {
  let defaultProfilePicUrl;
  if (userData.sex === 'm') defaultProfilePicUrl = defaultProfilePicUrls.male;
  else if (userData.sex === 'f') defaultProfilePicUrl = defaultProfilePicUrls.female;
  else defaultProfilePicUrl = defaultProfilePicUrls.default;

  const profilePicUrl = userData.profilePicUrl || defaultProfilePicUrl;

  let sex;
  if (userData.sex === 'm') sex = 'Male';
  else if (userData.sex === 'f') sex = 'Female';
  else sex = 'A Mystery';

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={7}><LoginHeader /></Grid>

      <Grid item xs={12} md={8} lg={7} className="navigation">
        <NavLink
          to="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 0',
            fontSize: '1.5em',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          &lt;- To dashboard
        </NavLink>
      </Grid>

      <Grid item container className="profile" xs={12} md={8} lg={7} justify="center" spacing={40}>
        <Grid item xs={10} md={5} className="profile-pic">
          <img
            src={profilePicUrl}
            alt={`${userData.firstName} ${userData.lastName}`}
            title="Profile Picture"
          />
        </Grid>

        <Grid item container xs={10} md={7} className="profile-details">
          <Grid item container className="name" spacing={8}>
            <Grid item xs={4}>Name:</Grid>
            <Grid item className="first-name">{userData.firstName}</Grid>
            <Grid item className="last-name">{userData.lastName}</Grid>
          </Grid>

          <Grid item container className="email">
            <Grid item xs={4}>Email:</Grid>
            <Grid item className="email-address">{userData.email}</Grid>
          </Grid>

          <Grid item container className="batch" spacing={8}>
            <Grid item xs={4}>Batch:</Grid>
            <Grid item className="batch-city">{userData.batchCity}</Grid>
            <Grid item className="batch-number">
              {userData.batchNumber === undefined ? '' : `#${userData.batchNumber}`}
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={4}>Date of Birth:</Grid>
            <Grid item className="date-of-birth">{userData.dob || 'Unknown'}</Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={4}>Sex:</Grid>
            <Grid item className="sex">{sex}</Grid>
          </Grid>

          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditBtnClick}
              style={{ width: '100%' }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={10} md={8} lg={7}><LoginFooter /></Grid>
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
