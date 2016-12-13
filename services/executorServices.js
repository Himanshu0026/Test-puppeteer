//This script is responsible for executing any external script/process. 
'use strict';
require('shelljs/global');

var fs = require('fs');
var result;
var mailServices = require('./mailServices.js');
var createStatus = require('./createStatus.js');
var attachmentServices = require('./attachmentServices.js');
var path = '/var/tmp/failedScreenshots/';
var executorServices = module.exports = {};

//It executes job. Take job details as argument, executed the job and initiates mail sending.
executorServices.executeJob = function(commitDetails, callback){
	//Executing gitdeploy.sh to update Forum's code for given branch name
//if(commitDetails.branchName == "automation"){
	console.log("Starting execution for commitDetails : "+commitDetails);
	if(commitDetails.branchName){
		console.log("Executing gitdeploy.sh for "+commitDetails.branchName);
		if (exec("/home/automation/gitdeploy.sh -p ssh "+commitDetails.branchName).code !== 0) {
			console.log('Error: gitdeploy.sh failed');
			return callback();
		}
		
		//Deleting Old Directory That Contains Screenshots
		fs.readdir(path, function (err, data) {
			if(err) {
				console.error("Error : "+err);
			}else {
				attachmentServices.deleteFolderRecursive(path);
			}
		});
		
		//Executing automation test script
		console.log("Executing Automation script");
		exec("/etc/automation/bin/automation.sh", function(code, stdout, stderr) {
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program stderr:', stderr);
			var testResult = stdout;
			if(stdout) {
				var descriptionRes = 0;
				var failTestResult = stdout.split(' ');
				for(var i=0; i<failTestResult.length;i++) {
					if(failTestResult[i+1]=='tests'  && failTestResult[i+7]!=0) {
						descriptionRes = parseInt(descriptionRes)+parseInt(failTestResult[i+7]);
					}
				}
				result = descriptionRes;
			}
			var automationLogFile = '/etc/automation/log/automation.txt';
			var failLogFile = '/etc/automation/log/fail.txt';
			fs.stat(failLogFile, function(err, fileStat) {
				if (err) {
					if (err.code == 'ENOENT') {
						console.log('fail.log does not exist.');
					}
					return callback();
				} else {
					if (fileStat) {
						var fileSize = fileStat.size;
						console.log("fail.txt size: "+fileSize);
						console.log("beta value : "+commitDetails.beta);
						console.log("branch : "+commitDetails.branchName);
							if(fileSize != 0) {
								if(commitDetails.beta == 0) {
									createStatus.failure(commitDetails, result, function(status) {
										console.log('state of failure : '+status);
									});
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
									
									//Sending Mail To The Committer After Adding Attachments
									fs.readdir(path, function (err, data) {
										if(err) {
											console.error(err);
										}else {
											attachmentServices.addAttachments(path, commitDetails, function(commitDetails) {
												console.log('attachments added successfully');
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
											});
										}
									});
								} else {
									console.log('you are not allowed to set the status of the branch.');
								}
							}else{	
								createStatus.success(commitDetails, function(status) {
									console.log('state of success : '+status);
								});
								
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
		});
	}else{
		return callback();
	}

/*}else{
	return callback();
}*/
};
