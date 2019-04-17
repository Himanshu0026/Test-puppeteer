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

routes.get("/getUsergroupID/*", function(req, res, next) {
	var groupTitle = req.url.split('/')[2];
	uid = settings.setUID();
	/*console.log('the uid is'+uid);
	sqlConnection(Usergroups.getUsergroupID(uid,groupTitle), function(err, result) {
		if(!err) {
			res.status(200).json({
				message:"UsergroupID found.",
				usergroupID:result[0].usergroupid
			});
		}
	});*/
});

routes.get("/enabledViewCategory/*", function(req, res, next) {
	var groupTitle = req.url.split('/')[2];
	var field = automationData.enabledViewCategory.field;
	var value = automationData.enabledViewCategory.value;
	request({
		url: config.apiLocalUrl+'/settings/getUID',
		json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			uid = body.UID;
			sqlConnection(Usergroups.updateUsergroupsSQL(uid,field,value,groupTitle), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"enabled the view category permission.",
						usergroups:result
					});
				}
			});
		}else {
			res.send('The uid not found');
		}
	});
});

routes.get("/enabledStartTopic", function(req, res, next) {
	var groupTitle = req.url.split('/')[2];
	var field = automationData.enabledStartTopic.field;
	var value = automationData.enabledStartTopic.value;
	request({
		url: config.apiLocalUrl+'/settings/getUID',
		json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			uid = body.UID;
			sqlConnection(Usergroups.updateUsergroupsSQL(uid,field,value,groupTitle), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"enabled the start topic permission.",
						usergroups:result
					});
				}
			});
		}else {
			res.send('The uid not found');
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
