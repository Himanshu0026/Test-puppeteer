var config = require('../config/config.json');
var crypto = require('crypto');
var text = config.secretKey;
var tokenServices = module.exports = {};

tokenServices.encrypt = function () {
  var data = crypto.createHash('md5').update(text).digest("hex");
  return data;
};

//var data2 = tokenServices.encrypt();
//console.log(data2);
