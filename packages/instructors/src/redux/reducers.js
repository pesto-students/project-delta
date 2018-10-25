import { combineReducers } from 'redux';

import { topics } from '../components/Topics/reducers';

export const appReducers = combineReducers({
  topics,
});
