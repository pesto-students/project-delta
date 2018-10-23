import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import { ErrorSnackBar } from '../../../../shared-components/ErrorSnackBar';
import { MSGS } from '../../constants/MSGS';
import { getBatchList } from '../../services/batch';
import { BatchCard } from './BatchCard';

class BatchViewContainer extends Component {
  state = {
    error: '',
    batchList: [],
  };

  componentDidMount() {
    getBatchList()
      .then(this.updateBatchList)
      .catch(this.handleError);
  }

  updateBatchList = (response) => {
    this.setState({
      batchList: response.batchList,
    });
  };

  handleError = () => {
    this.setState({
      error: MSGS.UNKNOWN_ERROR,
    });
  };

  clearError = () => {
    this.setState({
      error: '',
    });
  }

  render() {
    const { batchList, error } = this.state;
    return (
      <React.Fragment>
        <ErrorSnackBar open={error !== ''} onClose={this.clearError} message={error} />
        <Grid container>
          {batchList.map(batch => (
            <Grid item xs={12} md={4} lg={3} key={batch._id}>
              <BatchCard batchInfo={batch} />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export { BatchViewContainer };
