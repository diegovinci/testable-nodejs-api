const dbConfig = {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'books.sqlite',
    define: {
      underscored: true
    }
  }
};

module.exports = dbConfig;
