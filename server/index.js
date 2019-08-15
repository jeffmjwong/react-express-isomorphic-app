import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.babel';

const port = process.env.PORT || 3001;
const app = express();
const compiler = webpack(webpackConfig);

// app.get('/html', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.get('/', (req, res) => {
//   res.status(200).send('Hello world from Express!');
// });

app.listen(port, () => {
  console.log(`Express server listening on port ${port}...`);
});
