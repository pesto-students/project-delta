import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { getActiveBatches } from '../../services/batch';
import { DEFAULT_PROFILE_PIC_URL as defaultProfilePicUrl } from '../../config';
import { LoginHeader, LoginFooter } from '../../../../shared-components/LoginComponents';
import { userProfilePropType } from './userProfilePropType';
import { uploadFile } from '../../services/firebase';

export class StudentProfileEditComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.userData,
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
    this.setState({ batchCity: e.target.value, batchNumber: undefined });
  }

  handleProfilePicUpload(e) {
    const userId = this.state._id;
    const newProfilePic = e.target.files[0];
    uploadFile(newProfilePic, userId)
      .then(url => this.setState({ profilePicUrl: url }))
      .catch(console.error); // eslint-disable-line no-console
  }

  handleSubmit() {
    const userObj = { ...this.state };
    delete userObj.loading;
    this.props.handleSaveBtnClick(userObj);
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <LoginHeader />
        </Grid>

        <Grid item container xs={12} md={8}>
          <form id="form-profile-edit" onSubmit={this.handleSubmit}>
            <Grid item xs={6} md={4} style={{ height: '200px' }}>
              <label
                className="profile-pic"
                htmlFor="profilePic"
                style={{
                  backgroundImage: `url(${this.state.profilePicUrl || defaultProfilePicUrl})`,
                  backgroundSize: 'cover',
                  display: 'block',
                  height: '100%',
                  width: '100%',
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
              </label>
            </Grid>

            <Grid item container xs={6}>
              <Grid item xs={12}>
                <label htmlFor="firstName">
                  First name:
                  <input type="text" id="firstName" name="firstName" required value={this.state.firstName} onChange={this.handleChange} />
                </label>
              </Grid>

              <Grid item xs={12}>
                <label htmlFor="lastName">
                  Last name:
                  <input type="text" id="lastName" name="lastName" required value={this.state.lastName} onChange={this.handleChange} />
                </label>
              </Grid>

              <Grid item xs={12}>
                <label htmlFor="email">
                  Email:
                  <input type="email" id="email" name="email" required value={this.state.email} disabled />
                </label>
              </Grid>

              <Grid item xs={12}>
                <span>Batch City:</span>
                <select id="batchCity" name="batchCity" required value={this.state.batchCity} onChange={this.handleBatchCityChange}>
                  <option value="">Select city --</option>
                  {!this.state.loading
                    ? Reflect.ownKeys(this.cityWiseBatches)
                      .sort()
                      .map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))
                    : null}
                </select>

                <span>#:</span>
                <select id="batchNumber" name="batchNumber" required value={this.state.batchNumber} onChange={this.handleChange}>
                  <option value="">Select # --</option>
                  {!this.state.loading && this.state.batchCity
                    ? this.cityWiseBatches[this.state.batchCity]
                      .map(batch => batch.batchNumber)
                      .map(num => (
                        <option key={`${this.state.batchCity}|${num}`} value={num}>{num}</option>
                      ))
                    : null}
                </select>
              </Grid>

              <button type="submit" onClick={this.handleSubmit}>Save</button>
              <button type="button" onClick={this.props.handleCancelBtnClick}>Cancel</button>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} md={8}>
          <LoginFooter />
        </Grid>
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
