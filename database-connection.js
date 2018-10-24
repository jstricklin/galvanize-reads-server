const dbConnection = require('./knexfile')[process.env.NODE_ENV || 'development']
module.exports = require('knex')(dbConnection)
