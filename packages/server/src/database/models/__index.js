import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import configjs from '../config/config';

const db = {};
var sequelize;
var basename = path.basename(__filename);

var env = process.env.NODE_ENV || 'development';
var config = configjs[env];
// connect to postgres db
// const sequelize = new Sequelize(config.postgres.db, config.postgres.user, config.postgres.passwd, {
//   dialect: 'postgres',
//   port: config.postgres.port,
//   host: config.postgres.host
// });

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// console.log(path.normalize(`${__dirname}/../server/models`));
const modelsDir = path.normalize(`${__dirname}/../src/database/models`);

console.log('dir', fs.readdirSync(modelsDir));
// loop through all files in models directory ignoring hidden files and this file
// fs
//   .readdirSync(modelsDir)
//   .filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
//   // import model files and save model names
//   .forEach(file => {
//     console.log(`Loading model file ${file}`);
//     const model = sequelize.import(path.join(modelsDir, file));
//     db[model.name] = model;
//   });

console.log(fs.readdirSync(__dirname));

fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

// Synchronizing any model changes with database.
sequelize.sync().then(err => {
  if (err) console.log('An error occured %j', err);
  else console.log('Database synchronized');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend(
  {
    sequelize,
    Sequelize
  },
  db
);
