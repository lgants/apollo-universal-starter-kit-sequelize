'use strict';

// var fs = require('fs');
// var path = require('path');
// var Sequelize = require('sequelize');

// import fs from 'fs';
// import path from 'path';
import Sequelize from 'sequelize';

import config from '../../../sequelizefile';

// import counter from './counter';

// var config = require('../config/config.js')[env];

// var basename = path.basename(__filename);

const db = {};
var sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// './src/database/models')

// fs
//   .readdirSync('./')
//   .filter(file => {
//     return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, './', file));
//     db[model.name] = model;
//   });

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

// console.log(__dirname + '/user.js');
// db.user = sequelize.import('./user.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.user = user;

var model = sequelize['import']('../../server/src/database/models/counter');
db[model.name] = model;

db['Counter'].associate(db);

// db.counter = counter();
// db.counter.associate(db);
// console.log('counter', counter);

export default db;
