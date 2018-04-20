const config = {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'books.sqlite',
    operatorsAliases: false,
    define: {
      underscored: true
    }
  }
};

module.exports = config;