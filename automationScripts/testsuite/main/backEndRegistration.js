
//----- This js file covers all the valid and invalid scenarios for Backend Registration functionality from home page---------//

'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var config = require('../../../config/config.json');
var backEndForumRegisterTests = require('../cases/backEndRegistration.js');
var backEndForumRegisterMethod  = require('../methods/backEndRegistration.js');
var wait = require('../wait.js');
var backEndForumRegister= module.exports = {};


backEndForumRegister.featureTest = function(casper, test) {
	
	//Test Case for Login To Application And Verify Error Messages While User Registering With Blank User Name.
	
	backEndForumRegisterTests.VerifyingErrorMessagesWithBlankUserName();

	//Test Case for Verify Error Messages While User Registering With Blank EmailId.
	
	backEndForumRegisterTests.VerifyingErrorMessagesWithBlankUserEmail();
	
	
	//Test Case for Verify Error Messages While User Registering With Existing UserName.
	
	backEndForumRegisterTests.VerifyingErrorMessagesWithExistingUserName();
	

	//Test Case for Verify Error Messages While User Registering With Invalid Email Id.
	
	backEndForumRegisterTests.VerifyingErrorMessagesWithInvalidEmailId();
	
	//Test case for Register User With Valid Information.
	
	backEndForumRegisterTests.registerToBackEndWithValidInfo();
	
};
