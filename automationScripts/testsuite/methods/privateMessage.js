/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/
'use strict.';
var utils = require('../utils.js');
var privateMessageMethod = module.exports = {};

// method to compose a private message to a user
privateMessageMethod.newMessage = function(info) {
	var recipient = info.to;
	for( var i = 0; i < recipient.length; i++) {
		casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', recipient[i], {keepFocus:true});
		casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
	}

	casper.sendKeys('input[id="pm_subject"]', info.subject, {keepFocus:true});
	casper.test.assertExists('textarea#pmessage_new');
	casper.evaluate(function() {
		document.querySelector('textarea#pmessage_new').click();
	});
	casper.waitUntilVisible('iframe#pmessage_new_ifr', function() {
		casper.withFrame('pmessage_new_ifr', function() {
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A,{keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', info.pmessage);
		});
	}).then(function() {
		casper.test.assertExists('#send_pmsg_button');
		casper.click('#send_pmsg_button');
	});
};

// method to delete all private message
privateMessageMethod.deleteAllPrivateMessage = function() {
	if (casper.visible('input#select_allbox')) {
		casper.evaluate(function() {
			document.querySelector('input#select_allbox').click();
		});
		casper.waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('a#delete_conversation i');
			this.click('a#delete_conversation i');
		}).waitForText('Your inbox is empty.', function success() {
			utils.info('All messages has been deleted');
		}, function fail() {
			privateMessageMethod.deleteAllPrivateMessage();
		});
  } else {
		casper.waitForText('Your inbox is empty.');
	}
};
