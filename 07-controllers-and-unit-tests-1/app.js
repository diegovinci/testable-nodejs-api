const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const datasource = require('./config/datasource');

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

// Model de books inicializado pelo sequelize
const { datasource: { models: books } } = app;

app.route('/books')
  .get((req, res) => {
    books.findAll({})
      .then(result => res.json(result))
      .catch(err => res.status(412).send(err));
  })
  .post((req, res) => {
    books.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(412).send(err));
  });

app.route('/books/:id')
  .get((req, res) => {
    books.findOne({ where: req.params })
      .then(result => res.json(result))
      .catch(err => res.status(412).send(err));
  })
  .put((req, res) => {
    books.update(req.body, { where: req.params })
      .then(result => res.json(result))
      .catch(err => res.status(412).send(err));
  })
  .delete((req, res) => {
    books.destroy({ where: req.params })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(412).send(err));
  });

module.exports = app;
