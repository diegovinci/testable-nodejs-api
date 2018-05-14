const booksController = require('../controllers/books');

const booksRoute = (app, books) => {
  app.route('/books')
    .get((req, res) => {
      books.findAll({})
        .then(result => res.json(result))
        .catch(err => res.status(412).send(err)); // 412 Precondition Failed
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
        .then(() => res.sendStatus(204)) // 204 No Content
        .catch(err => res.status(412).send(err));
    });
};

module.exports = booksRoute;
