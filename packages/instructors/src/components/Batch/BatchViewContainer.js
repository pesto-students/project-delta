import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { AlertSnackBar } from '../../../../shared-components/AlertSnackBar';
import { FixedIconButton } from '../../../../shared-components/FixedIconButton';
import { MSGS } from '../../constants/MSGS';
import { getBatchList } from '../../services/batch';
import { updateTitle } from '../Layout/action';
import { BatchCard } from './BatchCard';

class BatchView extends Component {
  state = {
    error: '',
    batchList: [],
  };

  componentDidMount() {
    this.props.updateTitle('Batch Master');
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
    const batchCount = batchList.length;
    return (
      <React.Fragment>
        <AlertSnackBar open={error !== ''} onClose={this.clearError} message={error} />
        <Grid container spacing={16}>
          {batchList.map((batch, index) => (
            <Grid item xs={12} md={4} lg={3} key={batch._id}>
              <BatchCard batchInfo={batch} index={index} batchCount={batchCount} />
            </Grid>
          ))}
        </Grid>
        <FixedIconButton component={Link} to="/batch/new"><AddIcon /></FixedIconButton>
      </React.Fragment>
    );
  }
}

BatchView.propTypes = {
  updateTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateTitle: bindActionCreators(updateTitle, dispatch),
});

export const BatchViewContainer = connect(null, mapDispatchToProps)(BatchView);
