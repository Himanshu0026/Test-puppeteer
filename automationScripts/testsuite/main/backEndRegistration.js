
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
	casper.echo('*****************************Case1**********************************','INFO');
	casper.echo('Verifying Error Messages While User Registering With Blank User Name','INFO');
	backEndForumRegisterTests.VerifyingErrorMessagesWithBlankUserName();

	//Test Case for Verify Error Messages While User Registering With Blank EmailId.
	casper.then(function(){
		casper.echo('*****************************Case2********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank EmailId','INFO');
		backEndForumRegisterTests.VerifyingErrorMessagesWithBlankUserEmail();
	});
	
	//Test Case for Verify Error Messages While User Registering With Existing UserName.
	casper.then(function(){
		casper.echo('*****************************Case3************************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Existing UserName','INFO');
		backEndForumRegisterTests.VerifyingErrorMessagesWithExistingUserName();
	});

	//Test Case for Verify Error Messages While User Registering With Invalid Email Id.
	casper.then(function(){
		casper.echo('*****************************Case4***********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Invalid Email Id','INFO');
		backEndForumRegisterTests.VerifyingErrorMessagesWithInvalidEmailId();
	});
	//Test case for Register User With Valid Information.
	casper.then(function(){
		casper.echo('*****************************Case5**********************************','INFO');
		casper.echo('Register User With Valid Information','INFO');
		backEndForumRegisterTests.registerToBackEndWithValidInfo();
	});
	
};
