import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.questions, action) => {
  switch (action.type) {
    case types.FETCH_QUESTIONS_SUCCESS:
      return [...action.questions];
    default:
      return state;
  }
};
