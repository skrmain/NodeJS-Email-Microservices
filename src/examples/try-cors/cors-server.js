const express = require('express');

const app = express();

const PORT = 8080;

app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', 'https://google.com');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, OPTIONS');
  next();
});

// app.get('/', (req, res) => res.send('Ok'));
app.get('/', (req, res) => res.send({ msg: 'Ok' }));

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));

// fetch()
//   .then((res) => res.text)
//   .then((res) => res);
