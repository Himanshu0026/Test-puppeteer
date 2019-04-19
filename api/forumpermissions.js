var config = require('../config/config.json');
var uid;
var forumPermissions = module.exports = {};

forumPermissions.updateForumPermissionsSQL = function(uid, forumid, usergroupID, field, value) {
  var sql ='UPDATE usergroups SET '+field+ '=' +value+ ' WHERE uid = "'+uid+'" AND forumid ="'+forumid+'" AND usergroupid ="'+usergroupID+'";';
  return sql;
};
