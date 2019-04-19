var config = require('../config/config.json');
var uid;
var forums = module.exports = {};

forums.getforumID = function(uid, title) {
    var sql = 'SELECT forumid FROM forums WHERE username = "'+title+ 'AND uid = "'+uid+ '" ;';
    return sql;
};

forums.addForum = function(uid, title, description) {
    var sql = 'INSERT INTO forums (uid, title, description) VALUES ("'+uid+ '" ,"'+title+ '" ,"'+description+ '");';
    return sql;
};

forums.deleteForum = function(uid, forumid) {
    var sql = 'DELETE FROM forums WHERE uid="'+uid+ 'AND forumid = "'+forumid+'";';
    return sql;
};

forums.deleteAllForums = function(uid) {
    var sql = 'DELETE FROM forums WHERE uid = "'+uid+ '";';
    return sql;
};
