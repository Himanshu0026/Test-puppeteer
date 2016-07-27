//This script is invoked from automation server to run automated testing.
'use strict';

//Reading configuration parameters from config.json
var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
//casper.options.colorizerType = 'Dummy';

//REGISTER WITH SETTINGS
    	/*casper.test.begin('REGISTRATION WITH SETTINGS TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.registerWithSettings(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});

//IN CONTEXT REGISTRATION
    	/*casper.test.begin('IN CONTEXT REGISTRATION TEST', function(test) {
		var inContextForumRegister = require("./testsuite/inContextRegister.js");
		inContextForumRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});*/

//BACKEND REGISTRATION
    	casper.test.begin('BACK END REGISTRATION TEST', function(test) {
		var backEndRegister = require("./testsuite/backEndRegister.js");
		backEndRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});

//REGISTRATION
	casper.wait(5000, function(){
	casper.test.begin('REGISTRATION TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
	});

//LOGIN TESTING SECTION
	casper.wait(5000, function(){
        casper.test.begin('Verify login functionality from home page with all valid and invalid scenarios ', function(test) {
		var forumLogin = require("./testsuite/forum_login.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
	});
//IN CONTEXT LOGIN
	/*casper.wait(5000, function(){
	casper.test.begin('Verify inContext Login functionlity ', function(test) {
		 var inContextLogin = require("./testsuite/inContextLogin.js");
		 inContextLogin.featureTest(casper, casper.test);
		 casper.run(function(){
			test.done();
		});
	});
	});
//FORGOT PASSWORD
	casper.wait(5000, function(){
	casper.test.begin('Verify forgot your password functionality from home page ', function(test) {
		var forumLogin = require("./testsuite/forgotPassword.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
	});
//EDIT PROFILE WITH SETTINGS
	/*casper.test.begin("Start Edit Profile functionality from home page & verify content with all valid and invalid scenarios", function(test) {
		var editProfile = require("./testsuite/editprofile.js");
		editProfile.customFieldsTest(casper, casper.test);
		casper.run(function() {
			test.done();
			test.assert(true);
		});
	});

//DELETE ACCOUNT FUNCTIONALITY
	casper.test.begin("Start 'Delete Account' functionality from home page & verify content with all scenarios", function(test) {
		var deleteAccount = require("./testsuite/deleteAccount.js");
		var x = require('casper').selectXPath;
		deleteAccount.featureTest(casper, casper.test, x);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
//DELETE ACCOUNT WITH SETTINGS
	casper.test.begin("Start 'Delete Account With Setting' functionality from home page & verify content with all scenarios", function(test) {
		var deleteAccount = require("./testsuite/deleteAccount.js");
		deleteAccount.customFieldsTest(casper, casper.test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
//GENERAL GROUP PERMISSION
	casper.test.begin("Start 'general group permission' functionality from home page & verify content with all scenarios", function(test) {
		var generalPermission = require("./testsuite/generalPermission.js");
		generalPermission.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
//TOPIC RELATED FLOW
	/*casper.test.begin("Start Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var newTopic = require("./testsuite/newTopic.js");
		var x = require('casper').selectXPath;
		newTopic.featureTest(casper, casper.test, x);
		
		casper.run(function(){
			test.done();
		});
	});*/

//HIDE CATEGORY
        
//casper.exit(0);
