import { combineReducers } from 'redux';

import { topics } from '../components/Topics/reducers';
import { authUser } from '../components/Routes/reducers';

export const appReducers = combineReducers({
  topics,
  authUser,
});
