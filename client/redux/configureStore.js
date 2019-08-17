import { createStore } from 'redux';

import rootReducer from './reducers';

const testState = {
  test: "Test value for default state",
};

export default (defaultState = testState) => {
  return createStore(rootReducer, defaultState);
};
