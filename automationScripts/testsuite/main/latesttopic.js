var config = require('../../../config/config.json');
var latestTopicTests = require('../cases/latesttopic.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var forumLoginMethod = require('../methods/login.js');
var topicsCountTests = require('../cases/topicscount.js');
var profilePageMethod= require('../methods/profilePage.js');
var latestTopic = module.exports = {};


latestTopic.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
        }).then(function(){
		//create category--
		//deletePostTests.deletePostCreateCategory();
		latestTopicTests.useraccountOnOff();
		//Verify by delete multiple topic-selecting by check box
		latestTopicTests.viewTopicPermission();
		//Verify by delete one topic -selecting by check box
		latestTopicTests.viewOtherUsersTopic();

	});
};
