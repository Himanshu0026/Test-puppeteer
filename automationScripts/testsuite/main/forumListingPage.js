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
		//1.Test case for Verify to add the heading on the category
		forumListingPageTest.headingOnCategory();
		//2.test case for Verify to edit the heading on the category
		forumListingPageTest.editHeadingOnCategory();
		//delete all categories
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();
		//create general category
		thumpsUpDownTestcases.createCategoryTestCase();
		//4.test case for Verify to add the category with title field
		forumListingPageTest.addCategoryWithTitleField();
		//----------------create category before heading ------------
		//5.test case for Verify to add the category without title field
		forumListingPageTest.addCategoryWithoutTitleField();
		//7.test case for Verify to add new category without description field
		forumListingPageTest.addCategoryWithoutDescriptionField();
		//8.test case for Verify to add new as sub category into existing category
		forumListingPageTest.addSubCategoryExistingCategory();
		//9.test case for Verify to delete sub category into existing category (when there is no topic on that)
		forumListingPageTest.deleteSubCategoryExistingCategory();
		//10.test case for Verify to create a category as password protected
		forumListingPageTest.createCategoryPasswordProtected();
		//11.Test case for Verify to disabled a category as password protected
		forumListingPageTest.disablePasswordProtectedCategory();
		//12.test case for Verify to create a category as locked
		forumListingPageTest.createCategoryLocked();
		//13.test case for Verify to create a category as unlocked
		forumListingPageTest.createCategoryUnlocked();
		//14.test case for Verify to create a category as invisible
		forumListingPageTest.createCategoryInvisible();
		//15.test case for Verify to create a category as visible
		forumListingPageTest.createCategoryVisible();
		//16.Test case for Verify to create a category as linked
		forumListingPageTest.createCategoryLinked();
		//17.test case for Verify to delete link from a category
		forumListingPageTest.deleteLinkFromCategory();
		//18.test case for Verify the error message to create a category as linked(**********issue)
		forumListingPageTest.errorMessageTocreateCategoryLinked();
		//************************  2.For sub category  ****************************
		//20.Verify the sub category for locked the parent category
		forumListingPageTest.subCategoryLocked();
		//21.Verify the sub category for unlocked the parent category
	        forumListingPageTest.subCategoryUnlocked();
	     	//Verify the sub category for enable  password protection  on the parent category
		forumListingPageTest.subCategoryPasswordProtection();
		//22.Verify the sub category for disabled password on the parent category
		forumListingPageTest.subCategoryDisablePassword();
		//Verify the sub category for disabled password on the parent category
		forumListingPageTest.subCategoryInvisibleParent();
		//25.Verify the sub category for disabled invisible the parent category
		forumListingPageTest.subCategoryCreateLinked();
		//27.Verify the sub category for delete linked on the parent category
		forumListingPageTest.subCategoryDeleteLinked();
		//28.Verify the sub category for changing the parent category
		forumListingPageTest.subCategoryChangingParentCategory();
	});
};
