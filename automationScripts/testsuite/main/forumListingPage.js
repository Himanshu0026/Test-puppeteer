'use strict.';
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var forumListingPageTest = require('../cases/forumListingPage.js');
var forumListingPage = module.exports = {};

forumListingPage.featureTest = function(){
	casper.start(config.url, function() {
		utils.info(" Title of the page :"+this.getTitle());
	}).thenOpen(config.backEndUrl, function(){
		forumLoginMethod.loginToForumBackEnd();
		//testcases forumListingPage
		forumListingPageTest.headingOnCategory();
		//delete all categories.
		// method to delete all the categories from backend
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		forumListingPageTest.createGeneralCategory();

		forumListingPageTest.createVariousCategories();

		forumListingPageTest.verifyVariousCategoriesFrontEnd();

		forumListingPageTest.createVariousSubCategories();

		forumListingPageTest.verifyVariousSubCategoriesFrontEnd();

		forumListingPageTest.disableVariousCategories();

		forumListingPageTest.verifyCategoriesDisableOptions();

		forumListingPageTest.verifySubCategoriesDisableOptions();

		forumListingPageTest.verifyCases();
	});
};
