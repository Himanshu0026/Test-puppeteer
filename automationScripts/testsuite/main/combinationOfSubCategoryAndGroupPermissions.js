
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

		// Test case to set up all the backend setting for registration task
		//registerTests.registrationBackendSetting();

		// method to register users neha, isneha etc
		//combinationOfSubCategoryAndGroupPermissionsTestcases.registerUserTOLogin();

		// method to delete all the categories from backend
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();

		// method to create a category and its sub category and get their id
		combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory();

		// method to verify with category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory('Registered Users');

		// method to verify with sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategory('Registered Users');

		// method to verify with the private sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategory('Registered Users');

		// method to verify with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategory('Registered Users');

		// method to verify with other sub-categories
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategory('Registered Users');

		// method to verify start new topic button with the sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategory('Registered Users');

		// method to verify start new topic button with the sub-category cat1a(Disable)
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryDisable('Registered Users');

		// method to verify start new topic button with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForParentCategory('Registered Users');

		// method to verify with other sub-categories
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForOtherSubCategory('Registered Users');

		// method to verify Reply topic button with the sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategory('Registered Users');

		// method to verify Reply topic button with the sub-category cat1a(Disable)
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryDisable('Registered Users');

		// method to verify reply topic button with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategory('Registered Users');

		// method to verify with other sub-categories
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherSubCategory('Registered Users');

		// method to verify upload attachments button with the private sub-category cat1a(Disable)
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryDisable('Registered Users');

		// method to verify Post approval with the private sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategory('Registered Users');

		// method to verify Post approval with the private sub-category cat1a(Disable)
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryDisable('Registered Users');

		// method to verify Post approval with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategory('Registered Users');

		// method to verify with other sub-categories
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategory('Registered Users');
	});
};

combinationOfSubCategoryAndGroupPermissions.unregisterUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to verify with category cat1 for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify with sub category cat1a for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify with sub category cat1a for unregistered user Disabled
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryUnregisteredUserDisabled('Unregistered / Not Logged In');

		// method to verify with category cat1 for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryUnregisteredUserDisabled('Unregistered / Not Logged In');

		// method to verify with other sub-categories
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify with new topic button for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithSubCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify start new topic button with the private sub-category cat1a for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithSubCategoryUnregisteredUserDisabled('Unregistered / Not Logged In');

		// method to verify start new topic button with the private category cat1 for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify start new topic button with the other category cat1 for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithOtherCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify start new topic button with the sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategory('Registered Users'); // called agian to create a topic by registerd user

		// method to verify Reply topics  with the private sub-category cat1a for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify Reply topics  with the private sub-category cat1a for unregistered user Disable
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryUnregisteredUserDisable('Unregistered / Not Logged In');

		// method to verify reply topic button with the parent category cat1 for unregistered user Disable
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify with other sub-categories cat1b for unregistered user Disable
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithOtherSubCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify Post approval with the private sub-category cat1a for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify Post approval with the private sub-category cat1a for unregistered user Disable
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryUnregisteredUserDisable('Unregistered / Not Logged In');

		// method to verify  Post approval with the parent category cat1 for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithCategoryUnregisteredUser('Unregistered / Not Logged In');

		// method to verify  Post approval with other sub-categories cat1b for unregistered user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategoryUnregisteredUser('Unregistered / Not Logged In');

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

		// method to verify with sub-category cat1a for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryForCustomUser(customUserGroup);

		// method to verify with the private sub-category cat1a for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategoryForCustomUser(customUserGroup);

		// method to verify with the parent category cat1 for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategoryForCustomUser (customUserGroup);

		// method to verify with other sub-categories for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategoryForCustomUser(customUserGroup);

		// method to verify start new topic button with the sub-category cat1a for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithSubCategoryForCustomUser(customUserGroup);

		// method to verify start new topic button with the sub-category cat1a(Disable) for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithSubCategoryForCustomUserDisable(customUserGroup);

		// method to verify start new topic button with the parent category cat1 for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithParentCategoryForCustomUser(customUserGroup);

		// method to verify with other sub-categories for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithOtherSubCategoryForCustomUser(customUserGroup);

		// method to verify Reply topic button with the sub-category cat1a for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryForCustomUser(customUserGroup);

		// method to verify Reply topic button with the sub-category cat1a(Disable) for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryForCustomUserDisable(customUserGroup);

		// method to verify reply topic button with the parent category cat1 for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategoryForCustomUser(customUserGroup);

		// method to verify with other sub-categories for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithOtherSubCategoryForCustomUser(customUserGroup);

		// method to verify upload attachments button with the private sub-category cat1a(Disable) for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryForCustomUserDisable(customUserGroup);

		// method to verify Post approval with the private sub-category cat1a for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForCustomUser(customUserGroup);

		// method to verify Post approval with the private sub-category cat1a(Disable) for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForCustomUserDisable(customUserGroup);

		// method to verify Post approval with the parent category cat1 for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategoryForCustomUser(customUserGroup);

		// method to verify with other sub-categories for custom user
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategoryForCustomUser(customUserGroup);

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

			// method to verify with sub-category cat1a
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategory('Pending Approval');

			// method to verify with the private sub-category cat1a
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategory('Pending Approval');

			// method to verify with the parent category cat1
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategory('Pending Approval');

			// method to verify with other sub-categories
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategory('Pending Approval');

			// method to verify start new topic button with the sub-category cat1a
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategory('Pending Approval');

			// method to verify start new topic button with the sub-category cat1a(Disable)
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryDisable('Pending Approval');

			// method to verify start new topic button with the parent category cat1
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForParentCategory('Pending Approval');

			// method to verify with other sub-categories
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForOtherSubCategory('Pending Approval');

			// method to verify Reply topic button with the sub-category cat1a
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategory('Pending Approval');

			// method to verify Reply topic button with the sub-category cat1a(Disable)
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryDisable('Pending Approval');

			// method to verify reply topic button with the parent category cat1
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategory('Pending Approval');

			// method to verify with other sub-categories
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherSubCategory('Pending Approval');

			// method to verify upload attachments button with the private sub-category cat1a(Disable)
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryDisable('Pending Approval');

			// method to verify Post approval with the private sub-category cat1a
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategory('Pending Approval');

			// method to verify Post approval with the private sub-category cat1a(Disable)
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryDisable('Pending Approval');

			// method to verify Post approval with the parent category cat1
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategory('Pending Approval');

			// method to verify with other sub-categories
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategory('Pending Approval');

			// method to delete the subcategory
			combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithDeleteSubCategory('Pending Approval');
		});
};
