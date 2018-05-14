const BooksController = require('../../../controllers/books');
const td = require('testdouble');

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
      // Fazendo um mock do model
      const books = {
        findAll: td.function(), // Listener para identificar quando a função findAll será chamada
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2018-04-21T20:28:29.786',
        updated_at: '2018-04-21 20:28:29.786',
      }];

      td.when(books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(books);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a book: getById()', () => {
    it('should return a book', () => {
      // Fazendo mock do model
      const books = {
        // Mockando função findOne()
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2018-04-21T20:28:29.786',
        updated_at: '2018-04-21 20:28:29.786',
      };

      // Quando a função findOne referente ao mock de Books do testdouble for chamada, passando
      // id: 1 (req.params da rota /books/:id), solta a expectedResponse
      td.when(books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(books);
      return booksController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a book: create()', () => {
    it('should create a book', () => {
      const books = {
        // Mockando função create()
        create: td.function(),
      };

      // req.body simulando um post
      const requestBody = {
        name: 'Test Book',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2018-04-21T20:28:29.786',
        updated_at: '2018-04-21 20:28:29.786',
      };

      // Quando a função create referente ao mock de Books do testdouble for chamada, passando
      // requestBody (simulação de um post), solta a expectedResponse
      td.when(books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(books);
      return booksController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201)
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a book: update()', () => {
    it('should update an existing book', () => {
      const books = {
        // Mockando função update()
        update: td.function(),
      };

      // req.body simulando um post
      const requestBody = {
        id: 1,
        name: 'Test Book Updated',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book Updated',
        created_at: '2018-04-21T20:28:29.786',
        updated_at: '2018-04-21 20:28:29.786',
      };

      // Quando a função update referente ao mock de Books do testdouble for chamada, passando
      // requestBody e id (simulação de um put), solta a expectedResponse
      td.when(books.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(books);
      return booksController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a book: delete()', () => {
    it('should delete an existing book', () => {
      const books = {
        // Mockando função destroy()
        destroy: td.function(),
      };

      // Quando a função destroy referente ao mock de Books do testdouble for chamada, passando
      // id: 1 (req.params da rota /books/:id), solta a expectedResponse
      td.when(books.destroy({ where: { id: 1 } })).thenResolve({}); // retorna objeto vazio

      const booksController = new BooksController(books);
      return booksController.destroy({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204)); // Validadndo status code correto
    });
  });
});
