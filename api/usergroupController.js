var sqlConnection = require('../connection.js');
var Usergroups = require('./usergroup.js');
var express = require('express');
var app = express();

var routes = module.exports = {};

app.get('/usergroups', function(req, res) {
	sqlConnection(Usergroups.getAllUsergroupsSQL(), function(err, result) {
		if(!err) {
			res.status(200).json({
				message:"Usergroups listed.",
				usergroups:result
			});
		}
	});
});
