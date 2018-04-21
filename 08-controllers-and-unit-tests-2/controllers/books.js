const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
}, statusCode);

class BooksController {
  constructor(books) {
    this.books = books;
  }
  getAll() {
    return this.books.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }
}

module.exports = BooksController;
