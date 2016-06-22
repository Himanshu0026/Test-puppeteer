var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
//casper.options.logLevel = config.app.logLevel;
//casper.options.waitTimeout = config.app.waitTimeout;

var feature = casper.cli.get('feature');
if(feature){
	casper.echo("Started testing for the feature: " + feature +"\n");
}else{
	casper.echo("It seems, you have not given any option.");
}

switch (feature) {
    case "login":
        casper.test.begin('Verify login functionality from home page with all valid and invalid scenarios ', function(test) {
		var forumLogin = require("./testsuite/forum_login.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
        break;
    case "editProfile":
	casper.test.begin("Start Edit Profile functionality from home page & verify content with all valid and invalid scenarios", function(test) {
		var editProfile = require("./testsuite/editprofile.js");
		editProfile.featureTest(casper, casper.test);
		casper.run(function() {
			test.done();
		});
	});
        
        break;
    case "deleteAccount":
	casper.test.begin("Start 'Delete Account' functionality from home page & verify content with all scenarios", function(test) {

		var deleteAccount = require("./testsuite/deleteAccount.js");
		deleteAccount.featureTest(casper, casper.test);
		
		casper.run(function(){
			test.done();
		});
	});
        
        break;
    case "register":
    	casper.test.begin('REGISTRATION TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
	case "registerWithSettings":
    	casper.test.begin('REGISTRATION TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.customFieldsTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
   case "newtopic":
	casper.test.begin("Start New Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var newTopic = require("./testsuite/newTopic.js");
		var x = require('casper').selectXPath;
		newTopic.featureTest(casper, casper.test, x);
		
		casper.run(function(){
			test.done();
		});
	});
        
        break;
    case "postreply":
        casper.test.begin("Start reply topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var postAReply = require("./testsuite/postAReply.js");
		var x = require('casper').selectXPath;
		postAReply.featureTest(casper, casper.test, x);
		casper.run(function(){
			test.done();
		});
	});
        break;
 case "edittopic":
        casper.test.begin("Start edit Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var editTopic = require("./testsuite/editTopic.js");
		var x = require('casper').selectXPath;
		editTopic.featureTest(casper, casper.test, x);
		casper.run(function(){
			test.done();
		});
	});
        break;
	case "forgotpassword":
        casper.test.begin('Verify forgot your password functionality from home page ', function(test) {
		var forumLogin = require("./testsuite/forgotPassword.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
        break;
case "deletetopic":
        casper.test.begin("Delete Topic functionality from home page & verify deleted post", function(test) {

		var deleteTopic = require("./testsuite/deleteTopic.js");
		deleteTopic.featureTest(casper, casper.test);
		
		casper.run(function(){
			test.done();
		});
	});
        break;
	case "calender" :
		 casper.test.begin('Verify calander functionlity ', function(test) {
		var x = require('casper').selectXPath;
		 var calender = require("./testsuite/calender.js");
		 calender.featureTest(casper, casper.test,x);
		 casper.run(function(){
			test.done();
		});
	});
        break;

    default:
	casper.echo("Please select any feature from options given below. For ex: casperjs main.js <option>.\n"); 
        casper.echo("Options:");
	casper.echo("	register");
	casper.echo("	login");
	casper.echo("	newtopic");
	casper.echo("	postreply\n");
	casper.echo("	edittopic\n");
	casper.echo("	deletetopic\n");
	casper.echo("Relevant test data has to be fed in JSON format in files placed for each feature in '<current directory>/testData/'.");
	casper.exit();
};



