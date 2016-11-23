'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var config = require('../../../config/config.json');
var forumRegister = require('../register.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var backEndForumRegisterTests = module.exports = {};
var wait = require('../wait.js');

//Method To Verifying Error Messages While User Registering With Invalid Info.

backEndForumRegisterTests.VerifyingErrorMessagesWithInValidInfo = function() {
	
	forumRegister.loginToForumBackEnd(casper, casper.test, function(err) {
		if(!err){
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			//Clicking On 'New User' Tab Under Users 
			wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper, function(err, isExist) {	
				if(!err){
					if(isExist) {
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/addusers"]');
						casper.click('div#ddUsers a[href="/tool/members/mb/addusers"]');

						//Fill Invalid Data For User Registration And Handle Errors 
						casper.eachThen(backEndRegisterJSON['invalidInfo'], function(response) {
							casper.log('Response Data : ' +JSON.stringify(response.data), 'INFO');
							var responseData = response.data;
							backEndForumRegisterMethod.registerToBackEnd(response.data, casper, function(err) {
								if (!err) {
									var errorMessage = '';
									var msgTitle = '';
									var expectedErrorMsg = '';
									if (response.data.expectedErrorMsg)
										expectedErrorMsg = response.data.expectedErrorMsg;
									if (response.data.uname == '') {
										errorMessage = casper.fetchText('.tooltip p');
										msgTitle = 'BlankUsername';
									} else if (response.data.uemail == '') {
										errorMessage = casper.fetchText('.tooltip p');
										msgTitle = 'BlankEmail';
									} else if (response.data.errorType == 'existWithName') {
										casper.wait(1000, function() {
											errorMessage = casper.fetchText('div[role="dialog"] div[id^="ui-id-"]');
											expectedErrorMsg = responseData.expectedErrorMsg+ '"' +responseData.uname+ '".';
											msgTitle = 'ExistUsername';
										});
									} else if (response.data.errorType == 'invalidEmail') {
										errorMessage = casper.fetchText('.tooltip p');
										msgTitle = 'InvalidEmail';
									}
									//Call Method For Verifying Error Messages
									casper.then(function() {
										if(errorMessage && errorMessage != "") {
											backEndForumRegisterMethod.verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper,function(err){
												if(!err){}
											});
										}
									});
								} 
							});
						});
					} else {
						casper.echo('Selector not found...........', ERROR);
					}	
				}
			});
		}
	});
};

//Method To Registering User With Valid Info..
backEndForumRegisterTests.registerToBackEndWithValidInfo = function() {

	backEndForumRegisterMethod.registerToBackEnd(backEndRegisterJSON['validInfo'], casper, function(err) {
		if (!err) {
			casper.echo('Processing to registration on forum back end.....', 'INFO');
			//Handling Logout And Redirecting To The Respective Page
			backEndForumRegisterMethod.redirectToBackEndLogout(casper, casper.test, function(err) {
				if(!err){}
			});
		} 
	});
};
