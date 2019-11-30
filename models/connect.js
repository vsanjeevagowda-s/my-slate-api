const mongoose = require('mongoose');
const config = require('../config/environment');

mongoose.Promise = global.Promise;
const db = mongoose.connection;

mongoose.connect(`${config.db_url}/${config.db_name}`, {
  useCreateIndex: true, 
  useNewUrlParser: true,
});

module.exports = db;
