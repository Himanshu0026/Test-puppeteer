//This script is invoked from automation server to run automated testing.
'use strict';

//Reading configuration parameters from config.json
var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
casper.options.colorizerType = 'Dummy';

//LOGIN TESTING SECTION
        casper.test.begin('Verify login functionality from home page with all valid and invalid scenarios ', function(test) {
		var forumLogin = require("./testsuite/forum_login.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
//EDIT PROFILE
	casper.test.begin("Start Edit Profile functionality from home page & verify content with all valid and invalid scenarios", function(test) {
		var editProfile = require("./testsuite/editprofile.js");
		editProfile.featureTest(casper, casper.test);
		casper.run(function() {
			test.done();
			test.assert(true);
		});
	});
//TOPIC RELATED FLOW
	casper.test.begin("Start Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var newTopic = require("./testsuite/newTopic.js");
		var x = require('casper').selectXPath;
		newTopic.featureTest(casper, casper.test, x);
		
		casper.run(function(){
			test.done();
		});
	});
        
//casper.exit(0);
