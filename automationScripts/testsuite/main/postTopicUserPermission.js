//----- This js file covers all the valid and invalid Test scenarios for Combination of subcategory and group permission functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var postTopicUserPermissionTestcases = require('../cases/postTopicUserPermission.js');
var postTopicUserPermissionMethod = require('../methods/postTopicUserPermission.js');
var combinationOfSubCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfSubCategoryAndGroupPermissions.js');
var postTopicUserPermission = module.exports = {};


postTopicUserPermission.registeredUserTest = function() {

	casper.start(config.url, function() {

		utils.info(" Title of the page :"+this.getTitle());

		// method to enable view forum for unregistered User
		combinationOfSubCategoryAndGroupPermissionsTestcases.enableViewForumForUnregisterdUser();

		// method to register users
		postTopicUserPermissionTestcases.registerUserTOLogin();

		// method to create a category cat1
		postTopicUserPermissionTestcases.createCategory();

		// method to verify permission message after clicking on any topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisable();

		// method to Verify permission message after creating new topic
		postTopicUserPermissionTestcases.verifyClickOnNewTopicDisable();

		// method to Verify permission message after clicking on this newly created topic from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageDisable();

		// method to verify content of  a topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicEnable();

		// method to verify compose message functionality from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageEnable();

		// method to Verify compose message functionality from the Topic listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnable();

		// method to Disable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserDisable();

		// method to Enable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserEnable();

		// method to Disable "View Others' Topic" for Registered user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForRegisteredUser();

		// method to Verify View Others's Topic on frontend from category
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategory();

		// method to Verify View Others's Topic on frontend from category when there are own topic
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopic();

		// method to Verify View Others's Topic in topic list inside category
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopic();

		// method to Enable "View Other Topic" for Registered user from group Permission and verify permission on frontend
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryEnable();

		// method to Disable "View Others' Topic" for un-registered user from group Permission
		postTopicUserPermissionTestcases.verifyViewOthersTopicForUnregisteredUserWhenNoTopicCreatedDisable();

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserDisable();

		// method to Enable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserEnable();

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForAdminUser();

		// method to Disable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserDisable();

		// method to Enable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserEnable();

		// method to Disable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserDisable();

		// method to Enable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserEnable();

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserDisable();

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserEnable();

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicDisable();

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicEnable();

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageDisable();

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageEnable();

		// method to verify when delete own post is disable and delete own topic enable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForRegisteredUser();

		// method to verify when delete own post is disable and delete own topic disable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForRegisteredUser();

		// method to Disable "Move Own Post" for Registered user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicDisable();

		// method to Enable "Move Own Post" for Registered user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicEnable();

		// method to verify Move Own Topic shown on User's Profile page
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageEnable();

		// method to Move Own Topic shown on User's Profile page For disable setting
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageDisable();
	});
};

postTopicUserPermission.pendingUserTest = function() {

	casper.start(config.url, function() {

		utils.info("Title of the page :"+this.getTitle());

		// method to verify permission message after clicking on any topic for pending user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisableForPendingUser();

		// method to Verify permission message after creating new topic for pending user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicForPendingUserDisable();

		// method to Verify permission message after clicking on this newly created topic from the category listing page for pending user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageForPendingUserDisable();

		// method to verify content of  a topic for pending user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicForPendingUserEnable();

		// method to verify compose message functionality from the category listing page for pending user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageForPendingUserEnable();

		// method to Verify compose message functionality from the Topic listing page" for pending user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnableForPendingUser();

		// method to Disable "View Others' Topic" for Pending user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForPendingUser();

		// method to Verify View Others's Topic on frontend from category when there is no own topic ForP ending User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForPendingUser();

		// method to Verify View Others's Topic on frontend from category when there are own topic For Pending User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopicForPendingUser();

		// method to Verify View Others's Topic in topic list inside category For Pending User
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopicForPendingUser();

		// method to Enable "View Other Topic" for Registered user from group Permission and verify permission on frontend For Pending User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForPendingUserEnable();

		// method to Disable "Reply Own Topic" for Pending user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForPendingUserDisable();

		// method to Enable "Reply Own Topic" for Pending user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForPendingUserEnable();

		// method to Disable "Reply Own Topic" for Pending user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForPendingUser();

		// method to Disable "Edit Own Post" for Pending user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForPendingUserDisable();

		// method to Enable "Edit Own Post" for Pending user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForPendingUserEnable();

		// method to Disable "Delete Own Post" for Pending user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForPendingUserDisable();

		// method to Enable "Delete Own Post" for Pending user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForPendingUserEnable();

		// method to Disable "Delete Own Topic" for Pending user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForPendingUserDisable();

		// method to Enable "Delete Own Topic" for Pending user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForPendingUserEnable();

		// method to Disable "Delete Own Topic" for Pending user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForPendingUserAgainstTopicDisable();

		// method to Enable "Delete Own Topic" for Pending user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForPendingUserAgainstTopicEnable();

		// method to Disable "Delete Own Topic" for Pending user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForPendingUserFromDropDownOnPostListingPageDisable();

		// method to Enable "Delete Own Topic" for Pending user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForPendingUserFromDropDownOnPostListingPageEnable();

		// method to Disable "Move Own Post" for Pending user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicForPendingUserDisable();

		// method to Enable "Move Own Post" for Pending user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicForPendingUserEnable();

		// method to verify Move Own Topic shown on User's Profile page for Pending User
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageForPendingUserEnable();

		// method to Move Own Topic shown on User's Profile page For disable setting for Pending User
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageForPendingUserDisable();
	});
};

postTopicUserPermission.emailVerificationUserTest = function() {

	casper.start(config.url, function() {

		utils.info("Title of the page :"+this.getTitle());

		// method to verify permission message after clicking on any topic for email verification user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisableForEmailVerificationUser();

		// method to Verify permission message after creating new topic for email verification user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicForEmailVerificationUserDisable();

		// method to Verify permission message after clicking on this newly created topic from the category listing page for email verification user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageForEmailVerificationUserDisable();

		// method to verify content of  a topic for email verification user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicForEmailVerificationUserEnable();

		// method to verify compose message functionality from the category listing page for email verification user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageForEmailVerificationUserEnable();

		// method to Verify compose message functionality from the Topic listing page" for email verification user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnableForEmailVerificationUser();

		// method to Disable "View Others' Topic" for Pending Email Verification user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForEmailVerificationUser();

		// method to Verify View Others's Topic on frontend from category when there is no own topic For Email Verification User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForEmailVerificationUser();

		// method to Verify View Others's Topic on frontend from category when there are own topic For Email Verification User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopicForEmailVerificationUser();

		// method to Verify View Others's Topic in topic list inside category For Email Verification User
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopicForEmailVerificationUser();

		// method to Enable "View Other Topic" for Email Verification user from group Permission and verify permission on frontend For Pending User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForEmailVerificationUserEnable();

		// method to Disable "Reply Own Topic" for Pending Email Verification user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForEmailVerificationUserDisable();

		// method to Enable "Reply Own Topic" for Pending Email Verification user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForEmailVerificationUserEnable();

		// method to Disable "Reply Own Topic" for Pending Email Verification user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForEmailVerificationUser();

		// method to Disable "Edit Own Post" for Pending Email Verification user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForEmailVerificationUserDisable();

		// method to Enable "Edit Own Post" for Pending Email Verification user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForEmailVerificationUserEnable();

		// method to Disable "Delete Own Post" for Pending Email Verification user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForEmailVerificationUserDisable();

		// method to Enable "Delete Own Post" for Pending Email Verification user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForEmailVerificationUserEnable();

		// method to Disable "Delete Own Topic" for Pending Email Verification user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForEmailVerificationUserDisable();

		// method to Enable "Delete Own Topic" for Pending Email Verification user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForEmailVerificationUserEnable();

		// method to Disable "Delete Own Topic" for Email Verification User from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForEmailVerificationUserAgainstTopicDisable();

		// method to Enable "Delete Own Topic" for Email Verification user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForEmailVerificationUserAgainstTopicEnable();

		// method to Disable "Move Own Post" for Email Verification user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicForEmailVerificationUserDisable();

		// method to Enable "Move Own Post" for Email Verification user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicForEmailVerificationUserEnable();

		// method to verify Move Own Topic shown on User's Profile page for Email Verification User
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageForEmailVerificationUserEnable();

		// method to Move Own Topic shown on User's Profile page For disable setting for Email Verification User
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageForEmailVerificationUserDisable();

		// method to verify when delete own post is disable and delete own topic enable for Email Verification user
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForEmailVerificationUser();

		// method to verify when delete own post is disable and delete own topic disable for Email Verification user
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForEmailVerificationUser();

		// method to Disable "Delete Own Topic" for Email Verification user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForEmailVerificationUserFromDropDownOnPostListingPageDisable();

		// method to Enable "Delete Own Topic" for Email Verification user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForEmailVerificationUserFromDropDownOnPostListingPageEnable();
	});
};

postTopicUserPermission.customUserTest = function() {

	casper.start(config.url, function() {

		utils.info("Title of the page :"+this.getTitle());

		// method to verify permission message after clicking on any topic for Custom user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisableForCustomUser();

		// method to Verify permission message after creating new topic for Custom user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicForCustomUserDisable();

		// method to Verify permission message after clicking on this newly created topic from the category listing page for Custom user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageForCustomUserDisable();

		// method to verify content of  a topic for pending user
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicForCustomUserEnable();

		// method to verify compose message functionality from the category listing page for Custom user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageForCustomUserEnable();

		// method to Verify compose message functionality from the Topic listing page" for Custom user
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnableForCustomUser();

		// method to Disable "View Others' Topic" for Custom user from group Permission
		postTopicUserPermissionTestcases.disableViewOthersTopicsForCustomUser();

		// method to Verify View Others's Topic on frontend from category when there is no own topic For Custom User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForCustomUser();

		// method to Verify View Others's Topic on frontend from category when there are own topic For Custom User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopicForCustomUser();

		// method to Verify View Others's Topic in topic list inside category For Custom User
		postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopicForCustomUser();

		// method to Enable "View Other Topic" for Custom user from group Permission and verify permission on frontend For Pending User
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForCustomUserEnable();

		// method to Disable "Reply Own Topic" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForCustomUserDisable();

		// method to Enable "Reply Own Topic" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForCustomUserEnable();

		// method to Disable "Reply Own Topic" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForCustomUser();

		// method to Disable "Edit Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForCustomUserDisable();

		// method to Enable "Edit Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForCustomUserEnable();

		// method to Disable "Delete Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForCustomUserDisable();

		// method to Enable "Delete Own Post" for Custom user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForCustomUserEnable();

		// method to Disable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserDisable();

		// method to Enable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserEnable();

		// method to Disable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserAgainstTopicDisable();

		// method to Enable "Delete Own Topic" for Custom user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomUserAgainstTopicEnable();

		// method to Disable "Delete Own Topic" for Custom user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomFromDropDownOnPostListingPageDisable();

		// method to Enable "Delete Own Topic" for Custom user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForCustomFromDropDownOnPostListingPageEnable();

		// method to verify when delete own post is disable and delete own topic enable for Custom user
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForCustomUser();

		// method to verify when delete own post is disable and delete own topic disable for Custom user
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForCustomUser();

		// method to Disable "Move Own Post" for Custom user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicForCustomUserDisable();

		// method to Enable "Move Own Post" for Custom user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicForCustomUserEnable();

		// method to verify Move Own Topic shown on User's Profile page for Custom User
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageForCustomUserEnable();

		// method to Move Own Topic shown on User's Profile page For disable setting for Custom User
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageForCustomUserDisable();

	});
};
