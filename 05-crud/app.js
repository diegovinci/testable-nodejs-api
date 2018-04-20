const express = require('express');
const config = require('./config/config');
const datasource = require('./config/datasource');
const bodyParser = require('body-parser');

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

// Model de books inicializado pelo sequelize
const books = app.datasource.models.books;

app.route('/books')
  .get((req, res) => {
    books.findAll({})
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .post((req, res) => {
    books.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(412));
  });

app.route('/books/:id')
  .get((req, res) => {
    books.findOne({ where: req.params })
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .put((req, res) => {
    books.update(req.body, { where: req.params })
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .delete((req, res) => {
    books.destroy({ where: req.params })
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412));
  });

module.exports = app;
