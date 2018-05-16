'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var ooScriptTestcases = require('../cases/ooScript.js');
var ooScript = module.exports = {};

ooScript.featureTest = function() {
	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		//ooScriptTestcases.registrationBackendSetting();

		//ooScriptTestcases.registerUserTOLogin();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();

		ooScriptTestcases.createNewTopic();

	}).thenOpen(config.url+ 'cgi/util/test_object_framework.cgi', function() {
	}).then(function() {
		casper.test.assertTextExist('PASS', 'Perl Scripts');
	casper.test.assertTextDoesntExist('FAIL', 'Perl Scripts have some errors');
	});
};
