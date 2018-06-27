let DB_TYPE = process.env.NODE_ENV === 'test' || !process.env.DB_TYPE ? 'sqlite' : process.env.DB_TYPE;
let dialect = '';
let connectionDevelopment = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  socketPath: process.env.DB_SOCKET_PATH,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL,
  multipleStatements: true,
  charset: 'utf8'
};
let connectionProduction = connectionDevelopment;
let pool = {};
if (DB_TYPE === 'mysql') {
  // mysql
  dialect = 'mysql';
} else if (DB_TYPE === 'postgres') {
  // postgres
  dialect = 'postgres';
} else {
  // sqlite
  dialect = 'sqlite';
  connectionDevelopment = {
    filename: './dev-db.sqlite'
  };
  connectionProduction = {
    filename: './prod-db.sqlite'
  };
  pool = {
    afterCreate: (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    }
  };
}

module.exports = {
  dbType: DB_TYPE,
  dialect: dialect,
  connection: {
    development: connectionDevelopment,
    production: connectionProduction
  },
  pool: pool
};
