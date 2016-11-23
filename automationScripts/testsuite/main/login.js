//----- This js file covers all the valid and invalid scenarios for login functionlaity from home page---------//

'use strict';
var json = require('../../testdata/loginData.json');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var forumLoginTests = require('../cases/login.js');
var forumLogin = module.exports = {};

forumLogin.featureTest = function(casper, test) {
	
	casper.start(config.url, function() {
		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Test case for login to application with invalid password and verify error message
		forumLoginTests.invalidPassword();
		//Test case for login to application with invalid username and verify error message
		forumLoginTests.invalidUsername();
		//Test case for login to application by leaving blank username and password and verify error message
		forumLoginTests.blankUsernamePassword();
		//Test case for login to application by leaving password field blank and verify error message
		forumLoginTests.blankPassword();
		//Test case for login to application with valid valid username and password then logout from application
		forumLoginTests.validCredential();
		//Test case for login to application with valid valid email and password then logout from application
		forumLoginTests.validEmail();
		
		
	});
};
