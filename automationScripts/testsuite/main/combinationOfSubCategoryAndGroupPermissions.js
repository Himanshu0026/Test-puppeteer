
//----- This js file covers all the valid and invalid Test scenarios for Combination of subcategory and group permission functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var registerTests = require('../cases/register.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var combinationOfSubCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfSubCategoryAndGroupPermissionsData.json');
var combinationOfSubCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfSubCategoryAndGroupPermissions.js');
var combinationOfSubCategoryAndGroupPermissions = module.exports = {};

combinationOfSubCategoryAndGroupPermissions.registerUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to delete all the categories from backend
		//thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		// method to create a category General
		//thumpsUpDownTestcases.createCategoryTestCase();

		// method to create a category and its sub category and get their id
		//combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory();

		// method to verify with category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory('General');

	});
};

combinationOfSubCategoryAndGroupPermissions.unregisterUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to verify with category cat1 for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryUnregisteredUser('Unregistered / Not Logged In');

	});
};

combinationOfSubCategoryAndGroupPermissions.customUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		var customUserGroup = combinationOfSubCategoryAndGroupPermissionsJSON.groupName;

		// method to create a custom group and assign a user
		combinationOfSubCategoryAndGroupPermissionsTestcases.createCustomGroupAndAssignUser(customUserGroup);

		// method to verify with category cat1 for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryForCustomUser(customUserGroup);

	});
};

combinationOfSubCategoryAndGroupPermissions.pendingUserTest = function() {

		casper.start(config.backEndUrl, function() {

			utils.info(" Title of the page :"+this.getTitle());
			forumLoginMethod.loginToForumBackEnd();

		}).then(function() {

			// method to enable pending user group and assign the user
			combinationOfSubCategoryAndGroupPermissionsTestcases.enablePendingApprovalAndAssignUser();

			// method to verify with category cat1
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory('Pending Approval');

		});
};
