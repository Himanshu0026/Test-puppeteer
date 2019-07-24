//----- This js file covers all the valid and invalid Test scenarios for Combination of subcategory and group permission functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var postTopicUserPermissionJSON = require('../../testdata/postTopicUserPermissionData.json');
var postTopicUserPermissionTestcases = require('../cases/postTopicUserPermission.js');
var postTopicUserPermission = module.exports = {};


postTopicUserPermission.registeredUserTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to verify permission message after clicking on any topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisable('General');

		// method to Verify permission message after creating new topic
		postTopicUserPermissionTestcases.verifyClickOnNewTopicDisable('General');

		// method to Verify permission message after clicking on this newly created topic from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageDisable('General');

		// method to verify content of  a topic
		postTopicUserPermissionTestcases.verifyClickOnAnyTopicEnable('General');

		// method to verify compose message functionality from the category listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageEnable('General');

		// method to Verify compose message functionality from the Topic listing page
		postTopicUserPermissionTestcases.verifyClickOnNewTopicEnable('General');

		// method to Verify View Others's Topic on frontend from category
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategory('General');

		// method to Verify View Others's Topic on frontend from category when there are own topic
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopic('General');

		// method to Enable "View Other Topic" for Registered user from group Permission and verify permission on frontend
		postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryEnable('General');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserDisable('General');

		// method to Enable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserEnable('General');

		// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyReplyOwnTopicForAdminUser('General');

		// method to Disable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserDisable('General');

		// method to Enable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserEnable('General');

		// method to Disable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserDisable('General');

		// method to Enable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserEnable('General');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserDisable('General');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicDisable('General');

		// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageDisable('General');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserEnable('General');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicEnable('General');

		// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
		postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageEnable('General');

		// method to verify when delete own post is disable and delete own topic enable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForRegisteredUser('General');

		// method to verify when delete own post is disable and delete own topic disable
		postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForRegisteredUser('General');

		// method to Disable "Move Own Post" for Registered user from group Permission and Verify Move option against topic in the topic list
		postTopicUserPermissionTestcases.verifyMoveOwnTopicDisable('General');

		// method to Move Own Topic shown on User's Profile page For disable setting
		postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageDisable('General');

		// method to Disable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserDisable('Not Signed Up / Not Logged In');

		// method to Enable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
		postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserEnable('Not Signed Up / Not Logged In');

		// method to Disable "View Others' Topic" for un-registered user from group Permission
		postTopicUserPermissionTestcases.verifyViewOthersTopicForUnregisteredUserWhenNoTopicCreatedDisable('Not Signed Up / Not Logged In');

	});
};
