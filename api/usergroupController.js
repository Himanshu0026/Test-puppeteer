var sqlConnection = require('../connection.js');
var Usergroups = require('./usergroup.js');
var settings = require('./setting.js');
var config = require('../config/config.json');
var automationData = require('../config/automationData.json');
var request = require('request');
var express = require('express');
var app = express();
var uid;
var routes = express.Router();

routes.get("/getUsergroupID/:grouptitle", function(req, res, next) {
	var groupTitle = req.params.grouptitle;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			sqlConnection(Usergroups.getUsergroupID(uid,groupTitle), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"UsergroupID found.",
						usergroupID:result[0].usergroupid
					});
				}
			});
		}
	});
});

routes.get("/:title/:field/:value", function(req, res, next) {
	var groupTitle = req.params.title;
	var field = req.params.field;
	var value = req.params.value;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			console.log('the uid is'+uid);
			sqlConnection(Usergroups.updateUsergroupsSQL(uid,field,value,groupTitle), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"changed the permission.",
						usergroups:result
					});
				}
			});
		}
	});
});

module.exports = routes;
