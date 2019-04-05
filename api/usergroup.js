var Usergroups = module.exports = {};

Usergroups.getAllUsergroupsSQL = function(uid) {
    var sql = 'SELECT * FROM usergroups WHERE uid = "'+uid+'";';
    return sql;
};

Usergroups.updateUsergroupsSQL = function(uid,fields,values) {
  var sql ='UPDATE usergroups SET view_profiles=1, view_forum=1, post_threads=1, other_post_replies=0, view_thread_content=1, view_others_threads=1, post_replies=1, view_calendar=1, post_events=0, view_others_events=1, approval_of_events=1, view_messageboard=1  WHERE title = "Not Signed Up / Not Logged In" AND uid =116;';
  return sql;
};
