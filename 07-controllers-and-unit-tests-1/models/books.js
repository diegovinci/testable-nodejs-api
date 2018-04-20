const books = (sequelize, dataType) => {
  const booksModel = sequelize.define('books', {
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
  return booksModel;
};

module.exports = books;
