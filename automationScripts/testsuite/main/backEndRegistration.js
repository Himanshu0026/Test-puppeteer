
//----- This js file covers all the valid and invalid scenarios for Backend Registration functionality from home page---------//

'use strict.';
var config = require('../../../config/config.json');
var backEndForumRegisterTests = require('../cases/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var utils = require('../utils.js');
var backEndForumRegister= module.exports = {};

backEndForumRegister.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

  }).then(function() {

		//Verify Error Messages While User Registering With Blank User Name.
		//Verify Error Messages While User Registering With Blank EmailId.
		//Verify Error Messages While User Registering With Invalid Email Id.
		//Register User With Blank Password So That Later User Choose There Own Password.
		//Register User With Valid Information.
		//Verify Error Messages While User Registering With Existing UserName.
		//Register User With Existing EmailId.

		backEndForumRegisterTests.doRegister();

	}).then(function() {

		//Inviting User By Valid Email Address.
		//Inviting User By Entering Invalid Address.

		backEndForumRegisterTests.validInvitation();

	});

};
