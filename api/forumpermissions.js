var request = require('request');
var sqlConnection = require('../connection.js');
var config = require('../config/config.json');
var forumPermissions = module.exports = {};

forumPermissions.updateForumPermissionsSQL = function(uid, forumid, usergroupID, field, value) {
  var sql ='UPDATE forum_permissions SET '+field+ '= "' +value+ '" WHERE uid = "'+uid+'" AND forumid ="'+forumid+'" AND usergroupid ="'+usergroupID+'";';
  return sql;
};

forumPermissions.getForumPermissionsSQL = function(uid, forumid, usergroupID) {
  var sql ='Select * FROM forum_permissions WHERE uid = "'+uid+'" AND forumid ="'+forumid+'" AND usergroupid ="'+usergroupID+'";';
  return sql;
};

forumPermissions.addForumPermissionsSQL = function(uid, forumid, usergroupID, field, value) {
  var sql ='INSERT INTO forum_permissions (uid, forumid, usergroupid,'+field+') VALUES ("'+uid+'",'+forumid+','+usergroupID+',"'+value+'");';
  return sql;
};

forumPermissions.setPermission = function(uid, forumid, usergroupID, field, value, callback){
  request({
		url: config.apiLocalUrl+'/qaapi/getPermission/'+forumid+'/'+usergroupID+'?accesToken=e3dac0e84ae3c7f0515ae119a6ef818d',
		json: true
	}, function(err, res, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(res.statusCode == 200) {
      if(body.result.length === 0){
        sqlConnection(forumPermissions.addForumPermissionsSQL(uid, forumid, usergroupID, field, value), function(err, result) {
  				if(!err) {
  					return callback(null);
  				}
  			});
      } else {
        sqlConnection(forumPermissions.updateForumPermissionsSQL(uid, forumid, usergroupID, field, value), function(err, result) {
  				if(!err) {
  					return callback(null);
  				}
  			});
      }
		}else {
			res.send('The uid not found');
		}
	});
};
