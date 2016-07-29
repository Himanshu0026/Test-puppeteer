//This script is invoked from automation server to run automated testing.
'use strict';

//Reading configuration parameters from config.json
var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
//casper.options.colorizerType = 'Dummy';



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
	casper.wait(5000, function(){
		casper.test.begin("Start New Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

			var newTopic = require("./testsuite/newTopic.js");
			var x = require('casper').selectXPath;
			newTopic.featureTest(casper, casper.test, x);
		
			casper.run(function(){
				test.done();
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

