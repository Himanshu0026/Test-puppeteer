var sqlConnection = require('../connection.js');
var setting = require('./setting.js');
var config = require('../config/config.json');
var express = require('express');
var app = express();
var routes = express.Router();

routes.get("/getUID", function(req, res, next) {
  var user = config.backendCred.uname;
	sqlConnection(setting.getUID(user), function(err, result) {
		if(!err) {
			res.status(200).json({
				message:"UID found.",
				usergroupID:result
			});
		}
	});
});
