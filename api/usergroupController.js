var sqlConnection = require('../connection.js');
var Usergroups = require('./usergroup.js');
var config = require('../config/config.json');
var request = require('request');
var express = require('express');
var app = express();
var uid;
var routes = express.Router();

routes.get("/getUsergroupID", function(req, res, next) {
	console.log('inside the getUsergroupID');
	request({
		url: config.apiLocalUrl+'/settings/getUID',
		headers: { 'user-agent' : 'git-technetium' },
		json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			console.log('got the response in it');
			uid = body.userID.uid;
			console.log('dfhhhhhh'+uid);
			var title = 'General';
			sqlConnection(Usergroups.getUsergroupID(uid,title), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"UsergroupID found.",
						usergroupID:result
					});
				}
			});
		}else {
			res.send('The uid not found');
		}
	});
});

routes.get("/enabledViewCategory", function(req, res, next) {

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
