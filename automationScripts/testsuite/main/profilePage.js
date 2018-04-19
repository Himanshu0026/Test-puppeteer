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
		//Verify with sending message by message button.
		profilePageTests.profilePageMessageButton();
		//Verify with sending message by message button is disable.
		profilePageTests.profilePageMessageButtonDisable();
		//delete all topics
		profilePageTests.deleteTopics();
		//All Post tab for own profile page.
		profilePageTests.profilePageAllPostTab();
		//Verify with All post tab after start a topic/post
		profilePageTests.profilePageAfterStartTopic();
  		//Verify with All post tab after edit a topic/post on topic listing page
		//profilePageTests.profilePageEditTopic();
		//Verify with All post tab after delete a topic/post
		profilePageTests.profilePageDeletePost();
//---------------------------------Topic started tab--------------------------------------------------
		//verify Topic started tab with before start a topic.
		profilePageTests.profilePageTopicTab();
		//Verify with topic started tab after start a topic.
		profilePageTests.profilePageTopicTabCreateTopic();
		//verify with edit topic title
		profilePageTests.profilePageTopicEditTopicTitle();
		//verify with delete the topic which have edited .
		profilePageTests.deleteTopic();
//-------------------------------Likes tab-------------------------------------------------------------
		//Verify with like the post.
		profilePageTests.profilePageLikesTab();
		//Verify with delete the post that you liked
		profilePageTests.profilePageDeleteLikePost();
//---------------------------------Post count----------------------------------------------------------
		//verify post count for newly register user
		profilePageTests.profilePagePostCount();
		//verify post count with add topic/post
		profilePageTests.profilePagePostCountAddtopic();
		//verify post count  with delete the post
		profilePageTests.profilePagePostCountDeletePost();
//---------------------------Reputation------------------------------------------------------------------
		//verify with reputation link after disable the permissions
		profilePageTests.profilePageReputationDisable();
		//verify with reputation link after enable the permissions
		profilePageTests.profilePageReputationEnable();
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
