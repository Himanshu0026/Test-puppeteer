var config = require('../../../config/config.json');
var backArrowTests = require('../cases/backArrow.js');
var profilePageMethod= require('../methods/profilePage.js');
var forumLoginMethod = require('../methods/login.js');
var backArrow = module.exports = {};

backArrow.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

		backArrowTests.createbackArrowCategory();
	}).then(function(){
                //backArrowTests.readAllPost();
		backArrowTests.readAllPost();
		//Verify back arrow when user login on post listing page directly
		//Verify with sorting options like latest/new/top by the post listing page under category
		backArrowTests.postListingPage();
		//Verify back arrow when user login on latest topic page
		//Verify with sorting options like latest/new/top by the post listing page from home page
		backArrowTests.latestTopicPage();
		//back-arrow cases of start-new topic
		//"Verify with Start new topic on topic listing page and than cancel it"
		//verify back-arrow on forumListingpage
		backArrowTests.startNewtopicPage();
		//Verify back-arrow on profilePage
		//Verify back arrow with profile page for topic to post listing page after reply a post
		//Verify back arrow with profile page for topic to category listing page
		backArrowTests.profilePage();
		//Followed Content
		//Verify back arrow with follwed content to post listing page
		backArrowTests.followedContentPage();

		//
		backArrowTests.lockcategorySubcategory();
		//
		backArrowTests.pincategorySubcategory();
		//
		backArrowTests.UnpincategorySubcategory();

		//delete all topics
		profilePageMethod.deleteTopics();
	});
};
