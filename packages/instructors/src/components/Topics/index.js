import Grid from '@material-ui/core/Grid';
import React from 'react';

import { TopicsList } from './TopicsList';

class TopicsMasterContainer extends React.Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8} lg={7}>
          <TopicsList />
        </Grid>
      </Grid>
    );
  }
}

export { TopicsMasterContainer };
