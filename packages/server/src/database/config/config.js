import settings from '../../../../../settings';
// ver fs = require('fs');

export default {
  development: {
    username: 'root',
    password: null,
    database: 'dev-db',
    host: 'localhost',
    pool: settings.db.pool,
    dialect: settings.db.dialect,
    storage: settings.db.connection.development.filename
  },
  test: {
    username: 'root',
    password: null,
    database: 'test-db',
    host: 'localhost',
    pool: settings.db.pool,
    dialect: settings.db.dialect,
    storage: settings.db.connection.development.filename
  },
  production: {
    username: 'root',
    password: null,
    database: 'prod-db',
    host: 'localhost',
    pool: settings.db.pool,
    dialect: settings.db.dialect,
    storage: ':memory:'
  }
};
