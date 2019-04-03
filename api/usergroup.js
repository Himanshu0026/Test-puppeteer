var Usergroups = module.exports = {};

//Usergroups.data = {
  Usergroups.getAllUsergroupsSQL = function() {
      var sql = "SELECT * FROM usergroups";
      return sql;
  };
//};
