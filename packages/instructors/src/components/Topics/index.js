import Grid from '@material-ui/core/Grid';
import React from 'react';

import { TopicsList } from './TopicsList';
import { TopicModifyContainer } from './TopicModifyContainer';

class TopicsMasterContainer extends React.Component {
  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12} md={8} lg={7}>
          <TopicsList />
        </Grid>
        <Grid item xs={12} md={4} lg={5}>
          <TopicModifyContainer />
        </Grid>
      </Grid>
    );
  }
}

export { TopicsMasterContainer };
