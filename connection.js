var mysql = require('mysql');
var config = require('./config/config.json');

var sqlConnection = function sqlConnection(sqlType) {

  var connection = mysql.createConnection(config.db);

  connection.connect(function(err) {
      if (err) throw err;
  });

  connection.query(sqlType, function(error,results, fields) {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    console.log(fields);
    connection.end(); // close the connection
    return (results, fields) ;
    // Execute the callback
    //next.apply(this, arguments);
  });
};


module.exports = sqlConnection;

/////const GET_MEMBER = 'SELECT * FROM members WHERE uid=116 AND user="neha" AND deleted=0';
//const SELECT_FROM_SETTINGS = 'SELECT * FROM settings WHERE uid=116';
