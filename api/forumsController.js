var sqlConnection = require('../connection.js');
var settings = require('./setting.js');
var forums = require('./forums.js');
var config = require('../config/config.json');
var express = require('express');
var app = express();
var forumsRoutes = express.Router();

forumsRoutes.get("/getID/:title", function(req, res, next) {
	var title = req.params.title;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			sqlConnection(forums.getforumID(uid, title), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"Found the categroy id",
						forumid:result[0].forumid
					});
				}
			});
		}
	});
});

forumsRoutes.get("/add/:title/:description", function(req, res, next) {
	var title = req.params.title;
  var description = req.params.description;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			sqlConnection(forums.addForum(uid, title, description), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"Category Created"
					});
				}
			});
		}
	});
});

forumsRoutes.get("/delete", function(req, res, next) {
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			sqlConnection(forums.deleteAllForums(uid), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"All Categories Deleted"
					});
				}
			});
		}
	});
});

forumsRoutes.get("/delete/:forumid", function(req, res, next) {
	var title = req.params.forumid;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			sqlConnection(forums.addForum(uid, forumid), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"Category Deleted"
					});
				}
			});
		}
	});
});

module.exports = forumsRoutes;
