//This script is responsible for executing any external script/process. 
'use strict';
var fs = require('fs');
var utils = require('../utils.js');
var mailServices = require('./mailServices.js');
var execSync = require('child_process').execSync;
var executorServices = module.exports = {};

//Execute the script in synchronous way and returns stdout as the output
executorServices.execute = function(script){
	var scriptResult = execSync(script);
	//var pid = scriptResult.pid;
	console.log('scriptResult : ' + scriptResult);
	//utils.terminateProcess(pid);
	return scriptResult;
};

//It executes job. Take job details as argument, executed the job and initiates mail sending.
executorServices.executeJob = function(commitDetails, callback){
	//Executing gitdeploy.sh to update Forum's code for given branch name
//if(commitDetails.branchName == "automation"){
	if(commitDetails.branchName){
		console.log("Executing gitdeploy.sh for "+commitDetails.branchName);
		var gitDeployResult = executorServices.execute("sudo bash -c '/home/monika/gitdeploy.sh "+commitDetails.branchName+ "'");
		//kill(gitDeployResult.pid);
		//Executing automation test script
		console.log("Executing Automation script");
		var testResult = executorServices.execute("sudo bash -c '/home/monika/project/git/QA-automation/forumAutomation/bin/automation.sh'");
		var automationLogFile = '/home/monika/project/git/QA-automation/forumAutomation/log/automation.txt';
		var failLogFile = '/home/monika/project/git/QA-automation/forumAutomation/log/fail.txt';
		fs.stat(failLogFile, function(err, fileStat) {
			if (err) {
				if (err.code == 'ENOENT') {
					console.log('fail.log does not exist.');
				}
				return callback();
			} else {
				if (fileStat) {
					var fileSize = fileStat.size;
					console.log("fail.log size: "+fileSize);
					if(fileSize != 0){
						//Adding test result with commit details
						commitDetails['testResult'] = testResult;
						//Addling log files as attachments
						commitDetails['attachments'] = [
							{   
						    		path: automationLogFile
							},
							{   
						    		path: failLogFile
							}
						];
						//initiating mail sending to committer
						mailServices.sendMail(commitDetails, function(err){
							if(err)
								console.error("error occurred while sending email: "+err);
							else
								console.log("Mail sent successfully.");
							//Deleting commit specific log files
							fs.unlinkSync(automationLogFile);
							fs.unlinkSync(failLogFile);
							console.log("Commit specific log files deleted.");
							return callback();
						});
					}else{
						//Deleting commit specific log files
						fs.unlinkSync(automationLogFile);
						fs.unlinkSync(failLogFile);
						return callback();
					}
				}else{
					return callback();
				}
			}
		});
	}else{
		return callback();
	}

/*}else{
	return callback();
}*/
};
