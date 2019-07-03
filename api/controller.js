var sqlConnection = require('../connection.js');
var settings = require('./setting.js');
var forums = require('./forums.js');
var Usergroups = require('./usergroup.js');
var path = require('path');
var forumPermissions = require('./forumpermissions.js');
var express = require('express');
var app = express();
var config = require('../config/config.json');
var user = config.backendCred.uname;
var tokenServices = require('../services/tokenServices');
var uid;
var router = express.Router();

//Setting views directory and view engine
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

var getUID = function (req, res, next) {
  console.log('the requested url'+req.url);
  if(req.url!= "/getToken") {
    sqlConnection(settings.getUID(user), function(err, result) {
      if(!err) {
        uid=result[0].uid;
        console.log('the uid is ='+uid);
        var accesToken = req.query.accesToken || req.headers['x-access-token'];
        if(accesToken) {
          console.log('the value of token is'+accesToken);
          tokenServices.encrypt(function(err, data) {
            if(!err) {
              console.log('inside the middle ware');
              if(accesToken == data){
                console.log('Api is authorazied');
                next();
              }
            }
          });
        } else {
          throw err('token not provided');
        }
      }
    });
  } else {
    next();
  }
};

router.use(getUID);

router.get('/getToken', function(req, res, next) {
  tokenServices.encrypt(function(err,data) {
    if(!err) {
    res.render('token',{
      token : data
    });
    }
  });
});

router.get("/updateForumPermissions/:forumid/:usergroupID/:field/:value", function(req, res, next) {
  var forumid = req.params.forumid;
  var usergroupID = req.params.usergroupID;
  var field = req.params.field;
  var value = req.params.value;
  forumPermissions.setPermission(uid, forumid, usergroupID, field, value, function() {
    res.status(200).json({
      message:"Permission changed."
    });
  });
});

router.get("/getPermission/:forumid/:usergroupID", function(req, res, next) {
  var forumid = req.params.forumid;
  var usergroupID = req.params.usergroupID;
  console.log('inside the get permission');
  sqlConnection(forumPermissions.getForumPermissionsSQL(uid, forumid, usergroupID), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"got the permission.",
        result:result
      });
    }
  });
});

router.get("/forum/getID/:title", function(req, res, next) {
  var title = req.params.title;
  sqlConnection(forums.getforumID(uid, title), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"Found the categroy id",
        forumid:result[0].forumid
      });
    }
  });
});

router.get("/forum/add/:title/:description", function(req, res, next) {
  var title = req.params.title;
  var description = req.params.description;
  sqlConnection(forums.addForum(uid, title, description), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"Category Created"
      });
    }
  });
});

router.get("/forums/delete", function(req, res, next) {
  sqlConnection(forums.deleteAllForums(uid), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"All Categories Deleted"
      });
    }
  });
});

router.get("/forum/delete/:forumid", function(req, res, next) {
  var forumid = req.params.forumid;
  sqlConnection(forums.deleteForum(uid, forumid), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"Category Deleted"
      });
    }
  });
});

router.get("/forum/add/subCategory:title/:description/:parentCategory", function(req, res, next) {
  var title = req.params.title;
  var description = req.params.description;
  var parentCategory = req.params.parentCategory;
  var parentId;
  request({
    url: config.apiLocalUrl+'/forums/getID/parentCategory',
    json: true
  }, function(err, res, body) {
    if(err) {
      console.log('err : '+err);
      res.send(err);
    }
    if(res.statusCode == 200) {
      parentId = body.forumid;
      sqlConnection(forums.addSubForum(uid, title, description, parentId), function(err, result) {
        if(!err) {
          res.status(200).json({
            message:"Sub Category Created"
          });
        }
      });
    }else {
      res.send('The forumId not found');
    }
  });
});

router.get("/settings/:field/:value", function(req, res, next) {
  var field = req.params.field;
  var value = req.params.value;
  sqlConnection(settings.updateSettings(uid,field,value), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"enabled the setting permission.",
        usergroups:result
      });
    }
  });
});

router.get("/usergroups/getID/:grouptitle(*)", function(req, res, next) {
  var groupTitle = req.params.grouptitle;
  console.log('the uid inside the request'+uid);
  sqlConnection(Usergroups.getUsergroupID(uid,groupTitle), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"UsergroupID found.",
        usergroupID:result[0].usergroupid
      });
    }
  });
});

router.get("/usergroups/updatePermission/:title(*)/:field/:value", function(req, res, next) {
  var groupTitle = req.params.title;
  var field = req.params.field;
  var value = req.params.value;
  sqlConnection(Usergroups.updateUsergroupsSQL(uid,field,value,groupTitle), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"changed the permission.",
        usergroups:result
      });
    }
  });
});

module.exports = router;
