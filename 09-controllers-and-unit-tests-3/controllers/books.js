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
  getById(params) { // recebe id por parâmetro
    return this.books.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }
  create(data) { // recebe request body por parâmetro
    return this.books.create(data)
      .then(result => defaultResponse(result, 201)) // 201 Created
      .catch(error => errorResponse(error.message, 422)); // 422 Unprocessable Entity
  }
  update(data, params) { // recebe request body + id
    return this.books.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, 422));
  }
  destroy(params) { // recebe id por parâmetro
    return this.books.destroy({ where: params })
      .then(result => defaultResponse(result, 204)) // result vazio + status code 204 No Content
      .catch(error => errorResponse(error.message, 422));
  }
}

module.exports = BooksController;
