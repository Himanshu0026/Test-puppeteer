//----- This js file covers all the valid and invalid Test scenarios for Combination of category and group permission functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var registerTests = require('../cases/register.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var combinationOfSubCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfSubCategoryAndGroupPermissions.js');
var combinationOfCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfCategoryAndGroupPermission.json');
var combinationOfCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfCategoryAndGroupPermission.js');
var combinationOfCategoryAndGroupPermissions = module.exports = {};

combinationOfCategoryAndGroupPermissions.registerUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to create a category and its sub category and get their id
		combinationOfCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory();

		// method to verify with category cat2
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory('General');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled('General');

		// method to verify with start new topic and post a reply for sub categoryof enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory('General');

		// method to verify with start new topic and post a reply for disabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory('General');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup('General');

		// method to verify with start new topic and post a reply for other category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory('General');

		// method to verify with the post approval for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup('General');

	});
};
