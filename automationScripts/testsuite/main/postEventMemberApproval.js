
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

		// method to register two user neha and isneha
		//postEventMemberApprovalTestcases.registerUserTOLogin();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();

		// method to create a topic
		postEventMemberApprovalTestcases.createTopic();

		// method to Approve a pending post from- Approval queue button
		postEventMemberApprovalTestcases.approvalQueueButton();

		// method to Approve a pending post -By clicking on topic
		postEventMemberApprovalTestcases.byClickingOnTopic();

		// method to Approve a pending post byselect the pending post by  check box
		postEventMemberApprovalTestcases.byCheckBox();

		// method to Approve a pending post by select all pending post by  check box
		postEventMemberApprovalTestcases.byCheckBoxAll();

		// method to Delete a pending post from- Approval queue button
		postEventMemberApprovalTestcases.deleteApprovalQueueButton();

		// method to Delete a pending post -By clicking on  post
		//postEventMemberApprovalTestcases.deleteClickingPost();

		// method to Delete a pending post by select the pending post by  check box
		postEventMemberApprovalTestcases.deleteByCheckBox();

		// method to edit a pending post from- Approval queue button
		postEventMemberApprovalTestcases.editApprovalQueueButton();

		// method to edit a pending post by clicking on it
		postEventMemberApprovalTestcases.editByClickingPost();

		// method to check the functionality of approve post for guest user
		postEventMemberApprovalTestcases.unregisterUserApprovePost();

		// method to Delete a pending post by select all pending post by  check box
		postEventMemberApprovalTestcases.deleteByAllCheckBox();

		// method to delete all the categories from backend
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		// method to create a topic
		postEventMemberApprovalTestcases.createTopic();

		// method to Approve a pending post from- Approval queue button for combine forum
		postEventMemberApprovalTestcases.combineForumApprovalQueueButton();

		// method to Approve a pending post -By clicking on topic for combine forum
		postEventMemberApprovalTestcases.combineForumByClickingOnTopic();

		// method to Approve a pending post by select the pending post by  check box  for combine forum
		postEventMemberApprovalTestcases.combineForumByCheckBox();

		// method to Approve a pending post by select all pending post by  check box for combine forum
		postEventMemberApprovalTestcases.combineForumByCheckBoxAll();

		// method to Delete a pending post from- Approval queue button for combine forum
		postEventMemberApprovalTestcases.combineForumDeleteApprovalQueueButton();

		// method to Delete a pending post -By clicking on  post  for combine forum
		//postEventMemberApprovalTestcases.combineForumDeleteClickingPost();

		// method to Delete a pending post by select the pending post by  check box for combine forum
		postEventMemberApprovalTestcases.combineForumDeleteByCheckBox();

		// method to edit a pending post from- Approval queue button for combine forum
		postEventMemberApprovalTestcases.combineForumEditApprovalQueueButton();

		// method to edit a pending post by clicking on it for combine forum
		postEventMemberApprovalTestcases.combineForumEditByClickingPost();

		// method to Delete a pending post by select all pending post by check box for combine forum
		postEventMemberApprovalTestcases.combineForumDeleteByAllCheckBox();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();

		// method to approve the post by the moderator
		postEventMemberApprovalTestcases.approveByModerator();

		// method to move a pending post from- Approval queue Checkbox by a moderator
		postEventMemberApprovalTestcases.movePostByModeratorApprovalQueueCheckbox();

		// method to create a topic
		postEventMemberApprovalTestcases.createTopic();

		// method to move a pending post -By clicking on topic Checkbox by a moderator
		postEventMemberApprovalTestcases.movePostByModeratorPostListingCheckbox();

		// method to create a topic
		postEventMemberApprovalTestcases.createTopic();

		// method to move a pending post from- Approval queue all Checkbox by a moderator
		postEventMemberApprovalTestcases.movePostByModeratorApprovalQueueAllCheckbox();

		// method to create a topic
		postEventMemberApprovalTestcases.createTopic();

		// method to move a pending post -By clicking on topic all Checkbox by a moderator
		postEventMemberApprovalTestcases.movePostByModeratorPostListingAllCheckbox();

	});
};

postEventMemberApproval.eventTest = function() {

		casper.start(config.backEndUrl, function() {

			utils.info(" Title of the page :"+this.getTitle());
			forumLoginMethod.loginToForumBackEnd();

		}).then(function() {

		// method to Approve a pending event -Approval queue button
		/*postEventMemberApprovalTestcases.eventApprovalByApprovalQueueButton();

		// method to Approve a pending event -By clicking on topic
		postEventMemberApprovalTestcases.eventApprovalByClickingOnEvent();

		// method to Approve a pending event byselect the pending post by  check box
		postEventMemberApprovalTestcases.eventApprovalByCheckBox();

		// method to Approve a pending event by select all pending post by  check box
		postEventMemberApprovalTestcases.eventApprovalByCheckBoxAll();

		// method to Delete a pending event from- Approval queue button
		postEventMemberApprovalTestcases.eventdeleteByApprovalQueueButton();

		// method to Delete a pending event -By clicking on event
		postEventMemberApprovalTestcases.eventdeleteByClickingEvent();

		// method to Delete a pending event by select the pending post by  check box
		postEventMemberApprovalTestcases.eventdeleteByCheckBox();*/

		// method to Delete a pending event by select all pending post by  check box
		//postEventMemberApprovalTestcases.eventdeleteByAllCheckBox();

		// method to edit a pending event by clicking on it
		postEventMemberApprovalTestcases.eventEditByClickingOnIt();

	});
};

postEventMemberApproval.memberApprovalTest = function() {

	casper.on('log', function(data) {
		utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
	});

	casper.start(config.url, function() {
		utils.log("Title of the page :"+this.getTitle(),'INFO');

		// method to Approve a pending user from- Approval queue button
		postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButton();

		// method to Approve a pending user -By clicking on  user name
		postEventMemberApprovalTestcases.memberApprovalByClickingOnUsername();

		// method to Approve a pending user-by  Searching pending User
		postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUser();

		// method to Approve a single user by selecting a checkbox
		postEventMemberApprovalTestcases.memberApprovalBySelectingCheckbox();

		// method to Approve All user by selecting the checkbox appearing on the top right corner
		postEventMemberApprovalTestcases.memberApprovalBySelectingRightCornerCheckbox();

		// method to Approve pending member by searching it from advance search
		postEventMemberApprovalTestcases.memberApprovalByAdvanceSearch();

		// method to Approve a pending user from- Approval queue button for backend setting two
		postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingTwo();

		// method to Approve a pending user-by  Searching pending User Setting Two
		postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUserSettingTwo();

		// method to Approve pending member by searching it from advance search for backend setting two
		postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingTwo();

		// method to Approve a pending user from- Approval queue button for backend setting three
		postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingThree();

		// method to Approve a pending user-by  Searching pending User Setting Three
		postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUserSettingThree();

		// method to Approve pending member by searching it from advance search for backend setting three
		postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingThree();

		// method to Approve a pending user from- Approval queue button for backend setting Four
		postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingFour();

		// method to Approve a pending user-by  Searching pending User Setting four
		postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUserSettingFour();

		// method to Approve pending member by searching it from advance search for backend setting Four
		postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingFour();

		// method to Approve a pending user from- From Default User Groups (by check box)
		postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckbox();

		// method to Approve a pending user From Default User Groups (by buttons)
		postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByButtons();

		// method to Approve a pending user from Change a User's User Group(approve button)
		postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupApproveButton();

		// method to Approve a pending user from Change a User's User Group(change group)
		postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroup();

		// method to Approve a pending user from- From Default User Groups (by check box) for backend setting two
		postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckboxSettingTwo();

		// method to Approve a pending user from Change a User's User Group(change group) for setting two
		postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingTwo();

		// method to Approve a pending user from- From Default User Groups (by check box) for backend setting three
		postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckboxSettingThree();

		// method to Approve a pending user from Change a User's User Group(change group) for setting three
		postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingThree();

		// method to Approve a pending user from Change a User's User Group(change group) for setting four
		postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingFour();

	});
};

postEventMemberApproval.memberDeletionTest = function() {

	casper.on('log', function(data) {
		utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
	});

	casper.start(config.url, function() {
		utils.log("Title of the page :"+this.getTitle(),'INFO');

		// method to Delete a pending user from- Approval queue button
		postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButton();

		// method to Delete a pending user -By clicking on  user name
		postEventMemberApprovalTestcases.deleteMemberByClickingOnUsername();

		// method to Delete a pending user-by  Searching pending User
		postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUser();

		// method to Delete a single user by selecting a checkbox
		postEventMemberApprovalTestcases.deleteMemberBySelectingCheckbox();

		// method to Delete All user by selecting the checkbox appearing on the top right corner
		postEventMemberApprovalTestcases.deleteMemberBySelectingRightCornerCheckbox();

		// method to Delete a pending user from- Approval queue button for backend setting two
		postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingTwo();

		// method to Delete a pending user-by  Searching pending User for backend setting two
		postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingTwo();

		// method to Delete a pending user from- Approval queue button for backend setting three
		postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingThree();

		// method to Delete a pending user-by  Searching pending User for backend setting three
		postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingThree();

		// method to Delete a pending user from- Approval queue button for backend setting four
		postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingFour();

		// method to Delete a pending user-by  Searching pending User for backend setting four
		postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingFour();

		// method to Delete a pending user from- From Default User Groups (by check box)
		postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckbox();

		// method to Delete a pending user From Default User Groups (by buttons)
		postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtons();

		// method to Delete a pending user from Change a User's User Group(Delete button)
		postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButton();

		// method to Delete a pending user from- From Default User Groups (by check box) for backend setting two
		postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckboxSettingTwo();

		// method to Delete a pending user from Change a User's User Group(delete button) for setting two
		postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButtonSettingTwo();

		// method to Delete a pending user From Default User Groups (by buttons) for setting two
		postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtonsSettingTwo();

		// method to Delete a pending user from- From Default User Groups (by check box) for backend setting three
		postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckboxSettingThree();

		// method to Delete a pending user From Default User Groups (by buttons) for setting three
		postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtonsSettingThree();

		// method to Delete a pending user from Change a User's User Group(change group) for setting three
		postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupChangeGroupSettingThree();

		// method to Delete a pending user from Change a User's User Group(delete button) for setting three
		postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButtonSettingThree();

		// method to Delete a pending user for setting four
		postEventMemberApprovalTestcases.deleteMemberSettingFour();
	});
};
