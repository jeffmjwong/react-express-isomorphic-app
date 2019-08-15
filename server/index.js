import express from 'express';
import path from 'path';
import webpack from 'webpack';

const port = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === 'development') {
  console.log('hello development')
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  console.log('hello production or something else')
}

// app.get('/html', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.get('/', (req, res) => {
//   res.status(200).send('Hello world from Express!');
// });

app.listen(port, () => {
  console.log(`Express server listening on port ${port}...`);
});
