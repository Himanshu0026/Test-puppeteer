//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var privateMessageTestcases = require('../cases/privateMessage.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var privateMessage = module.exports = {};

privateMessage.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		privateMessageTestcases.disablePM();
		privateMessageTestcases.enablePM();

		// method to create a message by scenario 1,2,3
		privateMessageTestcases.sendPMByMsgIcon();

		// method to verify when we enter invalid recipients name
		privateMessageTestcases.sendPMToInvalidRecipient();

		// method to verify when we leave blank reciepients name
		privateMessageTestcases.sendPMToBlankRecipient();

		// method to verify when leave blank subject
		privateMessageTestcases.sendPMWithBlankSubject();

		// method to verify when leave blank message body
		privateMessageTestcases.sendPMWithBlankMessage();

		//To verify Attachement /Insert Photo link when disable
		privateMessageTestcases.enableDisableAttachementAndPhotoLink();

		// method to verify with reply option
		// method to Verify profile link on user name
		privateMessageTestcases.verifyReplyOption();

		// method To verify one to one conversation between sender and and single recipient
		// method To verify Avtar
		privateMessageTestcases.verifyOneToOneConversation();

		// method To verify one to one conversation between sender and multiple recipient
		// method verify when:If user S1 sent a message to R1, R2 but reply coming only from R2 only
		// To verify participant name on conversation panel
		privateMessageTestcases.verifyOneToManyConversation();

		// method To verify  send PM conversation to 26 recipient at the same time
		// method To verify  send PM conversation to 25 recipient at the same time
		privateMessageTestcases.sendPMToMaxAndMoreThanMaxRecipient();

	}).then(function() {

		// method To verify mark as read-unread(check box)(Single)
		// method To verify mark as read-unread(check box)(multiple)
		// method To verify mark as read-unread(check box)(all)
		// method to verify mark as read(coversation page)
		privateMessageTestcases.read_unreadCheckbox();

		// method Move single conversation(inbox to archieve)
		// method to Move single conversation(archieve to inbox)
		// method to move multiple conversation(inbox to archieve)
		// method to move multiple conversation(archieve to inbox)
		// method to move all coversation(inbox to archieve)
		// method To verify ignored member (check box)
		privateMessageTestcases.moveSingleToArchieve();

		// method To verify ignored member (check box)
		// method to verify with unignore user
		// method To verify by send a message to ignore user
		privateMessageTestcases.ignore_unIgnoreUser();

		// method To verify with send message whos ignored you
		// method to verify with send reply on previous message after ignoring
		privateMessageTestcases.sendMessageWhoIgnoredYou();

		// method to verify count of message icon -> send 3 messages from  s1 >log in with r1 and verify the message icon count.
		privateMessageTestcases.verifyMessageIconCountCaseOne();

		// method to verify count of message icon->verify when 4 user send 1 message to r1>log in with r1 and verify the message icon count.
		privateMessageTestcases.verifyMessageIconCountCaseTwo();

		// method To verify leave conversation( single)
		// method To verify leave conversation (Multiple)
		// method To verify leave conversation (all)
		privateMessageTestcases.leaveConversation();

		// method to verify Refresh pm page after sending message
		privateMessageTestcases.refreshPmPageAfterSendingMessage();

		// method To verify delete Conversation
		// method To verify delete multiple Conversation
		// method Delete coversation from conversation page
		// method To verify delete all Conversation
		// method To verify "Go to inbox" link when there are no conversation.
		//privateMessageTestcases.deleteConversation();

	});
};
