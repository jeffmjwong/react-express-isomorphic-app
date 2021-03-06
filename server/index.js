import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import fetch from 'node-fetch';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import { realQuestionsUrl, realQuestionUrl } from '../mock-data/api-real-url';
import configureStore from '../client/redux/configureStore';
import App from '../client/components/App';

const port = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));
}

const readFile = async (filePath, encoding) => {
  try {
    return await fs.readFile(filePath, encoding);
  } catch(err) {
    throw err;
  }
};

const readJson = async (filePath, encoding) => {
  try {
    return await fs.readJson(filePath, encoding);
  } catch(err) {
    throw err;
  }
};

const getRequest = async (url, responseType = 'json') => {
  try {
    const response = await fetch(url);

    if (responseType === 'text') {
      return await response.text();
    } else {
      return await response.json();
    }
  } catch(err) {
    throw err;
  }
}

app.get(['/', '/questions/:id'], async (req, res) => {
  let useServerRender = true;

  const initialState = {
    questions: [],
  };

  const memoryHistory = createMemoryHistory({
    initialEntries: [req.path],
  });

  try {
    let index = await readFile(path.resolve(__dirname, '../public/index.html'), 'utf8');

    if (req.params.id) {
      const question_id = req.params.id;
      const data = await getRequest(realQuestionUrl(question_id));
      initialState.questions = [{...data.items[0], question_id}];
    } else {
      const data = await getRequest(realQuestionsUrl);
      initialState.questions = [...data.items];
    }

    if (useServerRender) {
      const store = configureStore(memoryHistory, initialState);
      const renderedApp = renderToString(
        <ReduxProvider store={store}>
          <ConnectedRouter history={memoryHistory}>
            <App />
          </ConnectedRouter>
        </ReduxProvider>
      );

      index = index.replace('<%= preloadedApplication %>', renderedApp);
    } else {
      index = index.replace('<%= preloadedApplication %>', 'Please wait while the application is loaded.');
    }
    res.send(index);
  } catch(err) {
    console.log(err);
    res.status(404).send(err.message);
  }
});

app.get('/api/mock-questions', (req, res) => {
  readJson(path.resolve(__dirname, '../mock-data/mock-questions.json'), 'utf8')
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.get('/api/mock-questions/:id', (req, res) => {
  readJson(path.resolve(__dirname, '../mock-data/mock-questions.json'), 'utf8')
    .then(result => {
      const question = result.items.find(q => String(q.question_id) === req.params.id);
      question.body = `Mock question body: ${req.params.id}`;

      const data = { items: [question] };
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.get('/api/real-questions', (req, res) => {
  getRequest(realQuestionsUrl)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.get('/api/real-questions/:id', (req, res) => {
  getRequest(realQuestionUrl(req.params.id))
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}...`);
});
