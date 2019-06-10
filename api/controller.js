var sqlConnection = require('../connection.js');
var settings = require('./setting.js');
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
  sqlConnection(settings.getUID(user), function(err, result) {
		if(!err) {
      console.log('Middle ware function');
      uid=result[0].uid;
      console.log('the uid is ='+uid);
      var accesToken = req.query.accesToken || req.headers['x-access-token'];
      if(accesToken) {
        console.log('the value of token is'+accesToken);
        var token = tokenServices.encrypt();
        if(accesToken == token){
          console.log('Api is authorazied');
          next();
        }
      } else {
        throw err('token not provided');
      }
		}
	});
};


//router.use(getUID);

router.get('/getToken', function(req, res) {
  tokenServices.encrypt(function(err,data) {
    if(!err) {
      console.log('the data in the getToken url'+data);
      res.render('token', {
        token: data
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
  sqlConnection(forumPermissions.getForumPermissionsSQL(uid, forumid, usergroupID), function(err, result) {
    if(!err) {
      res.status(200).json({
        message:"got the permission.",
        result:result
      });
    }
  });
});


//
// var sqlConnection = require('../connection.js');
// var settings = require('./setting.js');
// var forums = require('./forums.js');
// var express = require('express');
// var app = express();
// var forumsRoutes = express.Router();
//
// forumsRoutes.get("/getID/:title", function(req, res, next) {
// 	var title = req.params.title;
// 	settings.setUID(function(err, uid) {
// 		if(!err) {
// 			uid = uid;
// 			sqlConnection(forums.getforumID(uid, title), function(err, result) {
// 				if(!err) {
// 					res.status(200).json({
// 						message:"Found the categroy id",
// 						forumid:result[0].forumid
// 					});
// 				}
// 			});
// 		}
// 	});
// });
//
// forumsRoutes.get("/add/:title/:description", function(req, res, next) {
// 	var title = req.params.title;
// 	var description = req.params.description;
// 	settings.setUID(function(err, uid) {
// 		if(!err) {
// 			uid = uid;
// 			sqlConnection(forums.addForum(uid, title, description), function(err, result) {
// 				if(!err) {
// 					res.status(200).json({
// 						message:"Category Created"
// 					});
// 				}
// 			});
// 		}
// 	});
// });
//
// forumsRoutes.get("/delete", function(req, res, next) {
// 	settings.setUID(function(err, uid) {
// 		if(!err) {
// 			uid = uid;
// 			sqlConnection(forums.deleteAllForums(uid), function(err, result) {
// 				if(!err) {
// 					res.status(200).json({
// 						message:"All Categories Deleted"
// 					});
// 				}
// 			});
// 		}
// 	});
// });
//
// forumsRoutes.get("/delete/:forumid", function(req, res, next) {
// 	var forumid = req.params.forumid;
// 	settings.setUID(function(err, uid) {
// 		if(!err) {
// 			uid = uid;
// 			sqlConnection(forums.deleteForum(uid, forumid), function(err, result) {
// 				if(!err) {
// 					res.status(200).json({
// 						message:"Category Deleted"
// 					});
// 				}
// 			});
// 		}
// 	});
// });
//
// forumsRoutes.get("/add/subCategory:title/:description/:parentCategory", function(req, res, next) {
// 	var title = req.params.title;
// 	var description = req.params.description;
// 	var parentCategory = req.params.parentCategory;
// 	var parentId;
// 	settings.setUID(function(err, uid) {
// 		if(!err) {
// 			uid = uid;
// 			request({
// 				url: config.apiLocalUrl+'/forums/getID/parentCategory',
// 				json: true
// 			}, function(err, res, body) {
// 				if(err) {
// 					console.log('err : '+err);
// 					res.send(err);
// 				}
// 				if(res.statusCode == 200) {
// 					parentId = body.forumid;
// 					sqlConnection(forums.addSubForum(uid, title, description, parentId), function(err, result) {
// 						if(!err) {
// 							res.status(200).json({
// 								message:"Sub Category Created"
// 							});
// 						}
// 					});
// 				}else {
// 					res.send('The forumId not found');
// 				}
// 			});
// 		}
// 	});
// });
//
// module.exports = forumsRoutes;
//
// var sqlConnection = require('../connection.js');
// var settings = require('./setting.js');
// var config = require('../config/config.json');
// var express = require('express');
// var app = express();
// var user = config.backendCred.uname;
// var settingRoutes = express.Router();
//
// settingRoutes.get("/getUID", function(req, res, next) {
// 	sqlConnection(settings.getUID(user), function(err, result) {
// 		if(!err) {
// 			res.status(200).json({
// 				message:"UID found.",
// 				UID:result[0].uid
// 			});
// 		}
// 	});
// });
//
// settingRoutes.get("/:field/:value", function(req, res, next) {
// 	var field = req.params.field;
// 	var value = req.params.value;
// 	//settings.setUID(function(err, uid) {
// 		//if(!err) {
// 	var uid = settings.setUID();
// 			console.log('the uid is'+uid);
// 			sqlConnection(settings.updateSettings(uid,field,value), function(err, result) {
// 				if(!err) {
// 					res.status(200).json({
// 						message:"enabled the setting permission.",
// 						usergroups:result
// 					});
// 				}
// 			});
// 		//}
// 	//});
// });
//
// module.exports = settingRoutes;
//
// var sqlConnection = require('../connection.js');
// var Usergroups = require('./usergroup.js');
// var settings = require('./setting.js');
// var config = require('../config/config.json');
// var automationData = require('../config/automationData.json');
// var request = require('request');
// var express = require('express');
// var app = express();
// var uid;
// var routes = express.Router();
//
// routes.get("/getUsergroupID/:grouptitle(*)", function(req, res, next) {
// 	var groupTitle = req.params.grouptitle;
// 	settings.setUID(function(err, uid) {
// 		if(!err) {
// 			uid = uid;
// 			sqlConnection(Usergroups.getUsergroupID(uid,groupTitle), function(err, result) {
// 				if(!err) {
// 					res.status(200).json({
// 						message:"UsergroupID found.",
// 						usergroupID:result[0].usergroupid
// 					});
// 				}
// 			});
// 		}
// 	});
// });
//
// routes.get("/:title(*)/:field/:value", function(req, res, next) {
// 	var groupTitle = req.params.title;
// 	var field = req.params.field;
// 	var value = req.params.value;
// 	settings.setUID(function(err, uid) {
// 		if(!err) {
// 			uid = uid;
// 			console.log('the uid is'+uid);
// 			sqlConnection(Usergroups.updateUsergroupsSQL(uid,field,value,groupTitle), function(err, result) {
// 				if(!err) {
// 					res.status(200).json({
// 						message:"changed the permission.",
// 						usergroups:result
// 					});
// 				}
// 			});
// 		}
// 	});
// });
//
module.exports = router;
