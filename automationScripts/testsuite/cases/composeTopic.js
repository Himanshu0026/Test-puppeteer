var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var composeTopicJSON=require('../../testdata/composeTopic.json');
var composeTopicMethod=require('../methods/composeTopic.js');
var profilePageMethod= require('../methods/profilePage.js');
var topicMethod = require('../methods/topic.js');
var forumLoginMethod = require('../methods/login.js');
var deletePostMethod = require('../methods/deletePost.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
composeTopicTests = module.exports = {};

//Verify by Add New Topic  by topic listing page under  category
//Verify Compose Topic on Category Listing Page (For Guest/Registered User/Admin)
//"Verify Compost Topic on Topic Listing Page under category (For Guest/Registered User/Admin)"
//Verify Preview Post of Compose Topic  (For Registered User/Admin)
// method to create a category General
composeTopicTests.createCategoryTestCase = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' * Method to create category and sub category *');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		try{
    	this.test.assertTextExist(composeTopicJSON.category.title, 'category found on category page');
    }catch(e){
		  backEndForumRegisterMethod.createCategory(composeTopicJSON.category);
    }
	});
};

//Verify to create 10 topics for pagination and Delete from Pagination register user.
composeTopicTests.composeTopicPagination=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('******************************ComposeTopic********************************************');
    utils.info('Case 1[Verify to create 10 topics for pagination and Delete from Pagination.]');
    backEndForumRegisterMethod.goToDisplayPage();
  }).then(function(){
    backEndForumRegisterMethod.setTopicsPerPage('10');
  }).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
	}).waitWhileVisible('#td_tab_login', function() {
  }).waitForSelector('a[href="/post/printadd"]', function(){
    this.repeat(11, function(){
      this.evaluate(function(){
        document.querySelector('a[href="/post/printadd"]').click();
      });
    	this.then(function(){
      	topicMethod.createTopic(composeTopicJSON.ValidCredential);
    	}).waitForText(composeTopicJSON.ValidCredential.content, function(){
      	this.test.assertExists('a#links-nav');
      	this.click('a#links-nav');
    	}).waitForSelector('li#latest_topics_show a', function(){
				this.test.assertExists('li#latest_topics_show a');
      	this.click('li#latest_topics_show a');
    	}).waitForSelector('a[href="/post/printadd"]', function(){
      	this.evaluate(function(){
        	document.querySelector('a[href="/post/printadd"]').click();
      	});
				this.wait(1000, function(){});
    	});
  	});
	}).thenOpen(config.url, function(){
		this.test.assertExists('a.btn-subtle.pagination-last-page i','pagination icon found on latestTopicpage');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
			this.evaluate(function(){
				document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
			});
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend('ComposeCategory');
		}).waitForSelector('a#forum-title', function(){
			this.test.assertExists('a.btn-subtle.pagination-last-page i','pagination icon found on page');
  	}).then(function(){
    	this.repeat(2, function() {
				if (this.exists('div.panel-heading span input')) {
    			this.test.assertExists('div.panel-heading span input');
					this.evaluate(function() {
						document.querySelector('input[name="allbox"]').click();
					});
					this.test.assertExists('a#delete');
					this.click('a#delete');
				}
	  	});
  	}).then(function(){
    	forumLoginMethod.logoutFromApp();
  	});
 	});
};

//changes done according to neeraj sir branch.
//Verify Compose Topic without  selecting any category(Registered)
composeTopicTests.composeTopicWithoutCategory=function(username, password){
	casper.thenOpen(config.url, function(){
		utils.info('******************************ComposeTopic********************************************');
		utils.info('Case 2[Verify Preview Post of Compose Topic on postlisting page (For Registered User/Admin)]');
		utils.info('Case 2[Verify Compose Topic without  selecting any category(Registered)]');
		forumLoginMethod.loginToApp(username, password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('a[href="/post/printadd"]', function(){
    this.evaluate(function(){
      document.querySelector('a[href="/post/printadd"]').click();
    });
    topicMethod.createTopic(composeTopicJSON.ValidTopic);
  }).then(function(){
		var message=this.getElementAttribute('select#all_forums_dropdown', 'data-original-title');
		this.test.assertEquals(message, composeTopicJSON.expectedMessage.Message, 'both the text are equal');
  }).then(function(){
    forumLoginMethod.logoutFromApp();
  });
};

//Verify postPreview from general user from categoryListingPage
composeTopicTests.composeTopicPostPreview=function(username, password){
	casper.thenOpen(config.url, function(){
		utils.info('******************************ComposeTopic********************************************');
		utils.info('Case 3[Verify postPreview from general user from categoryListingPage]');
		forumLoginMethod.loginToApp(username, password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function(){
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('ComposeCategory');
	}).waitForSelector('a#forum-title', function(){
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary.start-new-topic-btn');
		this.evaluate(function(){
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary.start-new-topic-btn').click();
		});
	}).then(function(){
		composeTopicMethod.postPreview(composeTopicJSON.ValidCredential);
	}).waitForText(composeTopicJSON.ValidCredential.content,function(){
		forumLoginMethod.logoutFromApp();
	});
};

//new case issue in the case.
//Verify Compose Topic on topic listing page(if New Topic permission is disabled of one cateogry) (For Register User)
composeTopicTests.composeTopicRegisterstartTopicdisablecategory=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('******************************ComposeTopic********************************************');
		utils.info('Case 4[Verify Preview Post of Compose Topic on postlisting page for register user]');
		composeTopicMethod.startTopicPermissionForCategory(false);
	}).then(function(){
		casper.thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitWhileVisible('#td_tab_login', function() {
		}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.evaluate(function(){
				document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
			});
		}).waitForSelector('form#inlineSearchForm', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('div#ajax_subscription_vars a', function(){
			this.evaluate(function(){
				document.querySelector('div#ajax_subscription_vars a').click();
			});
		}).then(function(){
			var message=this.getElementAttribute('div#ajax_subscription_vars a', 'title');
			this.test.assertEquals(message, composeTopicJSON.expectedtooltip.expectedMessage, 'both the text are equal');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//Verify post-Preview for guest user on latestTopicPage, topicListingPage and categoryListingPage
//Verify error messgae for guest user without selecting any category.
composeTopicTests.composeTopicGuestUserPostPreview=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('******************************ComposeTopic********************************************');
		utils.info('Case 5[Verify post-Preview for guest user on latestTopicPage, topicListingPage and categoryListingPage for guest user]');
		utils.info('Case 5[Verify error message for guest user without selecting any category.]');
	}).then(function(){
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function(){
    this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
    }).then(function(){
			backEndForumRegisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'post_threads', true);
		}).thenOpen(config.url, function(){
			this.waitForSelector('a[href="/post/printadd"]', function(){
				this.evaluate(function(){
					document.querySelector('a[href="/post/printadd"]').click();
				});
				topicMethod.createTopic(composeTopicJSON.ValidTopic);
			}).then(function(){
				var message=this.getElementAttribute('select#all_forums_dropdown', 'data-original-title');
				this.test.assertEquals(message, composeTopicJSON.expectedMessage.Message, 'both the text are equal');
			}).then(function(){
				composeTopicMethod.postPreview(composeTopicJSON.ValidCredential);
			}).waitForText(composeTopicJSON.ValidCredential.content, function(){
				this.test.assertExists('a#links-nav i');
				this.click('a#links-nav i');
				this.test.assertExists('li#latest_topics_show a','title present on forum');
				this.click('li#latest_topics_show a');
			}).waitForSelector('a[href="/post/printadd"]', function(){
				this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
 				this.evaluate(function(){
					document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
 				});
			}).waitForSelector('a[href="#forums"]', function(){
				this.test.assertExist('div#forums a span', 'start topic found on categorylistingPage');
				this.evaluate(function(){
					document.querySelector('div#forums a span').click();
				});
			}).then(function(){
				composeTopicMethod.postPreview(composeTopicJSON.ValidCredential);
			}).waitForText(composeTopicJSON.ValidCredential.content, function(){
				this.test.assertExists('a#backArrowPost');
				this.click('a#backArrowPost');
			}).waitForSelector('div#ajax_subscription_vars a span', function(){
				this.evaluate(function(){
					document.querySelector('div#ajax_subscription_vars a span').click();
				});
			}).then(function(){
				composeTopicMethod.postPreview(composeTopicJSON.ValidCredential);
			}).waitForText(composeTopicJSON.ValidCredential.content);
		});
	});
};


//need to add in incontextlogin tasks--------------
//Verify Compose Topic on topic listing page(if New Topic permission is disabled of one cateogry) (For Guest User)
/*composeTopicTests.composeTopicGueststartTopicdisblecategory=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('******************************ComposeTopic********************************************');
		utils.info('Case 6[Verify Preview Post of Compose Topic on postlisting page for guest user]');
		composeTopicMethod.startTopicPermissionForCategory(true);
	}).then(function(){
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function(){
    this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
    }).then(function(){
			backEndForumRegisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'post_threads', false);
		}).thenOpen(config.url, function(){
			this.evaluate(function(){
				document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
			});
		}).waitForSelector('form#inlineSearchForm', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('div#ajax_subscription_vars a', function(){
			this.evaluate(function(){
      	document.querySelector('div#ajax_subscription_vars a').click();
      });
      }).then(function(){
        this.test.assertExists('span#user-login-modal-heading', 'model-pop-up opened successfully');
      });
	});
};*/

//settings for profilePage deleteOwnPost enable and deleteOwnTopic enable
composeTopicTests.permissionSettings=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('******************************ComposeTopic********************************************');
    utils.info('Case 7[Verify to set 100 topics per-page]');
		composeTopicMethod.startTopicPermissionForCategory(true);
	}).then(function(){
    backEndForumRegisterMethod.goToDisplayPage();
  }).then(function(){
    backEndForumRegisterMethod.setTopicsPerPage('100');
  });
};
