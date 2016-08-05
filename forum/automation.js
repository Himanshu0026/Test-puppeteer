//This script is invoked from automation server to run automated testing.
'use strict';

//Reading configuration parameters from config.json
var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
//casper.options.colorizerType = 'Dummy';

var feature = casper.cli.get('feature');
if(feature){
	casper.echo("Started testing for the feature: " + feature +"\n");
}else{
	casper.echo("It seems, you have not given any option.");
}

switch (feature) {
    case "login":
        casper.test.begin('Verify login functionality from home page with all valid and invalid scenarios ', function(test) {
		var forumLogin = require("./testsuite/forum_login.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
	casper.wait(5000, function(){
		casper.test.begin('Verify inContext Login functionlity ', function(test) {
			 var inContextLogin = require("./testsuite/inContextLogin.js");
			 inContextLogin.featureTest(casper, casper.test);
			 casper.run(function(){
				test.done();
			});
		});
	});
        break;
    case "profile":
	casper.test.begin("Start 'Edit Profile' functionality from home page & verify content with all valid and invalid scenarios", function(test) {
		var editProfile = require("./testsuite/editprofile.js");
		editProfile.featureTest(casper, casper.test);
		casper.run(function() {
			test.done();
			test.assert(true);
		});
	});

    	casper.wait(5000, function(){
		casper.test.begin("Start 'Edit Profile With Setting' functionality from home page & verify content with all valid and invalid scenarios", function(test) {
			var editProfile = require("./testsuite/editprofile.js");
			editProfile.customFieldsTest(casper, casper.test);
			casper.run(function() {
				test.done();
				test.assert(true);
			});
		});
        });
   
	casper.wait(5000, function(){
		casper.test.begin("Start 'Delete Account' functionality from home page & verify content with all scenarios", function(test) {

			var deleteAccount = require("./testsuite/deleteAccount.js");
			var x = require('casper').selectXPath;
			deleteAccount.featureTest(casper, casper.test, x);
			casper.run(function(){
				test.done();
				test.assert(true);
			});
		});
	});	
    
	casper.wait(5000, function(){
		casper.test.begin("Start 'Delete Account With Setting' functionality from home page & verify content with all scenarios", function(test) {

			var deleteAccount = require("./testsuite/deleteAccount.js");
			deleteAccount.customFieldsTest(casper, casper.test);
			casper.run(function(){
				test.done();
				test.assert(true);
			});
		});
        });
        break;

    case "register":
    	casper.test.begin('REGISTRATION TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        
	casper.wait(5000, function(){
	    	casper.test.begin('REGISTRATION WITH SETTINGS TEST', function(test) {
			var forumRegister = require("./testsuite/register.js");
			forumRegister.registerWithSettings(casper, test);
			casper.run(function(){
				test.done();
				test.assert(true);
			});
		});
	});
        
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
        break;
        case "verifyCategoryPermissions":
	    	casper.test.begin('VERIFY CATEGORY PERMISSIONS TEST', function(test) {
			var verifyCategoryPermissions = require("./testsuite/verifyCategoryPermissions.js");
			verifyCategoryPermissions.featureTest(casper, test);
			casper.run(function(){
				test.done();
				test.assert(true);
			});
		});
        break;
        
	case "topic":
		casper.test.begin("Start New Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

			var newTopic = require("./testsuite/newTopic.js");
			var x = require('casper').selectXPath;
			newTopic.featureTest(casper, casper.test, x);
		
			casper.run(function(){
				test.done();
			});
		});
        
        break;
   
	case "forgotpassword":
        casper.test.begin('Verify forgot your password functionality from home page ', function(test) {
		var forumLogin = require("./testsuite/forgotPassword.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
        break;

	
        
	case "hidecategory" :
		 casper.test.begin('Verify hide/un-hide category functionlity ', function(test) {
		 var hideCategory = require("./testsuite/hideCategory.js");
		 var x = require('casper').selectXPath;
		 hideCategory.hideCategoryFeature(casper, casper.test, x);
		 casper.run(function(){
			test.done();
		});
	});
        break;

};



