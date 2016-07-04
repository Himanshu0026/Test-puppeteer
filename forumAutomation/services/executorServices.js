'use strict';
var mailServices = require('./mailServices.js');
var execSync = require('child_process').execSync;
var executorServices = module.exports = {};

executorServices.execute = function(script){
	var scriptOutput = execSync(script);
	console.log('scriptOutput: ' + scriptOutput);
	return scriptOutput;
};

executorServices.executeJob = function(commitDetails, callback){
	//executorServices.execute("sh /home/${USER}/Website-Toolbox/gitdeploy.sh "+commitDetails.branchName);
	var testResult = executorServices.execute("sudo bash -c 'casperjs test ../forum/automation.js --feature=login > automation.log; cat automation.log | grep FAIL > fail.log; cat automation.log | grep \"tests executed in\"'");
	commitDetails['testResult'] = testResult;
	commitDetails['attachments'] = [
                {   
            		path: 'automation.log'
        	},
		{   
            		path: 'fail.log'
        	}
	];
	mailServices.sendMail(commitDetails, function(err){
		if(err)
			console.log("error occurred while sending email: "+err);
		else
			console.log("Mail sent successfully.");
		return callback();
	});
};
