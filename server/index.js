import express from 'express';
import path from 'path';
import fs from 'fs';
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

// app.get('/html', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../public/index.html'), 'utf8', (err, data) => {
    if (err) {
      throw new Error(err.message);
    } else {
      res.send(data);
    }
  })
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}...`);
});
