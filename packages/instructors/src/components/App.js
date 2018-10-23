import React from 'react';
import { Route } from 'react-router-dom';

import { BatchViewContainer } from './Batch/BatchViewContainer';

function AppComponent() {
  return (
    <React.Fragment>
      <Route path="/batch" exact component={BatchViewContainer} />
    </React.Fragment>
  );
}

export default AppComponent;
