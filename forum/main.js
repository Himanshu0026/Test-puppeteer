/* 
* This file is dedicated to initiate the test flow. It redirects the control to respective feature test as it receives as an argument.
*/

var config = require("./config/config.json");

var casper = require('casper').create(config.app);

//Reading command line arguments
var testArg = "";
if(casper.cli.args.length>0){
	testArg = casper.cli.args[0];
	casper.echo("Started testing for the feature: " + testArg +"\n");
}else{
	casper.echo("It seems, you have not given any option.");
	casper.echo("Please select any feature from options given below. For ex: casperjs main.js <option>.\n"); 
}

//Switching over requested feature to test.
switch (testArg) {
    case "login":
        var forumLogin = require("./testsuite/forum_login.js");
	forumLogin.featureTest(casper);
	casper.run();
        break;
    case "register":
        var forumRegister = require("./testsuite/register.js");
	forumRegister.featureTest(casper);
	casper.run();
        break;
    case "newtopic":
        var newTopic = require("./testsuite/newTopic.js");
	newTopic.featureTest(casper);
	casper.run();
        break;
    case "postreply":
        var postAReply = require("./testsuite/postAReply.js");
	postAReply.featureTest(casper);
	casper.run();
        break;
    case "edittopic":
	var editTopic = require("./testsuite/editTopic.js");
	editTopic.featureTest(casper);
	casper.run();
	break;
    case "deletetopic":
	var deleteTopic = require("./testsuite/deleteTopic.js");
	deleteTopic.featureTest(casper);
	casper.run();
	break;
    case "poll":
	var poll = require("./testsuite/poll.js");
	poll.featureTest(casper);
	casper.run();
	break;
    case "editprofile":
	var editProfile = require("./testsuite/editprofile.js");
	editProfile.featureTest(casper);
	casper.run();
	break;
    case "forgotpassword":
        var forgotpwd = require("./testsuite/forgotPassword.js");
	forgotpwd.featureTest(casper);
	casper.run();
        break;
    default:
        casper.echo("Options:");
	casper.echo("	register");
	casper.echo("	login");
	casper.echo("	forgotpassword");
	casper.echo("	newtopic");
	casper.echo("	editprofile");
	casper.echo("	postreply");
	casper.echo("	edittopic");
	casper.echo("	deletetopic");
	casper.echo("	poll\n");
	casper.echo("Relevant test data has to be fed in JSON format in files placed for each feature in '<current directory>/testData/'.");
	casper.exit();
};

