import express from 'express';
import path from 'path';

const port = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

// app.get('/html', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/', (req, res) => {
  res.status(200).send('Hello world from Express!');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}...`);
});
