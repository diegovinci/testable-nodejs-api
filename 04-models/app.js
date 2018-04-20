const express = require('express');
const config = require('./config/config');
const datasource = require('./config/datasource');

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);

// Model de books inicializado pelo sequelize
const books = app.datasource.models.books;

app.route('/books')
  .get((req, res) => {
    books.findAll({})
      .then(result => res.json(result))
      .catch(err => res.status(412));
  });

module.exports = app;
