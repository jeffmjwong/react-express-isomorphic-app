import { createStore } from 'redux';

import rootReducer from './reducers';

export default (defaultState = { test: 'booyah lol' }) => {
  return createStore(rootReducer, defaultState);
};
