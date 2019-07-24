//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var thumpsUpDownJSON = require('../../testdata/thumpsUpDown.json');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var forumLoginMethod = require('../methods/login.js');
var thumpsUpDown = module.exports = {};

thumpsUpDown.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// method to verify the thumbs up and down for guest user(unregister user)
		thumpsUpDownTestcases.unregisterUserOnPostListingPageLikeDislike();

		// method to verify try to like/dislike a post of guest user  as a register user
		thumpsUpDownTestcases.likeDislikePostOfUnregisteredUserByRegisterUser();

		// call method to verify the thumbs up and down for (register user) on Topic listing page
		thumpsUpDownTestcases.registerUserOnPostListingPageLike(thumpsUpDownJSON.registeredUserLogin);

		// Metod To verify the counter of thumbs down
		thumpsUpDownTestcases.verifyDecreasedCountAndIncreasedCount();

		//4. method to verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER
		//28. method to verify likers/dislikers list
		thumpsUpDownTestcases.clickOnLikersUsername();

		//5. method to verify with click on likers/dislikers username when disable view profile permission ->AS A Moderator
		thumpsUpDownTestcases.clickOnLikersUsernameByModerator();

		// method to verify When registered/moderator user click on link of own name from voter list. when disable view profile permission
		thumpsUpDownTestcases.clickOnOwnName();

		// method To verify the reputation functionality of back end(disable)"
		thumpsUpDownTestcases.verifyReputationTab();

		//Method To verify the user account off case
		thumpsUpDownTestcases.verifyUserAccountOffCase();

		//18. Method To verify user reputation
		//14. Method to verify the functionality of reputation on profile page
		thumpsUpDownTestcases.verifyReputation();

		// Method To verify the forget pass word link of pop up window
		thumpsUpDownTestcases.verifyForgotPasswordLink();

		// Method "to verify create account link on pop up window when new registration is disable"
		thumpsUpDownTestcases.verifyCreateAccountInPopUp();

		// method to delete all the categories from backend
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		// 30 verify combine all forum.
		thumpsUpDownTestcases.verifyCombineAllForum();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();

	});
};
