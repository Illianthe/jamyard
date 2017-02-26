const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Server running on port', port);
});
