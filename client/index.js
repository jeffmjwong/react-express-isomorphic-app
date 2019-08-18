import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './redux/configureStore';
import App from './components/App';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <ReduxProvider store={store}>
      <Component />
    </ReduxProvider>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const nextApp = require('./components/App').default;
    render(nextApp);
  });
}
