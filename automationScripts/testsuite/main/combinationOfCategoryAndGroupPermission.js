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
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory('Registered Users');

		// method to verify with the private category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory('Registered Users');

		// method to verify With SubCategory Of Disabled Category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory('Registered Users');

		// method to verify with other category, whether they are visible or not
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory('Registered Users');

		// method to verify private category on the compose page's drop down
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown('Registered Users');

		// method to verify with category cat1 When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable('Registered Users');

		// method to verify with other category When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable('Registered Users');

		// method to verify with category cat1 When Both Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable('Registered Users');

		// method to verify with "privacy" option for category from back end
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend('Registered Users');

		// method to verify with start new topic
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic('Registered Users');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory('Registered Users');

		// method to Verify with click on start new topic button for  sub-category of private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory('Registered Users');

		// method to verify start new topic with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory('Registered Users');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable('Registered Users');

		// method to verify with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable('Registered Users');

		// method to Verify with click on start new topic when both permission disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable('Registered Users');

		// method to Verify with reply topics option for enabled catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic('Registered Users');

		// method to Verify with reply  on other users topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory('Registered Users');

		// method to Verify with reply on own topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory('Registered Users');

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup('Registered Users');

		// method to Verify with reply on subcategories topic for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategory('Registered Users');

		// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroup('Registered Users');

		// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroup('Registered Users');

		// method to verify with the reply topic for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategory('Registered Users');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled('Registered Users');

		// method to verify with start new topic and post a reply for sub categoryof enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory('Registered Users');

		// method to verify with start new topic and post a reply for disabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory('Registered Users');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup('Registered Users');

		// method to verify with start new topic and post a reply for other category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory('Registered Users');

		// method to verify with the post approval for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup('Registered Users');

	});
};

combinationOfCategoryAndGroupPermissions.pendingUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to enable pending user group and assign the user
		combinationOfSubCategoryAndGroupPermissionsTestcases.enablePendingApprovalAndAssignUser();

		// method to verify with category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory('Pending Approval');

		// method to verify with the private category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory('Pending Approval');

		// method to verify With SubCategory Of Disabled Category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory('Pending Approval');

		// method to verify with other category, whether they are visible or not
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory('Pending Approval');

		// method to verify private category on the compose page's drop down
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown('Pending Approval');

		// method to verify with category cat1 When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable('Pending Approval');

		// method to verify with other category When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable('Pending Approval');

		// method to verify with category cat1 When Both Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable('Pending Approval');

		// method to verify with "privacy" option for category from back end
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend('Pending Approval');

		// method to verify with start new topic
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic('Pending Approval');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory('Pending Approval');

		// method to Verify with click on start new topic button for  sub-category of private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory('Pending Approval');

		// method to verify start new topic with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory('Pending Approval');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable('Pending Approval');

		// method to verify with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable('Pending Approval');

		// method to Verify with click on start new topic when both permission disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable('Pending Approval');

		// method to Verify with reply topics option for enabled catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic('Pending Approval');

		// method to Verify with reply  on other users topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory('Pending Approval');

		// method to Verify with reply on own topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory('Pending Approval');

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup('Pending Approval');

		// method to Verify with reply on subcategories topic for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategory('Pending Approval');

		// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroup('Pending Approval');

		// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroup('Pending Approval');

		// method to verify with the reply topic for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategory('Pending Approval');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled('Pending Approval');

		// method to verify with start new topic and post a reply for sub categoryof enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory('Pending Approval');

		// method to verify with start new topic and post a reply for disabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory('Pending Approval');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup('Pending Approval');

		// method to verify with start new topic and post a reply for other category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory('Pending Approval');

		// method to verify with the post approval for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup('Pending Approval');

	});
};

combinationOfCategoryAndGroupPermissions.moderatorsUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to verify with category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory('Moderators');

		// method to verify with the private category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory('Moderators');

		// method to verify With SubCategory Of Disabled Category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory('Moderators');

		// method to verify with other category, whether they are visible or not
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory('Moderators');

		// method to verify private category on the compose page's drop down
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown('Moderators');

		// method to verify with category cat1 When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable('Moderators');

		// method to verify with other category When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable('Moderators');

		// method to verify with category cat1 When Both Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable('Moderators');

		// method to verify with "privacy" option for category from back end
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend('Moderators');

		// method to verify with start new topic
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic('Moderators');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory('Moderators');

		// method to Verify with click on start new topic button for  sub-category of private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory('Moderators');

		// method to verify start new topic with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory('Moderators');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable('Moderators');

		// method to verify with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable('Moderators');

		// method to Verify with click on start new topic when both permission disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable('Moderators');

		// method to Verify with reply topics option for enabled catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic('Moderators');

		// method to Verify with reply  on other users topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory('Moderators');

		// method to Verify with reply on own topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory('Moderators');

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup('Moderators');

		// method to Verify with reply on subcategories topic for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategory('Moderators');

		// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroup('Moderators');

		// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroup('Moderators');

		// method to verify with the reply topic for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategory('Moderators');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled('Moderators');

		// method to verify with start new topic and post a reply for sub categoryof enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory('Moderators');

		// method to verify with start new topic and post a reply for disabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory('Moderators');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup('Moderators');

		// method to verify with start new topic and post a reply for other category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory('Moderators');

		// method to verify with the post approval for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup('Moderators');

	});
};

combinationOfCategoryAndGroupPermissions.emailVerificationUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to enable email verification user group and assign the user
		combinationOfSubCategoryAndGroupPermissionsTestcases.enableEmailVerificationAndAssignUser();

		// method to verify with category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory('Pending Email Verification');

		// method to verify with the private category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory('Pending Email Verification');

		// method to verify With SubCategory Of Disabled Category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory('Pending Email Verification');

		// method to verify with other category, whether they are visible or not
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory('Pending Email Verification');

		// method to verify private category on the compose page's drop down
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown('Pending Email Verification');

		// method to verify with category cat1 When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable('Pending Email Verification');

		// method to verify with other category When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable('Pending Email Verification');

		// method to verify with category cat1 When Both Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable('Pending Email Verification');

		// method to verify with "privacy" option for category from back end
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend('Pending Email Verification');

		// method to verify with start new topic
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic('Pending Email Verification');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory('Pending Email Verification');

		// method to Verify with click on start new topic button for  sub-category of private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory('Pending Email Verification');

		// method to verify start new topic with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory('Pending Email Verification');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable('Pending Email Verification');

		// method to verify with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable('Pending Email Verification');

		// method to Verify with click on start new topic when both permission disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable('Pending Email Verification');

		// method to Verify with reply topics option for enabled catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic('Pending Email Verification');

		// method to Verify with reply  on other users topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory('Pending Email Verification');

		// method to Verify with reply on own topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory('Pending Email Verification');

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup('Pending Email Verification');

		// method to Verify with reply on subcategories topic for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategory('Pending Email Verification');

		// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroup('Pending Email Verification');

		// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroup('Pending Email Verification');

		// method to verify with the reply topic for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategory('Pending Email Verification');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled('Pending Email Verification');

		// method to verify with start new topic and post a reply for sub categoryof enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory('Pending Email Verification');

		// method to verify with start new topic and post a reply for disabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory('Pending Email Verification');

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup('Pending Email Verification');

		// method to verify with start new topic and post a reply for other category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory('Pending Email Verification');

		// method to verify with the post approval for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup('Pending Email Verification');

	});
};

combinationOfCategoryAndGroupPermissions.unregisteredUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to verify with category cat1 for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with the private category cat1 for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify With SubCategory Of Disabled Category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with other category, whether they are visible or not for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify private category on the compose page's drop down for Unregistered Users
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDownForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with category cat1 When Group Permission Disable for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisableForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with other category When Group Permission Disable for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisableForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with category cat1 When Both Permission Disable for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisableForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with "privacy" option for category from back end for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackendForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with start new topic for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with click on start new topic button for private category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with click on start new topic button for  sub-category of private category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify start new topic with other categories for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with click on start new topic button for private category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisableForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with other categories for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisableForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with click on start new topic when both permission disable for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisableForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with reply topics option for enabled catagory(cat1) for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with reply  on other users topics for disable catagory(cat1) for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with reply on own topics for disable catagory(cat1) for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroupForUnregisteredUsers('Unregistered / Not Logged In');

		// method to Verify with reply on subcategories topic for disable catagory(cat1) for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroupForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with reply topics option for other catagory(cat1) and disable groupPermission for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroupForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with the reply topic for all categories for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with start new topic and post a reply for enabled category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with start new topic and post a reply for sub categoryof enabled category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with start new topic and post a reply for disabled category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with start new topic and post a reply for enabled category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroupForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with start new topic and post a reply for other category for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategoryForUnregisteredUsers('Unregistered / Not Logged In');

		// method to verify with the post approval for all categories for Unregistered Users
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroupForUnregisteredUsers('Unregistered / Not Logged In');

	});
};

combinationOfCategoryAndGroupPermissions.customUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		var customUserGroup = combinationOfCategoryAndGroupPermissionsJSON.groupName;

		// method to verify with category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryForCustomUser(customUserGroup);

		// method to verify with the private category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryForCustomUser(customUserGroup);

		// method to verify With SubCategory Of Disabled Category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategoryForCustomUser(customUserGroup);

		// method to verify with other category, whether they are visible or not
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryForCustomUser(customUserGroup);

		// method to verify private category on the compose page's drop down
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDownForCustomUser(customUserGroup);

		// method to verify with category cat1 When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisableForCustomUser(customUserGroup);

		// method to verify with other category When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisableForCustomUser(customUserGroup);

		// method to verify with category cat1 When Both Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisableForCustomUser(customUserGroup);

		// method to verify with "privacy" option for category from back end
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackendForCustomUser(customUserGroup);

		// method to verify with start new topic
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForCustomUser(customUserGroup);

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryForCustomUser(customUserGroup);

		// method to Verify with click on start new topic button for  sub-category of private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategoryForCustomUser(customUserGroup);

		// method to verify start new topic with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryForCustomUser(customUserGroup);

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisableForCustomUser(customUserGroup);

		// method to verify with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisableForCustomUser(customUserGroup);

		// method to Verify with click on start new topic when both permission disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisableForCustomUser(customUserGroup);

		// method to Verify with reply topics option for enabled catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForCustomUser(customUserGroup);

		// method to Verify with reply  on other users topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategoryForCustomUser(customUserGroup);

		// method to Verify with reply on own topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryForCustomUser(customUserGroup);

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroupForCustomUser(customUserGroup);

		// method to Verify with reply on subcategories topic for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategoryForCustomUser(customUserGroup);

		// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroupForCustomUser(customUserGroup);

		// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroupForCustomUser(customUserGroup);

		// method to verify with the reply topic for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategoryForCustomUser(customUserGroup);

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForCustomUser(customUserGroup);

		// method to verify with start new topic and post a reply for sub categoryof enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategoryForCustomUser(customUserGroup);

		// method to verify with start new topic and post a reply for disabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryForCustomUser(customUserGroup);

		// method to verify with start new topic and post a reply for enabled category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroupForCustomUser(customUserGroup);

		// method to verify with start new topic and post a reply for other category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategoryForCustomUser(customUserGroup);

		// method to verify with the post approval for all categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroupForCustomUser(customUserGroup);

	});
};
