/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict.';
var registerMethod = require('./register.js');
var utils = require('../utils.js');
var forumLoginMethod = require('./login.js');
var thumpsUpDownMethod = module.exports = {};

//*************************************************PRIVATE METHODS***********************************************

//method to set the user permission to Administration
thumpsUpDownMethod.changeUserGroup = function(user, userGroup) {
	casper.test.assertExist('#autosuggest', utils.info('Found username autosuggest input field'));
	casper.fill('form#frmChangeUsersGroup', {
		'member' : user
	}, true);
	casper.waitForSelector('form[name="ugfrm"]',  function() {
		this.test.assertSelectorHasText('.ui-dialog-title', 'Change User Group');
			try{
				this.test.assertSelectorHasText('#frmChangeUsersGroupFinal', 'Pending Email Verification');
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : '',
					'General' : 'checked',
					'Moderators' : '',
					'Pending Email Verification' : ''
				}, true);
			} catch(e) {
				try {
				this.test.assertSelectorHasText('#frmChangeUsersGroupFinal', 'Pending Approval');
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : '',
					'General' : 'checked',
					'Moderators' : '',
					'Pending Approval' : ''
				}, true);
			} catch(e) {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : '',
					'General' : 'checked',
					'Moderators' : ''
				}, true);
			}
		}
		casper.waitUntilVisible('#loading_msg', function success() {
			if(userGroup == 'Administrators') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : 'checked',
					'General' : ''
				}, true);
			}else if (userGroup == 'Moderators') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Moderators' : 'checked',
					'General' : ''
				}, true);
			}else if (userGroup == 'General') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'General' : 'checked',
					'Administrators' : ''
				}, true);
			}else if (userGroup == 'Pending Email Verification') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Pending Email Verification' : 'checked',
					'General' : ''
				}, true);
			}else if (userGroup == 'Pending Approval') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Pending Approval' : 'checked',
					'General' : ''
				}, true);
			}
		}, function fail() {
			if(userGroup == 'Administrators') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : 'checked',
					'General' : ''
				}, true);
			}else if (userGroup == 'Moderators') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Moderators' : 'checked',
					'General' : ''
				}, true);
			}else if (userGroup == 'General') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'General' : 'checked',
					'Administrators' : ''
				}, true);
			}else if (userGroup == 'Pending Email Verification') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Pending Email Verification' : 'checked',
					'General' : ''
				}, true);
			}else if (userGroup == 'Pending Approval') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Pending Approval' : 'checked',
					'General' : ''
				}, true);
			}
		}).then(function() {
			casper.waitUntilVisible('#loading_msg', function success(){
				if (this.visible('#loading_msg')) {
			    utils.info(' Loading....');
			  } else {
					utils.info(' Loading is not displayed.');
				}
			}, function fail(){
				utils.info(' Loading is not displayed within 40 sec');
			});
		});
	});
};

// method to clicked on like thump
thumpsUpDownMethod.clickOnLike = function() {
	casper.test.assertExists('form[name="posts"] a.topic-title', 'Topic present');
	casper.click('form[name="posts"] a.topic-title');
	casper.waitForSelector('div#posts-list', function() {
		this.test.assertExists('i.glyphicon.glyphicon-like-alt', 'Like thump exists');
		if (this.visible('i.glyphicon.glyphicon-like-alt')) {
			this.click('i.glyphicon.glyphicon-like-alt');
			this.waitForSelector('a.voted-yes', function() {
			//this.waitForSelector('a.text-muted.voted-yes', function() {
				utils.info(' Post liked by the user');
			});
		} else {
			utils.error(' Like thump not visible');
		}
	});
};

// method to clicked on dislike thump
thumpsUpDownMethod.clickOnDisLike = function() {
	casper.waitForSelector('div#posts-list', function() {
		this.test.assertExists('i.glyphicon.glyphicon-dislike-alt', 'Like thump not exists');
		if (this.visible('i.glyphicon.glyphicon-dislike-alt')) {
			this.click('i.glyphicon.glyphicon-dislike-alt');
			this.waitForSelector('a.voted-no', function() {
			//this.waitForSelector('a.dislike_post.text-muted.voted-no', function() {
				utils.info(' Post disliked by the user');
			});
		} else {
			utils.error(' Dislike thump not visible');
		}
	});
};
