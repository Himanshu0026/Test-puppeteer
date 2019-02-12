//----- This js file covers all the editProfilePage functionality on forum Frontend---------//
'use strict.';
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var profilePageTests = require('../cases/profilePage.js');
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
	//editProfilePageTests.deleteSignature();
	//Disable CustomTitle  for Registered user from group Permission
	editProfilePageTests.disableCustomTitle();
	//Verify by add a custom user title.
	editProfilePageTests.enableCustomTitle();
	//Verify with edit custom member title.
	editProfilePageTests.editCustomTitle();
	//Verify the shield icon for registered user  on edit profile page
	//Verify the tool tip on the shield icon
	editProfilePageTests.shieldIcon();
	//Verify the shield icon for registered user  on edit profile page by the admin
	editProfilePageTests.shieldIconRegisteruser();
	//Verify with invalid birthday(future year)
	//verify with invalid birthday(future month)
	//verify with enter full name greater then maximum limits(30)
	editProfilePageTests.invalidBirthday();
	//Verify with none option in instant message, Aim, Jabber
	editProfilePageTests.instantMsg();
	});
};
