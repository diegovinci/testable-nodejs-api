const express = require('express');

const app = express();

app.route('/books')
  .get((req, res) => {
    res.json([{
      id: 1,
      name: 'Default Book'
    }]);
  });

module.exports = app;
