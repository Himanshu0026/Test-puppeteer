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

forumPermissions.setPermission = function(forumid, usergroupID){
  request({
		url: config.apiLocalUrl+'/updateForumPermissions/getPermission/'+forumid+'/'+usergroupID,
		json: true
	}, function(err, res, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(res.statusCode == 200) {
      console.log(body.result.length);
		}else {
			res.send('The uid not found');
		}
	});
};
