//----- This js file covers all the valid and invalid Test scenarios for Moderator Permissions functionality --------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var moderatorPermissionsTestcases = require('../cases/moderatorPermissions.js');

var moderatorPermissions = module.exports = {};

moderatorPermissions.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to delete all the categories from backend
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();

		// method to create a category General
		moderatorPermissionsTestcases.createCategoryTestCase();

    // method to Verfiy with Add a moderator for category(cat1) by scenario 1
    moderatorPermissionsTestcases.addModeratorByScenarioOne();

    // method to Verfiy with Add a moderator for category(cat1) by scenario 2
    moderatorPermissionsTestcases.addModeratorByScenarioTwo();

    // method to Verfiy with delete a moderator for category(cat1)
    moderatorPermissionsTestcases.deleteModerator();

    // method to verify with add same moderator in two different category(cat1 and cat 2) by scenario 1
  	moderatorPermissionsTestcases.verifyAddModeratorInTwoDifferentCategoryByScenarioOne();

		// method to verify with add same moderator in two different category(cat1 and cat 2) by scenario 2
		moderatorPermissionsTestcases.verifyAddModeratorInTwoDifferentCategoryByScenarioTwo();

    // method to verify with delete moderator"when same moderator added in two different category -> "from this category(cat1)"
    moderatorPermissionsTestcases.deleteModeratorFromThisCategory();

		// method to Verfiy with Add a moderator for category(cat1) by scenario 1
    moderatorPermissionsTestcases.addModeratorByScenarioOne();

    // method to verify with delete moderator"when same moderator added in two different category -> "from all category(cat1)"
    moderatorPermissionsTestcases.deleteModeratorFromAllCategory();

		// method to Verfiy with Add a moderator for category(cat1) by scenario 1
    moderatorPermissionsTestcases.addModeratorByScenarioOne();

    // method to verify with member title (without html tags)
    moderatorPermissionsTestcases.memberTitleWithoutTag();

		// method to verify with remove moderator title
    moderatorPermissionsTestcases.removeModeratorTitle();

		// method to verify with member title (add html tags)
		moderatorPermissionsTestcases.memberTitleWithTag();

		// method to Verify by edit post from category(cat1)
		moderatorPermissionsTestcases.verifyDisableEditPostForModeratorCategory();

		// method to Verify by edit post from other category
		moderatorPermissionsTestcases.verifyDisableEditPostForOtherCategory();

		// method to Verify by edit post from category(cat1)
		//moderatorPermissionsTestcases.verifyEnableEditPostForModeratorCategory();

		// method to Verify by edit post from other category
		moderatorPermissionsTestcases.verifyEnableEditPostForOtherCategory();

		// method to verify with delete post by drop down by cat1 Disable
		moderatorPermissionsTestcases.verifyDisableDeletePostForModeratorCategory();

		// method to Verify by delete post from other category by drop down Disable
		moderatorPermissionsTestcases.verifyDisableDeletePostForOtherCategory();

		// method to Verify by delete One post from category(cat1) by check box Disable
		moderatorPermissionsTestcases.verifyDisableDeleteOnePostForModeratorCategoryByCheckbox();

		// method to Verify by delete One topic from category(cat1) by check box Disable
		moderatorPermissionsTestcases.verifyDisableDeleteOneTopicForModeratorCategoryByCheckbox();

		// method to Verify by delete all topic from other category by check box Disable
		moderatorPermissionsTestcases.verifyDisableDeleteAllTopicForModeratorCategoryByCheckbox();

		// method to Verify by delete post from other category by by check box Disable
		moderatorPermissionsTestcases.verifyDisableDeleteTopicForOtherCategoryByCheckbox();

		// method to Verify by delete post from category(cat1)
		moderatorPermissionsTestcases.verifyEnableDeletePostForModeratorCategory();

		// method to Verify by delete post from category(cat1)
		moderatorPermissionsTestcases.verifyEnableDeletePostForOtherCategory();

		// method to verify with delete post from cat1 by select one post by check box
		moderatorPermissionsTestcases.verifyEnableDeleteOnePostForModeratorCategoryByCheckbox();

		// method to verify with delete topic from cat1 by select one post by check box
		moderatorPermissionsTestcases.verifyEnableDeleteOneTopicForModeratorCategoryByCheckbox();

		// method to verify with delete all topic from cat1 by select one post by check box
		moderatorPermissionsTestcases.verifyEnableDeleteAllTopicForModeratorCategoryByCheckbox();

		// method to verify with delete topic from other category by select one post by check box
		moderatorPermissionsTestcases.verifyEnableDeleteTopicForOtherCategoryByCheckbox();

		// method to verify by move post from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisableMovePostForModeratorCategory();

		// method to verify by move post from other category Disable
		moderatorPermissionsTestcases.verifyDisableMovePostForOtherCategory();

		// method to verify with move post from cat1 by select one post by check box Disable
		moderatorPermissionsTestcases.verifyDisableMoveOnePostForModeratorCategoryByCheckbox();

		// method to verify by move topic from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisableMoveOneTopicForModeratorCategoryByCheckbox();

		// method to verify by move all topic from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisableMoveAllTopicForModeratorCategoryByCheckbox();

		// method to verify by move topic from other category disable
		moderatorPermissionsTestcases.verifyDisableMoveTopicForOtherCategoryByCheckbox();

		// method to verify by move post from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableMovePostForModeratorCategory();

		// method to verify by move post from other category Enable
		moderatorPermissionsTestcases.verifyEnableMovePostForOtherCategory();

		// method to verify with move post from cat1 by select one post by check box Enable
		moderatorPermissionsTestcases.verifyEnableMoveOnePostForModeratorCategoryByCheckbox();

		// method to verify by move topic from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableMoveOneTopicForModeratorCategoryByCheckbox();

		// method to verify by move all topic from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableMoveAllTopicForModeratorCategoryByCheckbox();

		// method to verify by move topic from other category enable
		moderatorPermissionsTestcases.verifyEnableMoveTopicForOtherCategoryByCheckbox();

		// method to verify by lock topic from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableLockTopicForModeratorCategory();

		// method to verify by lock topic from other category Enable
		moderatorPermissionsTestcases.verifyEnableLockTopicForOtherCategory();

		// method to verify by Lock Topic from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisableLockTopicForModeratorCategory();

		// method to verify by Lock Topic from other category Disable
		moderatorPermissionsTestcases.verifyDisableLockTopicForOtherCategory();

		// method to verify by Pin topic from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnablePinTopicForModeratorCategory();

		// method to verify by Pin topic from other category Enable
		moderatorPermissionsTestcases.verifyEnablePinTopicForOtherCategory();

		// method to verify with Pin topic from cat1 by check box Enable
		moderatorPermissionsTestcases.verifyEnablePinTopicForModeratorCategoryByCheckbox();

		// method to verify by Pin Topic from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisablePinTopicForModeratorCategory();

		// method to verify by pin Topic from other category Disable
		moderatorPermissionsTestcases.verifyDisablePinTopicForOtherCategory();

		// method to verify with Pin topic from cat1 by check box Disable
		moderatorPermissionsTestcases.verifyDisablePinTopicForModeratorCategoryByCheckbox();

		// method to verify by Add Poll from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableAddPollForModeratorCategory();

		// method to verify by Add Poll from other category Enable
		moderatorPermissionsTestcases.verifyEnableAddPollForOtherCategory();

		// method to verify by Add Poll from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisableAddPollForModeratorCategory();

		// method to verify by Edit Poll from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableEditPollForModeratorCategory();

		// method to verify by Edit Poll from other category enable
		moderatorPermissionsTestcases.verifyEnableEditPollForOtherCategory();

		// method to verify by Edit Poll from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisableEditPollForModeratorCategory();

		// method to verify by Edit Poll from other category Disable
		moderatorPermissionsTestcases.verifyDisableEditPollForOtherCategory();

		// method to verify by Delete Poll from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableDeletePollForModeratorCategory();

		// method to verify by Delete Poll from other category enable
		moderatorPermissionsTestcases.verifyEnableDeletePollForOtherCategory();

		// method to verify by Add Poll from category(cat1) Enable
		moderatorPermissionsTestcases.verifyEnableAddPollForModeratorCategory();

		// method to verify by Delete Poll from category(cat1) Disable
		moderatorPermissionsTestcases.verifyDisableDeletePollForModeratorCategory();

		// method to verify by Delete Poll from other category Disable
		moderatorPermissionsTestcases.verifyDisableDeletePollForOtherCategory();

		// method to Verfiy with delete a moderator for category(cat1)
		moderatorPermissionsTestcases.deleteModerator();

  });
};
