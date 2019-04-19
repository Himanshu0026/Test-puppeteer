var forumPermissions = module.exports = {};

forumPermissions.updateForumPermissionsSQL = function(uid, forumid, usergroupID, field, value) {
  var sql ='UPDATE forum_permissions SET '+field+ '= "' +value+ '" WHERE uid = "'+uid+'" AND forumid ="'+forumid+'" AND usergroupid ="'+usergroupID+'";';
  console.log(sql);
  return sql;
};
