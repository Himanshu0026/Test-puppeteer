//This script is invoked from automation server to run automated testing.
'use strict';

//Reading configuration parameters from config.json
var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
//casper.options.colorizerType = 'Dummy';



//REGISTRATION WITH SETTINGS
	casper.test.begin('REGISTRATION WITH SETTINGS TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.registerWithSettings(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
//BACKEND REGISTRATION
	casper.wait(5000, function(){
    	casper.test.begin('BACK END REGISTRATION TEST', function(test) {
		var backEndRegister = require("./testsuite/backEndRegister.js");
		backEndRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
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
//IN-CONTEXT REGISTRATION
	casper.wait(5000, function(){
	casper.test.begin('IN CONTEXT REGISTRATION TEST', function(test) {
		var inContextForumRegister = require("./testsuite/inContextRegister.js");
		inContextForumRegister.featureTest(casper, test);
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
//VERIFY CATEGORY PERMISSIONS
	casper.wait(5000, function(){
	casper.test.begin('VERIFY CATEGORY PERMISSIONS TEST', function(test) {
		var verifyCategoryPermissions = require("./testsuite/verifyCategoryPermissions.js");
		verifyCategoryPermissions.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
	});
//HIDE CATEGORY
	casper.wait(5000, function(){
		casper.test.begin('Verify hide/un-hide category functionlity ', function(test) {
			 var hideCategory = require("./testsuite/hideCategory.js");
			 var x = require('casper').selectXPath;
			 hideCategory.hideCategoryFeature(casper, casper.test, x);
			 casper.run(function(){
				test.done();
			 });
		});
	});

//EDIT PROFILE
	casper.wait(5000, function(){
		casper.test.begin("Start 'Edit Profile With Setting' functionality from home page & verify content with all valid and invalid scenarios", function(test) {
			var editProfile = require("./testsuite/editprofile.js");
			editProfile.customFieldsTest(casper, casper.test);
			casper.run(function() {
				test.done();
			});
		});
	});

//DELETE ACCOUNT 
	casper.wait(5000, function() {
		casper.test.begin("Start 'Delete Account' functionality from home page & verify content with all scenarios", function(test) {
			var deleteAccount = require("./testsuite/deleteAccount.js");
			var x = require('casper').selectXPath;
			deleteAccount.featureTest(casper, casper.test, x);
			casper.run(function(){
				test.done();
			});
		});			
	});

//DELETE ACCOUNT WITH SETTINGS
	casper.wait(5000, function() {
		casper.test.begin("Start 'Delete Account With Setting' functionality from home page & verify content with all scenarios", function(test) {
			var deleteAccount = require("./testsuite/deleteAccount.js");
			var x = require('casper').selectXPath;
			deleteAccount.customFieldsTest(casper, casper.test, x);
			casper.run(function(){
				test.done();
			});
		});		
	});

//GENERAL GROUP PERMISSION
	casper.wait(5000, function() {
		casper.test.begin("Start 'General Permission' functionality from home page & verify content with all scenarios", function(test) {
			var generalPermission = require("./testsuite/generalPermission.js");
			var x = require('casper').selectXPath;
			generalPermission.featureTest(casper, casper.test, x);
			casper.run(function(){
				test.done();
			});
		});		
	});
/*
//TOPIC
casper.wait(5000, function(){
casper.test.begin("Start New Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var newTopic = require("./testsuite/newTopic.js");
		var x = require('casper').selectXPath;
		newTopic.featureTest(casper, casper.test, x);
		
		casper.run(function(){
			test.done();
		});
	});
});*/
