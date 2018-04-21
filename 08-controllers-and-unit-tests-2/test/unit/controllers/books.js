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
});
