'use strict.';
var followPinLockJSON = require('../../testdata/followpinlock.json');
var topicJSON = require('../../testdata/topic.json');
var loginJSON = require('../../testdata/loginData.json');
var thumpsUpDownJSON = require('../../testdata/thumpsUpDown.json');
var pollJSON = require('../../testdata/poll.json');
var forumListingPageJSON  = require('../../testdata/forumListingPage.json');
var utils = require('../utils.js');
var pollMethod = require('../methods/poll.js');
var topicMethod = require('../methods/topic.js');
var forumLoginMethod = require('../methods/login.js');
var deletePostMethod = require('../methods/deletePost.js');
var profilePageMethod= require('../methods/profilePage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var moderatorPermissionsMethod = require('../methods/moderatorPermissions.js');
var profilePageTests = require('../cases/profilePage.js');
var followpinlockTest=module.exports = {};

followpinlockTest.addModeratorByScenarioOne = function() {
  casper.thenOpen(config.backEndUrl, function() {
    var category_Id;
		utils.info('Test case 1 [Method to Verfiy with Add a moderator for category(cat1) by scenario 1]');
		var category = thumpsUpDownJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
        moderatorPermissionsMethod.goToModerator(category_Id);
        casper.then(function() {
                moderatorPermissionsMethod.clickOnAddModerator(category_Id);
        }).then(function() {
                var user = followPinLockJSON.moderatorLogin.username;
                moderatorPermissionsMethod.FillModeratorDetails(user, category_Id);
        });
      }
		});
	});
};

//2.Test case for Add New topic by enable Follow check box and verify unfollow topic option on forum listing page
followpinlockTest.enableFollowCheckbox= function() {
  casper.thenOpen(config.url, function(){
		utils.info(' Case 1[Add New topic by enable Follow check box and verify unfollow topic option on forum listing page]');
		utils.info('Case 9[Add New topic by enable Follow check box and verify unfollow topic option on latest topic page]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
        }).waitForSelector('div#ajax_subscription_vars a', function(){
                this.click('div#ajax_subscription_vars a');
        }).waitForSelector('div.post-body.pull-left', function(){
                utils.enableorDisableCheckbox('follow_thread', true);
        }).then(function(){
                topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.test.assertExists('a#sub_post_reply');
		this.mouse.move('a#sub_post_reply');
		this.test.assertVisible('a#submenu_unfollow_topic i');
	});
};

//1.test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
followpinlockTest.disableFollowCheckbox= function() {
	casper.thenOpen(config.url, function(){
		utils.info(' Case 2[Add New topic by disabling Follow check box and verify follow topic option on Post page]');
		utils.info('Case 10[Add New topic by disabling Follow check box and verify follow topic option on latest topic page]');
        }).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
                this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
                this.evaluate(function() {
                        document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
                });
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend('General');
        }).waitForSelector('div#ajax_subscription_vars a', function(){
                this.click('div#ajax_subscription_vars a');
        }).waitForSelector('div.post-body.pull-left', function(){
                utils.enableorDisableCheckbox('follow_thread', false);
        }).then(function(){
                topicMethod.createTopic(followPinLockJSON.Disablefollow);
        }).waitForText(followPinLockJSON.Disablefollow.content, function(){
		this.test.assertExists('a#sub_post_reply');
		this.mouse.move('a#sub_post_reply');
                this.test.assertVisible('#submenu_follow_topic i');
	});
};

//3. test case for Follow any topic and verify followed topic in Followed Content page
followpinlockTest.followedTopicContentPage= function() {
  casper.thenOpen(config.url, function(){
		utils.info(' Case 3[Follow any topic and verify followed topic in Followed Content page]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
			this.test.assertExists('a#submenu_follow_topic i');
			this.click('a#submenu_follow_topic i');
			this.wait(1000, function(){});
		}).then(function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
			this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
		}).waitForSelector('li#show_posts', function(){
			this.waitForText(followPinLockJSON.Disablefollow.content);
		});
	});
};

//4.test case for unFollow any topic and verify unfollowed topic in Followed Content page
followpinlockTest.unfollowedTopicContentPage= function() {
  casper.thenOpen(config.url, function(){
		utils.info(' Case 4[unFollow any topic and verify unfollowed topic in Followed Content page]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
            this.test.assertVisible('a#submenu_unfollow_topic i');
            this.click('a#submenu_unfollow_topic i');
			this.wait(1000, function(){});
		}).then(function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
		}).then(function(){
			this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
			this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
		}).waitForSelector('li#show_posts', function(){
			 this.test.assertTextDoesntExist('Disablefollow', 'page body does not contain "Disablefollow"');
		});
	});
};

//5.test case for Unfollow Topic from followed content page and verify that topic on the page
followpinlockTest.unfollowTopicFollowed= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 5[Unfollow Topic from followed content page and verify that topic on the page]');
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
		this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
	}).waitForSelector('li#show_posts', function(){
		this.test.assertExists('span.topic-content h4 a span');
		this.click('input[name="id"]');
		this.wait(1000, function(){});
	}).then(function(){
		casper.test.assertExists('a#unsubscribe');
		casper.click('a#unsubscribe');
		this.wait(1000, function(){});
	}).then(function(){
		this.test.assertTextDoesntExist('ONEpluse', 'page body does not contain "ONEpluse"');
	});
};

//6.Test case for Verify message in Topic list content on Followed Content page if there is no any followed topic in the list
followpinlockTest.noFollowedTopic= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 6[Verify message in Topic list content on Followed Content page if there is no any followed topic in the list]');
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
		this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
	}).waitForSelector('li#show_posts', function(){
		var alert=this.getHTML('div.alert.alert-info.text-center.no-space');
		var actualalert=alert.trim();
		this.test.assertEquals(actualalert, followPinLockJSON.Disablefollow.expectedAlert,'both the alerts are equal');
	});
};

//7.test case for Follow any category and verify that topic in category lis on Followed Content page
followpinlockTest.followAnyCategory = function() {
  casper.thenOpen(config.url, function(){
		utils.info(' Case 7[Follow any category and verify that topic in category lis on Followed Content page]');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('a#submenu_follow_forum i', function(){
			this.test.assertExists('a#submenu_follow_forum i');
			this.click('a#submenu_follow_forum i');
			this.wait(1000, function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
				this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
			}).waitForSelector('a#anchor_tab_forum_subscriptions', function(){
				this.click('a#anchor_tab_forum_subscriptions');
			}).waitForSelector('ul.pull-left li:nth-child(2) a', function(){
				this.test.assertTextExists('General', 'page contain category "General"');
			});
		});
	});
};

//8.test case for UnFollow category from followed content list and verify visibility of that category in the list
followpinlockTest.unfollowAnyCategory= function() {
  casper.thenOpen(config.url, function(){
		utils.info(' Case 8[UnFollow category from followed content list and verify visibility of that category in the list]');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('a#submenu_unfollow_forum i', function(){
			this.test.assertExists('a#submenu_unfollow_forum i');
			this.click('a#submenu_unfollow_forum i');
			this.wait(1000, function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
				this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
			}).waitForSelector('a#anchor_tab_forum_subscriptions', function(){
				this.click('a#anchor_tab_forum_subscriptions');
			}).waitForSelector('ul.pull-left li:nth-child(2) a', function(){
				this.test.assertNotVisible('general', 'page not contain general');
			});
		});
	});
};

//13.Add New topic by enable Follow check box and verify unfollow topic option on topic listing page for sub category topic
followpinlockTest.enableFollowCheckboxSubCategoryTopic= function() {
  casper.thenOpen(config.backEndUrl, function(){
		utils.info(' Case 13[Add New topic by enable Follow check box and verify unfollow topic option on topic listing page for sub category topic ]');
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function(){
		backEndForumRegisterMethod.isCategoryExists(followPinLockJSON.newCategory, function(err, isExists){
			if(isExists){
				utils.info('Category already existed');
			}else{
				utils.info('Category not exist');
				casper.then(function(){
					backEndForumRegisterMethod.createCategory(followPinLockJSON.newCategory);
					this.reload(function() {
						this.waitForText(followPinLockJSON.newCategory.title, function(){
							backEndForumRegisterMethod.createCategorySubcategory(followPinLockJSON.newsubCategory.title, followPinLockJSON.newsubCategory);
						});

					});
				});
			}
    });
	}).thenOpen(config.url, function(){
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend('newCategory');
		}).waitForSelector('a#forum-title', function(){
			this.click('a#forum-title');
		}).waitForSelector('a#submenu_follow_forum i', function(){
			this.test.assertExists('a#submenu_follow_forum i');
			this.click('a#submenu_follow_forum i');
			var message=this.getElementAttribute('a#submenu_follow_forum i', 'title');
			this.test.assertEquals(message, followPinLockJSON.followCategory.expectedMsg, 'both the text are equal');
		});
	});
};

//14.Add New topic by disable Follow check box and verify unfollow topic option on topic listing page for sub category topic
followpinlockTest.disableFollowCheckboxSubCategoryTopic= function() {
  casper.thenOpen(config.url, function(){
		utils.info(' Case 14[Add New topic by enable Follow check box and verify unfollow topic option on topic listing page for sub category topic ]');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend('newCategory');
		}).waitForSelector('a#forum-title', function(){
			this.click('a#forum-title');
		}).waitForSelector('a#forum-title span', function(){
			this.test.assertExists('div#ajax_subscription_vars a:nth-child(3) i');
			this.click('div#ajax_subscription_vars a:nth-child(3) i');
			var message=this.getElementAttribute('div#ajax_subscription_vars a:nth-child(3) i', 'title');
			this.test.assertEquals(message, followPinLockJSON.unFollowCategory.expectedMsg, 'both the text are equal');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//15.Verify the follow option visibility on topic listing page by the guest user/unregistered user.
followpinlockTest.optionVisibilityTopicListingPage= function() {
	casper.thenOpen(config.url, function(){
		utils.info('Case 16[Verify the follow option visibility on topic listing page by the guest user/unregistered user.]');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.test.assertDoesntExist('a#submenu_follow_forum i', 'follow unfollow selector cannot be found on topic listing page');
		});
	});
};

//14.Verify the follow option visibility on latest topic page by the guest user/unregistered user
followpinlockTest.optionVisibilityLatestTopicPage= function() {
	casper.thenOpen(config.url, function(){
		utils.info('Case 15[Verify the follow option visibility on latest topic page by the guest user/unregistered user.]');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			//latest topic page
			this.click('div#topics div div div form div div:nth-child(2) ul li:nth-child(1) a');
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
			this.test.assertDoesntExist('a#submenu_follow_forum i', 'follow unfollow selector cannot be found on topic listing page');
		});
	});
};

//16.Verify the follow option visibility on post listing page by the guest user/unregistered user.
followpinlockTest.optionVisibilityPostListingPage= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 17[Verify the follow option visibility on post listing page by the guest user/unregistered user..]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
			this.test.assertDoesntExist('a#submenu_follow_forum i', 'follow unfollow selector cannot be found on topic listing page');
		});
	});
};

/************************   2.Lock-unLock Topic  ****************************/
//17.Lock any topic and Verify Lock option of topic listing page[Home page]
followpinlockTest.lockAnyTopic= function() {
  casper.thenOpen(config.url, function(){
		utils.info(' Case 18[Lock any topic and Verify Lock option of topic listing page[Home page]]');
		utils.info('Case 24[Add New topic by enable lock check box and verify unlock topic option on latest topic page]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
		topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
	}).then(function(){
		this.test.assertExists('li#latest_topics_show a');
		this.click('li#latest_topics_show a');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertExists('input[name="id"]');
		this.click('input[name="id"]');
		this.wait(1000, function(){});
        }).then(function(){
		this.test.assertExists('div#topics-menu span:nth-child(3) a i:nth-child(1)');
		this.click('div#topics-menu span:nth-child(3) a i:nth-child(1)');
		this.test.assertExists('a#lock');
		this.click('a#lock');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('i.glyphicon.glyphicon-lock.help-tooltip', 'data-original-title');
    this.test.assertEquals(message, followPinLockJSON.lockTopic.expectedMsg, 'both the text are equal');
	});
};

//19.Lock any topic and Verify Lock option of forum listing page[Home page]
followpinlockTest.lockAnyTopicForumListingPage= function(){
  casper.thenOpen(config.url, function(){
		utils.info(' Case 20[Lock any topic and Verify Lock option of forum listing page[Home page]]');
		utils.info('Case 26[Lock any topic and Verify Lock optipon of post listing page under category]');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('input[name="allbox"]', function(){
			this.test.assertExists('i.glyphicon.glyphicon-lock.help-tooltip', 'locked topic found on forumListingPage');
	    var message=this.getElementAttribute('i.glyphicon.glyphicon-lock.help-tooltip', 'data-original-title');
			this.test.assertEquals(message, followPinLockJSON.lockTopic.expectedMsg, 'both the text are equal');
		});
	});
};

//18.un-Lock any topic and Verify Lock optipon of topic listing page[Home page]
followpinlockTest.unlockAnyTopic= function(){
  casper.thenOpen(config.url, function(){
		utils.info(' Case 19[un-Lock any topic and Verify Lock optipon of topic listing page[Home page]]');
		utils.info('Case 25[Add New topic by disabling lock check box and verify lock topic option on latest topic page]');
		this.waitForSelector('input[name="allbox"]', function(){
			this.test.assertExists('input[name="id"]');
			this.click('input[name="id"]');
		}).then(function(){
			this.test.assertExists('div#topics-menu span:nth-child(3) a i:nth-child(1)');
			this.click('div#topics-menu span:nth-child(3) a i:nth-child(1)');
			this.test.assertExists('a#unlock');
			this.click('a#unlock');
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
      this.click('form[name="posts"] a.topic-title');
    }).waitForSelector('span#editableSubject', function(){
      this.test.assertDoesntExist('div.alert.alert-warning.text-center', 'topic is unlocked successfully');
    });
	});
};

//27.Lock topic from Profile page and verify locked topic
followpinlockTest.lockTopicProfilePage= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 28[Lock topic from Profile page and verify locked topic]');
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
	  this.test.assertExists('a#user-nav-panel-profile', 'profile level found on login toggle button');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertExists('a#Topics_Started');
		this.click('a#Topics_Started');
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.mouse.move('input[name="id"]');
		this.click('input[name="id"]');
	}).then(function(){
		this.test.assertExists('i.glyphicon.glyphicon-lock');
		this.click('i.glyphicon.glyphicon-lock');
		this.test.assertExists('a#lock');
		this.click('a#lock');
	}).waitForSelector('a#PostsOFUser', function(){
		var message=this.getElementAttribute('i.glyphicon.glyphicon-lock.text-muted', 'title');
		this.test.assertEquals(message, followPinLockJSON.lockTopic.expectedMsg, 'both the text are equal');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//28.un-Lock topic from Profile page and verify unlocked topic
followpinlockTest.unlockTopicProfilePage= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 29[un-Lock topic from Profile page and verify unlocked topic]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertExists('a#Topics_Started');
		this.click('a#Topics_Started');
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.mouse.move('input[name="id"]');
		this.click('input[name="id"]');
  }).then(function(){
		this.test.assertExists('i.glyphicon.glyphicon-lock');
		this.click('i.glyphicon.glyphicon-lock');
		this.test.assertExists('a#unlock');
		this.evaluate(function(){
			document.querySelector('a#unlock').click();
		});
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertDoesntExist('i.glyphicon.glyphicon-lock.text-muted', 'lock topic cannot be found on forum listing page');
		this.then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//29.Lock any topic from post page and verify locked message from postlisting page
//login from moderator
followpinlockTest.lockTopicPostPage= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 30[Lock any topic from post page and verify locked message from postlisting page]');
		utils.info('Case 31[UnLock any locked  topic from post page and verify that the locked message should be disappeared (need test case 29)]');
		forumLoginMethod.loginToApp(followPinLockJSON.moderatorLogin.username, followPinLockJSON.moderatorLogin.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
		topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.waitForSelector('i.icon.icon-left-small', function(){
			this.test.assertExists('div.topic-tools.pull-right div.dropdown a span ');
			this.click('div.topic-tools.pull-right div.dropdown a span ');
		}).then(function(){
			this.test.assertExists('div.topic-tools.pull-right ul a');
			this.click('div.topic-tools.pull-right ul a');
		}).waitForSelector('div.alert.alert-warning.text-center', function(){
			this.test.assertSelectorHasText('div.alert.alert-warning.text-center', 'This topic is locked. No new replies will be accepted.');
    }).then(function(){
			this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
			this.click('div.topic-tools.pull-right div.dropdown a span');
		}).then(function(){
			this.test.assertExists('div.topic-tools.pull-right ul a');
			this.click('div.topic-tools.pull-right ul a');
		}).then(function(){
			this.test.assertDoesntExist('div.alert.alert-warning.text-center', 'topic is unlocked');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//31.Verify Reply a Post option against locked topic on post page for registered user
followpinlockTest.ReplyPostOptionAgainstLockedTopic= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 32[Verify Reply a Post option against locked topic on post page for registered user]');
		forumLoginMethod.loginToApp(forumListingPageJSON.moderatorLogin.username, forumListingPageJSON.moderatorLogin.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
		topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.waitForSelector('i.icon.icon-left-small', function(){
			this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
			this.click('div.topic-tools.pull-right div.dropdown a span');
		}).then(function(){
			this.test.assertExists('div.topic-tools.pull-right ul a');
			this.click('div.topic-tools.pull-right ul a');
		}).waitForSelector('div.alert.alert-warning.text-center', function(){
			this.test.assertSelectorHasText('div.alert.alert-warning.text-center', 'This topic is locked. No new replies will be accepted.');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
			this.test.assertDoesntExist('a#sub_post_reply', 'post reply button not found');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//32.Verify Vote option against locked topic on post page
followpinlockTest.voteOptionAgainstLockedTopic= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 33[Verify Vote option against locked topic on post page]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
		topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
	}).then(function(){
		this.test.assertExists('li#latest_topics_show a');
		this.click('li#latest_topics_show a');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertExists('input[name="allbox"]');
		this.click('input[name="allbox"]');
  }).then(function(){
		this.test.assertExists('div#topics-menu span:nth-child(3) a i:nth-child(1)');
		this.click('div#topics-menu span:nth-child(3) a i:nth-child(1)');
		this.test.assertExists('a#lock');
		this.click('a#lock');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a#sub_post_reply', function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
		this.click('div.topic-tools.pull-right div.dropdown a span');
		this.test.assertExists('div.topic-tools.pull-right ul li:nth-child(4) a');
		this.click('div.topic-tools.pull-right ul li:nth-child(4) a');
	}).waitForSelector('button#save_poll', function(){
		pollMethod.createPoll(pollJSON.pollData);
	}).waitForSelector('input[name="pollvotesave"]', function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('input[name="pollvotesave"]', function(){
		this.mouse.move('input[name="pollvotesave"]');
		this.click('input[name="pollvotesave"]');
	}).then(function(){
		var message=this.getElementAttribute('input[name="pollvotesave"]', 'data-original-title');
		this.test.assertEquals(message, followPinLockJSON.voteTooltip.expectedMsg, 'both the text are equal');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).then(function(){
    profilePageTests.deleteTopics();
  });
};

/***************************   3.Pin-unPin Topic  ****************************/
//40.Add New topic by disable pin check box and verify unpin topic  on latest topic page
//33.Pin any topic and Verify Pin icon of topic listing page[Home page]
followpinlockTest.PinIconTopicListingPage= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 34[Pin any topic and Verify Pin icon of topic listing page[Home page]]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
		topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
	}).then(function(){
		this.test.assertExists('li#latest_topics_show a');
		this.click('li#latest_topics_show a');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertExists('input[name="id"]');
		this.click('input[name="id"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#pin');
		this.click('a#pin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('i.glyphicon.glyphicon-pushpin.help-tooltip', 'data-original-title');
		this.test.assertEquals(message, followPinLockJSON.pinMessage.expectedMsg, 'both the text are equal');
	});
};

//35.Pin any topic and Verify Pin icon of post listing page under category
followpinlockTest.PinIconPostListingPageUnderCategory= function(){
  casper.thenOpen(config.url, function(){
		utils.info(' Case 36[Pin any topic and Verify Pin icon of post listing page under category]');
	  this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('input[name="id"]', function(){
			this.test.assertExists('input[name="id"]');
			this.click('input[name="id"]');
    }).then(function(){
			this.test.assertExists('i.icon.glyphicon-pushpin');
			this.click('i.icon.glyphicon-pushpin');
			this.test.assertExists('a#pin');
			this.click('a#pin');
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			var message=this.getElementAttribute('i.glyphicon.glyphicon-pushpin.help-tooltip', 'data-original-title');
			this.test.assertEquals(message, followPinLockJSON.pinMessage.expectedMsg, 'both the text are equal');
		});
	});
};

////40.Add New topic by disable pin check box and verify unpin topic  on latest topic page
//34.un-Pin any pinned topic and Verify pic icon of topic listing page[Home page]
followpinlockTest.unPinVerifyPicIconTopicListingPage= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 35[Pin any topic and Verify Pin icon of topic listing page[Home page]]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.test.assertExists('input[name="id"]');
			this.click('input[name="id"]');
    }).then(function(){
			this.test.assertExists('i.icon.glyphicon-pushpin');
			this.click('i.icon.glyphicon-pushpin');
			this.test.assertExists('a#unpin');
			this.click('a#unpin');
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.test.assertDoesntExist('i.glyphicon.glyphicon-pushpin.help-tooltip', 'topic is un-pinned');
		}).then(function(){
      forumLoginMethod.logoutFromApp();
    });
	});
};

//43.Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic
followpinlockTest.enablePinVerifyPinOptionSubCategoryTopic= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 40[Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('newCategory');
	}).waitForSelector('span.forum-title', function(){
		this.click('span.forum-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary ', function(){
		this.evaluate(function() {
		  document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).then(function(){
		topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('input[name="id"]', function(){
		this.test.assertExists('input[name="id"]');
		this.click('input[name="id"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#pin');
		this.click('a#pin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('i.glyphicon.glyphicon-pushpin.help-tooltip', 'data-original-title');
		this.test.assertEquals(message, followPinLockJSON.pinMessage.expectedMsg, 'both the text are equal');
	});
};

//44.Add New topic by disabling un pin check box and verify pin topic option on topic listing page for sub category topic
followpinlockTest.disableUnPinVerifyPinOptionSubCategoryTopic= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 41[un-Pin any topic and Verify Pin icon of post listing page under category]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('newCategory');
	}).waitForSelector('span.forum-title', function(){
		this.click('span.forum-title');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertExists('input[name="id"]');
		this.click('input[name="id"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#unpin');
		this.click('a#unpin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertDoesntExist('i.glyphicon.glyphicon-pushpin.help-tooltip', 'topic is un-pinned');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//55.Pin any topic and Verify Pin icon of topic listing page from moderator shield icon
followpinlockTest.pinTopicVerifyModeratorShieldIcon= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 42[un-Pin any topic and Verify Pin icon of post listing page under category]');
		forumLoginMethod.loginToApp(forumListingPageJSON.moderatorLogin.username, forumListingPageJSON.moderatorLogin.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
		topicMethod.createTopic(followPinLockJSON.Enablefollow);
	}).waitForText(followPinLockJSON.Enablefollow.content, function(){
		this.test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
	}).then(function(){
		this.test.assertExists('li#latest_topics_show a');
		this.click('li#latest_topics_show a');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
		this.click('div.topic-tools.pull-right div.dropdown a span');
	}).then(function(){
		this.test.assertExists('div.topic-tools.pull-right ul li:nth-child(3) a');
		this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('input[name="id"]');
		this.click('input[name="id"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#pin');
		this.click('a#pin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('i.glyphicon.glyphicon-pushpin.help-tooltip', 'data-original-title');
		this.test.assertEquals(message, followPinLockJSON.pinMessage.expectedMsg, 'both the text are equal');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//56.Un-Pin any topic and Verify Pin icon of topic listing page from moderator shield icon
followpinlockTest.unPinTopicVerifyModeratorShieldIcon= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 43[un-Pin any topic and Verify Pin icon of post listing page under category]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
		this.click('div.topic-tools.pull-right div.dropdown a span');
	}).then(function(){
		this.test.assertExists('div.topic-tools.pull-right ul li:nth-child(3) a');
		this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('input[name="allbox"]');
		this.click('input[name="allbox"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#unpin');
		this.click('a#unpin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertDoesntExist('i.glyphicon.glyphicon-pushpin.help-tooltip', 'topic is un-pinned');
	});
};

//45.Pin any topic and Verify Pin icon under category page from moderator shield icon
followpinlockTest.pinTopicVerifyUnderCategoryPageModeratorShieldIcon= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 46[Pin any topic and Verify Pin icon under category page from moderator shield icon]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4', function(){
		this.test.assertExists('span.topic-content h4');
		this.click('span.topic-content h4');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
		this.click('div.topic-tools.pull-right div.dropdown a span');
	}).then(function(){
		this.test.assertExists('div.topic-tools.pull-right ul li:nth-child(3) a');
		this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertExists('input[name="allbox"]');
		this.click('input[name="allbox"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#pin');
		this.click('a#pin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('i.glyphicon.glyphicon-pushpin.help-tooltip', 'data-original-title');
		this.test.assertEquals(message, followPinLockJSON.pinMessage.expectedMsg, 'both the text are equal');
	}).then(function(){
    forumLoginMethod.logoutFromApp();
  });
};

//60.Un-Pin any topic and Verify Pin icon under category page from moderator shield icon
followpinlockTest.unPinTopicVerifyUnderCategoryPageModeratorShieldIcon= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 47[Pin any topic and Verify Pin icon under category page from moderator shield icon]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content a span', function(){
		this.test.assertExists('span.topic-content a span');
		this.click('span.topic-content a span');
	}).waitForSelector('i.icon.icon-left-small', function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
		this.click('div.topic-tools.pull-right div.dropdown a span');
	}).then(function(){
		this.test.assertExists('div.topic-tools.pull-right ul li:nth-child(3) a');
		this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('input[name="id"]', function(){
		this.test.assertExists('input[name="id"]');
		this.click('input[name="id"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#unpin');
		this.click('a#unpin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertDoesntExist('i.glyphicon.glyphicon-pushpin.help-tooltip', 'topic is un-pinned');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//61.Pin any topic and Verify Pin icon under sub category page from moderator shield icon
followpinlockTest.pinTopicVerifyUnderSubCategoryPageModeratorShieldIcon= function(){
  casper.thenOpen(config.url, function(){
		utils.info('Case 48[Pin any topic and Verify Pin icon under sub category page from moderator shield icon]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('newCategory');
	}).waitForSelector('a#forum-title', function(){
		this.click('a#forum-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.evaluate(function() {
		  document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(followPinLockJSON.ValidCredential);
	}).waitForText(followPinLockJSON.ValidCredential.content, function(){
    this.test.assertExists('i.icon.icon-left-small','backarrow icon found on postlistingpage');
	  this.click('div.topic-tools.pull-right div.dropdown a span');
	}).then(function(){
		this.test.assertExists('div.topic-tools.pull-right ul li:nth-child(3) a');
		this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertExists('input[name="id"]');
		this.click('input[name="id"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#pin');
		this.click('a#pin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('i.glyphicon.glyphicon-pushpin.help-tooltip', 'data-original-title');
		this.test.assertEquals(message, followPinLockJSON.pinMessage.expectedMsg, 'both the text are equal');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//62.Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon
followpinlockTest.unPinTopicVerifyUnderSubCategoryPageModeratorShieldIcon= function() {
  casper.thenOpen(config.url, function(){
		utils.info('Case 49[Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('newCategory');
	}).waitForSelector('a#forum-title', function(){
		this.click('a#forum-title');
	}).waitForSelector('span.topic-content h4 a span', function(){
		this.test.assertExists('span.topic-content h4 a span');
		this.click('span.topic-content h4 a span');
	}).waitForSelector('i.icon.icon-left-small', function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span');
		this.click('div.topic-tools.pull-right div.dropdown a span');
	}).then(function(){
		this.test.assertExists('div.topic-tools.pull-right ul li:nth-child(3) a');
		this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertExists('input[name="allbox"]');
		this.click('input[name="allbox"]');
  }).then(function(){
		this.test.assertExists('i.icon.glyphicon-pushpin');
		this.click('i.icon.glyphicon-pushpin');
		this.test.assertExists('a#unpin');
		this.click('a#unpin');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertDoesntExist('i.glyphicon.glyphicon-pushpin.help-tooltip', 'topic is un-pinned');
	}).then(function(){
    forumLoginMethod.logoutFromApp();
  });
};
