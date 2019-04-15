var Usergroups = module.exports = {};

Usergroups.getAllUsergroupsSQL = function(uid) {
    var sql = 'SELECT * FROM usergroups WHERE uid = "'+uid+'";';
    return sql;
};

Usergroups.updateUsergroupsSQL = function(uid,field,value,title) {
  var sql ='UPDATE usergroups SET '+field+ '=' +value+ 'WHERE uid = "'+uid+'" AND title ='+title+';';
  console.log(sql);
  return sql;
};
