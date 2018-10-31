import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import { HeaderComponent } from '../../../../shared-components/Header';
import { FooterComponent } from '../../../../shared-components/Footer';

export class DashboardContainer extends Component {
  render() {
    return (
      <div className="login-container">
        <Grid container justify="center" style={{ height: '100%' }}>
          <Grid item xs={10} md={8} lg={7}>
            <HeaderComponent />
          </Grid>

          <Grid item xs={12} md={8} lg={7}>
            <Grid container justify="center">
              <Grid item xs={12} md={8} lg={6}>
                <h1 className="text-center">
                  Dashboard
                </h1>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={10} md={8} lg={7}>
            <FooterComponent />
          </Grid>
        </Grid>
      </div>
    );
  }
}
