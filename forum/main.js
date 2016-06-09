var config = require("./config/config.json");

var casper = require('casper').create(config.app);

var testArg = "";
if(casper.cli.args.length>0){
	testArg = casper.cli.args[0];
	casper.echo("Started testing for the feature: " + testArg +"\n");
}else{
	casper.echo("It seems, you have not given any option.");
	casper.echo("Please select any feature from options given below. For ex: casperjs main.js <option>.\n"); 
}

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
    default:
        casper.echo("Options:\n");
	casper.echo("	register\n");
	casper.echo("	login\n");
	casper.echo("	newtopic\n");
	casper.echo("	postreply\n");
	casper.echo("	edittopic\n");
	casper.echo("	deletetopic\n");
	casper.echo("	poll\n");
	casper.echo("Relevant test data has to be fed in JSON format in files placed for each feature in '<current directory>/testData/'.");
	casper.exit();

};

