var config = require('../../../config/config.json');
var deletePostTests = require('../cases/deletePost.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageTests = require('../cases/profilePage.js');
var profilePageMethod= require('../methods/profilePage.js');
var deletePost = module.exports = {};


deletePost.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
	//create category--
	deletePostTests.deletePostCreateCategory();
	//Verify by delete one topic -selecting by check box
	deletePostTests.deleteTopicByCheckboxAdmin();
	//Verify by delete multiple topic-selecting by check box
	deletePostTests.deleteAllTopicCheckboxAdmin();
	//Verify by delete all topic-selecting by check box 3-issue
	deletePostTests.deleteMultipleTopicCheckboxAdmin();
	//Verify with delete topic-by drop down of the topic
	deletePostTests.deleteTopicDropDownAdmin();
	//Verify with delete post-selecting by drop down of the post
	deletePostTests.deletePostDropDownAdminUser();
	//Verify with delete post-selecting by check box
	deletePostTests.deletePostCheckboxAdmin();
	//delete post from members profile page
	deletePostTests.deletePostProfilePageAdmin();
	//Verify by delete multiple post-selecting by check box
	deletePostTests.deleteMultiplePostAdmin();
	//****************************Register user*******************************************************
	//Verify by delete one topic -selecting by check box-8
	deletePostTests.deletePostRegisteruser();
	//Verify by delete all topic-selecting by check box
	deletePostTests.deleteAllTopicCheckboxRegister();
	//Verify by delete multiple topic-selecting by check box
	deletePostTests.deleteMultipleTopicCheckboxRegister();
	//Verify with delete topic-by drop down of the topic
	deletePostTests.deleteTopicDropDownRegister();
	//Verify with delete post-selecting by check box
	deletePostTests.deletePostDropDownRegister();
	//Verify with delete post-selecting by check box
	deletePostTests.deletePostCheckboxRegister();
	//delete post from members profile page
	deletePostTests.deletePostProfilePageRegister();

//************Register user delete own topic- enable delete own post-disable*******
	//Verify by delete one topic -selecting by check box when delete own topic-enable
	deletePostTests.deleteOwnTopicEnablePostDisable();
	//Verify with delete  own topic-by drop down of the topic
	deletePostTests.deleteOwnTopicDropdownTopicPostDisable();
	//Verify with delete own post-selecting by check box
	deletePostTests.deleteOwnPostCheckboxTopicPostDisable();
	//Verify with delete own post-by drop down of the post
	deletePostTests.deleteRegisterUserOwnTopicenablePostdisable();
	//Verify with delete  own post from own profile page
	deletePostTests.deleteOwnProfilePageTopicenablePostDisable();

//*************Register user delete own topic disable delete own post enable************
	//Verify by delete own topic -selecting by check box- topic disable post enable
	deletePostTests.deleteOwnTopicDisablePostEnable();
	//Verify by delete one topic -selecting by dropdown topic disable post enable
	deletePostTests.deleteDropdownTopicdisablePostenable();
	//Verify with delete own post-selecting by check box post enable topic disable
	deletePostTests.deletePostCheckboxTopicdisablePostenable();
	//Verify with delete own post-by drop down of the post
	deletePostTests.deleteRegisterUserOwnTopicdisablePostenable();
	// Verify with delete  own post from own profile page
	deletePostTests.deleteOwnProfilePageTopicdisablePostEnable();
//-------------------register user delete own topic disable delete own post disable-----------
	//Verify by delete own topic -selecting by check box
	deletePostTests.deleteTopicCheckboxdisablePostdisable();
	//Verify with delete  own topic-by drop down of the topic
	deletePostTests.deleteTopicDropdowndisablePostdisable();
	//Verify with delete own post-selecting by check box
	deletePostTests.deletePostCheckboxTopicdisablePostdisable();
	//Verify with delete own post-selecting by drop-down of the post.
	deletePostTests.deletePostDropdownTopicdisablePostdisable();
	//Verify with delete  own post from own profile page
	deletePostTests.deleteOwnProfilePageTopicDisablePostDisable();
	//delete topics
	//profilePageTests.deleteTopics();
	//delete topics from new and top option from topic listingpage
	//deletePostTests.deleteTopicNewTop('div.panel-heading ul li:nth-child(2) a');
	//Verify with the postcount on topiclistingPage
	//deletePostTests.checkTopicCount();
	//verify with delete topic  for deleted user check counts.
	//deletePostTests.checkTopicCountDeletedUser();

//------------search topic testcases------------------------------------------
	/*}).thenOpen(config.searchUrl, function(){
		//delete topic by searching topic using admin user topic enable post enable
  		//deletePostTests.deletetopicSearchTopic();
	}).thenOpen(config.url, function(){
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.searchUrl, function(){
		//delete post by searching post using admin user.
		deletePostTests.deletetopicSearchPost();
	}).thenOpen(config.searchUrl, function(){
		//delete others topic by searching topic using register user.
		deletePostTests.deleteSearchTopicRegisteredUser();
	}).thenOpen(config.searchUrl, function(){
		//delete others post by searching post using register user.
		deletePostTests.deleteSearchPostRegisteredUser();*/

	});
};
