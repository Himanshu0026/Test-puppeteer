//----- This js file covers all the valid and invalid Test scenarios for Combination of subcategory and group permission functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var postTopicUserPermissionJSON = require('../../testdata/postTopicUserPermissionData.json');
var postTopicUserPermissionTestcases = require('../cases/postTopicUserPermission.js');
var combinationOfSubCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfSubCategoryAndGroupPermissions.js');
var postTopicUserPermission = module.exports = {};


postTopicUserPermission.registeredUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to create a category and its sub category and get their id
		combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory();

		// method to verify permission message after clicking on any topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisable('Registered Users');

		// method to Verify permission message after creating new topic
		postTopicUserPermissionTestcases.verifyClickOnNewTopicDisable('Registered Users');

		// method to Verify permission message after clicking on this newly created topic from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageDisable('Registered Users');

		// method to verify content of  a topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicEnable('Registered Users');

		// method to verify compose message functionality from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageEnable('Registered Users');

		// method to Verify compose message functionality from the Topic listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnable('Registered Users');

		// method to Disable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserDisable('Unregistered / Not Logged In');

		// method to Enable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserEnable('Unregistered / Not Logged In');

		// method to Disable "View Others' Topic" for Registered user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForRegisteredUser('Registered Users');

		// method to Verify View Others's Topic on frontend from category
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategory('Registered Users');

		// method to Verify View Others's Topic on frontend from category when there are own topic
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopic('Registered Users');

		// method to Verify View Others's Topic in topic list inside category
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopic('Registered Users');

		// method to Enable "View Other Topic" for Registered user from group Permission and verify permission on frontend
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryEnable('Registered Users');

		// method to Disable "View Others' Topic" for un-registered user from group Permission
		postTopicUserPermissionTestcases.verifyViewOthersTopicForUnregisteredUserWhenNoTopicCreatedDisable('Unregistered / Not Logged In');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserDisable('Registered Users');

		// method to Enable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserEnable('Registered Users');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForAdminUser('Registered Users');

		// method to Disable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserDisable('Registered Users');

		// method to Enable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserEnable('Registered Users');

		// method to Disable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserDisable('Registered Users');

		// method to Enable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserEnable('Registered Users');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserDisable('Registered Users');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserEnable('Registered Users');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicDisable('Registered Users');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicEnable('Registered Users');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageDisable('Registered Users');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageEnable('Registered Users');

		// method to verify when delete own post is disable and delete own topic enable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForRegisteredUser('Registered Users');

		// method to verify when delete own post is disable and delete own topic disable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForRegisteredUser('Registered Users');

		// method to Disable "Move Own Post" for Registered user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicDisable('Registered Users');

		// method to Move Own Topic shown on User's Profile page For disable setting
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageDisable('Registered Users');
	});
};

postTopicUserPermission.pendingUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to enable pending user group and assign the user
		//combinationOfSubCategoryAndGroupPermissionsTestcases.enablePendingApprovalAndAssignUser();

		// method to verify permission message after clicking on any topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisable('Pending Approval');

		// method to Verify permission message after creating new topic
		postTopicUserPermissionTestcases.verifyClickOnNewTopicDisable('Pending Approval');

		// method to Verify permission message after clicking on this newly created topic from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageDisable('Pending Approval');

		// method to verify content of  a topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicEnable('Pending Approval');

		// method to verify compose message functionality from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageEnable('Pending Approval');

		// method to Verify compose message functionality from the Topic listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnable('Pending Approval');

		// method to Disable "View Others' Topic" for Registered user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForRegisteredUser('Pending Approval');

		// method to Verify View Others's Topic on frontend from category
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategory('Pending Approval');

		// method to Verify View Others's Topic on frontend from category when there are own topic
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopic('Pending Approval');

		// method to Verify View Others's Topic in topic list inside category
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopic('Pending Approval');

		// method to Enable "View Other Topic" for Registered user from group Permission and verify permission on frontend
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryEnable('Pending Approval');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserDisable('Pending Approval');

		// method to Enable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserEnable('Pending Approval');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForAdminUser('Pending Approval');

		// method to Disable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserDisable('Pending Approval');

		// method to Enable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserEnable('Pending Approval');

		// method to Disable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserDisable('Pending Approval');

		// method to Enable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserEnable('Pending Approval');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserDisable('Pending Approval');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserEnable('Pending Approval');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicDisable('Pending Approval');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicEnable('Pending Approval');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageDisable('Pending Approval');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageEnable('Pending Approval');

		// method to verify when delete own post is disable and delete own topic enable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForRegisteredUser('Pending Approval');

		// method to verify when delete own post is disable and delete own topic disable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForRegisteredUser('Pending Approval');

		// method to Disable "Move Own Post" for Registered user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicDisable('Pending Approval');

		// method to Move Own Topic shown on User's Profile page For disable setting
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageDisable('Pending Approval');
	});
};

postTopicUserPermission.emailVerificationUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to enable email verification user group and assign the user
		//combinationOfSubCategoryAndGroupPermissionsTestcases.enableEmailVerificationAndAssignUser();

		// method to verify permission message after clicking on any topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisable('Pending Email Verification');

		// method to Verify permission message after creating new topic
		postTopicUserPermissionTestcases.verifyClickOnNewTopicDisable('Pending Email Verification');

		// method to Verify permission message after clicking on this newly created topic from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageDisable('Pending Email Verification');

		// method to verify content of  a topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicEnable('Pending Email Verification');

		// method to verify compose message functionality from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageEnable('Pending Email Verification');

		// method to Verify compose message functionality from the Topic listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnable('Pending Email Verification');

		// method to Disable "View Others' Topic" for Registered user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForRegisteredUser('Pending Email Verification');

		// method to Verify View Others's Topic on frontend from category
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategory('Pending Email Verification');

		// method to Verify View Others's Topic on frontend from category when there are own topic
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopic('Pending Email Verification');

		// method to Verify View Others's Topic in topic list inside category
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopic('Pending Email Verification');

		// method to Enable "View Other Topic" for Registered user from group Permission and verify permission on frontend
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryEnable('Pending Email Verification');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserDisable('Pending Email Verification');

		// method to Enable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserEnable('Pending Email Verification');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForAdminUser('Pending Email Verification');

		// method to Disable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserDisable('Pending Email Verification');

		// method to Enable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserEnable('Pending Email Verification');

		// method to Disable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserDisable('Pending Email Verification');

		// method to Enable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserEnable('Pending Email Verification');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserDisable('Pending Email Verification');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserEnable('Pending Email Verification');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicDisable('Pending Email Verification');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicEnable('Pending Email Verification');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageDisable('Pending Email Verification');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageEnable('Pending Email Verification');

		// method to verify when delete own post is disable and delete own topic enable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForRegisteredUser('Pending Email Verification');

		// method to verify when delete own post is disable and delete own topic disable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForRegisteredUser('Pending Email Verification');

		// method to Disable "Move Own Post" for Registered user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicDisable('Pending Email Verification');

		// method to Move Own Topic shown on User's Profile page For disable setting
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageDisable('Pending Email Verification');
	});
};

postTopicUserPermission.customUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		var customUserGroup = postTopicUserPermissionJSON.groupName;

		// method to create a custom group and assign a user
		//combinationOfSubCategoryAndGroupPermissionsTestcases.createCustomGroupAndAssignUser(customUserGroup);

		// method to verify permission message after clicking on any topic for Custom user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisableForCustomUser(customUserGroup);

		// method to Verify permission message after creating new topic
		postTopicUserPermissionTestcases.verifyClickOnNewTopicDisable(customUserGroup);

		// method to Verify permission message after clicking on this newly created topic from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageDisable(customUserGroup);

		// method to verify content of  a topic for pending user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicForCustomUserEnable(customUserGroup);

		// method to verify compose message functionality from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageEnable(customUserGroup);

		// method to Verify compose message functionality from the Topic listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnable(customUserGroup);

		// method to Disable "View Others' Topic" for Custom user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForCustomUser(customUserGroup);

		// method to Verify View Others's Topic on frontend from category when there is no own topic For Custom User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForCustomUser(customUserGroup);

		// method to Verify View Others's Topic on frontend from category when there are own topic
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopic(customUserGroup);

		// method to Verify View Others's Topic in topic list inside category
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopic(customUserGroup);

		// method to Enable "View Other Topic" for Custom user from group Permission and verify permission on frontend For Pending User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForCustomUserEnable(customUserGroup);

		// method to Disable "Reply Own Topic" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForCustomUserDisable(customUserGroup);

		// method to Enable "Reply Own Topic" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForCustomUserEnable(customUserGroup);

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForAdminUser(customUserGroup);

		// method to Disable "Edit Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForCustomUserDisable(customUserGroup);

		// method to Enable "Edit Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForCustomUserEnable(customUserGroup);

		// method to Disable "Delete Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForCustomUserDisable(customUserGroup);

		// method to Enable "Delete Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForCustomUserEnable(customUserGroup);

		// method to Disable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserDisable(customUserGroup);

		// method to Enable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserEnable(customUserGroup);

		// method to Disable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserAgainstTopicDisable(customUserGroup);

		// method to Enable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserAgainstTopicEnable(customUserGroup);

		// method to Disable "Delete Own Topic" for Custom user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomFromDropDownOnPostListingPageDisable(customUserGroup);

		// method to Enable "Delete Own Topic" for Custom user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomFromDropDownOnPostListingPageEnable(customUserGroup);

		// method to verify when delete own post is disable and delete own topic enable for Custom user
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForCustomUser(customUserGroup);

		// method to verify when delete own post is disable and delete own topic disable for Custom user
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForCustomUser(customUserGroup);

		// method to Disable "Move Own Post" for Custom user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicForCustomUserDisable(customUserGroup);

		// method to Move Own Topic shown on User's Profile page For disable setting for Custom User
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageForCustomUserDisable(customUserGroup);

	});
};
