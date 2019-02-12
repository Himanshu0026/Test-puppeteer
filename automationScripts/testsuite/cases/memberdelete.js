var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var memberDeleteJSON=require('../../testdata/memberdelete.json');
var deleteTopicScenarioJSON= require('../../testdata/deleteTopicScenario.json');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var memberDeleteMethod = require('../methods/memberdelete.js');
memberdeleteTests = module.exports = {};
var pendingUser='';
//Verify by register members for member delete-Task
memberdeleteTests.registermembers=function(){
  casper.thenOpen(config.backEndUrl, function(){
		utils.info('************************MEMBER DELETE TESTCASES****************************');
		utils.info('Case 1[Verify by delete one topic -selecting by check box register user]');
    this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
      this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    }).waitForSelector('div#ddUsers a[href="/tool/members/mb/addusers"]', function() {
      this.test.assertSelectorHasText('#ddUsers', 'New User');
      this.click('div#ddUsers a[href="/tool/members/mb/addusers"]');
    }).then(function(){
      memberDeleteMethod.registermembers('Pending Email Verification', function(uname){
        pendingUser=uname;
      });
    }).then(function(){
      memberDeleteMethod.registermembers('Pending Email Verification', function(memberRegister){
        userpd=memberRegister;
      });
    }).then(function(){
      memberDeleteMethod.registermembers('Pending Email Verification', function(memberRegister){
        users=memberRegister;
      });
    }).then(function(){
      memberDeleteMethod.registermembers('Pending Email Verification', function(memberRegister){
        user=memberRegister;
      });
    });
  });
};

//Verify delete users from search section from backend settings
//checked after deletion same user in search box.
memberdeleteTests.verifyDeleteSearchSection=function(){
  casper.thenOpen(config.backEndUrl, function(){
    utils.info('************************MEMBER DELETE TESTCASES****************************');
    utils.info('Case 2[Verify delete users from search section from backend settings]');
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.click('a[href="/tool/members/mb/usergroup"]');
  }).waitForSelector('input#autosuggest', function(){
    this.sendKeys('input#autosuggest', pendingUser, {keepFocus: true});
    this.page.sendEvent("keypress", this.page.event.key.Enter);
  }).waitForSelector('form[name="ugfrm"]', function(){
    this.click('a#delete_user');
  }).waitForSelector('input#autosuggest', function(){
    this.sendKeys('input#autosuggest', pendingUser, {keepFocus: true});
    this.page.sendEvent("keypress", this.page.event.key.Enter);
  }).waitForText(memberDeleteJSON.deleteUsers.expectedErrorMsg);
};

//Verify by delete users from usergrop permission.
//checked delete from usergroup settings.
//backend delete functionality checked all, single, and from delete icon.
memberdeleteTests.verifyDeleteuserGrp=function(){
  casper.thenOpen(config.backEndUrl, function(){
    utils.info('************************MEMBER DELETE TESTCASES****************************');
    utils.info('Case 3[Verify by delete users ]');
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.click('a[href="/tool/members/mb/usergroup"]');
  }).waitForSelector('div#tab_wrapper', function(){
    backEndForumRegisterMethod.viewUsers('Pending Email Verification');
  }).waitForSelector('input[name="allbox"]', function(){
    this.test.assertTextDoesntExist(pendingUser, 'user doesnt exist on users page on backend settings');
    this.click('a.userlist-delete');
    //same page reload none selector change
    this.wait(2000, function(){});
  }).waitForSelector('input[name="allbox"]', function(){
    this.click('input[name="allbox"]');
  }).waitForSelector('select[name="action"]', function(){
    //delete single user from checkbox
    count='1';
    backEndForumRegisterMethod.editUserActions('Pending Email Verification', 'Delete', count);
    this.wait(1000, function(){});
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.click('a[href="/tool/members/mb/usergroup"]');
  }).waitForSelector('div#tab_wrapper', function(){
    backEndForumRegisterMethod.viewUsers('Pending Email Verification');
  }).then(function(){
    //delete from all users checkbox
    count='all';
    backEndForumRegisterMethod.editUserActions('Pending Email Verification', 'Delete', count);
  }).then(function(){
    this.test.assertDoesntExist('#groupUsersList tr td input[name^="user_id"]', 'users not exists');
  });
};

//Verify Delete Account Pending Email Users on Account  Profile page Delete own Account Disable
memberdeleteTests.disabledeleteUsersprofilePage=function(){
  casper.thenOpen(config.backEndUrl, function(){
	  utils.info('************************MEMBER DELETE TESTCASES****************************');
		utils.info('Case 4[Verify by delete one topic -selecting by check box register user]');
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
  }).waitForSelector('div#ddUsers a[href="/tool/members/mb/addusers"]', function() {
    this.test.assertSelectorHasText('#ddUsers', 'New User');
    this.click('div#ddUsers a[href="/tool/members/mb/addusers"]');
  }).then(function(){
    memberDeleteMethod.registermembers('Pending Email Verification', function(uname){
      pendingUser=uname;
    });
  }).then(function(){
    memberDeleteMethod.registermembers('Pending Email Verification', function(uname){
      user=uname;
    });
  }).then(function(){
    memberDeleteMethod.registermembers('Administrators', function(uname){
      admin=uname;
    });
  }).then(function(){
    this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
      this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
      this.click('a[href="/tool/members/mb/usergroup"]');
    }).waitForSelector('div#tab_wrapper', function(){
      backEndForumRegisterMethod.viewGroupPermissions('Pending Email Verification');
    }).waitForText('Save', function(){
      backEndForumRegisterMethod.editGroupPermissions('Pending Email Verification', 'delete_profile', false);
    }).thenOpen(config.url, function(){
      forumLoginMethod.loginToApp(pendingUser, pendingUser);
    }).waitForSelector('ul.nav.pull-right span.caret', function(){
      this.click('ul.nav.pull-right span.caret');
      this.evaluate(function() {
        document.querySelector('a#user-nav-panel-profile').click();
      });
    }).waitForSelector('a#PostsOFUser', function(){
      this.test.assertDoesntExist('a#deleteAccountDialog i', 'account delete button didnt appear on profilePage');
    }).then(function(){
      //also check delete users on settings page for register user.
      this.test.assertExists('ul.nav.pull-right span.caret');
      this.click('ul.nav.pull-right span.caret');
    }).then(function(){
      this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(3) a', 'clicked on settings page from dropdown');
      this.click('span.pull-right.user-nav-panel li:nth-child(3) a');
    }).waitForText('Account Settings', function(){
      this.test.assertDoesntExist('a#deleteAccountDialog', 'delete account button not found on settings page');
    });
  });
};

//Verify Delete Account YES   on  Pending Email Users on Account  Profile  page Delete own Account Enable   with valid password
memberdeleteTests.enabledeleteUsersprofilePage=function(){
  casper.thenOpen(config.backEndUrl, function(){
	  utils.info('************************MEMBER DELETE TESTCASES****************************');
	  utils.info('Case 5[Verify by delete one topic -selecting by check box register user]');
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
    this.click('a[href="/tool/members/mb/usergroup"]');
  }).then(function(){
    backEndForumRegisterMethod.viewGroupPermissions('Pending Email Verification');
  }).waitForText('Save', function(){
    backEndForumRegisterMethod.editGroupPermissions('Pending Email Verification', 'delete_profile', true);
  }).thenOpen(config.url, function(){
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
		  this.click('ul.nav.pull-right span.caret');
		  this.evaluate(function() {
			  document.querySelector('a#user-nav-panel-profile').click();
		  });
    });
  }).waitForSelector('a#PostsOFUser', function(){
    //case when select delete account no
    this.click('a#doNotDelAccount');
    this.test.assertExists('a#PostsOFUser', 'moved back on users profilePage');
  }).waitForSelector('a#PostsOFUser', function(){
    //deleted pending user.
    //case of delete account from profilePage when clicked on (yes)
    this.click('a#deleteAccountDialog i');
  }).waitForSelector('div#userAccountName', function(){
    this.test.assertSelectorHasText('div#userAccountName h3', 'Are you sure you would like to permanently delete the account');
    this.click('a#deleteAccount');
  }).waitForSelector('a#td_tab_login', function(){
    this.thenOpen(config.url, function(){
    //verify deleted user using logged-In
      forumLoginMethod.loginToApp(pendingUser, pendingUser);
    }).waitForText(memberDeleteJSON.checkedUser.expectedErrorMsg, function(){
      //login from pending another  user, verify on settings page
      forumLoginMethod.loginToApp(user, user);
    }).waitForSelector('ul.nav.pull-right span.caret', function(){
      this.test.assertExists('ul.nav.pull-right span.caret');
      this.click('ul.nav.pull-right span.caret');
    }).then(function(){
      this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(3) a', 'clicked on settings page from dropdown');
      this.click('span.pull-right.user-nav-panel li:nth-child(3) a');
    }).waitForText('Account Settings', function(){
      this.test.assertExists('a#deleteAccountDialog', 'delete account button found on settings page');
      this.click('a#deleteAccountDialog');
    }).waitForSelector('a#doNotDelAccount', function(){
      //clicked on no box on settings page.
      this.test.assertExists('a#doNotDelAccount');
      this.click('a#doNotDelAccount');
    }).waitForText('Account Settings', function(){
      //clicked on yes box on settings page to delete pending user.
      this.test.assertExists('a#deleteAccountDialog', 'delete account button found on settings page');
      this.click('a#deleteAccountDialog');
    }).waitForSelector('a#doNotDelAccount', function(){
      this.test.assertExists('a#deleteAccount');
      this.click('a#deleteAccount');
    }).then(function(){
      if (casper.visible('input#passwrd')) {
        utils.info('password pop-up appeared on settings page');
        this.waitForSelector('input#passwrd', function(){
          this.sendKeys('input[name="passwrd"]', admin, {keepFocus: true});
        }).then(function(){
          this.click('button#confirm_submit');
        }).waitForText('Top 25 Posters');
      } else {
        utils.info('users logged-out and deleted successfully');
        this.waitForSelector('a#td_tab_login', function(){
          this.test.assertExists('a#td_tab_login', 'login button found');
        });
      }
    });
  });
};

//"Verify admin Delete other users Account  Through  Members Check box on Members page "
//admin deleted itself on members page
memberdeleteTests.deleteAdminmembersPage=function(){
  casper.thenOpen(config.url, function(){
		utils.info('************************MEMBER DELETE TESTCASES****************************');
	  utils.info('Case 6[Verify admin Delete other users Account  Through  Members Check box on Members page]');
    forumLoginMethod.loginToApp(admin, admin);
  }).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
    this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#members_list_show a','members found on members page');
		this.click('li#members_list_show a');
  }).waitForSelector('form#memberListFrm div.panel-heading li', function(){
    this.click('form#memberListFrm div.panel-heading ul li:nth-child(3) a', 'clicked on new level on top-posters page');
  }).waitForSelector('input[name="delete_member"]', function(){
    this.click('input[name^="delete_member"]');
  }).then(function(){
    index=1;
    memberDeleteMethod.memberCheckBoxValue('input[name^="delete_member"] ', index);
  }).waitForSelector('div#members-menu', function(){
    this.test.assertSelectorHasText('div#members-menu span' , '2');
    this.click('a#del_mem_btn');
    this.wait(2000, function(){});
  }).then(function(){
    if (casper.visible('input#passwrd')) {
      utils.info('password pop-up appeared on members page');
      this.waitForSelector('input#passwrd', function(){
        this.sendKeys('input[name="passwrd"]', admin, {keepFocus: true});
      }).then(function(){
        this.click('button#confirm_submit');
      }).waitForText('Top 25 Posters', function(){
      //verified two users which deleted
        this.thenOpen(config.url, function(){
          forumLoginMethod.loginToApp(admin, admin);
        }).waitForText(memberDeleteJSON.checkedUser.expectedErrorMsg);
      });
    } else {
      utils.info('moved to top-posters page');
      this.waitForSelector('#td_tab_login', function(){
        //verified two users which deleted admin and register user.
        this.thenOpen(config.url, function(){
          forumLoginMethod.loginToApp(admin, admin);
        }).waitForText(memberDeleteJSON.checkedUser.expectedErrorMsg);
      }, function(){
        utils.info('failed case user cannot be logged-out');
        forumLoginMethod.logoutFromApp();
        this.thenOpen(config.url, function(){
          forumLoginMethod.loginToApp(admin, admin);
        }).waitForText(memberDeleteJSON.checkedUser.expectedErrorMsg);
      });
    }
  });
};
