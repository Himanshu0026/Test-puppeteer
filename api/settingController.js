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
			res.status(200).json({
				message:"UID found.",
				usergroupID:result
			});
		}
	});
});

module.exports = settingRoutes;
