'use strict.';
var loginJSON = require('../../testdata/loginData.json');
var forumListingPageJSON  = require('../../testdata/forumListingPage.json');
var topicJSON = require('../../testdata/topic.json');
var forumLoginMethod = require('../methods/login.js');
var topicMethod = require('../methods/topic.js');
var deletePostMethod = require('../methods/deletePost.js');
var forumListingPageMethod = require('../methods/forumListingPage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumListingPageTest=module.exports = {};

//1.Test case for Verify to add the heading on the category
forumListingPageTest.headingOnCategory = function(){
	casper.thenOpen(config.backEndUrl, function(){
	        utils.info('Case 1[Test case for Verify to add the heading on the category]');
       		backEndForumRegisterMethod.goToCategoryPage();
       	}).then(function(){
                forumListingPageMethod.createCategoryHeading(forumListingPageJSON.categoryHeading.data);
        }).then(function(){
        	backEndForumRegisterMethod.createCategoryForumListing(forumListingPageJSON.withDescription);
	}).thenOpen(config.url, function(){
		this.test.assertExists('div#topics ul li:nth-child(2) a', 'category link found on forum');
                this.click('div#topics ul li:nth-child(2) a');
        }).then(function(){
        	this.test.assertTextExists(forumListingPageJSON.categoryHeading.data, 'text found on page');
        });
};

//3.test case for Verify to edit the heading on the category
forumListingPageTest.editHeadingOnCategory=function(){
	casper.thenOpen(config.backEndUrl, function(){
               utils.info('Case 2[Test case for Verify to edit the heading on the category]');
               backEndForumRegisterMethod.goToCategoryPage();
       }).then(function(){
               forumListingPageMethod.editCategoryHeading(forumListingPageJSON.categoryHeading.data, 'Edit');
       }).thenOpen(config.url, function(){
               this.waitForSelector('div#topics ul li:nth-child(2) a', function(){
                       this.click('div#topics ul li:nth-child(2) a');
               }).waitForText('headingCategoriesEdit');
       });
};

forumListingPageTest.removeHeadingOnCategory = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 3[Test case for Verify to remove  the heading on the category]');
        	backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
        	forumListingPageMethod.deleteCategories(forumListingPageJSON.categoryHeading.editedData);
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics ul li:nth-child(2) a', function(){
        	        this.click('div#topics ul li:nth-child(2) a');
                }).then(function(){
        	        this.test.assertDoesntExist('div.panel-heading h4');
                });
        });
};

//4.test case for Verify to add the category with title field
//6.Test case for Verify to add new category with description field
forumListingPageTest.addCategoryWithTitleField = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 4[Test case for Verify to add the category with title field]');
                utils.info('Case 6[Test case for Verify to add new category with description field]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                try{
                        this.test.assertTextExist(forumListingPageJSON.validCategories.title, 'category found on category page');
                }catch(e){
		        backEndForumRegisterMethod.createCategoryForumListing(forumListingPageJSON.validCategories);
                }
        }).thenOpen(config.url, function(){
   		this.test.assertExists('div#topics ul li:nth-child(2) a');
       		this.click('div#topics ul li:nth-child(2) a');
       		this.waitForText(forumListingPageJSON.validCategories.title);
        });
};


//Verify to add the category without title field
forumListingPageTest.addCategoryWithoutTitleField = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 5[Test case for Verify to add the category without title field]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                backEndForumRegisterMethod.createCategoryForumListing(forumListingPageJSON.withoutTitle);
        }).waitForSelector('div#ui-id-7', function(){
               this.test.assertSelectorHasText('div#ui-id-7', 'Please enter a title for this category');
       });
};

//7.test case for Verify to add new category without description field
forumListingPageTest.addCategoryWithoutDescriptionField = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 7[Test case for Verify to add new category without description field]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                backEndForumRegisterMethod.createCategoryForumListing(forumListingPageJSON.withoutDescription);
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics ul li:nth-child(2) a', function(){
        	        this.click('div#topics ul li:nth-child(2) a');
                }).then(function(){
                        this.test.assertTextDoesntExist('this is withoutDescription');
                });
        });
};

//Verify to add new as sub category into existing category
forumListingPageTest.addSubCategoryExistingCategory= function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 8[Test case for Verify to add new as sub category into existing category]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                try{
                        this.test.assertTextExist(forumListingPageJSON.subCategory.title, 'sub-category found on category page');
                }catch(e){
		      backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.subCategory.title, forumListingPageJSON.subCategory );
                }
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics ul li:nth-child(2) a', function(){
                        this.click('div#topics ul li:nth-child(2) a');
                }).waitForText(forumListingPageJSON.subCategory.title);
        });
};

//Verify to delete sub category into existing category (when there is no topic on that)
forumListingPageTest.deleteSubCategoryExistingCategory = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 9[Test case for Verify to delete sub category into existing category (when there is no topic on that)]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                forumListingPageMethod.deleteSubCategory(forumListingPageJSON.subCategory.title, forumListingPageJSON.checkCategory.name);
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics ul li:nth-child(2) a', function(){
                        this.click('div#topics ul li:nth-child(2) a');
                }).then(function(){
                        this.test.assertTextDoesntExist('subvalidCategories');
                });
        });
};

//Verify to create a category as password protected
forumListingPageTest.createCategoryPasswordProtected= function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 10[Test case for Verify to create a category as password protected');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                try{
                        this.test.assertTextExist(forumListingPageJSON.enablePasswordProtected.title, 'category found on category page');
                }catch(e){
		        backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.enablePasswordProtected.title, forumListingPageJSON.enablePasswordProtected);
                }
        }).thenOpen(config.url, function(){
                casper.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                casper.click('div#topics a[href="/categories"]');
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enablePasswordProtected.title);
                this.waitForSelector('input[name="pass"]', function(){
                        casper.sendKeys('input[name="pass"]', forumListingPageJSON.enablePasswordProtected.passwordprotectvalue);
                        casper.click('input[name="Submit"]');
                        this.waitForSelector('span.alert.alert-info.text-block.text-center', function(){
                                this.test.assertExists('span.alert.alert-info.text-block.text-center');
                        });
                });
        });
};

//Verify to disabled a category as password protected
forumListingPageTest.disablePasswordProtectedCategory= function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 11[Test case for Verify to disabled a category as password protected');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.disablePasswordProtected.title, forumListingPageJSON.disablePasswordProtected);
        }).thenOpen(config.url, function(){
                casper.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                casper.click('div#topics a[href="/categories"]');
        }).then(function(){
                deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.disablePasswordProtected.title);
        }).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
                this.test.assertExists('span.alert.alert-info.text-block.text-center');
        });
};

//12.test case for Verify to create a category as locked
forumListingPageTest.createCategoryLocked = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 12[Test case for Verify to create a category as locked');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.enableLocked.title, forumListingPageJSON.enableLocked);
        }).thenOpen(config.url, function(){
                casper.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                casper.click('div#topics a[href="/categories"]');
        }).then(function(){
                deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.enableLocked.title);
                this.waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
                        casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'selector found');
                        this.evaluate(function() {
				document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
			});
        	}).waitForSelector('div.text-center.bmessage.alert-info.text-danger', function(){
                        this.test.assertExists('div.text-center.bmessage.alert-info.text-danger');
                });
        });
};

//13.test case for Verify to create a category as unlocked
forumListingPageTest.createCategoryUnlocked = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 13[Test case for Verify to create a category as unlocked');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.disableLocked.title );
        }).then(function(){
                this.waitForSelector('form[name="frmOptions"] button', function(){
                        utils.enableorDisableCheckbox('forum_locked', false);
                        this.click('form[name="frmOptions"] button');
                        this.wait(1000, function(){});
                }).then(function(){
                        this.test.assertExists('#addForumButton');
                	this.test.assertDoesntExist('span.edit_forum_status_img.locked');
                });
        });
};

//14.test case for Verify to create a category as invisible
forumListingPageTest.createCategoryInvisible = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 14[Test case for Verify to create a category as invisible');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.Invisible.title, forumListingPageJSON.Invisible);
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics ul li:nth-child(2) a', function(){
        	        this.click('div#topics ul li:nth-child(2) a');
                }).waitForSelector('a[href="#forums"]', function(){
                        this.test.assertTextDoesntExist('Invisible');
                });
        });
};

//15.Verify to create a category as visible
forumListingPageTest.createCategoryVisible = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 15[Test case for Verify to create a category as visible');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.Invisible.title);
        }).then(function(){
                this.waitForSelector('form[name="frmOptions"] button', function(){
                        utils.enableorDisableCheckbox('forum_invisible', false);
                }).then(function(){
                        this.click('form[name="frmOptions"] button');
                        this.waitForSelector('div#loading_msg', function(){
                                utils.info(casper.fetchText('div#loading_msg'));
                		utils.info('Category created','INFO');
                        }, function fail(){
                		utils.error('disable invisible Category not created');
                		utils.error('Loading... not found');
                	});
                });
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics ul li:nth-child(2) a', function(){
        	        this.click('div#topics ul li:nth-child(2) a');
                }).waitForSelector('a[href="#forums"]', function(){
                        this.test.assertTextExists('Invisible');
                });
        });
};

//16.Test case for Verify to create a category as linked
forumListingPageTest.createCategoryLinked = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 16[Test case for Verify to create a category as linked]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.enableLinked.title, forumListingPageJSON.enableLinked);
        }).waitForText(forumListingPageJSON.enableLinked.title, function(){
                this.test.assertExists('span.edit_forum_status_img.linked');
                this.evaluate(function(){
                        [].forEach.call(__utils__.findAll('a'), function(link){
                                link.removeAttribute('target');
                        });
                });
                casper.click('span.edit_forum_status_img.linked');
                this.waitForSelector('div#lga', function(){
                        this.test.assertExists('div#lga');
                });
        });
};

//17.Verify to delete link from a category
forumListingPageTest.deleteLinkFromCategory = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 17[Test case for Verify to delete link from a category]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.enableLinked.title);
        }).then(function(){
                this.waitForSelector('form[name="frmOptions"] button', function(){
                        this.sendKeys('input[name="forum_link"]', ' ',  {reset:true});
                }).then(function(){
                        this.click('form[name="frmOptions"] button');
                }).waitUntilVisible('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                        this.wait(2000, function(){});
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        }).waitForText(forumListingPageJSON.enableLinked.title, function(){
                var linkCategory = casper.evaluate(function(){
                	var x1 = document.querySelectorAll('div#sortable ul li').length;
                	for(var i=1; i<=x1; i++){
                	        var x2 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a:nth-child(2)');
                		if (x2.innerText == 'enableLinked'){
                                        var x3=document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a:nth-child(2)').getAttribute('href');
                                        return x3;
                                }
                        }
                });
                utils.info('href of link category'+linkCategory);
                casper.click('a[href="'+linkCategory+'"]');
        }).then(function(){
                this.test.assertNotVisible('div#hplogo');
        });
};

//Verify the error message to create a category as linked
forumListingPageTest.errorMessageTocreateCategoryLinked = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 18[Test case for Verify the error message to create a category as linked]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.invalidLinked.title, forumListingPageJSON.invalidLinked);
        }).waitForText('Invalid category link.');
};

//20.Verify the sub category for locked the parent category
forumListingPageTest.subCategoryLocked = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 19[Test case for Verify the sub category for locked the parent category]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                utils.enableorDisableCheckbox('forum_locked', true);
        }).then(function(){
                this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        }).waitForSelector('a#addForumButton', function(){
                this.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.subEnableLocked.title, forumListingPageJSON.subEnableLocked);
        }).waitForText(forumListingPageJSON.subEnableLocked.title, function(){
                this.test.assertExists('span.edit_forum_status_img.locked');
        }).thenOpen(config.url, function(){
		this.waitForSelector('div#topics a[href="/categories"]', function(){
                        this.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                        this.click('div#topics a[href="/categories"]');
                }).waitForSelector('a[href="#forums"]', function(){
                        deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.validCategories.title);
                }).waitForSelector('div#forums ul li a', function(){
                        this.test.assertExist('div#forums ul li a');
                        this.click('div#forums ul li a');
                }).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
                	 this.evaluate(function() {
				document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
			});
                }).waitForSelector('div.text-center.bmessage.alert-info.text-danger', function(){
                        this.test.assertSelectorHasText('div.text-center.bmessage.alert-info.text-danger', 'Sorry! This category is not accepting new topics or replies.');
                });
        });
};

//21.Verify the sub category for unlocked the parent category
//22.Verify the sub category for enabled password on the parent category
forumListingPageTest.subCategoryUnlocked = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 20[Test case for Verify the sub category for unlocked the parent category');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                utils.enableorDisableCheckbox('forum_locked', false);
        }).then(function(){
		this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                        this.wait(2000, function(){});
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        }).waitForSelector('a#addForumButton', function(){
                if (this.visible('span.edit_forum_status_img.locked')) {
                        utils.info('sub-category is still locked need to unlock it');
                        forumListingPageMethod.editSubCategory(forumListingPageJSON.subEnableLocked.title, forumListingPageJSON.validCategories.title);
                        this.waitForSelector('form[name="frmOptions"] button', function(){
                                utils.enableorDisableCheckbox('forum_locked', false);
                        }).then(function(){
                                this.click('form[name="frmOptions"] button');
                                this.waitForSelector('div#loading_msg', function(){
                                        utils.info(casper.fetchText('div#loading_msg'));
                                        utils.info('Category created','INFO');
                                        this.waitWhileSelector('span.edit_forum_status_img.locked', function(){
                                                utils.info('locked category still found on category page');
                                        }, function fail(){
                                        	utils.info('unlocked sub-category is still present on category page');
                                        });
                                }, function fail(){
                                        utils.error('disable invisible Category not created');
                                        utils.error('Loading... not found');
                                });
                        });
                } else {
                        utils.info('locked category not found on category page');
                }
	}).thenOpen(config.url, function(){
		this.waitForSelector('div#topics a[href="/categories"]', function(){
                        this.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                        this.click('div#topics a[href="/categories"]');
                }).waitForSelector('a[href="#forums"]', function(){
                        deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.validCategories.title);
                }).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary ', function(){
                	 this.evaluate(function() {
				document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
			});
                        topicMethod.createTopic(topicJSON.newTopic);
                }).waitForSelector('span#editableSubject', function(){
                        var categoryHref=casper.evaluate(function(){
                                var gethref=document.querySelectorAll('div[id^="post_list_"] span:nth-child(3) a');
                                return gethref[0].getAttribute('href');
                        });
                        this.click('a[href="'+categoryHref+'"]');
                }).waitForSelector('a#topics_tab', function(){
                        this.click('a#topics_tab');
                }).waitForSelector('a.topic-title', function(){
                        this.test.assertExist('a.topic-title');
                });
        });
};

//Verify the sub category for enable  password protection  on the parent category
forumListingPageTest.subCategoryPasswordProtection = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 21[Test case for Verify the sub category for enabled password on the parent category]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                utils.enableorDisableCheckbox('forum_pw_cb', true);
                this.sendKeys('input#forum_pw', forumListingPageJSON.enablePasswordProtected.passwordprotectvalue);
        }).then(function(){
                this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
	}).thenOpen(config.url, function(){
                this.waitForSelector('div#topics a[href="/categories"]', function(){
                        this.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                        this.click('div#topics a[href="/categories"]');
                }).waitForSelector('a[href="#forums"]', function(){
                        deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.validCategories.title);
                }).waitForSelector('input[name="pass"]', function(){
                        this.sendKeys('input[name="pass"]', forumListingPageJSON.enablePasswordProtected.passwordprotectvalue);
                        this.click('input[name="Submit"]');
                }).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
                        this.test.assertSelectorHasText('a#forum-title span', 'validCategories');
                });
        });
};

//Verify the sub category for disabled password on the parent category
forumListingPageTest.subCategoryDisablePassword=function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 22[Test case for Verify the sub category for disabled password on the parent category]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                this.click('input#forum_pw_cb');
                this.sendKeys('input#forum_pw', forumListingPageJSON.blankCategoryPassword.blankData, {reset:true});
        }).then(function(){
                this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics a[href="/categories"]', function(){
                        this.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                        this.click('div#topics a[href="/categories"]');
                }).waitForSelector('a[href="#forums"]', function(){
                        deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.validCategories.title);
                }).waitForSelector('li[id^="forum_"] a', function(){
                        this.test.assertExists('li[id^="forum_"] a');
                });
        });
};

//Verify the sub category for create invisible the parent category
forumListingPageTest.subCategoryInvisibleParent=function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 23[Test case for Verify the sub category for create invisible the parent category ]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                utils.enableorDisableCheckbox('forum_invisible', true);
        }).then(function(){
                this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        }).thenOpen(config.url, function(){
                this.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                this.click('div#topics a[href="/categories"]');
        }).waitForSelector('a[href="#forums"]', function(){
                this.test.assertTextDoesntExist('validCategories');
        });
};

//Verify the sub category for create linked on the parent category
forumListingPageTest.subCategoryCreateLinked = function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 24[Test case for Verify the sub category for disabled invisible the parent category ]');
                utils.info('Case 25[Test case for Verify the sub category for create linked on the parent category ]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                utils.enableorDisableCheckbox('forum_invisible', false);
                utils.enableorDisableCheckbox('forum_link_cb', true);
                this.fill('form[name="frmOptions"]', {
                        'forum_link' : forumListingPageJSON.linkedtext.data
                }, false);
        }).then(function(){
                this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        //Verify linked subcategory redirected on same link where when click on link.
        }).waitForSelector('a#addForumButton', function(){
                this.test.assertExists('span.edit_forum_status_img.linked');
                this.evaluate(function(){
                        [].forEach.call(__utils__.findAll('a'), function(link){
                                link.removeAttribute('target');
                        });
                });
        }).then(function(){
                forumListingPageMethod.getlinkSubCategory(forumListingPageJSON.validCategories.title, forumListingPageJSON.subEnableLocked.title );
        }).waitForSelector('div#lga', function(){
                this.test.assertExists('div#lga');
        //Verify disable invisible category on forum frontend
        }).thenOpen(config.url, function(){
                this.waitForSelector('div#topics a[href="/categories"]', function(){
                        this.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                        this.click('div#topics a[href="/categories"]');
                }).waitForSelector('a[href="#forums"]', function(){
                        this.waitForText(forumListingPageJSON.validCategories.title);
                });
        });
};

//Verify the sub category for delete linked on the parent category
forumListingPageTest.subCategoryDeleteLinked = function(){
        casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 26[Test case for Verify the sub category for delete linked on the parent category ]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
                forumListingPageMethod.editCategory(forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                this.sendKeys('input[name="forum_link"]', ' ',  {reset:true});
        }).then(function(){
                this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        }).waitForSelector('a#addForumButton', function(){
                this.test.assertDoesntExist('span.edit_forum_status_img.linked');
        });
};

//Verify the sub category for changing the parent category
forumListingPageTest.subCategoryChangingParentCategory= function(){
	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 27[Test case for Verify the sub category for changing the parent category ]');
                backEndForumRegisterMethod.goToCategoryPage();
        }).waitForSelector('a#addForumButton', function(){
                casper.click('a#addForumButton');
        }).waitForSelector('form[name="frmOptions"] button', function(){
                backEndForumRegisterMethod.createCategorySubcategory(forumListingPageJSON.parentCategory.title, forumListingPageJSON.parentCategory);
        }).waitForSelector('a#addForumButton', function(){
                forumListingPageMethod.editSubCategory(forumListingPageJSON.subEnableLocked.title, forumListingPageJSON.validCategories.title);
        }).waitForSelector('form[name="frmOptions"] button', function(){
                this.test.assertExists('form#edit_forum_form select[name="parentid"]');
                this.click('select#parentid');
                this.fill('form[name="frmOptions"]',{
                        'parentid' : forumListingPageJSON.parentCategory.title
                }, false);
        }).then(function(){
                this.click('form[name="frmOptions"] button');
                this.waitForSelector('div#loading_msg', function(){
                        utils.info(casper.fetchText('div#loading_msg'));
                        utils.info('Category created','INFO');
                }, function fail(){
                        utils.error('disable invisible Category not created');
                        utils.error('Loading... not found');
                });
        }).thenOpen(config.url, function(){
        	//check the new parent category
        	this.test.assertSelectorHasText('div#topics a[href="/categories"]', 'Categories');
                this.click('div#topics a[href="/categories"]');
        }).waitForSelector('a[href="#forums"]', function(){
        	 deletePostMethod.getCategoryHrefFrontend(forumListingPageJSON.parentCategory.title);
        }).then(function(){
       		this.test.assertTextDoesntExist('subEnableLocked');
       	});
};
