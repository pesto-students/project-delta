import React from 'react';
import Divider from '@material-ui/core/Divider';

import { ImageBoxComponent } from './ImageBox';

import logo from './assets/logo.png';

export function HeaderComponent() {
  return (
    <React.Fragment>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <h1>Project</h1>
          <ImageBoxComponent bgUrl={logo} style={{ borderRadius: '0px', marginLeft: '10px' }} />
        </div>
      </header>
      <Divider />
    </React.Fragment>
  );
}
