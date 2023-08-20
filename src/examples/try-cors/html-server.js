const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1>Hello World of CORS</h1>
</body>
</html>
`;

const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => res.send(html));

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
