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
