var mysql = require('mysql');
var config = require('./config/config.json');

var sqlConnection = function sqlConnection(sqlType, callback) {

  var connection = mysql.createConnection(config.db);

  connection.connect(function(err) {
      if (err) throw err;
  });

  connection.query(sqlType, function(error,results, fields) {
    if (error) {
      return console.error(error.message);
    }
    connection.end(); // close the connection
    return callback(null, results) ;
  });
};


module.exports = sqlConnection;
