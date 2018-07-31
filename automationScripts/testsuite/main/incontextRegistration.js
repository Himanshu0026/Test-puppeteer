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

		// Test case to set up all the backend setting for registration task
		registerTests.registrationBackendSetting();

		//Incontext Registration from start new topic button when start new topic button is enabled
		incontextRegistrationTests.doRegistrationByStartTopicEnable();

		// Incontext Registration from Start New Topic button when start new topic button is disabled
		incontextRegistrationTests.doRegistrationByStartTopicDisable();

		//inContext Registration from Quote on post from post list
		incontextRegistrationTests.doRegistrationByQuoteOnPost();

		//inContext Registration from Topic listing page when 'View Topic Content' permission is Disabled.
		incontextRegistrationTests.doRegistrationByViewTopicDisable();

		//inContext Registration from the Forum Main page when 'View Forum' permission is Disabled.
		incontextRegistrationTests.doRegistrationByViewForumDisable();

		//inContext Registration  when 'View Profile' permission is Disabled.
		incontextRegistrationTests.doRegistrationByViewProfileDisable();

		//inContext Registration when 'View Calendar' permission is Enabled.
		incontextRegistrationTests.doRegistrationByViewCalenderEnable();

		//Incontext Registration while Like this Topic from list of topics
		incontextRegistrationTests.doRegistrationByReputationEnableTopicLike();

		//Incontext Registration while Dislike this post from  list of Topics page
		incontextRegistrationTests.doRegistrationByReputationEnablePostDislike();

		//Incontext Registration while Like this post from Topic page
		incontextRegistrationTests.doRegistrationByReputationEnablePostLike();

		//inContext Registration from Email button on Profile view screen of any user-
		incontextRegistrationTests.doRegistrationByEmailButton();

		//inContext Registration from vote on post from post list
		incontextRegistrationTests.doRegistrationByVoteOnpost();

		//inContext Registration when 'Post Event' permission is Disabled.
		incontextRegistrationTests.doRegistrationByPostEventDisable();

		//inContext Registration from Login Page with new  Registration
		incontextRegistrationTests.doRegistrationFromLoginPage();

		// Incontext New Registration from reply post With Create Account
		incontextRegistrationTests.doRegistrationFromReplyPostWithCreateAccount();

		// Do Registeration when User Account is OFF
		incontextRegistrationTests.doRegistrationWhenUserAccountOff();

	});
};
