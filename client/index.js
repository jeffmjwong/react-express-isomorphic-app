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

const fetchDataForLocation = (location) => {
  if (location.pathname === '/') {
    store.dispatch(questionActions.fetchQuestions());
  } else if (location.pathname.includes('questions')) {
    store.dispatch(questionActions.fetchQuestion(location.pathname.split('/')[2]));
  }
};

store.subscribe(() => {
  const state = store.getState();

  if (state.questions.length > 0) {
    render(App);
  }
});

fetchDataForLocation(browserHistory.location);
browserHistory.listen(fetchDataForLocation);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const nextApp = require('./components/App').default;
    render(nextApp);
  });
}
