'use strict.';
var loginJSON = require('../../testdata/loginData.json');
var forumListingPageJSON  = require('../../testdata/forumListingPage.json');
var topicJSON = require('../../testdata/topic.json');
var forumLoginMethod = require('../methods/login.js');
var deletePostMethod = require('../methods/deletePost.js');
var forumListingPageMethod = require('../methods/forumListingPage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumListingPageTest=module.exports = {};

//1.Test case for Verify to add the heading on the category(add, edit, removed category haeding)
forumListingPageTest.headingOnCategory = function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 1[Test case for Verify to add the heading on the category]');
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function(){
		forumListingPageMethod.createCategoryHeading(forumListingPageJSON.categoryHeading.data);
	}).waitForSelector('a#addForumButton', function(){
		backEndForumRegisterMethod.createCategoryForumListing(forumListingPageJSON.withDescription);
		//created category where category heading is edited
	}).waitForSelector('a#addForumButton', function(){
		forumListingPageMethod.editCategoryHeading(forumListingPageJSON.categoryHeading.data, 'Edit');
	}).waitForText('headingCategoriesEdit');
};

//Verify to add the category without title field.
//Verify to add new category without description field
//Verify to add the category with title field
//Verify to add new category with description field
//Verify to add new as sub category into existing category
//Verify with create a category as password protected
//Verify with create a category as locked
//Verify with create a category as invisible
//Verify with create a category as linked
//Verfiy with create a parent category.
forumListingPageTest.createVariousCategories = function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 1[Test case for Verify to add the category without title field]');
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function(){
		//create category with title field
		//already discription added in this category
		backEndForumRegisterMethod.createCategoryForumListing(forumListingPageJSON.validCategories);
	}).then(function(){
		//add sub-category in category
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.subCategory.title, forumListingPageJSON.subCategory );
	}).then(function(){
		//create a category as password protected
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.enablePassword.title, forumListingPageJSON.enablePassword);
	}).then(function(){
		//create a category as locked
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.enableLocked.title, forumListingPageJSON.enableLocked);
	}).then(function(){
		//   //create a category as invisible
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.Invisible.title, forumListingPageJSON.Invisible);
	}).then(function(){
		//    //create a category as linked
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.enableLinked.title, forumListingPageJSON.enableLinked);
	}).then(function(){
		// 	//create a parent category for interchange the sub-category
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.parentCategory.title, forumListingPageJSON.parentCategory);
		//  }).then(function(){
		backEndForumRegisterMethod.createCategoryForumListing(forumListingPageJSON.withoutTitle);
	}).waitForText('Please enter a title for this category', function(){});
};

forumListingPageTest.verifyVariousCategoriesFrontEnd = function(){
	casper.thenOpen(config.url, function(){
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		utils.info('Case 2[Validate category with title field]');
		utils.info('Case 3[Validate category with description field]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('div#topics ul li:nth-child(2) a',function(){
		this.test.assertExists('div#topics ul li:nth-child(2) a');
		this.click('div#topics ul li:nth-child(2) a');
	}).waitForText(forumListingPageJSON.validCategories.title, function(){
		this.test.assertTextExists(forumListingPageJSON.validCategories.description,'Description found on forumListingPage of frontEnd');
	}).then(function(){
		utils.info('Case 4[Validate sub-category on forumListingPage frontEnd]');
		deletePostMethod.getCategoryHrefFrontend('validCategories');
	}).waitForSelector('div.panel.panel-default', function(){
		this.test.assertTextExists(forumListingPageJSON.subCategory.title,'Description found on forumListingPage of frontEnd');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		utils.info('Case 6[Validate passwordProtected category on forumListingPage frontEnd]');
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enablePassword.title);
	}).waitForSelector('input[name="pass"]', function(){
		casper.sendKeys('input[name="pass"]', forumListingPageJSON.enablePassword.passwordprotectvalue);
		casper.click('input[name="Submit"]');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLocked.title);
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'selector found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForText(forumListingPageJSON.subCategoryStartTopicErrorMsg.errorMsg);
};

forumListingPageTest.createVariousSubCategories = function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		utils.info('Case 6[validate various ]');
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function(){
		//create sub-category lock
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.subEnableLocked.title, forumListingPageJSON.subEnableLocked);
	}).waitForSelector('a#addForumButton', function(){
		//create a sub-category as password protected
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.disablePassword.title, forumListingPageJSON.disablePassword);
	}).waitForSelector('a#addForumButton', function(){
		//create a sub-category as linked
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.subenableLinked.title, forumListingPageJSON.subenableLinked);
	}).waitForSelector('a#addForumButton', function(){
		//create sub-category as invisible
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.subInvisible.title, forumListingPageJSON.subInvisible);
	});
};

//add changes-onlyCategory-removed invisble sub-category testcase.
forumListingPageTest.verifyVariousSubCategoriesFrontEnd = function(){
	casper.thenOpen(config.url, function(){
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		utils.info('Case 7[Validate sub-category with title field]');
    this.test.assertExists('div#topics ul li:nth-child(2) a');
		this.click('div#topics ul li:nth-child(2) a');
	}).waitForText(forumListingPageJSON.subEnableLocked.title, function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLocked.title);
		//waited for sub-category
	}).waitForSelector('span.forum-title', function(){
		var message=this.getElementAttribute('li[id^="forum_"] span:nth-child(2) a', 'title');
		this.test.assertEquals(message, forumListingPageJSON.lockCategoryMsg.msg, 'both the messages of locked category are equal');
		this.click('span.forum-title');
	}).waitForSelector('div#ajax_subscription_vars a', function(){
		this.click('div#ajax_subscription_vars a');
	}).waitForText(forumListingPageJSON.subCategoryStartTopicErrorMsg.errorMsg, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		//checked for linked category on forumListingpage
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLinked.title);
	}).waitForUrl(forumListingPageJSON.linkedtext.data, function(){
		utils.info('linked category url opened successfully');
	});
};


//Issue in sub-category locked case.
//Verify to disable all the categories/ subcategories from backend
forumListingPageTest.disableVariousCategories = function(){
	//disable all the categories from backend and verify it on frontEnd
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		utils.info('Case 8[disable all the categories from backend and verify it on frontEnd]');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function(){
		//disable password protected category
		forumListingPageMethod.editCategory(forumListingPageJSON.enablePassword.title);
	}).waitForSelector('form[name="frmOptions"] button', function(){
		this.test.assertExists('input#forum_pw_cb', 'password protected textbox found');
		this.click('input#forum_pw_cb');
		this.wait(1000, function(){});
	}).then(function(){
		this.click('form[name="frmOptions"] button');
		this.waitUntilVisible('div.forum_organize', function(){
			utils.info(casper.fetchText('div#loading_msg'));
			utils.info('passwordProtected Category edited');
		}, function fail(){
			utils.error('disable invisible Category not created');
			utils.error('Loading... not found');
		});
	}).waitForSelector('a#addForumButton', function(){
		this.reload(function(){
			casper.then(function(){
				this.test.assertDoesntExist('span.edit_forum_status_img.protected', 'password protected category not found on category Page');
			}).then(function(){
				forumListingPageMethod.editCategory(forumListingPageJSON.enableLocked.title);
			});
		});
	}).waitForSelector('form[name="frmOptions"] button', function(){
		//locked category-unlocked sub-category cannot be unlocked due to issue in unlocking the sub-category.
		utils.enableorDisableCheckbox('forum_locked', false);
	}).wait(1000, function(){
		this.click('form[name="frmOptions"] button');
	}).waitForSelector('a#addForumButton', function(){
		//disable linked category
		this.reload(function(){
			forumListingPageMethod.editCategory(forumListingPageJSON.enableLinked.title);
		});
	}).waitForSelector('form[name="frmOptions"] button', function(){
		this.sendKeys('input[name="forum_link"]', ' ',  {reset:true});
	}).wait(1000, function(){
		this.evaluate(function() {
			document.querySelector('button.button.btn-m.btn-blue').click();
		});
	}).wait(2000, function(){
		this.waitUntilVisible('div.forum_organize', function(){});
	}).waitForSelector('a#addForumButton', function(){
		//this.test.assertDoesntExist('span.edit_forum_status_img linked', 'Linked category not found on category Page');
		//disable invisible category
	}).then(function(){
		this.reload(function(){
			forumListingPageMethod.editCategory(forumListingPageJSON.Invisible.title);
		});
	}).waitForSelector('form[name="frmOptions"] button', function(){
		utils.enableorDisableCheckbox('forum_invisible', false);
	}).then(function(){
		this.evaluate(function() {
			document.querySelector('button.button.btn-m.btn-blue').click();
		});
	}).wait(2000, function(){
		this.waitUntilVisible('div.forum_organize', function(){});
	}).waitForSelector('a#addForumButton', function(){
		this.test.assertTextExists('Invisible','Invisble category and sub-category present on backend categoryPage');
	});
};

//Verify the sub category for changing the parent category
//Verify the error message to create a category as linked
//unlocked the sub-category which locked on backend
forumListingPageTest.verifyCases = function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		utils.info('Case 9[Verify the sub category for changing the parent category]');
		utils.info('Case 10[Verify the error message to create a category as linked]');
		utils.info('Case 11[Verify unlocked the sub-category which locked on backend]');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function(){
		forumListingPageMethod.editSubCategory(forumListingPageJSON.subEnableLocked.title, forumListingPageJSON.enableLocked.title);
	}).waitForSelector('form[name="frmOptions"] button', function(){
		//locked category-unlocked sub-category cannot be unlocked due to issue in unlocking the sub-category.
		this.test.assertExists('form#edit_forum_form select[name="parentid"]');
		this.click('select#parentid');
		this.fill('form[name="frmOptions"]',{
			'parentid' : forumListingPageJSON.parentCategory.title
		}, false);
		this.wait(1000, function(){});
	}).then(function(){
		this.click('form[name="frmOptions"] button');
	}).waitUntilVisible('a#addForumButton', function(){
		backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.invalidLinked.title, forumListingPageJSON.invalidLinked);
		//verify error msg of linked category
	}).waitForText(forumListingPageJSON.invalidLinkedCategoryErrorMsg.errorMsg);
};


//Verify all the categories on forum frontend after disable it on backend.
forumListingPageTest.verifyCategoriesDisableOptions = function(){
	casper.thenOpen(config.url, function(){
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		utils.info('Case 12[Disable categories options verified on forum frontEnd]');
		this.test.assertExists('div#topics ul li:nth-child(2) a');
		this.click('div#topics ul li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enablePassword.title);
	}).waitForSelector('span.forum-title', function(){
		//Verify disabled passwordprotected category
		this.test.assertDoesntExist('input[name="pass"]', 'login password pop-up didnt open');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLocked.title);
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'selector found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function(){
		//Verify unlocked category
		this.test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLinked.title);
	}).waitForSelector('span.forum-title', function(){
		//Verify linked category
		this.test.assertDoesntExist('div#lga', 'linked category not navigated to websitetoolbox.com url successfully');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		//Verify visible invisible category
		this.test.assertTextExists('Invisible','Invisble category and sub-category present on backend categoryPage');
	});
};

//Verify all the sub-categories on forum frontend after disable it on backend.
forumListingPageTest.verifySubCategoriesDisableOptions = function(){
	casper.thenOpen(config.url, function(){
		utils.info('****************************************FORUMLISTING - PAGE********************************************');
		utils.info('Case 14[Disable sub-categories options verified on forum frontEnd]');
		this.test.assertExists('div#topics ul li:nth-child(2) a');
		this.click('div#topics ul li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enablePassword.title);
	}).waitForSelector('span.forum-title', function(){
		this.test.assertExists('span.forum-title', 'sub-category found under-category');
		this.click('span.forum-title');
	}).waitForSelector('div#ajax_subscription_vars', function(){
		//validate password protected pop-up under-subcategory
		this.test.assertDoesntExist('input[name="pass"]', 'login password pop-up didnt open');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLocked.title);
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'selector found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function(){
		//Verify unlocked category
		this.test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLinked.title);
	}).waitForSelector('span.forum-title', function(){
		//Verify linked category
		this.test.assertDoesntExist('div#lga', 'linked category not navigated to google.com url successfully');
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('ul#forums_toggle_link a','categories link found on menu bar');
	}).then(function(){
		this.click('ul#forums_toggle_link a');
	}).waitForSelector('a[href="#forums"]', function(){
		//Verify visible invisible category
		this.test.assertTextExists('Invisible','Invisble category and sub-category present on backend categoryPage');
		this.test.assertTextExists('subInvisible','Invisble category and sub-category present on backend category page');
	});
};
