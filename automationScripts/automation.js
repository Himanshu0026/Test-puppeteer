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

if((feature[0] == "defaultOption") && typeof feature[1] == "undefined") {
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

	case "composeTopic" :
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify composeTopic functionality for start new topic from home page with all valid and invalid scenarios ', function(test) {
			var composeTopic = require("./testsuite/main/composeTopic.js");
			composeTopic.featureTest();
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

	case "thumpsUpDown":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify thumps up and down functionality from home page with all valid and invalid scenarios', function(test) {
			var thumpsUpDown = require("./testsuite/main/thumpsUpDown.js");
			thumpsUpDown.featureTest();
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

case "combinationOfSubCategoryAndGroupPermissions":
	var subFeature = feature[1];
	switch(subFeature) {
		case "registerUserTest":
			casper.test.begin(branchName+ ' : ' + commitId + 'Verify combination of sub category and group permission functionality from home page with all valid and invalid scenarios ', function(test) {
				var combinationOfSubCategoryAndGroupPermissions = require("./testsuite/main/combinationOfSubCategoryAndGroupPermissions.js");
				combinationOfSubCategoryAndGroupPermissions.registerUserTest();
				casper.run(function(){
					utils.displayError();
					test.done();
				});
			});
		break;
		case "unregisterUserTest":
			casper.test.begin(branchName+ ' : ' + commitId + 'Verify combination of sub category and group permission functionality from home page with all valid and invalid scenarios ', function(test) {
				var combinationOfSubCategoryAndGroupPermissions = require("./testsuite/main/combinationOfSubCategoryAndGroupPermissions.js");
				combinationOfSubCategoryAndGroupPermissions.unregisterUserTest();
				casper.run(function(){
					utils.displayError();
					test.done();
				});
			});
		break;
		case "customUserTest":
			casper.test.begin(branchName+ ' : ' + commitId + 'Verify combination of sub category and group permission functionality from home page with all valid and invalid scenarios ', function(test) {
				var combinationOfSubCategoryAndGroupPermissions = require("./testsuite/main/combinationOfSubCategoryAndGroupPermissions.js");
				combinationOfSubCategoryAndGroupPermissions.customUserTest();
				casper.run(function(){
					utils.displayError();
					test.done();
				});
			});
		break;
		case "pendingUserTest":
			casper.test.begin(branchName+ ' : ' + commitId + 'Verify combination of sub category and group permission functionality from home page with all valid and invalid scenarios ', function(test) {
				var combinationOfSubCategoryAndGroupPermissions = require("./testsuite/main/combinationOfSubCategoryAndGroupPermissions.js");
				combinationOfSubCategoryAndGroupPermissions.pendingUserTest();
				casper.run(function(){
					utils.displayError();
					test.done();
				});
			});
		break;
			default:
			 	utils.info("Please select any sub feature from options given below. For ex: casperjs test automation.js --feature = '<option> <option>'.\n");
				utils.info('registerUserTest');
				utils.info('unregisterUserTest');
				utils.info('customUserTest');
				utils.info('pendingUserTest');
				casper.exit();
		}
	break;

	case "moveTopicAndPost":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify Move Topic And Post functionlity',function(test){
			var moveTopicAndPost=require("./testsuite/main/moveTopicAndPost.js");
			moveTopicAndPost.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "moderatorPermissions":
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify moderator permissions functionality from home page with all valid and invalid scenarios', function(test) {
			var moderatorPermissions = require("./testsuite/main/moderatorPermissions.js");
			moderatorPermissions.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "followPinLock" :
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify followPinLock functionality for start new topic from home page with all valid and invalid scenarios ', function(test) {
			var followpinlock = require("./testsuite/main/followpinlock.js");
			followpinlock.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "forumListingPage" :
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify forumListingPage functionality from home page with all valid and invalid scenarios ', function(test) {
			var forumLogin = require("./testsuite/main/forumListingPage.js");
			forumLogin.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

	case "addPoll" :
		casper.test.begin(branchName+ ' : ' + commitId + ' Verify addPoll  functionality form start new topic and postListingPage all valid and invalid scenarios ', function(test) {
			var addPoll= require("./testsuite/main/addPoll.js");
			addPoll.featureTest();
			casper.run(function(){
				utils.displayError();
				test.done();
			});
		});
	break;

case "postEventMemberApproval":
		var subFeature = feature[1];

		switch(subFeature) {
			case "postTest":
				casper.test.begin(branchName+ ' : ' + commitId + 'Verify post, Event and Member Approval functionality from home page with all valid and invalid scenarios ', function(test) {
					var postEventMemberApproval = require("./testsuite/main/postEventMemberApproval.js");
					postEventMemberApproval.postTest();
					casper.run(function(){
						utils.displayError();
						test.done();
					});
				});
			break;
			case "eventTest":
				casper.test.begin(branchName+ ' : ' + commitId + 'Verify post, Event and Member Approval functionality from home page with all valid and invalid scenarios ', function(test) {
					var postEventMemberApproval = require("./testsuite/main/postEventMemberApproval.js");
					postEventMemberApproval.eventTest();
					casper.run(function(){
						utils.displayError();
						test.done();
					});
				});
			break;
			case "memberApprovalTest":
				casper.test.begin(branchName+ ' : ' + commitId + 'Verify post, Event and Member Approval functionality from home page with all valid and invalid scenarios ', function(test) {
					var postEventMemberApproval = require("./testsuite/main/postEventMemberApproval.js");
					postEventMemberApproval.eventTest();
					casper.run(function(){
						utils.displayError();
						test.done();
					});
				});
			break;
			case "memberDeletionTest":
				casper.test.begin(branchName+ ' : ' + commitId + 'Verify post, Event and Member Approval functionality from home page with all valid and invalid scenarios ', function(test) {
					var postEventMemberApproval = require("./testsuite/main/postEventMemberApproval.js");
					postEventMemberApproval.eventTest();
					casper.run(function(){
						utils.displayError();
						test.done();
					});
				});
			break;
				default:
				 	utils.info("Please select any sub feature from options given below. For ex: casperjs test automation.js --feature = '<option> <option>'.\n");
					utils.info('postTest');
					utils.info('eventTest');
					utils.info('memberApprovalTest');
					utils.info('memberDeletionTest');
					casper.exit();
		}
	break;

	default:
		casper.echo("Please select any feature from options given below. For ex: casperjs test automation.js --feature = <option>.\n");
		casper.echo("Options:");
		casper.echo("login");
		casper.echo("backEndRegistration");
		casper.echo("forgotPassword");
		casper.echo("loginByPrivacyOption");
		casper.echo("inContextLogin");
		casper.echo("oldThemeJsErrors");
		casper.echo("register");
		casper.echo("incontextRegistration");
		casper.echo("privateMessage");
		casper.echo("editProfilePage");
		casper.echo("composeTopic");
		casper.echo("profilePage");
		casper.exit();
}
