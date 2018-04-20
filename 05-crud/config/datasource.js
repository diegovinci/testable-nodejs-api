const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let database = null;

// Carregando dinamicamente os models da aplicação
const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    // Importando models para o sequelize
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};

const dataSource = (app) => {
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

    // Carregando os models ao iniciar a aplicação
    database.models = loadModels(sequelize);
    // Sincronizando o banco ao iniciar a aplicação
    sequelize.sync().done(() => database);
  }
  return database;
};

module.exports = dataSource;
