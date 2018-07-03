'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../../sequelizefile';

const basename = path.basename(__filename);
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// NOTE: change dirname to __dirname with config in spinrc file
const dirname = process.cwd();
const modelsDir = path.join(dirname, './src/database/models');

fs
  .readdirSync(modelsDir)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file !== 'index.js';
  })
  .forEach(file => {
    const model = sequelize.import(path.join(modelsDir, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
