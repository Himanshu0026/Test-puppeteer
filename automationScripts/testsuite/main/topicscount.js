var config = require('../../../config/config.json');
var deletePostTests = require('../cases/deletePost.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var forumLoginMethod = require('../methods/login.js');
var topicsCountTests = require('../cases/topicscount.js');
var profilePageMethod= require('../methods/profilePage.js');
var topicsCount = module.exports = {};


topicsCount.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
		//create category--
		topicsCountTests.createCategory();
		//Verify by delete multiple topic-selecting by check box
		//create topic-
		topicsCountTests.createTopic();

		topicsCountTests.topicsCount();
		//Verify the Number of Topics for a category
		topicsCountTests.countTopicsCategorySubCategory ();
		//combine all forum
		//Verify with Number of Topics in latest topics page
		//topicsCountTests.combineallforumTopicCount();
	});
};
