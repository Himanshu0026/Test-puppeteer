
//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var postEventMemberApprovalTestcases = require('../cases/postEventMemberApproval.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var utils = require('../utils.js');
var postEventMemberApproval = module.exports = {};

postEventMemberApproval.postTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to delete all the categories from backend
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();

		// method to create a topic
		postEventMemberApprovalTestcases.createTopic();

		// method to create multiple different post
		postEventMemberApprovalTestcases.createMultiplePost();

		// method to approve or delete the post by the admin user
		postEventMemberApprovalTestcases.postApprovalByAdmin();

		// method to check the functionality of approve post for guest user
		postEventMemberApprovalTestcases.unregisterUserApprovePost();

		// method to create multiple different post
		postEventMemberApprovalTestcases.createMultiplePost();

		// method to approve the post by the moderator
		postEventMemberApprovalTestcases.approveByModerator();

	});
};

postEventMemberApproval.eventTest = function() {

		casper.start(config.backEndUrl, function() {

			utils.info(" Title of the page :"+this.getTitle());
			forumLoginMethod.loginToForumBackEnd();

		}).then(function() {

			//method to set the setting of event approval
			//postEventMemberApprovalTestcases.eventApprovalSetting();

			//method to compose multiple post
			postEventMemberApprovalTestcases.composeMultipleEvent();

			// method to approve or delete the event by the admin user
			postEventMemberApprovalTestcases.eventApprovalByAdmin();

	});
};
