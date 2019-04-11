var sqlConnection = require('../connection.js');
var Usergroups = require('./usergroup.js');
var express = require('express');
var app = express();
var routes = express.Router();

routes.get("/usergroups", function(req, res, next) {
	sqlConnection(Usergroups.getAllUsergroupsSQL(116), function(err, result) {
		if(!err) {
			res.status(200).json({
				message:"Usergroups listed.",
				usergroups:result
			});
		}
	});
});

module.exports = routes;
