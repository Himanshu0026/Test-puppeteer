var config = require("../config/config.json");
var utils = require('./testsuite/utils.js');
casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
casper.options.waitTimeout = config.app.waitTimeout;
var jsErrorCount = 0;
var commitId = casper.cli.get('commitId');
var branchName = casper.cli.get('branchName');

var feature = casper.cli.get('feature');
feature = feature.split(' ');
utils.info(' feature: ' +feature[0]+ ' subFeature: ' +feature[1]);
if(feature[0]){
	utils.info(' Started testing for the feature: ' + feature +'\n');
}else{
	utils.info(' It seems, you have not given any option.');
}

if((feature[0] == "defaultOption" || feature[0] == "thumpsUpDown") && typeof feature[1] == "undefined") {
	utils.info('you must enter subFeature ');
}

switch (feature[0]) {

	case "oo_script":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify OO Script functionality with all valid and invalid scenarios ', function(test) {
			var ooScript = require("./testsuite/main/ooScript.js");
			ooScript.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});

	break;

	case "login":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify login functionality from home page with all valid and invalid scenarios ', function(test) {
			var forumLogin = require("./testsuite/main/login.js");
			forumLogin.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});

	break;

  case "forgotPassword":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify forgot password functionality from home page with all valid and invalid scenarios ', function(test) {
			var forgotPassword = require("./testsuite/main/forgotPassword.js");
			forgotPassword.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "backEndRegistration":
		casper.test.begin(branchName+ ' : ' + commitId + ' BACK END REGISTRATION TEST', function(test) {
			var backEndRegister = require("./testsuite/main/backEndRegistration.js");
			backEndRegister.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

  case "inContextLogin":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify inContext Login functionlity',function(test){
			var inContextLogin=require("./testsuite/main/inContextLogin.js");
			inContextLogin.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "loginByPrivacyOption":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify LoginByPrivacyOption functionality', function(test) {
			var loginByPrivacyOption = require("./testsuite/main/loginByPrivacyOption.js");
			loginByPrivacyOption.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});

	break;

case "messagePreview" :
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify messagePreview functionality', function(test) {
			var messagePreview = require("./testsuite/main/messagePreview.js");
			messagePreview.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});

	break;

	case "register":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify registration functionality from home page with all valid and invalid scenarios', function(test) {
			var register = require("./testsuite/main/register.js");
			register.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "incontextRegistration":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify incontext registration functionality from home page with all valid and invalid scenarios', function(test) {
			var incontextRegistration = require("./testsuite/main/incontextRegistration.js");
			incontextRegistration.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "thumpsUpDown":
		var subFeature = feature[1];

		switch(subFeature) {
			case "featureTest" :
				casper.test.begin(branchName+ ' : ' + commitId + ' Verify thumps up and down functionality from home page with all valid and invalid scenarios', function(test) {
					var thumpsUpDown = require("./testsuite/main/thumpsUpDown.js");
					thumpsUpDown.featureTest();
					casper.run(function(){
						utils.displayError();
						test.done();
					});
				});
			break;
			case "featureTest2" :
				casper.test.begin(branchName+ ' : ' + commitId + ' Verify thumps up and down functionality from home page with all valid and invalid scenarios', function(test) {
					var thumpsUpDown = require("./testsuite/main/thumpsUpDown.js");
					thumpsUpDown.featureTest2();
					casper.run(function(){
						utils.displayError();
						test.done();
					});
				});
			break;
			case "featureTest3" :
				casper.test.begin(branchName+ ' : ' + commitId + ' Verify thumps up and down functionality from home page with all valid and invalid scenarios', function(test) {
					var thumpsUpDown = require("./testsuite/main/thumpsUpDown.js");
					thumpsUpDown.featureTest3();
					casper.run(function(){
						utils.displayError();
						test.done();
					});
				});
			break;
				default:
				 	utils.info("Please select any sub feature from options given below. For ex: casperjs test automation.js --feature = '<option> <option>'.\n");
					utils.info('featureTest');
					utils.info('featureTest2');
					utils.info('featureTest3');
					casper.exit();
		}
	break;

	case "postEventMemberApproval":
		casper.test.begin('Verify post, Event and Member Approval functionality from home page with all valid and invalid scenarios ', function(test) {
			var postEventMemberApproval = require("./testsuite/main/postEventMemberApproval.js");
			postEventMemberApproval.featureTest(casper, casper.test);
			casper.run(function(){
				test.done();
			});
		});
	break;

	case "combinationOfCategoryAndGroupPermissions":
		casper.test.begin('Verify Combination of Category and Group Permission functionality from home page with all valid and invalid scenarios ', function(test) {
			var combinationOfCategoryAndGroupPermissions = require("./testsuite/main/combinationOfCategoryAndGroupPermission.js");
			combinationOfCategoryAndGroupPermissions.pendingUserTest(casper, casper.test);
			casper.run(function(){
				test.done();
			});
		});
	break;

	case "privateMessage":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify privateMessage functionality from home page with all valid and invalid scenarios ', function(test) {
			var privateMessage = require("./testsuite/main/privateMessage.js");
			privateMessage.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});

		});
	break;

	case "profilePage" :
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify ProfilePage functionality', function(test) {
			var profilePage = require("./testsuite/main/profilePage.js");
			profilePage.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});

	break;

	case "editProfilePage":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify EditProfilePage functionality', function(test){
			var editProfilePage = require("./testsuite/main/editProfilePage.js");
			editProfilePage.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "deletePost" :
		casper.test.begin('Verify deletePost functionality', function(test) {
			var deletePost = require("./testsuite/main/deletePost.js");
			deletePost.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "editPost" :
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify EditPost functionality', function(test) {
			var editPost = require("./testsuite/main/editPost.js");
			editPost.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "insertEmoticans" :
		casper.test.begin('Verify insertEmoticans functionality', function(test) {
			var insertEmoticans = require("./testsuite/main/insertEmoticans.js");
			insertEmoticans.featureTest(casper, casper.test);
			casper.run(function(){
				test.done();
			});
		});

	break;

	case "defaultOption":
		var subFeature = feature[1];
		console.log("subFeature: " +subFeature);

		switch(subFeature) {

			case "blankData" :
				casper.test.begin(commitId + ' Back end Setting with Default Registration Options and Verify Front end Edit profile Page  with respected to blank data ', function(test) {
					var defaultOption = require("./testsuite/main/defaultOption.js");
					defaultOption.blankData(casper, casper.test);
					casper.run(function(){
						if(defaultOption.errors.length) {
								utils.log(' ' +defaultOption.errors.length + ' javaScript errors found', 'ERROR');
							jsErrorCount = jsErrorCount + defaultOption.errors.length;
						}else {
								utils.log(' ' +defaultOption.errors.length+' javascript errors found', 'INFO');
						}
						test.done();
						test.assert(true);
					});
				});
			break;

			case "enableDisableEditPage" :
				casper.test.begin(commitId + ' Back end Setting with Default Registration Options and Verify front End On Edit Pofile Page', function(test) {
					var defaultOption = require("./testsuite/main/defaultOption.js");
					defaultOption.enableDisableEditPage(casper, casper.test);
					casper.run(function(){
						if(defaultOption.errors.length) {
								utils.log(' ' +defaultOption.errors.length + ' javaScript errors found', 'ERROR');
							jsErrorCount = jsErrorCount + defaultOption.errors.length;
						}else {
								utils.log(' ' +defaultOption.errors.length+' javascript errors found', 'INFO');
						}
						test.done();
						test.assert(true);
					});
				});
			break;

			case "blankDataRegistration" :
				casper.test.begin(commitId + ' Back end Setting with Default Registration Options and Verify front end Registration with respected to blank data ', function(test) {
					var defaultOption = require("./testsuite/main/defaultOption.js");
					defaultOption.blankDataRegistration(casper, casper.test);
					casper.run(function(){
						if(defaultOption.errors.length) {
								utils.log(' ' +defaultOption.errors.length + ' javaScript errors found', 'ERROR');
							jsErrorCount = jsErrorCount + defaultOption.errors.length;
						}else {
								utils.log(' ' +defaultOption.errors.length+' javascript errors found', 'INFO');
						}
						test.done();
						test.assert(true);
					});
				});
			break;

			case "enableDisableRegistration" :
				casper.test.begin(commitId + ' Back end Setting with Default Registration Options and Verify front End  Registration page Field Disable/Enable ', function(test) {
					var defaultOption = require("./testsuite/main/defaultOption.js");
					defaultOption.enableDisableRegistration(casper, casper.test);
					casper.run(function(){
						if(defaultOption.errors.length) {
								utils.log(' ' +defaultOption.errors.length + ' javaScript errors found', 'ERROR');
							jsErrorCount = jsErrorCount + defaultOption.errors.length;
						}else {
								utils.log(' ' +defaultOption.errors.length+' javascript errors found', 'INFO');
						}
						test.done();
						test.assert(true);
					});
				});
			break;
		}
	break;

	case "oldThemeJsErrors":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify oldT heme JsErrors functionlity',function(test){
			var oldThemeJsErrors=require("./testsuite/main/oldThemeJsErrors.js");
			oldThemeJsErrors.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	default:
		casper.echo("Please select any feature from options given below. For ex: casperjs test automation.js --feature = <option>.\n");
        	casper.echo("Options:");
					casper.echo("backEndRegistration");
					casper.echo("defaultOption blankData");
					casper.echo("defaultOption enableDisableEditPage");
					casper.echo("defaultOption blankDataRegistration");
					casper.echo("defaultOption enableDisableRegistration");
					casper.echo("forgotPassword");
					casper.echo("inContextLogin");
					casper.echo("profilePage");
        	casper.echo("login");
					casper.echo("incontextRegistration");
      		casper.echo("loginByPrivacyOption");
					casper.echo("thumpsUpDown featureTest");
					casper.echo("thumpsUpDown featureTest2");
					casper.echo("thumpsUpDown featureTest3");
					casper.echo("register");
        	casper.echo("privateMessage");
        	casper.echo("postEventMemberApproval");
					casper.echo("oldThemeJsErrors");
					casper.exit();
}
