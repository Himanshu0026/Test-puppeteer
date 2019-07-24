var config = require('../config/config.json');
var request = require('request');
var uid;
var settings = module.exports = {};

settings.getUID = function(user) {
  var sql = 'SELECT uid FROM settings WHERE username = "'+user+'" ;';
  return sql;
};

settings.updateSettings = function(uid,field,value) {
  var sql ='UPDATE settings SET '+field+ '="' +value+ '" WHERE uid = "'+uid+'";';
  return sql;
};
