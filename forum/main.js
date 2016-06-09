var config = require("./config/config.json");

var casper = require('casper').create(config.app);

casper.echo("Casper CLI passed args:");
require("utils").dump(casper.cli.args);

//var forumLogin = require("./testsuite/forum_login.js");
//forumLogin.featureTest(casper);

var editProfile = require("./testsuite/editprofile.js");
editProfile.featureTest(casper);

casper.run();
