import { combineReducers } from 'redux';

import { topics } from '../components/Topics/reducers';
import { authUser } from '../components/Routes/reducers';
import { appLayout } from '../components/Layout/reducers';
import { exercises } from '../components/Exercise/reducers';

export const appReducers = combineReducers({
  topics,
  authUser,
  appLayout,
  exercises,
});
