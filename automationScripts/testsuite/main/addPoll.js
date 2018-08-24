var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var forumLoginMethod = require('../methods/login.js');
var followpinlockTest = require('../cases/followpinlock.js');
var addPollTests = require('../cases/addPoll.js');
var profilePageTests = require('../cases/profilePage.js');
var addPoll = module.exports = {};


addPoll.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
		//create moderator
		followpinlockTest.addModeratorByScenarioOne();
	}).then(function(){
		//create category
		addPollTests.createCategoryTestCase();
		//Create  a poll in a topic by providing data in all the fields.When Post Poll option is enabled in backend.
		addPollTests.createPollShieldIcon();
		//To verify to create a poll on a topic without adding poll options. When Post Poll option is enabled in backend.
		//verify multiple error messages
		addPollTests.checkShieldIconPostListingPage();
		//To verify preview poll button in case when all the fields are left blank.
		addPollTests.checkVotingTimeout();
		//Create a poll in a subcategory.
		addPollTests.createPollSubcategory();
		//Verify when enable Add Poll  for moderator from group Permission, verify able to add poll to other users post
		addPollTests.addPollWithOtherUserTopic();
		//Verify when Disable Add Poll  for moderator from group Permission
		addPollTests.disableAddPollFromModeratorPage();
		//Verify when enable Add Poll  for moderator from group Permission
		addPollTests.enableAddPollFromModeratorPage();
		//To verify vote now button.
		addPollTests.verifyVoteButtonRegister();
		//To verify show results link
		addPollTests.showResultLink();
		//Verify when disable vote Poll for Registered user from group Permission
		addPollTests.disableVotePoll();
		//
		addPollTests.disableEnableVotePollCheckError();


	});
};
