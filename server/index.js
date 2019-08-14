const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

// app.get('/html', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/', (req, res) => {
  res.status(200).send('Hello world from Express!');
});

app.listen(3001, () => {
  console.log('Express server listening on port 3001...');
});
