var mysql = require('mysql');
var config = require('./../config');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: config.database
});
module.exports = connection;