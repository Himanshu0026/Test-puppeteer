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
		//test case for login to application with invalid password and verify error message
		forumLoginTests.invalidPassword();
		
		
	});
};
