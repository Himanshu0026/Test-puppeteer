var config = require("../config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
//casper.options.waitTimeout = config.app.waitTimeout;

var feature = casper.cli.get('feature');
if(feature){
	casper.echo("Started testing for the feature: " + feature +"\n",'INFO');
}else{
	casper.echo("It seems, you have not given any option.");
}

switch (feature) {
    		
	case "backEndRegistration":
		casper.test.begin('BACK END REGISTRATION TEST', function(test) {
			var backEndRegister = require("./testsuite/main/backEndRegistration.js");
			backEndRegister.featureTest(casper, casper.test);
			casper.run(function(){
				test.done();
				test.assert(true);
			});
		});
	break;
	
	default:
		casper.echo("Please select any feature from options given below. For ex: casperjs main.js <option>.\n"); 
        	casper.echo("Options:");
		casper.echo("	backEndRegistration");
		casper.exit();
};



