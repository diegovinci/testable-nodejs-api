describe('Routes Books', () => {
  const books = app.datasource.models.books;
  const defaultBook = {
    id: 1,
    name: 'Default Book'
  };

  beforeEach(done => {
    books
      .destroy({where: {}}) // Limpa o db com destroy do sequelize
      .then(() => books.create(defaultBook)) // Cria registro padrão
      .then(() => done());
  });

  describe('Route GET /books', () => {
    it('should return a list of books', done => {
      request
        .get('/books')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBook.id)
          expect(res.body[0].name).to.be.eql(defaultBook.name);
          done(err);
        });
    });
  });
});
