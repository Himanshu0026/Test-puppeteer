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
			'General' : ''
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
			'General' : 'checked'
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
		this.wait('3000', function() {
		});
	});
};

//*************************Method to enable the event approval from backend ************************

postEventMemberApprovalMethod.enableDisableEventApproval = function(value) {
	casper.then(function() {
		this.click('li.inactive_tab a');
	}).waitForSelector('td.userGroupActions', function() {
		var tableLength = casper.evaluate(function() {
			var len = document.querySelectorAll('table.text.fullborder tr');
			return len.length;
		});
		var grpName = casper.evaluate(function(tableLength){
			for(var i=3; i<=tableLength; i++) {
				var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1) li'); // change li
				if (group.innerText == 'General') {
					document.querySelector('tr:nth-child('+i+') td:nth-child(2) a').click();
					return (group.innerText);
				}
			}
		},tableLength);
		utils.info('group ='+grpName);
	}).waitForSelector('input#t', function() {
		utils.enableorDisableCheckbox('t', value);
		this.test.assertExists('button.button.btn-m.btn-blue', 'Save button found');
		this.click('button.button.btn-m.btn-blue');
	}).waitForSelector('font[color="red"]', function() {
		utils.info("Permission changed");
	});
};

// method to compose event
postEventMemberApprovalMethod.composeEvent = function(eventInfo) {
	casper.click('.calendar-add-event a');
	casper.then(function() {
		casper.sendKeys('form#PostCalEvent input[name="event_title"]', 'New event');
		casper.fillSelectors('form#PostCalEvent', {
				'input#allDay' : 1
		}, false);
	}).waitForSelector('#message_ifr', function() {
		this.test.assertExists('#message_ifr','message-ifr found');
		this.withFrame('message_ifr', function() {
			try{
				this.test.assertExists('#tinymce');
				this.sendKeys('#tinymce', eventInfo);
			}catch(e) {
				this.test.assertDoesntExist('#tinymce');
			}
		});
	}).then(function() {
		this.click('#post_event_buttton');
		this.wait('3000', function() {

		});
	});
};
