var sqlConnection = require('../connection.js');
var settings = require('./setting.js');
var forumPermissions = require('./forumpermissions.js');
var express = require('express');
var app = express();
var forumPermissionsRoutes = express.Router();

forumPermissionsRoutes.get("/:forumid/:usergroupID/:field/:value", function(req, res, next) {
  var forumid = req.params.forumid;
  var usergroupID = req.params.usergroupID;
	var field = req.params.field;
	var value = req.params.value;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			sqlConnection(forumPermissions.updateForumPermissionsSQL(uid, forumid, usergroupID, field, value), function(err, result) {
				if(!err) {
					res.status(200).json({
						message:"changed the permission."
          });
				}
			});
		}
	});
});

forumPermissionsRoutes.get("/:forumid/:usergroupID", function(req, res, next) {
  var forumid = req.params.forumid;
  var usergroupID = req.params.usergroupID;
	settings.setUID(function(err, uid) {
		if(!err) {
			uid = uid;
			sqlConnection(forumPermissions.getForumPermissionsSQL(uid, forumid, usergroupID), function(err, result) {
				if(!err) {
          var results = json.stringify(result);
					res.status(200).json({
						message:"changed the permission.",
            result:results
          });
				}
			});
		}
	});
});

module.exports = forumPermissionsRoutes;
