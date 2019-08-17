import { combinedReducers } from 'redux';

import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'example':
      return { test: 'New test value from example action type!' };
    default:
      return state;
  }
};
