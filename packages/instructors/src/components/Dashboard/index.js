import React from 'react';

import { ExerciseReportContainer } from './ExerciseReport';
import { DashboardHeaderContainer } from './HeaderContainer';
import { TopicReportContainer } from './TopicReport';

const SimpleBarChart = () => (
  <React.Fragment>
    <DashboardHeaderContainer />
    <TopicReportContainer />
    <ExerciseReportContainer />
  </React.Fragment>
);

export const DashboardContainer = () => <SimpleBarChart />;
