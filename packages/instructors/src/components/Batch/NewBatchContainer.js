import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import { NotificationBlock } from '../../../../shared-components/NotificationBlock';
import { BatchForm } from './BatchForm';
import { MSGS } from '../../constants/MSGS';
import { validateBatchInfo } from './validateBatch';
import { creatNewBatch } from '../../services/batch';

import './style.css';

class NewBatchContainer extends Component {
  state = {
    isLoading: false,
    errorStatus: '',
    message: '',
  }

  updateError = (errorStatus, message) => {
    this.setState({
      isLoading: false,
      errorStatus,
      message,
    });
  }

  handleSubmit = (data) => {
    this.setState({
      isLoading: true,
    });
    const validateInfo = validateBatchInfo(data);
    if (validateInfo.isInfoValid) {
      creatNewBatch(data)
        .then(this.handleSuccess)
        .catch(this.handleError);
    } else {
      this.updateError('error', validateInfo.message);
    }
  }

  handleError = (err) => {
    const message = MSGS[err.error] ? MSGS[err.error] : MSGS.UNKNOWN_ERROR;
    this.updateError('error', message);
  }

  handleSuccess = () => {
    this.clearForm();
    this.updateError('success', MSGS.MAIL_SUCCESS);
  }

  removeNotification = () => {
    this.updateError('', '');
  }

  render() {
    const { isLoading, errorStatus, message } = this.state;
    return (
      <div className="form-container">
        <Grid container justify="center">

          <Grid item xs={12} md={8} lg={4}>
            {errorStatus === '' ?
              null :
              <NotificationBlock
                variant={errorStatus}
                message={message}
                onClose={this.removeNotification}
              />
            }
            <BatchForm
              isLoading={isLoading}
              handleSubmit={this.handleSubmit}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export { NewBatchContainer };
