var request = require('request');
var config = require('../config/config.json');
var forumPermissions = module.exports = {};

forumPermissions.updateForumPermissionsSQL = function(uid, forumid, usergroupID, field, value) {
  var sql ='UPDATE forum_permissions SET '+field+ '= "' +value+ '" WHERE uid = "'+uid+'" AND forumid ="'+forumid+'" AND usergroupid ="'+usergroupID+'";';
  //console.log(sql);
  return sql;
};

forumPermissions.getForumPermissionsSQL = function(uid, forumid, usergroupID) {
  var sql ='Select * FROM forum_permissions WHERE uid = "'+uid+'" AND forumid ="'+forumid+'" AND usergroupid ="'+usergroupID+'";';
  //console.log(sql);
  return sql;
};

forumPermissions.addForumPermissionsSQL = function(uid, forumid, usergroupID, field, value) {
  var sql ='INSERT INTO forum_permissions ('+field+') VALUES ("'+value+'") WHERE uid = "'+uid+'" AND forumid ="'+forumid+'" AND usergroupid ="'+usergroupID+'";';
  //console.log(sql);
  return sql;
};

forumPermissions.setPermission = function(uid, forumid, usergroupID, field, value){
  request({
		url: config.apiLocalUrl+'/updateForumPermissions/getPermission/'+forumid+'/'+usergroupID,
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
  					res.status(200).json({
  						message:"changed the permission."
            });
  				}
  			});
      } else {
        sqlConnection(forumPermissions.updateForumPermissionsSQL(uid, forumid, usergroupID, field, value), function(err, result) {
  				if(!err) {
  					res.status(200).json({
  						message:"changed the permission."
            });
  				}
  			});
      }
		}else {
			res.send('The uid not found');
		}
	});
};
