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
	//deletePostTests.deletePostCreateCategory();
	//Verify by delete multiple topic-selecting by check box
	deletePostTests.deleteAllTopicCheckboxAdmin();
	//Verify by delete one topic -selecting by check box
	deletePostTests.deleteTopicByCheckboxAdmin();
	//Verify by delete all topic-selecting by check box 3-issue
	deletePostTests.deleteMultipleTopicCheckboxAdmin();
	//Verify with delete topic-by drop down of the topic
	deletePostTests.deleteTopicDropDownAdmin();
	//Verify with delete post-selecting by drop down of the post
	deletePostTests.deletePostDropDownAdminUser();
	//Verify with delete post-selecting by check box
	deletePostTests.deletePostCheckboxAdmin();
	//Verify by delete multiple post-selecting by check box
	deletePostTests.deleteMultiplePostAdmin();
	//delete post from members profile page
	deletePostTests.deletePostProfilePageAdmin();
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
//*************Register user delete own topic disable delete own post enable************
	//Verify by delete own topic -selecting by check box- topic disable post enable
	deletePostTests.deleteOwnTopicDisablePostEnable();
	// Verify with delete  own post from own profile page
	deletePostTests.deleteOwnProfilePageTopicdisablePostEnable();
//-------------------register user delete own topic disable delete own post disable-----------
	//Verify by delete own topic -selecting by check box
	//Verify with delete  own topic-by drop down of the topic
	//Verify with delete own post-selecting by check box
	//Verify with delete own post-selecting by drop-down of the post.
	deletePostTests.deleteTopicCheckboxdisablePostdisable();
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
	});
};
