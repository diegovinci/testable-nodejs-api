const books = (sequelize, dataType) => {
  const booksSchema = sequelize.define('books', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return booksSchema;
};

module.exports = books;
