//----- This js file covers all the incontextRegistration functionality on forum Frontend---------//

'use strict.';
var config = require('../../../config/config.json');
var incontextRegistrationTests = require('../cases/incontextRegistration.js');
var registerTests = require('../cases/register.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var incontextRegistration = module.exports = {};

incontextRegistration.featureTest = function() {
	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		//inContext Registration from Login Page with new  Registration
		incontextRegistrationTests.doRegistrationFromLoginPage();

		// Incontext New Registration from reply post With Create Account
		incontextRegistrationTests.doRegistrationFromReplyPostWithCreateAccount();

		// Do Registeration when User Account is OFF
		incontextRegistrationTests.doRegistrationWhenUserAccountOff();

	});
};
