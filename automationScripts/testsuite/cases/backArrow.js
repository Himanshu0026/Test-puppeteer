//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var deletePostJSON = require('../../testdata/deletePostData.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var topicJSON = require('../../testdata/topic.json');
var backArrowJSON=require('../../testdata/backArrow.json');
var forumLoginMethod = require('../methods/login.js');
var deletePostMethod = require('../methods/deletePost.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var topicMethod = require('../methods/topic.js');
backArrowTests = module.exports = {};

backArrowTests.createbackArrowCategory = function() {
        casper.thenOpen(config.backEndUrl, function() {
		utils.info(' * Method to create category and sub category *');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		try{
                        this.test.assertTextExist(backArrowJSON.backArrowCategory.title, 'category found on category page');
                }catch(e){
			casper.then(function(){
		        	backEndForumRegisterMethod.createCategory(backArrowJSON.backArrowCategory);
                                this.reload(function() {
					this.waitForText(backArrowJSON.backArrowCategory.title, function(){
						backEndForumRegisterMethod.createCategorySubcategory(backArrowJSON.backArrowCategory.title, backArrowJSON.backArrowSubCategory);
					});
				});
			});
                }
	});
};

// method to create a category General
backArrowTests.readAllPost = function() {
        casper.thenOpen(config.url, function(){
	        utils.info('Case 1[Verify back arrow with Read all post button on topic listing page]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
                forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
        }).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
                this.test.assertExists('a#backArrowPost', 'back arrow found after created a topic');
                this.click('a#backArrowPost');
        }).waitForText(backArrowJSON.topicListingPage.Text, function(){
                this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
                this.test.assertExists('span.icon.icon-sweep', 'read all topics icon found on page');
                this.click('span.icon.icon-sweep');
        }).waitForSelector('a#back_arrow_topic', function(){
                this.click('a#back_arrow_topic');
        }).waitForText(deletePostJSON.categoryName.category);
};

//Verify back arrow when user login on post listing page directly
//Verify with sorting options like latest/new/top by the post listing page under category
backArrowTests.postListingPage = function() {
        casper.thenOpen(config.url, function(){
	        utils.info('Case 2[Verify back arrow when user login on post listing page directly]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
                this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
                this.evaluate(function() {
                        document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
                });
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend('General');
        }).waitForSelector('span.topic-content h4 a', function(){
                this.click('span.topic-content h4 a');
        }).waitForSelector('a#backArrowPost', function(){
                this.test.assertExists('a#backArrowPost', 'back-arrow found');
                this.click('a#backArrowPost');
        }).waitForText(backArrowJSON.topicListingPage.Text, function(){
                // checked new button under-category on topiclistingPage
                this.test.assertExists('div#topics div form div div:nth-child(2) ul li:nth-child(2) a', 'new link found on latest topic page');
                this.click('div#topics div form div div:nth-child(2) ul li:nth-child(2) a');
        }).waitForSelector('div#topics div form div div:nth-child(2) ul li:nth-child(2) a', function(){
                this.test.assertExists('form[name="posts"] a.topic-title');
                this.click('form[name="posts"] a.topic-title');
        }).waitForSelector('a#backArrowPost', function(){
                this.test.assertExists('a#backArrowPost', 'back-arrow found on postlistingPage');
                this.click('a#backArrowPost');
        }).waitForText(backArrowJSON.topicListingPage.Text1, function(){
                // checked top button under-category on topiclistingPage
                this.test.assertExists('div#topics div form div div:nth-child(2) ul li:nth-child(3) a', 'top link found on topicListingPage');
                this.click('div#topics div form div div:nth-child(2) ul li:nth-child(3) a');
        }).waitForSelector('div#topics div form div div:nth-child(2) ul li:nth-child(3) a', function(){
                this.test.assertExists('form[name="posts"] a.topic-title');
                this.click('form[name="posts"] a.topic-title');
        }).waitForSelector('a#backArrowPost', function(){
                this.test.assertExists('a#backArrowPost', 'back-arrow found on postlistingPage');
                this.click('a#backArrowPost');
        }).waitForText(backArrowJSON.topicListingPage.Text2, function(){
                forumLoginMethod.logoutFromApp();
        });
};

//Verify back arrow when user login on latest topic page
//Verify with sorting options like latest/new/top by the post listing page from home page
backArrowTests.latestTopicPage = function() {
        casper.thenOpen(config.url, function(){
                utils.info('Case 3[Verify back arrow when user login on latest topic page]');
                utils.info('Case 4[Verify with sorting options like latest/new/top by the post listing page from home page]');
        }).waitForSelector('a[href="/post/printadd"]', function(){
                forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
        }).waitForText(backArrowJSON.topicListingPage.Text, function(){
                //checked from new link from latest topic page
                this.test.assertExists('div#topics div form div div:nth-child(2) ul li:nth-child(2) a', 'new link found on latest topic page');
                this.click('div#topics div form div div:nth-child(2) ul li:nth-child(2) a');
        }).waitForSelector('div#topics div form div div:nth-child(2) ul li:nth-child(2) a', function(){
                this.test.assertExists('form[name="posts"] a.topic-title');
                this.click('form[name="posts"] a.topic-title');
        }).waitForSelector('a#backArrowPost', function(){
                this.test.assertExists('a#backArrowPost', 'back-arrow found on postlistingPage');
                this.click('a#backArrowPost');
        }).waitForText(backArrowJSON.topicListingPage.Text1, function(){
                // checked top button on topiclistingPage
                this.test.assertExists('div#topics div form div div:nth-child(2) ul li:nth-child(3) a', 'top link found on topicListingPage');
                this.click('div#topics div form div div:nth-child(2) ul li:nth-child(3) a');
        }).waitForSelector('div#topics div form div div:nth-child(2) ul li:nth-child(3) a', function(){
                this.test.assertExists('form[name="posts"] a.topic-title');
                this.click('form[name="posts"] a.topic-title');
        }).waitForSelector('a#backArrowPost', function(){
                this.test.assertExists('a#backArrowPost', 'back-arrow found on postlistingPage');
                this.click('a#backArrowPost');
        }).waitForText(backArrowJSON.topicListingPage.Text2);
};

//back-arrow cases of start-new topic
//"Verify with Start new topic on topic listing page and than cancel it"
//verify back-arrow on forumListingpage
backArrowTests.startNewtopicPage = function() {
        casper.thenOpen(config.url, function(){
                utils.info('Case 5[Verify with Start new topic on topic listing page and than cancel it]');
        }).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
                this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
                this.evaluate(function() {
                        document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
                });
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend('General');
        }).waitForSelector('span.topic-content h4 a', function(){
                this.evaluate(function() {
		  document.querySelector('div#ajax_subscription_vars a').click();
		});
        }).waitForSelector('div.post-body.pull-left', function(){
                this.test.assertExists('button#cancel_post', 'cancel button found on start new topic Page');
                this.click('button#cancel_post');
        }).waitForText(backArrowJSON.topicListingPage.Text, function(){
                this.test.assertExists('a#back_arrow_topic');
                this.click('a#back_arrow_topic');
        }).waitForText(deletePostJSON.categoryName.category);
};

//Verify back-arrow on profilePage
//Verify back arrow with profile page for topic to post listing page after reply a post
//Verify back arrow with profile page for topic to category listing page
backArrowTests.profilePage = function() {
        casper.thenOpen(config.url, function(){
                utils.info('Case 6[Verify back arrow with profile page for topic to post listing page ]');
        }).waitForSelector('ul.nav.pull-right span.caret', function(){
                this.click('ul.nav.pull-right span.caret');
                this.evaluate(function() {
                        document.querySelector('a#user-nav-panel-profile').click();
                });
        }).waitForSelector('a#PostsOFUser', function(){
                this.test.assertExists('a#Topics_Started', 'topic started tab found on profilePage');
                this.click('a#Topics_Started');
        }).waitForSelector('a#Topics_Started', function(){
                this.test.assertExists('div#feed-main div.pull-left.post-body-wrapper a', 'topics found on profilepage');
                this.click('div#feed-main div.pull-left.post-body-wrapper a');
        }).waitForSelector('a#backArrowPost i', function(){
                //post a reply on a topic
                this.evaluate(function() {
                        document.querySelector('a#sub_post_reply').click();
                });
                this.waitForSelector('i.mce-ico.mce-i-image', function(){
                        casper.withFrame('message_ifr', function(){
                                casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
                                casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
                                casper.sendKeys('#tinymce', backArrowJSON.postReply.backarrowPostReply );
                        });
                }).then(function(){
                        this.test.assertExists('input[name="submitbutton"]');
                        this.click('input[name="submitbutton"]');
                }).waitForText(backArrowJSON.postReply.backarrowPostReply, function(){
                        this.click('a#backArrowPost i');
                }).waitForSelector('a#PostsOFUser', function(){
                        this.click('a#PostsOFUser');
                }).waitForSelector('a#PostsOFUser', function(){
                        this.test.assertExists('div#feed-main div:nth-child(1) div div span:nth-child(2)  a', 'topics found on profilepage');
                        this.click('div#feed-main div:nth-child(1) div div span:nth-child(2)  a');
                }).waitForSelector('a#backArrowPost i', function(){
                        this.click('a#backArrowPost i');
                //Verify back arrow with profile page for posts to category listing page
                }).waitForSelector('a#PostsOFUser', function(){
                        this.test.assertExists('span[id^="inTheCategory_"] a', 'in profilepage category name is available');
                        this.click('span[id^="inTheCategory_"] a');
                }).waitForSelector('a#back_arrow_topic i', function(){
                        this.click('a#back_arrow_topic i');
                }).waitForSelector('a#PostsOFUser', function(){
                        this.test.assertExists('span[id^="inTheCategory_"] a', 'in profilepage category name is available');
                        this.click('span[id^="inTheCategory_"] a');
                }).waitForSelector('div#ajax_subscription_vars a', function(){
                        this.click('div#ajax_subscription_vars a');
                }).waitForSelector('div.post-body.pull-left', function(){
                        topicMethod.createTopic(topicJSON.ValidCredential);
                }).waitForSelector('a#backArrowPost i', function(){
                        this.click('a#backArrowPost i');
                }).waitForText(backArrowJSON.topicListingPage.Text, function(){
                        //verify using cancel button
                        this.test.assertExists('div#ajax_subscription_vars a', 'start new topic button found under-category page');
                        this.click('div#ajax_subscription_vars a');
                }).waitForSelector('div.post-body.pull-left', function(){
                        this.test.assertExists('button#cancel_post', 'cancel button found after clicked on start new topic button');
                        this.click('button#cancel_post');
                }).waitForText(backArrowJSON.topicListingPage.Text);
        });
};

//Followed Content
//Verify back arrow with followed content to post listing page
//followed category also
backArrowTests.followedContentPage = function() {
        casper.thenOpen(config.url, function(){
                utils.info('Case 7[Verify back arrow with follwed content to post listing page ]');
        }).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
                this.click('ul.nav.nav-tabs li:nth-child(2) a');
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend(backArrowJSON.backArrowCategory.title);
        }).waitForSelector('a#back_arrow_topic i',function(){
                this.test.assertExists('a#submenu_follow_forum i');
		this.click('a#submenu_follow_forum i');
		this.wait(1000, function(){});
        }).then(function(){
                this.evaluate(function() {
                        document.querySelector('span.pull-right.user-nav-panel li:nth-child(5) a').click();
                });
        }).waitForSelector('a#anchor_tab_thread_subscriptions', function(){
                this.click('span.topic-content h4 a');
        }).waitForSelector('a#backArrowPost i', function(){
                //post a reply on a topic
                this.evaluate(function() {
                        document.querySelector('a#sub_post_reply').click();
                });
                this.waitForSelector('i.mce-ico.mce-i-image', function(){
                        casper.withFrame('message_ifr', function(){
                                casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
                                casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
                                casper.sendKeys('#tinymce', backArrowJSON.postReply.backarrowPostReply );
                        });
                }).then(function(){
                        this.test.assertExists('input[name="submitbutton"]');
                        this.click('input[name="submitbutton"]');
                }).waitForText(backArrowJSON.postReply.backarrowPostReply, function(){
                        this.click('a#backArrowPost i');
                }).waitForSelector('a#anchor_tab_thread_subscriptions', function(){
                        this.test.assertSelectorHasText('h2.pull-left', 'Followed Content');
                }).then(function(){
                        //verifyed followed category Page
                        this.test.assertExists('a#anchor_tab_forum_subscriptions', 'categories link found on followed content Page');
                        this.click('a#anchor_tab_forum_subscriptions');
                }).waitForSelector('span.forum-title', function(){
                        this.click('span.forum-title');
                }).waitForSelector('a#back_arrow_topic i', function(){
                        this.click('a#back_arrow_topic i');
                }).waitForSelector('span.forum-title', function(){
                        this.test.assertSelectorHasText('span.forum-title', 'backArrowCategory');
                }).then(function(){
                        forumLoginMethod.logoutFromApp();
                });
        });
};

//Verify back arrow with lock option on topic listing page
//Verify same case with subcategory
//Verify back arrow with unlock option on topic listing page, postlistingPage
backArrowTests.lockcategorySubcategory = function() {
        casper.thenOpen(config.url, function(){
                utils.info('Case 8[Verify back arrow with lock option on topic listing page]');
                forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
        }).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
                this.click('ul.nav.nav-tabs li:nth-child(2) a');
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend('General');
        }).waitForSelector('a#back_arrow_topic i', function(){
                this.click('form[name="posts"] a.topic-title');
        }).waitForSelector('a#sub_post_reply', function(){
                this.test.assertExists('div.dropdown a');
                this.click('div.dropdown a');
                this.test.assertExists('div.topic-tools.pull-right ul a');
                this.click('div.topic-tools.pull-right ul a');
        }).waitForSelector('div.alert.alert-warning.text-center', function(){
		this.test.assertSelectorHasText('div.alert.alert-warning.text-center', 'This topic is locked. No new replies will be accepted.');
                this.test.assertExists('a#backArrowPost i');
                this.click('a#backArrowPost i');
        }).waitForSelector('a#back_arrow_topic i', function(){
                this.click('a#back_arrow_topic i');
        }).waitForText(backArrowJSON.backArrowCategory.title, function(){
                deletePostMethod.getCategoryHrefFrontend(backArrowJSON.backArrowCategory.title);
        }).waitForSelector('div#ajax_subscription_vars a', function(){
                this.evaluate(function() {
		  document.querySelector('div#ajax_subscription_vars a').click();
		});
        }).then(function(){
                topicMethod.createTopic(topicJSON.ValidCredential);
        }).waitForText(topicJSON.ValidCredential.content, function(){
                this.test.assertExists('a#backArrowPost i');
                this.click('a#backArrowPost i');
        }).waitForSelector('a#back_arrow_topic i');
};

//Verify back arrow with pin option on topic listing page
backArrowTests.pincategorySubcategory = function() {
        casper.thenOpen(config.url, function(){
                utils.info('Case 10[Verify back arrow with pin option on topic listing page]');
        }).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend(backArrowJSON.backArrowCategory.title);
        }).waitForSelector('a#subcategories_tab', function(){
                this.test.assertExists('span.forum-title');
                this.click('span.forum-title');
        }).waitForSelector('div#ajax_subscription_vars a', function(){
                this.evaluate(function() {
                  document.querySelector('div#ajax_subscription_vars a').click();
                });
        }).then(function(){
                topicMethod.createTopic(backArrowJSON.ValidCredentialSubCategory);
        }).waitForText(backArrowJSON.ValidCredentialSubCategory.content, function(){
                this.test.assertExists('div.dropdown a');
                this.click('div.dropdown a');
        }).then(function(){
                this.test.assertExists('div.topic-tools.pull-right ul a');
                this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
                this.wait(1000, function(){});
        }).waitForSelector('a#backArrowPost i', function(){
                this.test.assertExists('a#backArrowPost i');
                this.click('a#backArrowPost i');
        }).waitForSelector('span.topic-content h4 span.badge.pin', function(){
                this.test.assertExists('a#back_arrow_topic i');
                this.click('a#back_arrow_topic i');
        }).waitForText(backArrowJSON.backArrowSubCategory.title, function(){
                //deletePostMethod.getCategoryHrefFrontend(backArrowJSON.backArrowCategory.title);
        }).waitForSelector('a#topics_tab', function(){
                //checked under sub-category.
                this.click('a#topics_tab');
        }).waitForSelector('span.topic-content h4 a', function(){
                this.click('span.topic-content h4 a');
        }).waitForSelector('div.dropdown a', function(){
                this.click('div.dropdown a');
        }).then(function(){
                this.test.assertExists('div.topic-tools.pull-right ul a');
                this.click('div.topic-tools.pull-right ul li:nth-child(3) a');
                this.wait(1000, function(){});
        }).waitForSelector('a#backArrowPost i', function(){
                this.test.assertExists('a#backArrowPost i');
                this.click('a#backArrowPost i');
        }).waitForSelector('span.topic-content h4 span.badge.pin', function(){
                this.test.assertExists('a#back_arrow_topic i');
                this.click('a#back_arrow_topic i');
        }).waitForText(backArrowJSON.backArrowCategory.title);
};

//Verify back arrow with delete option on topic listing page
//Verify back arrow with delete option on post listing page
backArrowTests.UnpincategorySubcategory = function() {
        casper.thenOpen(config.url, function(){
                utils.info('Case 11[Verify back arrow with Unpin option on topic listing page]');
                utils.info('Case 12[Verify back arrow with delete option on topic listing page]');
        }).waitForSelector('a[href="/post/printadd"]', function(){
                this.test.assertExists('span.badge.pin');
                this.test.assertExists('input[name="id"]');
                this.click('input[name="id"]');
        }).then(function(){
                this.test.assertExists('i.icon.glyphicon-pushpin');
                this.click('i.icon.glyphicon-pushpin');
                this.test.assertExists('a#unpin');
                this.click('a#unpin');
        }).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
        }).waitForSelector('a[href="#forums"]', function(){
                deletePostMethod.getCategoryHrefFrontend(backArrowJSON.backArrowCategory.title);
        }).waitForSelector('span.forum-title', function(){
                this.click('span.forum-title');
        }).waitForSelector('span.topic-content h4 a', function(){
                this.click('span.topic-content h4 a');
        }).waitForSelector('a#backArrowPost i', function(){
                this.test.assertExists('a#backArrowPost i');
                this.click('a#backArrowPost i');
        }).waitForText(backArrowJSON.backArrowCategory.title, function(){
                this.test.assertExists('a#back_arrow_topic i');
                this.click('a#back_arrow_topic i');
        }).waitForSelector('a#topics_tab', function(){
                this.click('a#topics_tab');
        }).waitForSelector('span.topic-content h4 a', function(){
                this.click('span.topic-content h4 a');
        }).waitForSelector('a#backArrowPost i', function(){
                utils.info('delete performed on postListingpage');
                this.test.assertExists('input#firstpid', 'checkbox present on undercategory topics');
                this.evaluate(function() {
                        document.querySelector('input#firstpid').click();
                });
        }).waitForSelector('input#deleteposts', function(){
		this.click('input#deleteposts');
        }).waitForSelector('a#back_arrow_topic i', function(){
                this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
                this.evaluate(function() {
                        document.querySelector('input[name="id"]').click();
                });
        }).waitForSelector('a#delete', function(){
                this.click('a#delete');
                this.wait(1000, function(){});
        }).then(function(){
                this.click('a#back_arrow_topic i');
        }).waitForText(backArrowJSON.backArrowCategory.title, function(){
                forumLoginMethod.logoutFromApp();
        });
};
