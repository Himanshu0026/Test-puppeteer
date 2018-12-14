//----- This js file covers all the valid and invalid Test scenarios for move Topic functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var moveTopicAndPostJSON = require('../../testdata/moveTopicAndPost.json');
var moveTopicAndPostMethod = require('../methods/moveTopicAndPost.js');
var forumLoginMethod = require('../methods/login.js');
var combinationOfSubCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfSubCategoryAndGroupPermissions.js');
var moderatorPermissionsTestcases = require('../cases/moderatorPermissions.js');
var moveTopicAndPostTestcases = require('../cases/moveTopicAndPost.js');
var moveTopicAndPost = module.exports = {};

moveTopicAndPost.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to create a category and its sub category and get their id
		combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory();

		//1. Verify move topic from the latest topic page
		moveTopicAndPostTestcases.latestTopicPage('Administrators');

		// 2. Verify move topic from the topic listing page[Home Page]
		moveTopicAndPostTestcases.topicListingPage('Administrators');

		// 3. Verify move topic from the topic listing page under category
		moveTopicAndPostTestcases.topicListingPageUnderCategory('Administrators');

		// 4. Verify move topic from the topic listing page under sub category
		moveTopicAndPostTestcases.topicListingPageUnderSubCategory('Administrators');

		// 5. Verify move topic from the profile page
		moveTopicAndPostTestcases.profilePage('Administrators');

		//8. Verify move topic from the latest topic page
		moveTopicAndPostTestcases.latestTopicPage('Registered Users');

		// 9. Verify move topic from the topic listing page[Home Page]
		moveTopicAndPostTestcases.topicListingPage('Registered Users');

		// 10. Verify move topic from the topic listing page under category
		moveTopicAndPostTestcases.topicListingPageUnderCategory('Registered Users');

		// 11. Verify move topic from the topic listing page under sub category
		moveTopicAndPostTestcases.topicListingPageUnderSubCategory('Registered Users');

		// 12. Verify move topic from the profile page
		moveTopicAndPostTestcases.profilePage('Registered Users');

		// 13. Verify move topic from the latest topic page (own topic for registered user when disable "move topic" permission)
		moveTopicAndPostTestcases.latestTopicPageForRegisteredUserWhenDisabled('Registered Users');

		// 14. Verify move topic from the topic listing page[Home Page] for (own post for registered user when disable "move topic" permission)
		moveTopicAndPostTestcases.topicListingPageForRegisteredUserWhenDisabled();

		// 15. Verify move topic from the topic listing page under category (own post for registered user when disable "move topic" permission)
		moveTopicAndPostTestcases.topicListingPageUnderCategoryForRegisteredUserWhenDisabled();

		// 16. Verify move topic from the topic listing page under sub category (own post for registered user when disable "move topic" permission)
		moveTopicAndPostTestcases.topicListingPageUnderSubCategoryForRegisteredUserWhenDisabled();

		// 17. Verify move topic from the profile page (own post for registered user when disable "move topic" permission)
		moveTopicAndPostTestcases.profilePageForRegisteredUserWhenDisabled();

		// 22. Verify move topic from the latest topic page for unregisterd user
		moveTopicAndPostTestcases.latestTopicPageForUnregisterdUser();

		// 23. Verify move topic from the topic listing page[Home Page]
		moveTopicAndPostTestcases.topicListingPageForUnregisterdUser();

		// 26. Verify move post from the profile page into the new topic
		moveTopicAndPostTestcases.profilePageNewTopic('Administrators');

		// 27. Verify move post from the profile page into the existing topic
		moveTopicAndPostTestcases.profilePageExistingTopic('Administrators');

		// 28. Verify move post from the post listing page into the existing topic
		moveTopicAndPostTestcases.postListingPageExistingPage('Administrators');

		// 29. Verify move post from the post listing page into the new topic
		moveTopicAndPostTestcases.postListingPageNewTopic('Administrators');

		// method to Verfiy with Add a moderator for category(Registered Users) by scenario 2
		moderatorPermissionsTestcases.addModeratorByScenarioTwo();

		// 37. Verify move post from the profile page into the new topic
		moveTopicAndPostTestcases.profilePageNewTopic('Moderators');

		// 38. Verify move post from the profile page into the new topic for the moderator of category when Disabled the permission of "move post and topic"
		//moveTopicAndPostTestcases.profilePageNewTopicDisableMove('Moderators');

		// 39. Verify move post from the profile page into the existing topic
		moveTopicAndPostTestcases.profilePageExistingTopic('Moderators');

		// 40. Verify move post from the post listing page into the existing topic
		moveTopicAndPostTestcases.postListingPageExistingPage('Moderators');

		// 41. Verify move post from the post listing page into the existing topic for the moderator of category when Disabled the permission of "move post and topic"
		moveTopicAndPostTestcases.postListingPageExistingPageDisableMove('Moderators');

		// 42. Verify move post from the post listing page into the new topic
		moveTopicAndPostTestcases.postListingPageNewTopic('Moderators');

		// method to Verfiy with delete a moderator for category(Registered Users)
		moderatorPermissionsTestcases.deleteModerator();

	});
};
