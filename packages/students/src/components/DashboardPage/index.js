import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

export class DashboardContainer extends Component {
  render() {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <h1 className="text-center">Dashboard</h1>
      </Grid>
    );
  }
}
