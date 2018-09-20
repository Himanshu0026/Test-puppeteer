/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict.';
var registerMethod = require('./register.js');
var utils = require('../utils.js');
var postEventMemberApprovalJSON = require('../../testdata/postEventMemberApproval.json');
var postEventMemberApprovalMethod = module.exports = {};
//*************************************************PRIVATE METHODS***********************************************

//method to set the user permission to Administration
postEventMemberApprovalMethod.setAdmin = function(user) {
	casper.test.assertExist('#autosuggest', 'Found username autosuggest input field');
	casper.fill('form#frmChangeUsersGroup', {
		'member' : user
	}, true);
	casper.waitForSelector('form[name="ugfrm"]',  function() {
		this.test.assertSelectorHasText('.ui-dialog-title', 'Change User Group');
		casper.fillLabels('form#frmChangeUsersGroupFinal', {
			'Administrators' : 'checked',
			'Registered Users' : ''
		}, true);
	}).wait('2000', function() {

	});
};

//method to set the user permission to Administration
postEventMemberApprovalMethod.setUserGroupToRegisteredUser = function(user) {
	casper.test.assertExist('#autosuggest', 'Found username autosuggest input field');
	casper.fill('form#frmChangeUsersGroup', {
		'member' : user
	}, true);
	casper.waitForSelector('form[name="ugfrm"]',  function() {
		this.test.assertSelectorHasText('.ui-dialog-title', 'Change User Group');
		casper.fillLabels('form#frmChangeUsersGroupFinal', {
			'Administrators' : '',
			'Registered Users' : 'checked'
		}, true);
	}).wait('2000', function() {

	});
};

//*************************method to compose a post by register user ************************************
postEventMemberApprovalMethod.composePost = function(msg) {
	casper.test.assertSelectorHasText('#sub_post_reply', 'Post a reply');
	casper.click('#sub_post_reply');
	casper.wait('2000', function() {
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce', msg);
		});
	}).then(function() {
		this.test.assertVisible('#reply_submit');
		this.click('#reply_submit');
		this.wait('2000', function() {
		});
	});
};
