var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var forumLoginMethod = require('../methods/login.js');
var composeTopicTests = require('../cases/composeTopic.js');
var profilePageMethod = require('../methods/profilePage.js');
var composeTopic = module.exports = {};

composeTopic.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
		composeTopicTests.createCategoryTestCase();
		//Verify Compose Topic when there is no pagination available (For Guest/Registered User/Admin)
		composeTopicTests.composeTopicPagination();
		//Verify Compose Topic without  selecting any category(Registered User/Admin)
		composeTopicTests.composeTopicWithoutCategory(loginJSON.validInfo.username, loginJSON.validInfo.password);
		composeTopicTests.composeTopicWithoutCategory(loginJSON.adminUser.username, loginJSON.adminUser.password);
		//Verify postPreview from general user from categoryListingPage
		composeTopicTests.composeTopicPostPreview(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
		//Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry) (For Register User)
		composeTopicTests.composeTopicRegisterstartTopicdisablecategory();
		//Verify with the guest user without selecting any category.
		//Verify post-Preview for guest user on latestTopicPage, topicListingPage and categoryListingPage
		composeTopicTests.composeTopicGuestUserPostPreview();
		//Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry) (For Guest User)
		//composeTopicTests.composeTopicGueststartTopicdisblecategory();
		//Verify backend-setings
		composeTopicTests.permissionSettings();

		profilePageMethod.deleteTopics();
	});
};
