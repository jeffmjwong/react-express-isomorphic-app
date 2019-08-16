import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import fetch from 'node-fetch';

import { realQuestionsUrl, realQuestionUrl } from '../mock-data/api-real-url';

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
}

const readFile = async (filePath, encoding) => {
  try {
    return await fs.readFile(filePath, encoding);
  } catch(err) {
    throw new Error(err.message);
  }
};

const readJson = async (filePath, encoding) => {
  try {
    return await fs.readJson(filePath, encoding);
  } catch(err) {
    throw new Error(err.message);
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
    throw new Error(err.message);
  }
}

app.get('/', (req, res) => {
  readFile(path.resolve(__dirname, '../public/index.html'), 'utf8')
    .then(result => res.send(result))
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
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
