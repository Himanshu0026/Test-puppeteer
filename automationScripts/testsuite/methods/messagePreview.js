/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/
'use strict.';
var messagePreviewMethod = module.exports = {};
//var messagePreviewJSON = require('../../testdata/messagePreview.json');

// method to compose a private message to a user
messagePreviewMethod.newMessage = function(info, callback) {
	var recipient = info.to;
	casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', recipient, {keepFocus:true});
	casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
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
		casper.test.assertExists('a#send_pmsg_button');
		casper.click('a#send_pmsg_button');
	}).then(function(){
		return callback(null);
	});
};
