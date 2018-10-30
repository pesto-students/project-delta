import Grid from '@material-ui/core/Grid';
import React from 'react';

import { ExerciseList } from './ExerciseList';
import { ExerciseModifyContainer } from './ExerciseModifyContainer';

class ExerciseMasterContainer extends React.Component {
  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12} md={8} lg={7}>
          <ExerciseList />
        </Grid>
        <Grid item xs={12} md={4} lg={5}>
          <ExerciseModifyContainer />
        </Grid>
      </Grid>
    );
  }
}

export { ExerciseMasterContainer };
