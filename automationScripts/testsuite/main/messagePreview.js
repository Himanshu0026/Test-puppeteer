//----- This js file covers all the messagePreview functionality on forum Frontend---------//

'use strict.';
var config = require('../../../config/config.json');
var messagePreviewTests = require('../cases/messagePreview.js');
var forumLoginMethod = require('../methods/login.js');
var messagePreview = module.exports = {};

messagePreview.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function(){

		//verify with message preview when there is no messsages in the inbox
		/*messagePreviewTests.verifyNoMessage();

		//veriy with message preview when there is one message when you recieve a message
		messagePreviewTests.verifyReceiveSingleMessage();

		//veriy with message preview when there is one message(when you send a message)
		messagePreviewTests.verifySenderSingleMessage();*/

		//verify with the sequence on message pre view send 4 messages to 4 different sender
		messagePreviewTests.messagePreviewSendMessageFourUsers();

		//Verify with the sequence on message pre view(send 4 messages to user 1 from 4 different send.
		/*messagePreviewTests.messagePreviewSendMessageSingleUser();
		//verify with message preview when you send same message for 4 user at same time
		messagePreviewTests.messagePreviewSameMessageFourUser();
		//verify message preview for unread message
		messagePreviewTests.unreadMessagePreview();*/

	});
};
