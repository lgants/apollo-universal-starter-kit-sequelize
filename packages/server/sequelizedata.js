import settings from '../../settings';

export const development = {
  username: 'root',
  password: null,
  database: 'dev-db',
  host: 'localhost',
  pool: settings.db.pool,
  dialect: settings.db.dialect,
  storage: settings.db.connection.development.filename
};

export const production = {
  username: 'root',
  password: null,
  database: 'prod-db',
  host: 'localhost',
  pool: settings.db.pool,
  dialect: settings.db.dialect,
  storage: settings.db.connection.production.filename
};

export const test = {
  username: 'root',
  password: null,
  database: 'test-db',
  host: 'localhost',
  pool: settings.db.pool,
  dialect: settings.db.dialect,
  storage: ':memory:'
};

// export {
//   test: {
//     username: 'root',
//     password: null,
//     database: 'test-db',
//     host: 'localhost',
//     pool: settings.db.pool,
//     dialect: settings.db.dialect,
//     storage: ':memory:'
//   },
//   development: {
//     username: 'root',
//     password: null,
//     database: 'dev-db',
//     host: 'localhost',
//     pool: settings.db.pool,
//     dialect: settings.db.dialect,
//     storage: settings.db.connection.development.filename
//   },
//   production: {
//     username: 'root',
//     password: null,
//     database: 'prod-db',
//     host: 'localhost',
//     pool: settings.db.pool,
//     dialect: settings.db.dialect,
//     storage: settings.db.connection.production.filename
//   }
// };
