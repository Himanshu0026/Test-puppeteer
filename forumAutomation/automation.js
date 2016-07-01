var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
var feature = "login";
switch (feature) {
    case "login":
	casper.echo("called for login");
    case "register":
        casper.echo("called for register");
    case "newtopic":
        casper.echo("called for newtopic");
    case "postreply":
        casper.echo("called for postreply");
};
casper.exit();


