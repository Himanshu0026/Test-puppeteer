//----- This js file covers all the inContextLogin functionality on forum Frontend---------//

'use strict.';
var config = require('../../../config/config.json');
var inContextLoginTests = require('../cases/inContextLogin.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var registerTests = require('../cases/register.js');
var inContextLogin = module.exports = {};

inContextLogin.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// Test case to set up all the backend setting for registration task
		//registerTests.registrationBackendSetting();

		//Incontext login from start new topic button when start new topic button is enabled
		inContextLoginTests.doLoginByStartTopicEnable();

		// Incontext login from Start New Topic button when start new topic button is disabled
		inContextLoginTests.doLoginByStartTopicDisable();

		//inContext Login from Quote on post from post list
		inContextLoginTests.doLoginByQuoteOnPost();

		//inContext Login from Topic listing page when 'View Topic Content' permission is Disabled.
		inContextLoginTests.doLoginByViewTopicDisable();

		//inContext Login from the Forum Main page when 'View Forum' permission is Disabled.
		inContextLoginTests.doLoginByViewForumDisable();

		//inContext Login  when 'View Profile' permission is Disabled.
		inContextLoginTests.doLoginByViewProfileDisable();

		//inContext Login when 'View Calendar' permission is Enabled.
		inContextLoginTests.doLoginByViewCalenderEnable();

		//Incontext Login while Like this Topic from list of topics
		inContextLoginTests.doLoginByReputationEnableTopicLike();

		//Incontext Login while Dislike this post from  list of Topics page
		inContextLoginTests.doLoginByReputationEnablePostDislike();

		//Incontext Login while Like this post from Topic page
		inContextLoginTests.doLoginByReputationEnablePostLike();

		//inContext Login from Email button on Profile view screen of any user-
		inContextLoginTests.doLoginByEmailButton();

		//inContext Login from vote on post from post list
		inContextLoginTests.doLoginByVoteOnpost();

	});
};
