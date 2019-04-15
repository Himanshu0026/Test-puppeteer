var sqlConnection = require('../connection.js');
var Usergroups = require('./usergroup.js');
var express = require('express');
var app = express();
var routes = express.Router();

routes.get("/", function(req, res, next) {
	sqlConnection(Usergroups.getAllUsergroupsSQL(116), function(err, result) {
		if(!err) {
			res.status(200).json({
				message:"Usergroups listed.",
				usergroups:result
			});
		}
	});
});

routes.get("/enabledViewCategory", function(req, res, next) {
	var field = 'view_forum';
	var value = '1';
	var uid = '116';
	var title = 'General';
	sqlConnection(Usergroups.updateUsergroupsSQL(uid,field,value,title), function(err, result) {
		if(!err) {
			res.status(200).json({
				message:"enabled the view category permission.",
				usergroups:result
			});
		}
	});
});

module.exports = routes;
