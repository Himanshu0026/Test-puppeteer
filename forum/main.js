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
        
        break;
    case "postreply":
        
        break;
    default:
        casper.echo("Options:");
	casper.echo("	register");
	casper.echo("	login");
	casper.echo("	newtopic");
	casper.echo("	postreply\n");
	casper.echo("Relevant test data has to be fed in JSON format in files placed for each feature in '<current directory>/testData/'.");
	casper.exit();
};



