//----- This js file covers all the inContextLogin functionality on forum Frontend---------//
'use strict.';
var config = require('../../../config/config.json');
var editPostTests = require('../cases/editPost.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageMethod= require('../methods/profilePage.js');
var editPost = module.exports = {};


editPost.featureTest = function(){

	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
	//Verify with edit topic(Post listing  page)
	editPostTests.editTopicAdmin();
	//Verify with edit post(Post listing  page)
	editPostTests.editPostAdmin();
	//Verify with edit post on profile page
	editPostTests.editPostProfilePageAdmin();
	//edit on search listing page by people who posted
	editPostTests.editPostPeoplePosted();
	//---------------Edit own topic/post as register(edit own topic enable)--------
	//Verify with edit own  topic(Post listing  page)
	editPostTests.editTopicregister();
	//Verify with edit own  post(Post listing  page)--register user
	editPostTests.editPostregister();
	//Verify with edit own  post on profile page-register user
	editPostTests.editPostProfilePageRegister();
	//Verify with edit on search listing page by people who posted
	editPostTests.editSearchPeoplePostedRegister();
	//-------------Edit own topic/post as register(edit own post disable)----------
	//Verify with edit own  topic(topic listing  page) registered user
	editPostTests.editPostEditOwnTopicDisable();
	//Verify with edit own  post(Post listing  page)
	editPostTests.EditOwnPostDisable();
	//Verify with edit own  post on profile page
	editPostTests.editProfilePagePostDisable();
	//Verify with edit on search listing page by people who posted- edit own post disable
	editPostTests.editSearchPeoplePostedEditPostDisable();
	//Verify edit topic by searching topic using admin user-
	//editPostTests.editTopicSearchAdmin();*/

	});
};
