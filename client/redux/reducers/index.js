import { combinedReducers } from 'redux';

import questionReducer from './questionReducer';

const rootReducer = combinedReducers({
  questions: questionReducer,
})

export default rootReducer;
