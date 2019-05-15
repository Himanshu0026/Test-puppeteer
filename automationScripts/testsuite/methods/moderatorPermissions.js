/***These are the function which has been called in moderatorPermissions.js and also will be used in other js file as per requirement**********/

"use strict.";

var utils = require('../utils.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var categoryId;

var moderatorPermissionsMethod = module.exports = {};

//*************************Method to goto the moderator from backend ************************
moderatorPermissionsMethod.goToModerator = function(id) {
	casper.mouse.move('li[id="'+id+'"] div.select');
	casper.click('li[id="'+id+'"] a.moderateAction span'); // click on moderator of category
	casper.waitUntilVisible('.tooltipMenu.forumModeratorbutton', function() {
	});
};

//*************************Method to click On Add Moderator from backend ************************
moderatorPermissionsMethod.clickOnAddModerator = function(id) {
	casper.click('div[id="forumModerator'+id+'"] a.addForumModerator');
	casper.waitUntilVisible('#add_mod_dialog', function() {
		utils.info(" Add Moderator form opened");
	});
};

//*************************Method to click On Added Moderator from backend ************************
moderatorPermissionsMethod.clickOnAddedModerator = function(id) {
	casper.mouse.move('div[id="forumModerator'+id+'"] a.editForumModerator');
	casper.click('div[id="forumModerator'+id+'"] a.editForumModerator');
	casper.waitUntilVisible('#add_mod_dialog', function success() {
		utils.info("  Moderator form opened");
	}, function fail() {
		utils.error('  Moderator form not opened');
	});
};

//Method to Add new moderarator
moderatorPermissionsMethod.FillModeratorDetails = function(data, id) {
	casper.sendKeys('input[name="user"]', data, {reset:true});
	casper.sendKeys('input[name="user"]', casper.page.event.key.Enter, {keepFocus:true} );
	casper.fillSelectors('form[name="posts"]', {
		'select[name="forum_id"]': id
	}, false).then(function() {
		//this.test.assertExists('div.ui-dialog-buttonset button',' Save button Found');
		//this.click('div.ui-dialog-buttonset button');
		casper.test.assertExists('button.button.btn-m.btn-blue.pull-right','Save button Found');
		casper.click('button.button.btn-m.btn-blue.pull-right');
	}).then(function() {
	  moderatorPermissionsMethod.waitForLoadingMessage();
	});
};

//Method to Remove last Moderator from category  .
moderatorPermissionsMethod.clickOnRemoveButtonModerator=function(id) {
  moderatorPermissionsMethod.goToModerator(id);
	casper.then(function() {
		moderatorPermissionsMethod.clickOnAddedModerator(id);
	}).then(function() {
		this.test.assertExists('a#remove_moderator');
		this.click('a#remove_moderator');
	}).wait('2000', function() {
		utils.info(' Moderator Removed');
	});
};

moderatorPermissionsMethod.goToCategoryPageAndGetId = function(category, callback) {
	backEndForumRegisterMethod.goToCategoryPage();
	casper.then(function() {
		backEndForumRegisterMethod.getIdOfCategory(category, function(err, categoryId) {
			if(!err) {
        return callback(null, categoryId);
			}
		});
	});
};

//Method to enable Edit post on Moderator permission page  .
moderatorPermissionsMethod.enableDisableModeratorPermission=function(permission, value) {
	utils.enableorDisableCheckbox(permission, value);
	casper.evaluate(function() {
		document.getElementById('add_mod_form').submit();
	});
};

//Method to wait for loading msg .
moderatorPermissionsMethod.waitForLoadingMessage=function() {
  casper.waitUntilVisible('div#loading_msg', function success() {
		utils.info(casper.fetchText('div#loading_msg'));
	}, function fail() {
		utils.error('Loading... not found');
	}).waitWhileVisible('div#loading_msg', function() {
		utils.info('Loading... disappeared');
	});
};
