var settings = module.exports = {};

settings.getUID = function(user) {
    var sql = 'SELECT uid FROM settings WHERE username = "'+user+'" ;';
    return sql;
};
