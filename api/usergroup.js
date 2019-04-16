var Usergroups = module.exports = {};

Usergroups.getUsergroupID = function(uid, title) {
    var sql = 'SELECT usergroupid FROM usergroups WHERE uid = "'+uid+'" AND title ="'+title+'";';
    return sql;
};

Usergroups.updateUsergroupsSQL = function(uid,field,value,title) {
  var sql ='UPDATE usergroups SET '+field+ '=' +value+ ' WHERE uid = "'+uid+'" AND title ="'+title+'";';
  //console.log(sql);
  return sql;
};
