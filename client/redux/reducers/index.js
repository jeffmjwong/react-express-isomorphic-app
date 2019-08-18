import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import questionReducer from './questionReducer';

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    questions: questionReducer,
  });
};

export default createRootReducer;
