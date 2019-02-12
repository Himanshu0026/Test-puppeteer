//----- This js file covers all the profilePage functionality on forum Frontend---------//
'use strict.';
var config = require('../../../config/config.json');
var profilePageTests = require('../cases/profilePage.js');
var profilePageMethod= require('../methods/profilePage.js');
var forumLoginMethod = require('../methods/login.js');
var profilePage = module.exports = {};

profilePage.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
		profilePageMethod.deleteTopics();
		//Verify with sending message by message button is disable.
		profilePageTests.profilePageMessageButtonDisable();
		//Verify with sending message by message button.
		profilePageTests.profilePageMessageButton();
		//All Post tab for own profile page.
		//verify Topic started tab with before start a topic.
		//Verify with topic started tab after start a topic.
		//verify post count for newly register user
		//verify post count with add topic/post
		profilePageTests.profilePageAllPostTab();
		//Verify with All post tab after start a topic/post
		profilePageTests.profilePageAfterStartTopic();
		//verify with edit topic title
		profilePageTests.profilePageTopicEditTopicTitle();
//-------------------------------Likes tab-------------------------------------------------------------
		//Verify with like the post.
		profilePageTests.profilePageLikesTab();
		//Verify with delete the post that you liked
		profilePageTests.profilePageDeleteLikePost();
		//Verify with All post tab after delete a topic/post
		//verify post count  with delete the post
		profilePageTests.profilePageDeletePost();
//---------------------------Reputation------------------------------------------------------------------
		//verify with edit user icon
		profilePageTests.profilePageEditUserIcon();
		//verify with delete icon
		profilePageTests.profilePageDeleteUser();
		//Verify after like the post(one user like your only one post)
		profilePageTests.profilePageReputationCount();
		//verify after like the post(one user like your multiple post one post)
		profilePageTests.profilePageReputationCountMultiplePostLike();
	});
};
