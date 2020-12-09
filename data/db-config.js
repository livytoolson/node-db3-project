// db-config
const knex = require('knex');

const config = require('../knexfile');

const db = knex(
    process.env.NODE_ENV === 'production'
    ? config.productions
    : config.development
);

module.exports = db;