import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import * as questionActions from './redux/actions/questionActions';
import configureStore from './redux/configureStore';
import App from './components/App';

const browserHistory = createBrowserHistory();
const store = configureStore(browserHistory);

const render = (Component) => {
  ReactDOM.render(
    <ReduxProvider store={store}>
      <ConnectedRouter history={browserHistory}>
        <Component />
      </ConnectedRouter>
    </ReduxProvider>,
    document.getElementById('app')
  );
};

store.subscribe(() => {
  const state = store.getState();

  if (state.questions.length > 0) {
    render(App);
  }
});

store.dispatch(questionActions.fetchQuestions());

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const nextApp = require('./components/App').default;
    render(nextApp);
  });
}
