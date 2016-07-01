'use strict';
var mailServices = require('./mailServices.js');
var execSync = require('child_process').execSync;
var executorServices = module.exports = {};

executorServices.execute = function(script){
	var scriptObj = execSync(script);
	console.log('stdout: ' + scriptObj.stdout);
};

executorServices.executeJob = function(commitDetails, callback){
	//executorServices.execute("sh /home/${USER}/Website-Toolbox/gitdeploy.sh "+commitDetails.branchName);
	executorServices.execute("casperjs test automation.js");
	mailServices.sendMail(commitDetails, function(err){
		if(err)
			console.log("error occurred while sending email: "+err);
		else
			console.log("Mail sent successfully.");
		return callback();
	});
};
