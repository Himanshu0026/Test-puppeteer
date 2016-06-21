var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;

var feature = casper.cli.get('feature');
if(feature){
	casper.echo("Started testing for the feature: " + feature +"\n");
}else{
	casper.echo("It seems, you have not given any option.");
}

switch (feature) {
    case "login":
        casper.test.begin('some test name', function(test) {
		var forumLogin = require("./testsuite/forum_login.js");
		forumLogin.featureTest(casper);
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
        
        break;
    case "newtopic":
        
        break;
    case "postreply":
        
        break;
    default:
	casper.echo("Please select any feature from options given below. For ex: casperjs main.js <option>.\n"); 
        casper.echo("Options:");
	casper.echo("	register");
	casper.echo("	login");
	casper.echo("	newtopic");
	casper.echo("	postreply\n");
	casper.echo("Relevant test data has to be fed in JSON format in files placed for each feature in '<current directory>/testData/'.");
	casper.exit();
};



