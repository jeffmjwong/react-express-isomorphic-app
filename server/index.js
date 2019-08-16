import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';

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

app.get('/', (req, res) => {
  readFile(path.resolve(__dirname, '../public/index.html'), 'utf8')
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.get('/api/mock-questions', (req, res) => {
  readFile(path.resolve(__dirname, '../mock-data/mock-questions.json'), 'utf8')
    .then(result => {
      console.log(result);
      res.send(JSON.parse(result));
    })
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}...`);
});
