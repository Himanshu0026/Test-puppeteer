/****This script is dedicated for followpinlock Setting ****/
'use strict.';
var config = require('../../../config/config.json');
var followpinlockTest = require('../cases/followpinlock.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageTests = require('../cases/profilePage.js');
var followpinlock = module.exports = {};

followpinlock.featureTest  = function(){

	casper.start(config.backEndUrl, function(){
		utils.info('Title Of The Page :' +this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
		//create moderator
		followpinlockTest.addModeratorByScenarioOne();
	}).then(function(){
		//delete all topics
		profilePageTests.deleteTopics();
		//1.Test case for Add New topic by enable Follow check box and verify unfollow topic option on forum listing page
		followpinlockTest.enableFollowCheckbox();

		//2.test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
		followpinlockTest.disableFollowCheckbox();

		//3.test case for Follow any topic and verify followed topic in Followed Content page
		followpinlockTest.followedTopicContentPage();

		//4.test case for unFollow any topic and verify unfollowed topic in Followed Content page
		followpinlockTest.unfollowedTopicContentPage();

		//5.test case for Unfollow Topic from followed content page and verify that topic on the page
		followpinlockTest.unfollowTopicFollowed();

		//6.Test case for Verify message in Topic list content on Followed Content page if there is no any followed topic in the list
		followpinlockTest.noFollowedTopic();

		//7.test case for Follow any category and verify that topic in category lis on Followed Content page
		followpinlockTest.followAnyCategory();

		//8.test case for UnFollow category from followed content list and verify visibility of that category in the list
		followpinlockTest.unfollowAnyCategory();

		//13.Add New topic by enable Follow check box and verify unfollow topic option on topic listing page for sub category topic
		followpinlockTest.enableFollowCheckboxSubCategoryTopic();

		//14.Add New topic by disable Follow check box and verify unfollow topic option on topic listing page for sub category topic
		followpinlockTest.disableFollowCheckboxSubCategoryTopic();

		//15.Verify the follow option visibility on latest topic page by the guest user/unregistered user
		followpinlockTest.optionVisibilityLatestTopicPage();

		//15.Verify the follow option visibility on topic listing page by the guest user/unregistered user.
		followpinlockTest.optionVisibilityTopicListingPage();

		//16.Verify the follow option visibility on post listing page by the guest user/unregistered user.
		followpinlockTest.optionVisibilityPostListingPage();

	/************************   2.Lock-unLock Topic  ****************************/
		//17.Lock any topic and Verify Lock option of topic listing page[Home page]
		followpinlockTest.lockAnyTopic();

		//19.Lock any topic and Verify Lock option of forum listing page[Home page]
		followpinlockTest.lockAnyTopicForumListingPage();

		//18.un-Lock any topic and Verify Lock optipon of topic listing page[Home page]
		followpinlockTest.unlockAnyTopic();

		//20.Un-Lock any topic and Verify Lock option of forum listing page[Home page]
		//followpinlockTest.unlockAnyTopicForumListingPage();

		//27.Lock topic from Profile page and verify locked topic
		followpinlockTest.lockTopicProfilePage();

		//28.un-Lock topic from Profile page and verify unlocked topic
		followpinlockTest.unlockTopicProfilePage();

		//29.Lock any topic from post page and verify locked message
		followpinlockTest.lockTopicPostPage();

		//31.Verify Reply a Post option angainst locked topic on post page for registered user
		followpinlockTest.ReplyPostOptionAgainstLockedTopic();

		//32.Verify Vote option against locked topic on post page
		followpinlockTest.voteOptionAgainstLockedTopic();

	/********************************   3.Pin-unPin Topic  *********************************/

		//33.Pin any topic and Verify Pin icon of topic listing page[Home page]
		followpinlockTest.PinIconTopicListingPage();

		//35.Pin any topic and Verify Pin icon of post listing page under category
		followpinlockTest.PinIconPostListingPageUnderCategory();

		//34.un-Pin any pinned topic and Verify pic icon of topic listing page[Home page]
		followpinlockTest.unPinVerifyPicIconTopicListingPage();

		//36.un-Pinany topic and Verify Pin icon of post listing page under category
		//followpinlockTest.unPinIconVerifyPostListingPageUnderCategory();

		//43.Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic
		followpinlockTest.enablePinVerifyPinOptionSubCategoryTopic();

		//44.Add New topic by disabling un pin check box and verify pin topic option on topic listing page for sub category topic
		followpinlockTest.disableUnPinVerifyPinOptionSubCategoryTopic();

		//42.Pin any topic and Verify Pin icon of topic listing page from moderator shield icon
		followpinlockTest.pinTopicVerifyModeratorShieldIcon();

		//45.Un-Pin any topic and Verify Pin icon under category page from moderator shield icon
		followpinlockTest.unPinTopicVerifyUnderCategoryPageModeratorShieldIcon();

		//46.Pin any topic and Verify Pin icon under sub category page from moderator shield icon
		followpinlockTest.pinTopicVerifyUnderSubCategoryPageModeratorShieldIcon();

		//47.Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon
		followpinlockTest.unPinTopicVerifyUnderSubCategoryPageModeratorShieldIcon();

	});
};
