var config = require('../config/config.json');
var request = require('request');
var uid;
var settings = module.exports = {};

settings.getUID = function(user) {
    var sql = 'SELECT uid FROM settings WHERE username = "'+user+'" ;';
    return sql;
};

settings.setUID = function() {
	request({
		url: config.apiLocalUrl+'/settings/getUID',
		json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			uid = body.UID;
      console.log('thghgggggggggggggggggggg'+uid);
			return uid;
		}else {
			res.send('The uid not found');
		}
	});
};
