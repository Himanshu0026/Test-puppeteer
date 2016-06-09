var config = require("./config/config.json");

var casper = require('casper').create(config.app);

var testArg = "";
if(casper.cli.args.length>0)
	testArg = casper.cli.args[0];

casper.echo("Casper CLI passed args: " + testArg);


switch (testArg) {
    case "login":
        var forumLogin = require("./testsuite/forum_login.js");
	forumLogin.featureTest(casper);
	casper.run();
        break;
    case "register":
        
        break;
    case "newtopic":
        
        break;
    case "postreply":
        
        break;
    default:
        casper.echo("help");
};



