var sqlConnection = require('../connection.js');
var settings = require('./setting.js');
var config = require('../config/config.json');
var express = require('express');
var app = express();
var user = config.backendCred.uname;
var settingRoutes = express.Router();

settingRoutes.get("/getUID", function(req, res, next) {
	sqlConnection(settings.getUID(user), function(err, result) {
		if(!err) {
      var data = result[0].uid;
      //var uid = json.stringify(data);
			res.status(200).json({
				message:"UID found.",
				userID:data
			});
		}
	});
});

module.exports = settingRoutes;
