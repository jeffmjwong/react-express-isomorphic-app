import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';

const configureStore = (history, initialState) => {
  const middlewareChain = [routerMiddleware(history), thunk];

  if (process.env.NODE_ENV === 'development') {
    middlewareChain.push(createLogger());
  }

  return createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(...middlewareChain)
  );
};

export default configureStore;
