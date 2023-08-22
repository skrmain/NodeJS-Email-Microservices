const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/', express.static(path.resolve(__dirname, './static')));

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
