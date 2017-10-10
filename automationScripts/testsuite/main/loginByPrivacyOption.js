//----- This js file covers all Verify Login page on Forum by enabling Privacy Private  option functionality on forum Frontend---------//

'use strict.';
var config = require('../../../config/config.json');
var loginByPrivacyOptionTests = require('../cases/loginByPrivacyOption.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var loginByPrivacyOption = module.exports = {};

loginByPrivacyOption.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		//Login page on Forum by enabling Privacy Private option from backend
		loginByPrivacyOptionTests.enablePrivacyOption();

	}).then(function() {

		//Check login while launching app
		loginByPrivacyOptionTests.doLogin();

		//Check Login from Topic option in side menu
		loginByPrivacyOptionTests.doLoginByTopic();

		//Check Login from Members option is side menu
		loginByPrivacyOptionTests.doLoginByMember();

		//Check Login from Calender option is side menu
		loginByPrivacyOptionTests.doLoginByCalender();

		//Check Login from Donate option is side menu
		loginByPrivacyOptionTests.doLoginByDonate();

	});
};
