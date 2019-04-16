var sqlConnection = require('../connection.js');
var Usergroups = require('./usergroup.js');
var express = require('express');
var app = express();
var routes = express.Router();

routes.get("/getUsergroupID", function(req, res, next) {
	var uid = '116';
	sqlConnection(Usergroups.getUsergroupID(uid), function(err, result) {
		if(!err) {
			res.status(200).json({
				message:"UsergroupID found.",
				usergroupID:result
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

routes.get("/enabledStartTopic", function(req, res, next) {
	var field = 'post_threads';
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

routes.get("/enabledReplyTopic", function(req, res, next) {
	var field = 'other_post_replies';
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

routes.get("/enabledUploadAttachment", function(req, res, next) {
	var field = 'upload_attachments';
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
