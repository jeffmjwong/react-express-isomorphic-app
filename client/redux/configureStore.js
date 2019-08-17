import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import initialState from './reducers/initialState';

const configureStore = (initialState) => {
  const middlewareChain = process.env.NODE_ENV === 'development'
    ? [thunk, createLogger()]
    : [thunk]

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewareChain)
  );
};

export default configureStore;
