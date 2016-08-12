/*var childProcess = require('child_process');
var testResult = childProcess.spawnSync("sudo bash -c '/home/monika/websitetoolbox/git/QA-automation/forumAutomation/bin/automation.sh'");
console.log('testResult : ' + testResult.pid);
	childProcess.kill(testResult.pid);*/

var casper_nodejs = require('./node_modules/casper-nodejs/index.js');
/*
var url = "http://google.com";
// load the page refered with 'url' with casper
var casper = casper_nodejs.create(url, {});

// once the page is loaded, execute that in our current nodejs context
casper.then(function() {
  console.log("page loaded");
});

// then, execute that in casperjs, and the second callback in the current nodejs context
casper.then(function() {
  return 42;
}, function(ret) {
  console.log("it works: " + ret);

  casper.exit();// can be placed here too, instead of in the bottom :)
  // casper.exit();
});

// exit casper after executing the 2 previous 'then'
casper.run();
console.log("started");
casper.options.verbose = true;
casper.options.logLevel = 'debug';

casper.test.begin('Google page ', function(test) {
		var url = "http://google.com";
		
		// once the page is loaded, execute that in our current nodejs context
		casper.start(url, function() {
		  console.log("page loaded");
		});

		// then, execute that in casperjs, and the second callback in the current nodejs context
		casper.then(function() {
		  return 42;
		}, function(ret) {
		  console.log("it works: " + ret);

		  casper.exit();// can be placed here too, instead of in the bottom :)
		  // casper.exit();
		});
		casper.run(function(){
			test.done();
		});
	});
*/
