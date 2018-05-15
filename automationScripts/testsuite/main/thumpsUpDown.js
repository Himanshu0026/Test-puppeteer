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

		// Test case to set up all the backend setting for registration task
		//thumpsUpDownTestcases.registrationBackendSetting();

		// method to register two user neha and isneha
		//thumpsUpDownTestcases.registerUserTOLogin();

		// method to create a category General
		//thumpsUpDownTestcases.createCategoryTestCase();

		// method to verify the thumbs up and down for guest user(unregister user)
		thumpsUpDownTestcases.unregisterUserOnPostListingPageLikeDislike();

		// method to verify try to like/dislike a post of guest user  as a register user
		thumpsUpDownTestcases.likeDislikePostOfUnregisteredUserByRegisterUser();

		// method to verify like/dislike a post of guest user  as a pending email verification user
		//thumpsUpDownTestcases.emailVerificationUserOnPostListingPage();

		// call method to verify the thumbs up and down for (register user) on Topic listing page
		thumpsUpDownTestcases.registerUserOnPostListingPageLike(thumpsUpDownJSON.registeredUserLogin);

		//4. method to verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER
		//28. method to verify likers/dislikers list
		thumpsUpDownTestcases.clickOnLikersUsername();

		//5. method to verify with click on likers/dislikers username when disable view profile permission ->AS A Moderator
		thumpsUpDownTestcases.clickOnLikersUsernameByModerator();

		// method to verify When registered/moderator user click on link of own name from voter list. when disable view profile permission
		thumpsUpDownTestcases.clickOnOwnName();

		// method To verify the functionality of reputation tab which is showing in profile page-
		thumpsUpDownTestcases.clickReputationTab();

		// method To verify the reputation functionality of back end(disable)"
		thumpsUpDownTestcases.verifyReputationTab();

		// Method to Verify  with the increasing  order of count
		thumpsUpDownTestcases.verifyIncreasedCount();

		// Metod To verify the counter of thumbs down
		thumpsUpDownTestcases.verifyDecreasedCount();

		// method To verify the counter when user click on 2 times of thumbs up link
		thumpsUpDownTestcases.verifyTwoTimesClickOnLike();

		// Method To verify the colour of like/dislike link
		//thumpsUpDownTestcases.verifyColour();

		//Method To verify the user account off case
		thumpsUpDownTestcases.verifyUserAccountOffCase();

		//18. Method To verify user reputation
		//14. Method to verify the functionality of reputation on profile page
		thumpsUpDownTestcases.verifyReputation();

		// Method To verify the like/unlike icon in guest user
		//To verify with log in pop up
		//To verify the login button
		thumpsUpDownTestcases.verifyLikeIconForGuestUser();

		// Method To verify the forget pass word link of pop up window
		thumpsUpDownTestcases.verifyForgotPasswordLink();

		// Method "to verify create account link on pop up window when new registration is disable"
		thumpsUpDownTestcases.verifyCreateAccountInPopUp();

		// Method To verify reputaion count of fb user
		//thumpsUpDownTestcases.reputationCountFbUser();

	});
};

thumpsUpDown.featureTest2 = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// 29. Method to verify like list of fb user
		//thumpsUpDownTestcases.verifyListByFbUsers();

	});
};

thumpsUpDown.featureTest3 = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

	}).then(function() {

		// 31 Method To verify reputaion link on profile page when reputation is off for fb user
		//thumpsUpDownTestcases.verifyReputationOnFbUserProfileWhenDisabled();

		// method to delete all the categories from backend
		thumpsUpDownTestcases.deleteAllCategoriesTestCase();

		// 30 verify combine all forum.
		thumpsUpDownTestcases.verifyCombineAllForum();

		// method to create a category General
		thumpsUpDownTestcases.createCategoryTestCase();
	});
};
