const books = (sequelize, dataType) => {
  const books = sequelize.define('books', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });
  return books
}

module.exports = books;
