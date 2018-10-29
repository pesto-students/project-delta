import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { getActiveBatches } from '../../services/batch';
import { DEFAULT_PROFILE_PIC_URLS as defaultProfilePicUrls } from '../../config';
import { LoginHeader, LoginFooter } from '../../../../shared-components/LoginComponents';
import { userProfilePropType } from './userProfilePropType';
import { uploadFile } from '../../services/firebase';
import { LoadingIndicator } from '../../../../shared-components/LoadingIndicator/index';

import './StudentProfileEdit.css';

export class StudentProfileEditComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      batchId: '',
      batchCity: '',
      batchNumber: '',
      profilePicUrl: '',
      ...props.userData,
      changingProfilePic: false,
      loading: true,
    };

    this.cityWiseBatches = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBatchCityChange = this.handleBatchCityChange.bind(this);
    this.handleProfilePicUpload = this.handleProfilePicUpload.bind(this);
  }

  componentDidMount() {
    getActiveBatches()
      .then((batches) => {
        this.cityWiseBatches = batches.reduce((acc, batch) => {
          if (!Reflect.has(acc, batch.batchCity)) acc[batch.batchCity] = [];
          acc[batch.batchCity].push(batch);
          return acc;
        }, {});
        this.setState({ loading: false });
      })
      .catch(console.error); // eslint-disable-line no-console
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: name === 'batchNumber' ? Number(value) : value });
  }

  handleBatchCityChange(e) {
    this.setState({ batchCity: e.target.value, batchNumber: '' });
  }

  handleProfilePicUpload(e) {
    const userId = this.state._id;
    const newProfilePic = e.target.files[0];
    this.setState({ changingProfilePic: true });
    uploadFile(newProfilePic, userId)
      .then(url => this.setState({ changingProfilePic: false, profilePicUrl: url }))
      .catch(console.error); // eslint-disable-line no-console
  }

  handleSubmit(e) {
    e.preventDefault();

    // update batchId based on current batchCity and batchNumber selection
    const [batchId] = this.cityWiseBatches[this.state.batchCity]
      .filter(batch => batch.batchNumber === this.state.batchNumber)
      .map(batch => batch._id);
    const userObj = { ...this.state, batchId };
    delete userObj.loading;

    this.props.handleSaveBtnClick(userObj);
  }

  render() {
    const isNewUser = !this.state._id;

    let defaultProfilePicUrl;
    if (this.state.sex === 'm') defaultProfilePicUrl = defaultProfilePicUrls.male;
    else if (this.state.sex === 'f') defaultProfilePicUrl = defaultProfilePicUrls.female;
    else defaultProfilePicUrl = defaultProfilePicUrls.default;

    const profilePicUrl = this.state.profilePicUrl || defaultProfilePicUrl;

    const inputStyles = {
      width: '100%',
    };

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <LoginHeader />
        </Grid>

        <Grid item xs={12} md={8} className="navigation">
          {
            isNewUser
              ? (
                <span
                  className="disabled"
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
                </span>
              )
              : (
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
              )
          }
        </Grid>

        <Grid container direction="column" alignItems="center" item xs={12} md={8}>
          <form
            id="form-profile-edit"
            onSubmit={this.handleSubmit}
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              item
              xs={8}
              md={5}
            >
              <label
                className="profile-pic"
                htmlFor="profilePic"
                style={{
                  backgroundImage: `url(${profilePicUrl})`,
                  backgroundSize: 'cover',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '250px',
                  minWidth: '250px',
                }}
              >
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/png, image/jpeg"
                  onChange={this.handleProfilePicUpload}
                  style={{ display: 'none' }}
                />
                {this.state.changingProfilePic
                  ? <LoadingIndicator additionalStyles={{ width: '50px', height: '50px' }} />
                  : null}
              </label>
            </Grid>

            <Grid container justify="center" item xs={12} md={7}>
              <Grid container direction="row" justify="space-between" item xs={10}>
                <Grid item xs={12} md={5}>
                  <TextField
                    label="First name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    margin="normal"
                    style={inputStyles}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <TextField
                    label="Last name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    margin="normal"
                    style={inputStyles}
                    required
                  />
                </Grid>
              </Grid>

              <Grid item xs={10}>
                <TextField
                  label="Email"
                  name="email"
                  value={this.state.email}
                  margin="normal"
                  style={inputStyles}
                  required
                  disabled
                />
              </Grid>

              <Grid item direction="row" xs={10} container justify="space-between">
                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    label="Batch City"
                    name="batchCity"
                    value={this.state.batchCity}
                    onChange={this.handleBatchCityChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: true }}
                    style={inputStyles}
                    required
                  >
                    <option value="">Select city --</option>
                    {!this.loading
                      ? Reflect.ownKeys(this.cityWiseBatches)
                        .sort()
                        .map(city => <option key={city} value={city}>{city}</option>)
                      : null}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    label="Batch #"
                    name="batchNumber"
                    value={this.state.batchNumber}
                    onChange={this.handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: true }}
                    style={inputStyles}
                    required
                  >
                    <option value="">Select # --</option>
                    {!this.state.loading
                      && this.state.batchCity
                      && Reflect.ownKeys(this.cityWiseBatches, this.state.batchCity)
                      ? this.cityWiseBatches[this.state.batchCity]
                        .map(batch => batch.batchNumber)
                        .map(num => (
                          <option key={`${this.state.batchCity}|${num}`} value={num}>{num}</option>
                        ))
                      : null}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container direction="row" justify="space-between" item xs={10}>
                <Grid item xs={12} md={5}>
                  <TextField
                    type="date"
                    label="Date of Birth"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    style={{ ...inputStyles }}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    label="Sex"
                    name="sex"
                    value={this.state.sex}
                    onChange={this.handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: true }}
                    style={inputStyles}
                  >
                    <option value="">Select sex --</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </TextField>
                </Grid>
              </Grid>

              <Grid
                container
                justify="space-between"
                item
                xs={10}
                style={{ margin: '1em 0 2em 0' }}
              >
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ width: '100%' }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    disabled={isNewUser}
                    style={{ width: '100%' }}
                    onClick={this.props.handleCancelBtnClick}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} md={8}>
          <LoginFooter />
        </Grid>
      </Grid >
    );
  }
}

StudentProfileEditComponent.propTypes = {
  userData: userProfilePropType,
  handleCancelBtnClick: PropTypes.func.isRequired,
  handleSaveBtnClick: PropTypes.func.isRequired,
};

StudentProfileEditComponent.defaultProps = {
  userData: {},
};
