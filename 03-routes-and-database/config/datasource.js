const sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let database = null;

const datatype = (app) => {
  if (!database) {
    const config = app.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );

    database = {
      sequelize,
      Sequelize,
      models: {}
    };

    // Sincroniza o db quando iniciar o app
    sequelize.sync().done(() => database);
  }
  return database;
};

module.export = datatype;
