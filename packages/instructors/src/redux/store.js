import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import { appReducers } from './reducers';

const configureStore = (initialState = {}) => {
  const middleWares = [ReduxThunk];

  return createStore(
    appReducers,
    initialState,
    applyMiddleware(...middleWares),
  );
};

export const store = configureStore();
