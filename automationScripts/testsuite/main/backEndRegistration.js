
//----- This js file covers all the valid and invalid scenarios for Backend Registration functionality from home page---------//

'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var config = require('../../../config/config.json');
var backEndForumRegisterTests = require('../cases/backEndRegistration.js');
var backEndForumRegisterMethod  = require('../methods/backEndRegistration.js');
var wait = require('../wait.js');
var backEndForumRegister= module.exports = {};


backEndForumRegister.featureTest = function(casper, test) {
	
	casper.start(config.backEndUrl, function() {
		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');

		//test case for login to application with invalid password and verify error message
		casper.echo('Test cases for Verifying Error Messages While User Registering With Invalid Info ','INFO');
		backEndForumRegisterTests.VerifyingErrorMessagesWithInValidInfo();

		//test case for Register User With Valid Info.
		casper.then(function(){
			casper.echo('Test case for Register User With Valid Info','INFO');
			backEndForumRegisterTests.registerToBackEndWithValidInfo();
		});
	});
};
