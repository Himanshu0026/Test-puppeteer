var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var topicsCountJSON = require('../../testdata/topicscount.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var topicJSON = require('../../testdata/topic.json');
var deleteTopicScenarioJSON= require('../../testdata/deleteTopicScenario.json');
var latestTopicJSON = require('../../testdata/latesttopic.json');
var topicMethod = require('../methods/topic.js');
var registerMethod = require('../methods/register.js');
var profilePageMethod= require('../methods/profilePage.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageMethod= require('../methods/profilePage.js');
var deletePostMethod = require('../methods/deletePost.js');
latestTopicTests = module.exports = {};

//user account off case(admin and guest user case)
latestTopicTests.useraccountOnOff = function() {
        casper.then(function(){
		utils.info('Case 1 [user account off case(admin and guest user case)]');
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('a[href="/tool/members/mb/settings?tab=General"]');
		}).waitForSelector('button.button.btn-m.btn-blue', function(){
			backEndregisterMethod.enableDisableUserAccounts(false);
                });
        }).thenOpen(config.url, function(){
                this.waitForSelector('form[name="posts" ] li a', function(){
                        this.test.assertExists('form[name="posts"] a.topic-title', 'topics found on latestTopicpage');
                        this.test.assertTextDoesntExist(latestTopicJSON.Text.msg, 'Log In sign up icon not found on topicListingpage');
                }).thenOpen(latestTopicJSON.adminurlStaging, function(){
                        this.waitForSelector('input.btn.btn-primary', function(){
                                casper.sendKeys('input[name="pass"]', latestTopicJSON.password);
                                casper.click('input[name="Submit"]');
                        }).waitForSelector('a[href="/post/printadd"]', function(){
                                this.test.assertExists('form[name="posts"] a.topic-title', 'topics found on latestTopicpage for admin');
                        });
                });
        }).thenOpen(config.backEndUrl, function(){
                this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('a[href="/tool/members/mb/settings?tab=General"]');
		}).waitForSelector('button.button.btn-m.btn-blue', function(){
			backEndregisterMethod.enableDisableUserAccounts(true);
                });
        });
};

//Check Latest topics when View topic content permission  is OFF register user.
latestTopicTests.viewTopicPermission = function() {
        casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 2[Verify Latest topics when View topic content permission  is OFF register user.]');
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
                        this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
                        this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
                        backEndregisterMethod.viewGroupPermissions('General');
                }).then(function() {
                        backEndregisterMethod.editGroupPermissions('General', 'view_thread_content', false);
                }).then(function(){
                        backEndregisterMethod.viewGroupPermissions('General');
                }).then(function(){
                        backEndregisterMethod.editGroupPermissions('General', 'view_others_threads', false);
                }).thenOpen(config.url, function(){
                        forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
                }).waitWhileVisible('#td_tab_login', function() {
                }).waitForSelector('a[href="/post/printadd"]', function(){
                        this.test.assertTextDoesntExist(latestTopicJSON.topicContent.Text, 'topics text cannot be found on topicslistingpage');
                }).then(function(){
                        forumLoginMethod.logoutFromApp();
                });
        });
};

//Verify Latest topics when View others topic content permission  is OFF register user.
latestTopicTests.viewOtherUsersTopic = function() {
        casper.thenOpen(config.url, function(){
                //created topics from register user (haniuser)
                utils.info('Case 3 [Verify Latest topics when View others topic content permission  is OFF register user.]');
                forumLoginMethod.loginToApp(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password);
        }).waitWhileVisible('#td_tab_login', function() {
        }).waitForSelector('a[href="/post/printadd"]', function(){
                this.test.assertExists('a[href="/post/printadd"]', 'New Topic selector present on forum');
                casper.evaluate(function() {
                	document.querySelector('a[href="/post/printadd"]').click();
                });
        }).then(function(){
                topicMethod.createTopic(latestTopicJSON.ValidCredential);
        }).then(function(){
                this.test.assertExists('a#links-nav i');
        	this.click('a#links-nav i');
        	this.test.assertExists('li#latest_topics_show a','title present on forum');
        	this.click('li#latest_topics_show a');
        }).then(function(){
                forumLoginMethod.logoutFromApp();
        }).thenOpen(config.url, function(){
                forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
        }).waitWhileVisible('#td_tab_login', function() {
        }).waitForSelector('a[href="/post/printadd"]', function(){
                this.test.assertDoesntExist(latestTopicJSON.ValidCredential.title, ' topics cannot be found on topiclistingpage');
        }).thenOpen(config.backEndUrl, function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
                        this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
                        this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
                        backEndregisterMethod.viewGroupPermissions('General');
                }).then(function() {
                        backEndregisterMethod.editGroupPermissions('General', 'view_others_threads', true);
                }).then(function(){
                        backEndregisterMethod.viewGroupPermissions('General');
                }).then(function(){
                        backEndregisterMethod.editGroupPermissions('General', 'view_thread_content', true);
                });
        });
};
