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

settings.setUID = function(callback) {
	request({
		url: config.apiLocalUrl+'/settings/getUID',
		json: true
	}, function(err, res, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(res.statusCode == 200) {
			uid = body.UID;
      return callback(null, uid);
		}else {
			res.send('The uid not found');
		}
	});
};
