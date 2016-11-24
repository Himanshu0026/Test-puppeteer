//----- This js file covers all the valid and invalid scenarios for login functionlaity from home page---------//

'use strict';
var config = require('../../../config/config.json');
var forumLoginTests = require('../cases/login.js');
var forumLogin = module.exports = {};

forumLogin.featureTest = function(casper, test) {
	
	casper.start(config.url, function() {
		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		
		//Valid username and password then logout from application
		forumLoginTests.validCredential();
		
		//Invalid username and verify error message
		forumLoginTests.invalidUsername();
		
		//Invalid password and verify error message
		forumLoginTests.invalidPassword();
		
		//Leaving blank username and password and verify error message
		forumLoginTests.blankUsernamePassword();
		
		//Leaving password field blank and verify error message
		forumLoginTests.blankPassword();
		
		//Valid email and password then logout from application
		forumLoginTests.validEmail();
		
	});
};
