const express = require('express');
const config = require('./config/config');
const datasource = require('./config/datasource');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

// Model de books inicializado pelo sequelize
const { datasource: { models: { books } } } = app;
booksRouter(app, books);

module.exports = app;
