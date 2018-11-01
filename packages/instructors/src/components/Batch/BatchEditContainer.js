import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

import { BatchEdit } from './BatchEdit';
import { BatchExerciseList } from './BatchExercise';
import { BatchTopic } from './BatchTopic';

export const BatchEditContainer = ({ match }) => (
  <Grid container justify="center" spacing={16}>
    <Grid item xs={12}>
      <BatchEdit batchId={match.params.batchId} />
    </Grid>
    <Grid item xs={12} md={8} lg={6}>
      <BatchTopic />
    </Grid>
    <Grid item xs={12} md={8} lg={6}>
      <BatchExerciseList />
    </Grid>
  </Grid>
);

BatchEditContainer.propTypes = {
  match: PropTypes.shape().isRequired,
};
