//----- This js file covers all the valid and invalid Test scenarios for Combination of category and group permission functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var combinationOfCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfCategoryAndGroupPermission.js');
var combinationOfCategoryAndGroupPermissions = module.exports = {};

casper.on("resource.requested", function(requestData, networkRequest){
	var str = requestData.url;
	var res = str.match('https://static.olark.com');
	if(res) {
		utils.log('request aborted for : ' + requestData.url, 'INFO');
		networkRequest.abort();
	}
});

combinationOfCategoryAndGroupPermissions.registerUserTest = function(test) {

	casper.on('log', function(data) {
			utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
		});

	casper.start(config.url, function() {
		utils.log("Title of the page :"+this.getTitle(),'INFO');

		// method to enable view forum for unregistered User
		combinationOfCategoryAndGroupPermissionsTestcases.enableViewForumForUnregisterdUser();

		// method to register users neha, isneha and isneha12
		combinationOfCategoryAndGroupPermissionsTestcases.registerUserTOLogin();

		// method to create a category and its sub category and get their id
		combinationOfCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory();

		// method to verify with category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory('Registered Users');

		// method to verify with the private category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory('Registered Users');

		// method to verify With SubCategory Of Disabled Category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory('Registered Users');

		// method to verify with other category, whether they are visible or not
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory('Registered Users');

		// method to verify private category on the compose page's drop down
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown('Registered Users');

		// method to verify with category cat1 When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable('Registered Users');

		// method to verify with other category When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable('Registered Users');

		// method to verify with category cat1 When Both Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable('Registered Users');

		// method to verify with "privacy" option for category from back end
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend('Registered Users');

		// method to verify with start new topic
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic('Registered Users');

		// method to Verify with click on start new topic button for private category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory('Registered Users');

		// method to Verify with click on start new topic button for  sub-category of private category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory('Registered Users');

		// method to Verify with click on start new topic button for  sub-category of private category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory('Registered Users');

		// method to verify start new topic with other categories
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory('Registered Users');

		// method to Verify with click on start new topic button for private category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable('Registered Users');

		// method to verify with other categories
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable('Registered Users');

		// method to Verify with click on start new topic when both permission disable
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable('Registered Users');

		// method to Verify with reply topics option for enabled catagory(cat1)
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic('Registered Users');

		// method to Verify with reply  on other users topics for disable catagory(cat1)
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory('Registered Users');

		// method to Verify with reply on own topics for disable catagory(cat1)
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory('Registered Users');

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup('Registered Users');

		// method to Verify with reply on subcategories topic for disable catagory(cat1)
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategory('Registered Users');

		// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroup('Registered Users');

		// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroup('Registered Users');

		// method to verify with the reply topic for all categories
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategory('Registered Users');

		// method to verify with start new topic and post a reply for enabled category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled('Registered Users');

		// method to verify with start new topic and post a reply for sub categoryof enabled category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory('Registered Users');

		// method to verify with start new topic and post a reply for disabled category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory('Registered Users');

		// method to verify with start new topic and post a reply for enabled category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup('Registered Users');

		// method to verify with start new topic and post a reply for other category
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory('Registered Users');

		// method to verify with the post approval for all categories
		//combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup('Registered Users');

	});
};

combinationOfCategoryAndGroupPermissions.pendingUserTest = function(test) {

	casper.on('log', function(data) {
			utils.log(' ['+data.level+'] [phantomjs] '+data.message, 'DEBUG');
		});

	casper.start(config.url, function() {
		utils.log("Title of the page :"+this.getTitle(),'INFO');

		// method to verify with category cat1
		/*combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory('Pending Approval');

		// method to verify with the private category cat1
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory('Pending Approval');

		// method to verify With SubCategory Of Disabled Category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory('Pending Approval');

		// method to verify with other category, whether they are visible or not
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory('Pending Approval');

		// method to verify private category on the compose page's drop down
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown('Pending Approval');

		// method to verify with category cat1 When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable('Pending Approval');

		// method to verify with other category When Group Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable('Pending Approval');

		// method to verify with category cat1 When Both Permission Disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable('Pending Approval');

		// method to verify with "privacy" option for category from back end
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend('Pending Approval');*/

		// method to verify with start new topic
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic('Pending Approval');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory('Pending Approval');

		// method to Verify with click on start new topic button for  sub-category of private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory('Pending Approval');

		// method to verify start new topic with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory('Pending Approval');

		// method to Verify with click on start new topic button for private category
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable('Pending Approval');

		// method to verify with other categories
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable('Pending Approval');

		// method to Verify with click on start new topic when both permission disable
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable('Pending Approval');

		// method to Verify with reply topics option for enabled catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic('Pending Approval');

		// method to Verify with reply  on other users topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory('Pending Approval');

		// method to Verify with reply on own topics for disable catagory(cat1)
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory('Pending Approval');

		// method to Verify with reply on own topics for disable catagory(cat1) and disable group
		combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup('Pending Approval');

	});
};
