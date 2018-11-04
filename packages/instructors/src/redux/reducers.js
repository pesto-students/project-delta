import { combineReducers } from 'redux';

import { topics } from '../components/Topics/reducers';
import { authUser } from '../components/Routes/reducers';
import { appLayout } from '../components/Layout/reducers';
import { exercises } from '../components/Exercise/reducers';
import { batches } from '../components/Batch/reducers';
import { dashboard } from '../components/Dashboard/reducers';

export const appReducers = combineReducers({
  topics,
  authUser,
  appLayout,
  exercises,
  batches,
  dashboard,
});
