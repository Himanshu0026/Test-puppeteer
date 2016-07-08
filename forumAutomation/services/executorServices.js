//This script is responsible for executing any external script/process. 
'use strict';
var mailServices = require('./mailServices.js');
var execSync = require('child_process').execSync;
var executorServices = module.exports = {};

//Execute the script in synchronous way and returns stdout as the output
executorServices.execute = function(script){
	var scriptOutput = execSync(script);
	console.log('scriptOutput : ' + scriptOutput);
	return scriptOutput;
};

//It executes job. Take job details as argument, executed the job and initiates mail sending.
executorServices.executeJob = function(commitDetails, callback){
	//Executing gitdeploy.sh to update Forum's code for given branch name
	//var gitDeployResult = executorServices.execute("sh /home/monika/gitdeploy.sh "+commitDetails.branchName);
	//Executing automation test script
	var testResult = executorServices.execute("sudo bash -c 'casperjs test ../forum/automation.js --feature=login > log/automation.log; cat log/automation.log | grep FAIL > log/fail.log; cat log/automation.log | grep \"tests executed in\"'");
	//Adding test result with commit details
	commitDetails['testResult'] = testResult;
	//Addling log files as attachments
	commitDetails['attachments'] = [
                {   
            		path: 'log/automation.log'
        	},
		{   
            		path: 'log/fail.log'
        	}
	];
	//initiating mail sending to committer
	mailServices.sendMail(commitDetails, function(err){
		if(err)
			console.log("error occurred while sending email: "+err);
		else
			console.log("Mail sent successfully.");
		return callback();
	});
};
