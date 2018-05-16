var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var forumLoginMethod = require('../methods/login.js');
var composeTopicTests = require('../cases/composeTopic.js');
var profilePageTests = require('../cases/profilePage.js');
var composeTopic = module.exports = {};


composeTopic.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
		composeTopicTests.createCategoryTestCase();
		//delete topics
		profilePageTests.deleteTopics();
		//Verify Preview Post of Compose Topic (For Registered User/Admin)
		//Verify Compost Topic on Category Listing Page (For Registered User/Admin)
		//Verify by Add New Topic  by topic listing page under  category
		composeTopicTests.addTopic(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
		composeTopicTests.addTopic(loginJSON.adminUser.username, loginJSON.adminUser.password);
		//Verify Compost Topic on Latest Topic Page (For Guest/Registered User/Admin)
		composeTopicTests.composeLatestTopicRegister();
		//Verify Compose Topic when there is no pagination available (For Guest/Registered User/Admin)
		composeTopicTests.composeTopicPagination();
		//Verify Compose Topic without  selecting any category(Registered User/Admin)
		composeTopicTests.composeTopicWithoutCategory(loginJSON.validInfo.username, loginJSON.validInfo.password);
		composeTopicTests.composeTopicWithoutCategory(loginJSON.adminUser.username, loginJSON.adminUser.password);
		//Verify with the guest user without selecting any category.
		composeTopicTests.composeTopicGuestWithoutCategory();
		//Verify Compose Topic on Category/topic Listing Page(if  start new topic permission is disabled) (For Guest User)
		//composeTopicTests.composeTopicGueststartTopicEnable
		//Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry) (For Guest User)
		composeTopicTests.composeTopicGueststartTopicdisblecategory();
		//Verify backend-setings
		composeTopicTests.permissionSettings();
		
		
	});
};
