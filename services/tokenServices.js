var config = require('../config/config.json');
var crypto = require('crypto');
var text = config.secretKey;
var tokenServices = module.exports = {};

tokenServices.encrypt = function(callback) {
  var data = crypto.createHash('md5').update(text).digest("hex");
  return callback(null, data);
};
