/* eslint import/no-extraneous-dependencies: 0 */
require('dotenv/config');
require('babel-register')({ presets: ['env'] });
require('babel-polyfill');
// const config = require('./sequelizedata');
const config = require('./src/database/config/config');

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
