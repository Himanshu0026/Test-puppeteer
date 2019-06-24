/***These are the function which has been called in thumpsUpDownMethod.js and also will be used in other js file as per requirement**********/

'use strict.';
var thumpsUpDownJSON = require('../../testdata/thumpsUpDown.json');
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var registerMethod = require('../methods/register.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var topicMethod = require('../methods/topic.js');
var forumLoginMethod = require('../methods/login.js');
var thumpsUpDownTestcases = module.exports = {};

function deleteCategoriesHandler(i) {
	"use strict";
	return function () {
		backEndForumRegisterMethod.deleteAllCategories();
	};
}

thumpsUpDownTestcases.registrationBackendSetting = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Test case to set up all the backend setting for registration task');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_messageboard', true);
		});
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields"]', function() {
	 this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
	 this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
 	}).waitForText('Default Profile Fields',function() {
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",
		 "visiblity_name_registration" : "Yes",
		 "visiblity_imType_registration" : "Yes", "visiblity_dob_registration" : "Yes",
		 "visiblity_signature_registration" : "Yes", "visiblity_avatar_registration" : "Yes"};
		 backEndForumRegisterMethod.changeDefaultRegistrationOptions(setOptions);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableHumanVerification(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableNewRegistrations(true);
	});
};

// method to register two user neha and isneha
thumpsUpDownTestcases.registerUserTOLogin = function() {
	casper.thenOpen(config.backEndUrl, function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableHumanVerification(false);
	}).eachThen(thumpsUpDownJSON.infoToRegisterUser, function(response) {
		var responseData = response.data;
		registerMethod.registerMember(responseData);
	});
};

// method to create a category General
thumpsUpDownTestcases.createCategoryTestCase = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' * Method to create category and sub category *');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		//backEndForumRegisterMethod.isCategoryExists(thumpsUpDownJSON.category, function(err, isExists) {
			//if(isExists) {
				//utils.info(' Category already existed');
			//} else {
				//utils.info(' Category not exist');
				//casper.then(function() {
					backEndForumRegisterMethod.createCategory(thumpsUpDownJSON.category);
				//});
			//}
		//});
	});
};

// method to delete all the categories from backend
thumpsUpDownTestcases.deleteAllCategoriesTestCase = function() {
	//postTopicUserPermissionTestcases.getToken = function() {
		casper.thenOpen(config.apiLocalUrl+"/qaapi/getToken", function() {
			utils.info('######################');
			// utils.info('The page content '+this.getPageContent());
			// utils.info('the type of '+typeof(this.getPageContent()));
			// var json_string = JSON.parse(this.getPageContent());
			// token = json_string.token;
			token = casper.evaluate(function() {
				var data = document.querySelector(".token").getAttribute('id');
			});
			utils.info('the token id inside the task'+token);
			this.thenOpen(config.apiLocalUrl+"/qaapi/forums/delete?accesToken="+token, function() {
			});
		});
	//};
	// casper.thenOpen(config.backEndUrl, function() {
	// 	backEndForumRegisterMethod.goToCategoryPage();
	// }).waitForSelector('a#addForumButton', function() {
	// 	var totalCategories = casper.evaluate(function(){
	// 		var length = document.querySelectorAll('li a.manageAction').length;
	// 		return length;
	// 	});
	// 	utils.info("The total number of categories"+totalCategories);
	// 	for(i = 0; i<totalCategories; i++){
	// 		casper.then(deleteCategoriesHandler(i));
	// 	}
	// });
};

// method to verify the thumbs up and down for guest user(unregister user)
thumpsUpDownTestcases.unregisterUserOnPostListingPageLikeDislike = function() {
		casper.thenOpen(config.backEndUrl , function() {
		utils.info('CASE 1, 20, 21 and 22 [To verify the thumbs up for guest user(unregister user)]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableLikesReputation(true);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(thumpsUpDownJSON.adminUserLogin.username, thumpsUpDownJSON.adminUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('div#topics a[href="/post/printadd"]', function() {
	  this.test.assertSelectorHasText('div#topics', 'New Topic');
	  this.click('div#topics a[href="/post/printadd"]');
		topicMethod.createTopic(thumpsUpDownJSON.newTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertExists('i.glyphicon.glyphicon-like-alt', 'Like thump found hence verified');
		if (this.visible('i.glyphicon.glyphicon-like-alt')) {
			this.click('i.glyphicon.glyphicon-like-alt');
			this.waitUntilVisible('#login_register_modal', function() {
				this.test.assertExists('span#user-login-modal-heading', utils.info('Login pop up window found hence verified'));
				forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
			}).waitWhileVisible('#td_tab_login', function() {
				this.test.assertExists('button.dropdown-toggle a', 'User logged in successfully');
				forumLoginMethod.logoutFromApp();
			});
		} else {
			utils.error('Like thump not visible');
		}
	}).then(function() {
		this.test.assertExists('i.glyphicon.glyphicon-dislike-alt', 'Dislike thump found hence verified');
		if (this.visible('i.glyphicon.glyphicon-dislike-alt')) {
			this.click('i.glyphicon.glyphicon-dislike-alt');
			this.waitUntilVisible('#login_register_modal', function() {
				this.click(' button#bootstrap_close_register_dialog');
			});
		} else {
			utils.error('Dislike thump not visible');
		}
	});
};

// method to verify try to like/dislike a post of guest user  as a register user
thumpsUpDownTestcases.likeDislikePostOfUnregisteredUserByRegisterUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 2 [To verify the thumbs up for guest user(unregister user) on Topic listing page]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'post_threads', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
	  this.test.assertSelectorHasText('div#topics', 'New Topic');
	  this.click('div#topics a[href="/post/printadd"]');
	}).then(function() {
		topicMethod.createTopic(thumpsUpDownJSON.newTopic);
		this.waitForText('hellloooooo!!!!!!!!!');
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
		thumpsUpDownMethod.clickOnLike();
	}).then(function() {
		thumpsUpDownMethod.clickOnDisLike();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify the thumbs up and down for (register user) on Post listing page
thumpsUpDownTestcases.registerUserOnPostListingPageLike = function(data) {
	casper.thenOpen(config.url, function() {
		utils.info('CASE 3 [To verify the thumbs up and down for (register user) on Post listing page]');
		forumLoginMethod.loginToApp(data.username, data.password);
	}).waitWhileVisible('#td_tab_login', function() {
		thumpsUpDownMethod.clickOnLike();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// Metod To verify the counter of thumbs down
thumpsUpDownTestcases.verifyDecreasedCountAndIncreasedCount = function() {
	casper.then(function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
		utils.info('CASE 11, 10 and 12 [To Verify  with the decreasing order of count]');
		var earlierCount = this.fetchText('span[id^="total_vote_down_count_"]');
		var earlierNumber = parseInt(earlierCount);
		utils.info(' the earlier number = '+earlierNumber);
		var laterCount;
		this.click('i.glyphicon.glyphicon-dislike-alt');
		this.waitForSelector('a.voted-no', function() {
			utils.info('Post disliked by the user');
			laterCount = this.fetchText('span[id^="total_vote_down_count_"]');
			var laterNumber = parseInt(laterCount);
			utils.info(' the later number = '+laterNumber);
			if(earlierNumber + 1 == laterNumber) {
				utils.info(' The count is decreased by 1 after disliked');
			} else {
				utils.error(' The count is not decreased by 1 after disliked');
			}
		});
	}).then(function() {
		var earlierCount = this.fetchText('div.post-options.pull-right span.text-muted a');
		var earlierNumber = parseInt(earlierCount);
		utils.info(' the earlier number = '+earlierNumber);
		var laterCount;
		this.click('i.glyphicon.glyphicon-like-alt');
		this.waitForSelector('a.voted-yes', function() {
			utils.info('Post liked by the user');
			laterCount = this.fetchText('div.post-options.pull-right span.text-muted a');
			var laterNumber = parseInt(laterCount);
			utils.info(' the later number = '+laterNumber);
			if(earlierNumber + 1 == laterNumber) {
				utils.info(' The count is increased by 1 after liked');
			} else {
				utils.error(' The count is not increased by 1 after liked');
			}
		});
	}).then(function() {
		var earlierCount = this.fetchText('div.post-options.pull-right span.text-muted a');
		var earlierNumber = parseInt(earlierCount);
		utils.info(' the earlier number = '+earlierNumber);
		var laterCount;
		this.click('i.glyphicon.glyphicon-like-alt');
		this.waitWhileVisible('a.voted-yes', function() {
			utils.info('Post again liked by the user');
			laterCount = this.fetchText('div.post-options.pull-right span.text-muted a');
			var laterNumber = parseInt(laterCount);
			utils.info(' the later number = '+laterNumber);
			if(earlierNumber == laterNumber + 1) {
				utils.info(' The count is decreased by 1 after liked again');
			} else {
				utils.error(' The count is not decreased by 1 after liked again');
			}
		});
	}).then(function() {
		this.click('i.glyphicon.glyphicon-like-alt');
		this.waitForSelector('a.voted-yes', function() {
			utils.info('Post liked by the user');
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify like/dislike a post of guest user  as a pending email verification user
thumpsUpDownTestcases.emailVerificationUserOnPostListingPage = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('CASE 34 [To verify like/dislike a post of guest user  as a pending email verification user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(true);
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper',function() {
		var user = thumpsUpDownJSON.emailUser.username;
		thumpsUpDownMethod.changeUserGroup(user, 'Pending Email Verification');
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.emailUser.username, thumpsUpDownJSON.emailUser.username);
	}).waitWhileVisible('#td_tab_login', function() {
		this.test.assertExists('form[name="posts"] a.topic-title', ' Topic present');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertDoesntExist('i.glyphicon.glyphicon-like-alt', ' Like thump not found hence verified');
		this.test.assertDoesntExist('i.glyphicon.glyphicon-dislike-alt', ' DisLike thump not found hence verified');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl , function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	});
};

//4. method to verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER
//28. method to verify likers/dislikers list
thumpsUpDownTestcases.clickOnLikersUsername = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 4 [To verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions('General');
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions('General', 'view_profiles', false);
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.otherUser.username, thumpsUpDownJSON.otherUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
		this.test.assertExists('form[name="posts"] a.topic-title', 'Topic present');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertSelectorDoesntHaveText('span[id^="span_total_vote_up_count_"]','0');
		this.click('div.post-options.pull-right span.text-muted a');
	}).waitUntilVisible('ul#who-all', function() {
		this.test.assertSelectorHasText('div#who_liked_dialog h4','People Who Like This');
		this.test.assertAllVisible('#who-all', 'User List visible');
		//this.click('i.who-username');
		this.click('#who-all span.display_name a');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//5. method to verify with click on likers/dislikers username when disable view profile permission ->AS A Moderator
thumpsUpDownTestcases.clickOnLikersUsernameByModerator = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 5 [To verify with click on likers/dislikers username when disable view profile permission ->AS A Moderator]');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		var data = thumpsUpDownJSON.otherUser.username;
		var category = thumpsUpDownJSON.category;
		backEndForumRegisterMethod.addNewModerator(data, category, function(err) {
			if(!err) {
				utils.info('Moderator added successfully');
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.otherUser.username, thumpsUpDownJSON.otherUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
		this.test.assertExists('form[name="posts"] a.topic-title', 'Topic present');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertSelectorDoesntHaveText('span[id^="span_total_vote_up_count_"]','0');
		this.click('div.post-options.pull-right span.text-muted a');
	}).waitUntilVisible('ul#who-all', function() {
		this.test.assertSelectorHasText('div#who_liked_dialog h4','People Who Like This');
		this.test.assertAllVisible('#who-all', 'User List visible');
		this.click('#who-all span.display_name a');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.removeModerator();
	});
};

// method to verify When registered/moderator user click on link of own name from voter list when disable view profile permission
thumpsUpDownTestcases.clickOnOwnName = function() {
	casper.thenOpen(config.url, function() {
		utils.info('CASE 6 [method to verify When registered/moderator user click on link of own name from voter list when disable view profile permission');
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
		this.test.assertExists('form[name="posts"] a.topic-title', 'Topic present');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertSelectorDoesntHaveText('span[id^="span_total_vote_up_count_"]','0');
		this.click('div.post-options.pull-right span.text-muted a');
	}).waitUntilVisible('ul#who-all', function() {
		this.test.assertSelectorHasText('div#who_liked_dialog h4','People Who Like This');
		this.test.assertAllVisible('#who-all', 'User List visible');
		var username = casper.evaluate(function() {
			var user = document.querySelectorAll('#who-all span.display_name a');
			var len = user.length;
			for (i=0; i<=len; i++) {
				var name = user[i].innerHTML;
				var n = name.toString();
				if(n=='neha') {
					user[i].click();
					return"The user found and clicked";
				}
			}
		});
	}).waitForSelector('#memberName', function() {
		this.test.assertSelectorHasText('#memberName','neha');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions('General');
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions('General', 'view_profiles', true);
		});
	});
};

//method To verify the reputation functionality of back end(disable)"
thumpsUpDownTestcases.verifyReputationTab = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('CASE 9 [To verify the reputation functionality of back end(disable)]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableLikesReputation(false);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
		this.click('i.icon.icon-menu');
	}).waitForSelector('li#members_list_show a', function() {
		this.click('li#members_list_show a');
	}).waitForSelector('div.panel-body.table-responsive', function() {
		this.click('div.panel-body.table-responsive a');
	}).waitForSelector('#memberName', function() {
		this.test.assertTextDoesntExist('Reputation', 'Reputation section removed');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl , function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableLikesReputation(true);
	});
};

// Method To verify the colour of like/dislike link
thumpsUpDownTestcases.verifyColour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.url, function() {
		utils.info('CASE 13 [To verify the colour of like/dislike link]');
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						casper.click("a.topic-title");
						wait.waitForElement('div.post-body.pull-left', function(err, isExists) {
							if(isExists) {
								try {
									casper.test.assertExists('a.login_dialog.text-muted.voted-yes', utils.info('the post is already liked by the user'));
									var colour = casper.evaluate(function() {
										//var color = document.querySelector('.post-options a.voted-yes').style.color;
										var color = document.querySelector('a#post_vote_up_34222956').getAttribute('color');
										return color;
									});
								} catch (e) {
									casper.test.assertDoesntExist('a.login_dialog.text-muted.voted-yes', utils.info('the post is not liked by the user '));
									casper.click('i.glyphicon.glyphicon-like-alt');
									wait.waitForTime(2000, function() {
										var colour = casper.evaluate(function() {
											var color = document.querySelector('.post-options a.voted-yes').style.color;
											return color;
										});
									});
								}
							} else {
								utils.error(' Not clicked on Topic');
							}
						});
					} else {
						utils.error(' User not logged in');
					}
				});
			}else {
				utils.error(' Error : '+err);
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(function() { });
		});
	});
};

//Method To verify the user account off case
thumpsUpDownTestcases.verifyUserAccountOffCase = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 15 [To verify the user account off case]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableUserAccounts(false);
	}).thenOpen(config.url, function() {
		this.click("a.topic-title");
	}).waitForSelector('div.post-body.pull-left', function() {
		casper.test.assertDoesntExist('i.glyphicon.glyphicon-like-alt', ' Like thump not found hence verified');
		casper.test.assertDoesntExist('i.glyphicon.glyphicon-dislike-alt', ' DisLike thump not found hence verified');
	}).thenOpen(config.backEndUrl, function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableUserAccounts(true);
	});
};

//18. Method to verify user reputation
//14. Method to verify the functionality of reputation on profile page
thumpsUpDownTestcases.verifyReputation = function() {
	var earlierRepNum;
	var laterRepNum;
	casper.thenOpen(config.url, function() {
		utils.info('CASE 8, 18 and 14[To verify user reputation]');
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('div#topics a[href="/post/printadd"]', function() {
	  this.test.assertSelectorHasText('div#topics', 'New Topic');
	  this.click('div#topics a[href="/post/printadd"]');
	}).then(function() {
		topicMethod.createTopic(thumpsUpDownJSON.newTopic);
	}).waitForSelector('div#posts-list', function() {
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile', 'Profile tab found');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('span.profile-title', function() {
		this.test.assertExists('li.reputation span.profile-label.text-muted', 'Reputation available');
		var earlierRepCount = this.fetchText('li.reputation span.profile-count a');
		earlierRepCount = earlierRepCount.split(',').join('');
		earlierRepNum = parseInt(earlierRepCount);
		utils.info(' The earlier reputation count is = '+earlierRepNum);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		this.eachThen(thumpsUpDownJSON.usersLogin, function(response) {
			var responseData = response.data;
			thumpsUpDownTestcases.registerUserOnPostListingPageLike(responseData);
		});
	}).then(function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile', 'Profile tab found');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('span.profile-title', function() {
		this.test.assertExists('li.reputation span.profile-label.text-muted', 'Reputation available');
		var laterRepCount = this.fetchText('li.reputation span.profile-count a');
		laterRepCount = laterRepCount.split(',').join('');
		laterRepNum = parseInt(laterRepCount);
		utils.info(' The later reputation count is = '+laterRepNum);
		this.test.assertEquals(earlierRepNum + 3, laterRepNum);
	}).then(function() {
		this.test.assertExists('#PostsOFUser', 'All posts');
		this.click('#PostsOFUser');
	}).wait('3000', function() {
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down', 'drop down to delete post');
		this.click('i.glyphicon.glyphicon-chevron-down');
	}).waitUntilVisible('#search_delete_post', function() {
		this.test.assertExists('i.glyphicon.glyphicon-trash.text-muted.pull-right', 'Delete Button');
		this.click('i.glyphicon.glyphicon-trash.text-muted.pull-right');
	}).wait('2000', function() {
		var deletedRepCount = casper.fetchText('li.reputation span.profile-count a');
		deletedRepCount = deletedRepCount.split(',').join('');
		var deletedRepNum = parseInt(deletedRepCount);
		this.test.assertEquals(laterRepNum, deletedRepNum);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// Method To verify the forget pass word link of pop up window
thumpsUpDownTestcases.verifyForgotPasswordLink = function() {
	casper.thenOpen(config.url, function() {
		utils.info('CASE 25 [To verify  the forget pass word link of pop up window]');
		this.click("a.topic-title");
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('i.glyphicon.glyphicon-like-alt', 'Like thump found hence verified');
		this.click('i.glyphicon.glyphicon-like-alt');
	}).waitForSelector('#login_register_modal', function() {
		this.test.assertExists('div.pull-right a#anchor_tab_forget_password', 'Forgot your password? found');
		this.click('div.pull-right a#anchor_tab_forget_password');
	}).waitForSelector('div.panel-body.table-responsive', function() {
		this.test.assertExists('div.panel-body.table-responsive form.form-horizontal', utils.info('Forgot password link redirected'));
	});
};

// Method "to verify create account link on pop up window when new registration is disable"
thumpsUpDownTestcases.verifyCreateAccountInPopUp = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 26 [To verify  create account link on pop up window when new registration is disable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableNewRegistrations(false);
	}).thenOpen(config.url, function() {
		this.click("a.topic-title");
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('i.glyphicon.glyphicon-like-alt', utils.info('Like thump find hence verified'));
		this.click('i.glyphicon.glyphicon-like-alt');
	}).waitForSelector('div.modal-dialog', function() {
		this.test.assertSelectorDoesntHaveText('span.text-block', 'Create Account');
	}).thenOpen(config.backEndUrl, function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableNewRegistrations(true);
	});
};

// 27. Method to verify reputaion count of fb user
// 32. Method to verify reputaion link on profile page when reputation is on for fb user
thumpsUpDownTestcases.reputationCountFbUser = function() {
	casper.thenOpen(config.backEndUrl,function() {
		utils.info('CASE 27 [To verify reputaion count of fb user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Single+Sign+On"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Single Sign On');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
	}).waitForSelector('input#facebook_connect', function() {
		backEndForumRegisterMethod.enableDisableFacebookConnect(true, config.fbInfo);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginByFacebookUser();
	}).then(function() {
		this.test.assertSelectorHasText('div#topics', 'New Topic');
	  this.click('div#topics a[href="/post/printadd"]');
		topicMethod.createTopic(thumpsUpDownJSON.newTopic);
	}).waitForSelector('div#posts-list', function() {
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile', 'Profile tab found');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('span.profile-title', function() {
		this.test.assertExists('li.reputation span.profile-label.text-muted', 'Reputation available');
		var earlierRepCount = this.fetchText('li.reputation span.profile-count a');
		earlierRepNum = parseInt(earlierRepCount);
		utils.info(' The earlier reputation count is = '+earlierRepNum);
	}).then(function() {
		this.test.assertExists('li.pull-right.user-panel button.dropdown-toggle', 'User logged in successfully');
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		this.eachThen(thumpsUpDownJSON.usersLogin, function(response) {
			var responseData = response.data;
			thumpsUpDownTestcases.registerUserOnPostListingPageLike(responseData);
		});
	});/*.then(function() {
		forumLoginMethod.loginByFacebookUser();
	}).then(function() {
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile', 'Profile tab found');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('span.profile-title', function() {
		this.test.assertExists('li.reputation span.profile-label.text-muted', 'Reputation available');
		var laterRepCount = this.fetchText('li.reputation span.profile-count a');
		laterRepNum = parseInt(laterRepCount);
		utils.info(' The later reputation count is = '+laterRepNum);
		this.test.assertEquals(earlierRepNum + 3, laterRepNum);
	}).then(function() {
		this.test.assertExists('li.pull-right.user-panel button.dropdown-toggle', 'User logged in successfully');
		forumLoginMethod.logoutFromApp();
	});*/
};

// 29. Method to verify like list of fb user
thumpsUpDownTestcases.verifyListByFbUsers = function() {
	casper.thenOpen(config.url, function() {
		utils.info('CASE 29 [To verify like list of fb user]');
		forumLoginMethod.loginByFacebookUser();
	}).waitForSelector('ul.nav.pull-right span.caret', function() {
		casper.test.assertExists('form[name="posts"] a.topic-title', 'Topic present');
		casper.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertSelectorDoesntHaveText('span[id^="span_total_vote_up_count_"]','0');
		this.click('div.post-options.pull-right span.text-muted a');
	}).waitUntilVisible('ul#who-all', function() {
		this.test.assertSelectorHasText('div#who_liked_dialog h4','People Who Like This');
		this.test.assertAllVisible('#who-all', 'User List visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//verify combine all forum.
thumpsUpDownTestcases.verifyCombineAllForum = function() {
	casper.thenOpen(config.url, function() {
		utils.info('CASE 30 [To verify combine all forum]');
		forumLoginMethod.loginToApp(thumpsUpDownJSON.otherUser.username, thumpsUpDownJSON.otherUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('div#topics a[href="/post/printadd"]', function() {
		this.test.assertSelectorHasText('div#topics', 'New Topic');
		this.click('div#topics a[href="/post/printadd"]');
		topicMethod.createTopic(thumpsUpDownJSON.newTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password);
	}).waitWhileVisible('#td_tab_login', function() {
		thumpsUpDownMethod.clickOnLike();
	}).then(function() {
		thumpsUpDownMethod.clickOnDisLike();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// Method To verify reputaion link on profile page when reputation is off for fb user
thumpsUpDownTestcases.verifyReputationOnFbUserProfileWhenDisabled = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 31 [To verify reputaion link on profile page when reputation is off for fb user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableLikesReputation(false);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginByFacebookUser();
	}).waitForSelector('ul.nav.pull-right span.caret', function() {
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile', 'Profile tab found');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('span.profile-title', function() {
		this.test.assertDoesntExist('li.reputation span.profile-label.text-muted', 'Reputation not available');
		this.test.assertExists('li.pull-right.user-panel button.dropdown-toggle', 'User logged in successfully');
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableLikesReputation(true);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Single+Sign+On"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Single Sign On');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
	}).waitForSelector('input#facebook_connect', function() {
		backEndForumRegisterMethod.enableDisableFacebookConnect(false, config.fbInfo);
	});
};

// method To verify the count of thumbs up/down when postlisting page is open in two browser
thumpsUpDownTestcases.verifyCountWithTwoBrowser = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 7 [To verify the count of thumbs up/down when postlisting page is open in two browser]');
		var userAgent = casper.evaluate(function() {
		  var useragent = window.navigator.userAgent;
			return useragent;
		});
	});
	//Open front end
	casper.thenOpen(config.url, function() {
			forumLoginMethod.loginToApp(thumpsUpDownJSON.registeredUserLogin.username, thumpsUpDownJSON.registeredUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i.glyphicon.glyphicon-like-alt', utils.info('Like thump find hence verified'));
						casper.click('i.glyphicon.glyphicon-like-alt');
						/*var casper2 = require('casper').create({
							pageSettings: {
								userAgent: "Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/538.1 (KHTML, like Gecko) CasperJS/1.1.3+PhantomJS/2.1.1 Firefox/45.0"
							}
						});
						var userAgent = casper2.evaluate(function() {
						  var useragent = window.navigator.userAgent;
							return useragent;
						});
						casper2.info(' The value of user agent2 ='+userAgent);*/
						//casper.userAgent("Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/538.1 (KHTML, like Gecko) CasperJS/1.1.3+PhantomJS/2.1.1 Chrome/53.0.2785.89 Safari/538.1");
						casper.wait(5000,function() {
							var userAgent2 = casper.evaluate(function() {
								window.navigator.__defineGetter__('userAgent', function () {
									return 'Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/538.1 (KHTML, like Gecko) CasperJS/1.1.3+PhantomJS/2.1.1 Chrome/53.0.2785.89 Safari/538.1';
								});
							  var useragenta = window.navigator.userAgent;
								return useragenta;
							});
						});
					} else {
						utils.error(' User not logged in');
					}
				});
			}else {
				utils.error(' Error : '+err);
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(function() { });
		});
	});
};
