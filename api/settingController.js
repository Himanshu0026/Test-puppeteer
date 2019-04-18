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
				UID:result[0].uid
			});
		}
	});
});

settingRoutes.get("/:field/:value", function(req, res, next) {
	var field = req.params.field;
	var value = req.params.value;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			console.log('the uid is'+uid);
			sqlConnection(settings.updateSettings(uid,field,value), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"enabled the view category permission.",
						usergroups:result
					});
				}
			});
		}
	});
});

module.exports = settingRoutes;
