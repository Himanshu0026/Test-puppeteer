/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict.';
var registerMethod = require('./register.js');
var utils = require('../utils.js');
var wait = require('../wait.js');
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
					'Registered Users' : 'checked',
					'Moderators' : '',
					'Pending Email Verification' : ''
				}, true);
			} catch(e) {
				try {
				this.test.assertSelectorHasText('#frmChangeUsersGroupFinal', 'Pending Approval');
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : '',
					'Registered Users' : 'checked',
					'Moderators' : '',
					'Pending Approval' : ''
				}, true);
			} catch(e) {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : '',
					'Registered Users' : 'checked',
					'Moderators' : ''
				}, true);
			}
		}
		casper.waitUntilVisible('#loading_msg', function() {
			if(userGroup == 'Administrators') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Administrators' : 'checked',
					'Registered Users' : ''
				}, true);
			}else if (userGroup == 'Moderators') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Moderators' : 'checked',
					'Registered Users' : ''
				}, true);
			}else if (userGroup == 'Registered Users') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Registered Users' : 'checked',
					'Administrators' : ''
				}, true);
			}else if (userGroup == 'Pending Email Verification') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Pending Email Verification' : 'checked',
					'Registered Users' : ''
				}, true);
			}else if (userGroup == 'Pending Approval') {
				casper.fillLabels('form#frmChangeUsersGroupFinal', {
					'Pending Approval' : 'checked',
					'Registered Users' : ''
				}, true);
			}
		}).then(function() {
			this.waitUntilVisible('#loading_msg', function() {
				if (this.visible('#loading_msg')) {
			    utils.info(' Loading....');
			  } else {
					utils.info(' Loading is not displayed.');
				}
			});
		});
	});
};

// method to clicked on like thump
thumpsUpDownMethod.clickOnLike = function() {
	casper.test.assertExists('form[name="posts"] a.topic-title', 'Topic present');
	casper.click('form[name="posts"] a.topic-title');
	casper.waitForSelector('div#posts-list', function() {
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
