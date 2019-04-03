var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var composeTopicJSON=require('../../testdata/composeTopic.json');
var followPinLockJSON = require('../../testdata/followpinlock.json');
var pollJSON = require('../../testdata/poll.json');
var topicJSON = require('../../testdata/topic.json');
var addPollJSON = require('../../testdata/addPoll.json');
var utils = require('../utils.js');
var addPollMethod = require('../methods/addPoll.js');
var moderatorPermissionsMethod = require('../methods/moderatorPermissions.js');
var deletePostMethod = require('../methods/deletePost.js');
var forumLoginMethod = require('../methods/login.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var pollMethod = require('../methods/poll.js');
var composeTopicMethod=require('../methods/composeTopic.js');
var profilePageMethod= require('../methods/profilePage.js');
var topicMethod = require('../methods/topic.js');
var addPollTests=module.exports = {};

addPollTests.createCategoryTestCase = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' * Method to create category and sub category *');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		try{
                        this.test.assertTextExist(addPollJSON.addPollCategory.title, 'category found on category page');
                }catch(e){
			casper.then(function(){
		        	backEndForumRegisterMethod.createCategory(addPollJSON.addPollCategory);
				this.reload(function() {
					this.waitForText(addPollJSON.addPollCategory.title, function(){
						backEndForumRegisterMethod.createCategorySubcategory(addPollJSON.addPollCategory.title, addPollJSON.addPollSubcategory);
					});
				});
			});
                }
	});
};

//login with moderator
//Create  a poll in a topic by providing data in all the fields.When Post Poll option is enabled in backend.
//To verify preview poll button in case when all the fields are left blank.
addPollTests.createPollShieldIcon=function(){
	casper.thenOpen(config.url, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 1["Create  a poll in a topic by providing data in all the fields When Post Poll option is enabled in backend."]');
		forumLoginMethod.loginToApp(followPinLockJSON.moderatorLogin.username, followPinLockJSON.moderatorLogin.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.newTopic);
	}).waitForText(topicJSON.newTopic.content, function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span','shield icon found on postListingPage');
                this.click('div.topic-tools.pull-right div.dropdown a span');
        }).then(function(){
                this.test.assertExists('div.topic-tools.pull-right ul li:last-child a');
		this.click('div.topic-tools.pull-right ul li:last-child a');
        }).waitForSelector('input#poll_question', function(){
		//checked preview button on add poll page
		this.test.assertExists('button#pollPreviewSbt','poll preview button ');
		this.click('button#pollPreviewSbt');
	}).then(function(){
        	pollMethod.createPoll(pollJSON.pollData);
        }).waitForText('Vote', function() {
        	this.test.assertExists('a#backArrowPost i', 'back arrow icon found on postListingPage');
        	this.click('a#backArrowPost i');
        }).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('span.mod.icons i.glyphicon.glyphicon-stats', 'data-original-title');
		this.test.assertEquals(message, pollJSON.pollInfo.pollMgs, 'both the text are equal');
	});
};


//To verify to create a poll on a topic without adding poll options. When Post Poll option is enabled in backend.
//verify multiple error message
addPollTests.checkShieldIconPostListingPage=function(){
	casper.thenOpen(config.url, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 2["To verify to create a poll on a topic without adding poll options.When Post Poll option is enabled in backend."]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
                this.click('form[name="posts"] a.topic-title');
        }).waitForSelector('span#editableSubject', function(){
		//delete poll functionality covered here for moderator
            	this.test.assertExists('div.panel-heading div div i','polled topic found on postlistingPage');
        	this.click('div.panel-heading div div i');
        	this.click('a#delete_poll');
        	this.wait(1000, function(){});
        }).waitForSelector('div.topic-tools.pull-right div.dropdown a', function(){
        	this.test.assertExists('div.topic-tools.pull-right div.dropdown a span','shield icon found on postListingPage');
                this.click('div.topic-tools.pull-right div.dropdown a span');
        }).then(function(){
                this.test.assertExists('div.topic-tools.pull-right ul li:last-child a');
		this.click('div.topic-tools.pull-right ul li:last-child a');
        }).waitForSelector('input#poll_question', function(){
        	this.sendKeys('#poll_question', pollJSON.pollData.pollQuestion);
		this.sendKeys('#public', pollJSON.pollData.votecheckbox);
		this.sendKeys('#multiple', pollJSON.pollData.multiplechoicebox);
        }).then(function(){
		this.test.assertExists('button#save_poll','save poll button found on post-poll page');
		this.click('button#save_poll', 'save button clicked');
	}).waitForText(pollJSON.pollErrorMessage.errorMessage1, function(){
        	this.sendKeys('#poll_question', "", { reset: true});
        	this.sendKeys('#public', pollJSON.pollData.votecheckbox);
		this.sendKeys('#multiple', pollJSON.pollData.multiplechoicebox);
		this.sendKeys('span#poll_option_1 div input',pollJSON.pollData.option1);
		this.sendKeys('span#poll_option_2 div input',pollJSON.pollData.option2);
        }).then(function(){
        	this.test.assertExists('#save_poll', 'save poll button found on forum');
        	this.click('#save_poll');
        }).wait(1000, function(){
        	var message=this.getElementAttribute('input#poll_question', 'data-original-title');
		this.test.assertEquals(message, pollJSON.expectedTooltip.tooltipErrorMsg, 'both the actual and expected error messsages are equal');
		this.wait(1000, function(){});
        }).then(function(){
        	this.sendKeys('#poll_question', pollJSON.pollData.pollQuestion);
		this.sendKeys('#public', pollJSON.pollData.votecheckbox);
		this.sendKeys('#multiple', pollJSON.pollData.multiplechoicebox);
		this.sendKeys('span#poll_option_1 div input',pollJSON.pollData.option1);
	}).waitForText(pollJSON.pollErrorMessage.errorMessage);
};

//To verify preview poll button in case when all the fields are left blank.
addPollTests.checkVotingTimeout=function(){
	casper.thenOpen(config.url, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 6["To verify to create a poll on a topic with poll time out."]');
		utils.info(' Case 12[To verify option Edit]');
		utils.info(' Case 13[To verify Delete poll]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
                this.click('form[name="posts"] a.topic-title');
        }).waitForSelector('span#editableSubject', function(){
        	this.test.assertExists('div.topic-tools.pull-right div.dropdown a span','shield icon found on postListingPage');
                this.click('div.topic-tools.pull-right div.dropdown a span');
        }).then(function(){
                this.test.assertExists('div.topic-tools.pull-right ul li:last-child a');
		this.click('div.topic-tools.pull-right ul li:last-child a');
        }).waitForSelector('button#pollPreviewSbt', function(){
        	this.sendKeys('#poll_question', pollJSON.pollData.pollQuestion);
        	this.sendKeys('#public', pollJSON.pollData.votecheckbox);
		this.sendKeys('#multiple', pollJSON.pollData.multiplechoicebox);
		this.sendKeys('span#poll_option_1 div input',pollJSON.pollData.option1);
		this.sendKeys('span#poll_option_2 div input',pollJSON.pollData.option2);
        }).then(function(){
		this.test.assertExists('a[href="#poll-timeout"] small', 'edit poll time out selector found on addPoll Page');
		this.click('a[href="#poll-timeout"] small');
        }).then(function(){
		this.click('input#timeout2');
		var date = casper.evaluate(function() {
			var today = new Date();
	    		var tomorrow = new Date(today);
	    	tomorrow.setDate(today.getDate()+4);
	    	if(today.getDate() > 28) {
			tomorrow.setMonth(today.getMonth()+1);
	    	}
			var day = tomorrow.getDate();
			var month = tomorrow.getMonth()+1;
			var year = tomorrow.getFullYear();
			var bdaydate = month + "/" + day + "/" + year;
			return bdaydate;
		});
		utils.info('date ='+date);
		casper.sendKeys('input#poll_timeout_date', date, {reset : true});
		this.click('button#save_poll', 'save button clicked');
	}).waitForText('Vote', function(){
		this.test.assertExists('a#backArrowPost i', 'back arrow icon found on postListingPage');
        	this.click('a#backArrowPost i');
        }).waitForSelector('form[name="posts"] a.topic-title', function(){
		var message=this.getElementAttribute('span.mod.icons i.glyphicon.glyphicon-stats', 'data-original-title');
		this.test.assertEquals(message, pollJSON.pollInfo.pollMgs, 'both the text are equal');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#editableSubject', function(){
		//editPoll and deletePoll scenario already covered here
		this.test.assertExists('div.panel-heading div div i','polled topic found on postlistingPage');
		this.evaluate(function() {
			document.querySelector('div[id^="post_list_"] div:nth-child(2) div ul  li a').click();
		});
        }).waitForSelector('#poll_question', function(){
        	this.sendKeys('#poll_question', "newPoll", { reset: true});
        	this.wait(1000, function(){});
        }).then(function(){
		this.click('button[name="pollsave"]');
        }).waitForText('newPoll', function(){
		this.test.assertExists('div.panel-heading div div i','polled topic found on postlistingPage');
        	this.click('div.panel-heading div div i');
        	this.click('a#delete_poll');
        	this.wait(1000, function(){});
        }).waitForSelector('a[href^="/profile/"]', function(){
        	this.test.assertTextDoesntExist('newPoll', 'Text not found on postListingPage');
        });
};


//verify with add  poll by leaving the blank topic page
//verify with add  poll by leaving the blank title text in topic page
//verify with add  poll by leaving the blank content text in topic page
//verify with add  poll by without select any category in topic page
//verify with add  poll from Start new topic.(alredy covered in inContextLogin.).
addPollTests.verifyPollErrorMessageStartTopic=function(){
	casper.thenOpen(config.url, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 15[Verify with add  poll by leaving the blank topic page]');
		utils.info(' Case 16[Verify with add  poll by leaving the blank title text in topic page]');
		utils.info(' Case 17[Verify with add  poll by leaving the blank content text in topic page]');
		utils.info(' Case 18[verify with add  poll by without select any category in topic page]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function(){
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		this.test.assertExists('a[href="#poll"]', 'add poll button found on startNewTopic');
		this.click('a[href="#poll"]');
	}).waitForSelector('a[href="#poll"]', function(){
		pollMethod.createPoll(pollJSON.pollData);
	//check with blank data
	}).waitForText(addPollJSON.CheckPollErrorMsgStartTopic.errorMessage, function(){
		addPollMethod.createTopic(addPollJSON.withoutTitleTopic);
	}).then(function(){
		this.click('a[href="#poll"]');
	}).waitForSelector('a[href="#poll"]', function(){
		pollMethod.createPoll(pollJSON.pollData);
	//checked without title
	}).waitForText(addPollJSON.CheckPollErrorMsgStartTopic.errorMessage, function(){
		addPollMethod.createTopic(addPollJSON.withoutContentTopic);
	}).then(function(){
		this.click('a[href="#poll"]');
	}).waitForSelector('a[href="#poll"]', function(){
		pollMethod.createPoll(pollJSON.pollData);
	//checked without content
	}).waitForText(checkErrorMsgWithoutContent, function(){
		addPollMethod.createTopic(addPollJSON.withoutCategoryTopic);
	}).then(function(){
		this.click('a[href="#poll"]');
	}).waitForSelector('a[href="#poll"]', function(){
		pollMethod.createPoll(pollJSON.pollData);
	//checked without category
	}).waitForText(addPollJSON.checkErrorMsgWithoutCategory.errorMessage);
};


//Create a poll in a subcategory.
addPollTests.createPollSubcategory=function(){
	casper.thenOpen(config.url, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 22[Create a poll in a subcategory.]');
		//forumLoginMethod.loginToApp(followPinLockJSON.moderatorLogin.username, followPinLockJSON.moderatorLogin.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('addPollCategory');
	}).waitForSelector('span.forum-title', function(){
		this.click('span.forum-title');
	}).waitForSelector('div#ajax_subscription_vars a', function(){
		this.click('div#ajax_subscription_vars a');
	}).waitForSelector('a[href="#poll"]', function(){
		this.click('a[href="#poll"]');
	}).waitForSelector('a[href="#poll"]', function(){
		addPollMethod.addPollStartTopic(pollJSON.pollData);
	}).then(function(){
		this.click('a[href="#topic-details"]');
	}).then(function(){
		topicMethod.createTopic(addPollJSON.addpollTopic);
	}).waitForText('Vote', function(){
		//check poll topic
		this.test.assertTextExist(addPollJSON.addpollTopic.category);
	}).then(function(){
		//check back arrow icon using moderator user login
		this.test.assertExists('a#backArrowPost', 'back arrow present on postlisting page under-category');
		this.click('a#backArrowPost');
	}).waitForSelector('span.topic-content', function(){
		this.test.assertExists('span.topic-content', 'Topics found on topiclistingPage');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

addPollTests.addPollWithOtherUserTopic=function(){
	casper.thenOpen(config.url, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 23[Verify when enable Add Poll  for moderator from group Permission, verify able to add poll to other users post]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function(){
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.newTopic);
	}).waitForText(topicJSON.newTopic.content, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(followPinLockJSON.moderatorLogin.username, followPinLockJSON.moderatorLogin.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertExists('div.topic-tools.pull-right div.dropdown a span','shield icon found on postListingPage');
		this.click('div.topic-tools.pull-right div.dropdown a span');
	}).then(function(){
		this.test.assertExists('div.topic-tools.pull-right ul li:last-child a');
		this.click('div.topic-tools.pull-right ul li:last-child a');
	}).waitForSelector('input#poll_question', function(){
		pollMethod.createPoll(pollJSON.pollData);
	}).waitForText('Vote', function() {
		this.test.assertExists('a#backArrowPost i', 'back arrow icon found on postListingPage');
        	this.click('a#backArrowPost i');
        }).waitForSelector('form[name="posts"] a.topic-title', function(){
		//Verify icon when  Poll is being added latesttopicpage
		this.test.assertExists('span.mod.icons i.glyphicon.glyphicon-stats', 'poll icon found on latesttopicpage');
		var message=this.getElementAttribute('span.mod.icons i.glyphicon.glyphicon-stats', 'data-original-title');
		this.test.assertEquals(message, pollJSON.pollInfo.pollMgs, 'both the text are equal');
	});
};

//Verify when Disable Add Poll  for moderator from group Permission
addPollTests.disableAddPollFromModeratorPage=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 24[Verify when disable Add Poll  for moderator from group Permission, verify able to add poll to other users post]');
		utils.info(' Case 25[Verify when disable Edit Poll  for moderator from group Permission, verify able to add poll to other users post]');
		utils.info(' Case 26[Verify when disable Delete Poll  for moderator from group Permission, verify able to add poll to other users post]');
		utils.info(' Case 1[Verify disable addPoll on latestTopicPage]');
        	backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
		casper.mouse.move('li div.select');
		this.test.assertExists('a.moderateAction', 'moderator dropdown found on categorylistingPage');
		this.click('a.moderateAction');
	}).then(function(){
		this.test.assertExists('div.tooltipMenu.forumModeratorbutton a:nth-child(3)', 'moderator dropdown open and clicked on moderator');
		this.click('div.tooltipMenu.forumModeratorbutton a:nth-child(3)');
	}).waitForSelector('input[name="usertitle"]', function(){
		addPollMethod.enableDisableModeratorPermission('l', 'm', 'n', false);
	}).then(function(){
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
	                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	                this.click('a[href="/tool/members/mb/usergroup"]');
		}).waitForSelector('div#tab_wrapper', function(){
	        	backEndForumRegisterMethod.viewGroupPermissions('Moderators');
		}).waitForText('Save', function(){
			backEndForumRegisterMethod.editGroupPermissions('Moderators', 'post_polls', false);
		});
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('a[href="/tool/members/mb/settings?tab=General"]');
		}).waitForSelector('button.button.btn-m.btn-blue', function(){
			backEndForumRegisterMethod.enableDisablePollsGeneralPage(false);
		}).then(function(){
			casper.thenOpen(config.url, function(){
				//forumLoginMethod.loginToApp(followPinLockJSON.moderatorLogin.username, followPinLockJSON.moderatorLogin.password);
				this.waitForSelector('form[name="posts"] a.topic-title', function(){
					this.test.assertDoesntExist('span.mod.icons i.glyphicon.glyphicon-stats','poll selector not visible on latesttopicpage');
				}).then(function(){
					this.click('form[name="posts"] a.topic-title');
				}).waitForSelector('span#editableSubject', function(){
					//verified the edit button and the delete button on postlistingpage
					this.test.assertDoesntExist('div[id^="post_list_"] div:nth-child(2) div ul  li a', 'Edit poll button not found on postlistingPage');
					this.test.assertDoesntExist('a#delete_poll', 'delete button not found postListingPage');
					this.wait(1000, function(){});
				}).then(function(){
					this.test.assertExists('a#links-nav i');
					this.click('a#links-nav i');
					this.test.assertExists('li#latest_topics_show a','title present on forum');
					this.click('li#latest_topics_show a');
				}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
					var index=2;
					addPollMethod.gettopicId('a[id^="topic_"]', index);
				}).waitForSelector('span#editableSubject', function(){
					//check add poll under dropdown
					this.test.assertDoesntExist('div.topic-tools.pull-right div.dropdown a span','shield icon found on postListingPage');
				}).then(function(){
					this.test.assertTextDoesntExist('Add Poll', 'Add poll option didnt found on postlistingPage');
				});
			});
		});
	});
};

//Verify when enable Add Poll  for moderator from group Permission, verify able to add poll to other users post
//Verify when enable Edit Poll  for moderator from group Permission, verify able to add poll to other users post
//Verify when enable Delete Poll  for moderator from group Permission, verify able to add poll to other users post
addPollTests.enableAddPollFromModeratorPage=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 27[Verify when disable Add Poll  for moderator from group Permission, verify able to add poll to other users post]');
		utils.info(' Case 28[Verify when disable Edit Poll  for moderator from group Permission, verify able to add poll to other users post]');
		utils.info(' Case 29[Verify when disable Delete Poll  for moderator from group Permission, verify able to add poll to other users post]');
        	backEndForumRegisterMethod.goToCategoryPage();
        }).then(function(){
		casper.mouse.move('li div.select');
		this.test.assertExists('a.moderateAction', 'moderator dropdown found on categorylistingPage');
		this.click('a.moderateAction');
	}).then(function(){
		this.test.assertExists('div.tooltipMenu.forumModeratorbutton a:nth-child(3)', 'moderator dropdown open and clicked on moderator');
		this.click('div.tooltipMenu.forumModeratorbutton a:nth-child(3)');
	}).waitForSelector('input[name="usertitle"]', function(){
		addPollMethod.enableDisableModeratorPermission('l', 'm', 'n', true);
	}).then(function(){
		//added test for latestTopicPage
		casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('a[href="/tool/members/mb/settings?tab=General"]');
		}).waitForSelector('button.button.btn-m.btn-blue', function(){
			backEndForumRegisterMethod.enableDisablePollsGeneralPage(true);
		});
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
	                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	                this.click('a[href="/tool/members/mb/usergroup"]');
		}).waitForSelector('div#tab_wrapper', function(){
	        	backEndForumRegisterMethod.viewGroupPermissions('Moderators');
		}).waitForText('Save', function(){
			backEndForumRegisterMethod.editGroupPermissions('Moderators', 'post_polls', true);
		});
	}).then(function(){
		casper.thenOpen(config.url, function(){
			this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
				var index=2;
				addPollMethod.gettopicId('a[id^="topic_"]', index);
			}).waitForSelector('span#editableSubject', function(){
				//check add poll under dropdown
				this.test.assertExists('div.topic-tools.pull-right div.dropdown a span','shield icon found on postListingPage');
				this.click('div.topic-tools.pull-right div.dropdown a span');
			}).then(function(){
				this.test.assertTextExists('Add Poll', 'Add poll option didnt found on postlistingPage');
			});
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//To verify vote now button.
addPollTests.verifyVoteButtonRegister=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 30[To verify vote now button.]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
	        this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	        this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
	        backEndForumRegisterMethod.viewGroupPermissions('General');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('General', 'vote_on_polls', true);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('input[name="pollvotesave"]', function(){
		//case -validate error message
		//To verify vote now button without selecting any poll option.
		this.click('input[name="pollvotesave"]');
	}).waitForText(addPollJSON.verifyErrorMsgPoll.msg, function(){
		this.click('button[data-dismiss="modal"]');
	}).then(function(){
		this.click('input[name="vote_option"]','clicked on vote options radio button');
	}).then(function(){
		this.click('input[name="pollvotesave"]', 'clicked on vote button');
	}).waitForText(addPollJSON.checkMessageVotedTopic.message, function(){
		//also checked 6th same msg under subcategory
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
		deletePostMethod.getCategoryHrefFrontend('addPollCategory');
	}).waitForSelector('span.forum-title', function(){
		this.click('span.forum-title');
	}).waitForSelector('span.topic-content', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('input[name="pollvotesave"]', function(){
		this.click('input[name="vote_option"]','clicked on vote options radio button');
	}).then(function(){
		this.click('input[name="pollvotesave"]', 'clicked on vote button');
	}).waitForText(addPollJSON.checkMessageVotedTopic.message, function(){
		//check back arrow icon using register user
		this.test.assertExists('a#backArrowPost', 'back arrow present on postlisting page under-category');
		this.click('a#backArrowPost');
	}).waitForSelector('span.topic-content', function(){
		forumLoginMethod.logoutFromApp();
	});
};

//To verify show results link
addPollTests.showResultLink=function(){
	casper.thenOpen(config.url, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 31[To verify show results link.]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var index=1;
		addPollMethod.gettopicId('a[id^="topic_"]', index);
	}).then(function(){
		this.click('div.poll-vote a', 'clicked on show result links');
	}).waitForSelector('div.poll-results', function(){
		this.test.assertTextExists(addPollJSON.checkVote.message);
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify when disable vote Poll  for Registered user from group Permission
addPollTests.disableVotePoll=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 32[To verify vote now button.]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
	        this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	        this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
	        backEndForumRegisterMethod.viewGroupPermissions('General');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('General', 'vote_on_polls', false);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForText(addPollJSON.disableVoteOption.Msg, function(){
		//add a poll after disable the permission vote for register username
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.evaluate(function(){
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).waitForSelector('a[href="#poll"]', function(){
		this.click('a[href="#poll"]');
	}).waitForSelector('a[href="#poll"]', function(){
		addPollMethod.addPollStartTopic(pollJSON.pollData);
	}).then(function(){
		this.click('a[href="#topic-details"]');
	}).then(function(){
		topicMethod.createTopic(topicJSON.newTopic);
	}).waitForText(addPollJSON.disableVoteOption.Msg);
};

//"Disable 'vote' permission from backend.
//Then add a poll on fron end.
//enabled the vote permission after add a new poll."
addPollTests.disableEnableVotePollCheckError=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('********************************ADD POLL TEST-CASES ********************************************');
		utils.info(' Case 33[enabled the vote permission after add a new poll."]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
	        this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	        this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
	        backEndForumRegisterMethod.viewGroupPermissions('General');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('General', 'vote_on_polls', true);
	}).thenOpen(config.url, function(){
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('input[name="pollvotesave"]', function(){
			this.click('input[name="vote_option"]');
		}).then(function(){
			this.click('input[name="pollvotesave"]');
		}).waitForText(addPollJSON.checkMessageVotedTopic.message);
	});
};
