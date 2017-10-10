//----- This js file covers all the editProfilePage functionality on forum Frontend---------//
'use strict.';
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var editProfilePageTests = require('../cases/editProfilePage.js');
var editProfilePage = module.exports = {};


editProfilePage.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
	//Disable Signature  for Registered user from group Permission
	editProfilePageTests.editProfileDisableSignature();
	//Enable Signature  for Registered user from group Permission
	editProfilePageTests.editProfileEnableSignature();
	//verify with add a signature greater then maximum charecter(500) limits.
	editProfilePageTests.addSignatures();
	//verify with edit signature
	editProfilePageTests.editSignatures();
	//Verify with delete signature
	editProfilePageTests.deleteSignature();
	//Disable CustomTitle  for Registered user from group Permission
	editProfilePageTests.disableCustomTitle();
	//Enable CustomTitile for Registered user from group Permission
	editProfilePageTests.enableCustomTitle();
	//Verify the shield icon for registered user  on edit profile page
	editProfilePageTests.shieldIcon();
	//Verify the tool tip on the shield icon
	editProfilePageTests.toolTipShieldIcon();
	//Verify the shield icon for registered user  on edit profile page by the admin
	editProfilePageTests.shieldIconRegisteruser();
	//Verify with invalid birthday(future year)
	editProfilePageTests.invalidBirthday();
	//verify with invalid birthday(future month)
	editProfilePageTests.invalidFutureMonth();
	//verify with enter full name greater then maximum limits(30)
	editProfilePageTests.verifyFullName();

	});
};
