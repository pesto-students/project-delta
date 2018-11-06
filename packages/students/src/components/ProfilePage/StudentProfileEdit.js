import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getActiveBatches } from '../../services/batch';
import { getAppropriateDefaultProfilePic, userProfilePropType } from './shared';
import { uploadFile } from '../../services/firebase';
import { LoadingIndicator } from '../../../../shared-components/LoadingIndicator/index';
import { NavigateToDashboardComponent } from './NavigateToDashboard';

import './StudentProfileEdit.css';

export class StudentProfileEditComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { ...props.userData },
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
          if (!Reflect.has(acc, batch.city)) acc[batch.city] = [];
          acc[batch.city].push(batch);
          return acc;
        }, {});
        this.setState({ loading: false });
      })
      .catch(console.error); // eslint-disable-line no-console
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: name === 'batchNumber' ? Number(value) : value,
      },
    }));
  }

  handleBatchCityChange(e) {
    const newCity = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        city: newCity,
        batchNumber: undefined,
      },
    }));
  }

  handleProfilePicUpload(e) {
    const userId = this.state.user._id;
    const newProfilePic = e.target.files[0];
    this.setState({ changingProfilePic: true });
    uploadFile(newProfilePic, userId)
      .then(url => this.setState(prevState => ({
        changingProfilePic: false,
        user: {
          ...prevState.user,
          profilePicUrl: url,
        },
      })))
      .catch(console.error); // eslint-disable-line no-console
  }

  handleSubmit(e) {
    e.preventDefault();

    // update batchId based on current batchCity and batchNumber selection
    const [batchId] = this.cityWiseBatches[this.state.user.city]
      .filter(batch => batch.batchNumber === this.state.user.batchNumber)
      .map(batch => batch._id);
    const userObj = { ...this.state.user, batchId };

    this.props.handleSaveBtnClick(userObj);
  }

  render() {
    const isNewUser = !this.state.user._id;
    const profilePicUrl = this.state.user.profilePicUrl
      || getAppropriateDefaultProfilePic(this.state.user.sex);

    const inputStyles = {
      width: '100%',
    };

    return (
      <Grid container direction="column" style={{ height: '100%' }}>
        <NavigateToDashboardComponent disabled={isNewUser} />

        <form id="form-profile-edit" onSubmit={this.handleSubmit}>
          <Grid container direction="row" className="form-profile-edit-container-inner">
            <Grid
              className="profile-edit-pic"
              container
              justify="center"
              item
              xs={12}
              md={5}
            >
              <label
                className="profile-pic"
                htmlFor="profilePic"
                style={{
                  backgroundImage: `url(${profilePicUrl})`,
                  backgroundSize: 'cover',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '250px',
                  width: '250px',
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

            <Grid
              className="profile-edit-details"
              container
              direction="column"
              alignItems="center"
              item
              xs={12}
              md={7}
            >
              <Grid container justify="space-between" item xs={8} md={10}>
                <Grid item xs={12} md={5}>
                  <TextField
                    label="First name"
                    name="firstName"
                    value={this.state.user.firstName}
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
                    value={this.state.user.lastName}
                    onChange={this.handleChange}
                    margin="normal"
                    style={inputStyles}
                    required
                  />
                </Grid>
              </Grid>

              <Grid container justify="space-between" item xs={8} md={10}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={this.state.user.email}
                    margin="normal"
                    style={inputStyles}
                    required
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container justify="space-between" item xs={8} md={10}>
                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    label="Batch City"
                    name="batchCity"
                    value={this.state.user.city}
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
                    value={this.state.user.batchNumber}
                    onChange={this.handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: true }}
                    style={inputStyles}
                    required
                  >
                    <option value="">Select # --</option>
                    {!this.state.loading
                      && this.state.user.city
                      && Reflect.has(this.cityWiseBatches, this.state.user.city)
                      ? this.cityWiseBatches[this.state.user.city]
                        .map(batch => batch.batchNumber)
                        .map(num => (
                          <option key={`${this.state.user.city}|${num}`} value={num}>{num}</option>
                        ))
                      : null}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container justify="space-between" item xs={8} md={10}>
                <Grid item xs={12} md={5}>
                  <TextField
                    type="date"
                    label="Date of Birth"
                    name="dob"
                    value={this.state.user.dob}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    style={inputStyles}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    label="Sex"
                    name="sex"
                    value={this.state.user.sex}
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
                className="profile-edit-btns"
                container
                justify="space-between"
                item
                xs={8}
                md={10}
                style={{ margin: '10px 0' }}
              >
                <Grid item xs={12} md={5}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '10px 0', minHeight: '50px' }}
                  >
                    SAVE
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={5}
                  style={isNewUser ? { cursor: 'not-allowed' } : {}}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={isNewUser}
                    onClick={this.props.handleCancelBtnClick}
                    style={{ margin: '10px 0', minHeight: '50px' }}
                  >
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
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
