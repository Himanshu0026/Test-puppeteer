//This script is responsible for executing any external script/process. 
'use strict';
require('shelljs/global');

var fs = require('fs');
var mailServices = require('./mailServices.js');
var createStatus = require('./createStatus.js');
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
		
		//Executing automation test script
		console.log("Executing Automation script");
		exec("/etc/automation/bin/automation.sh", function(code, stdout, stderr) {
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program stderr:', stderr);
			/*var testResult = stdout;
			var descriptionRes = 0;
			var description = stdout.split(' ');
			for(var i=0; i<description.length;i++) {
				if(description[i+1]=='tests') {
					descriptionRes = parseInt(descriptionRes)+parseInt(description[i]);
				}
			}*/
			console.log("type of stdout : " +typeof(stdout));
			var stderr1 = stdout; //'Tests executing for LOGIN:PASS 21 tests executed in 12.122s, 21 passed, 0 failed, 0 dubious, 0 skipped.Tests executing for IN-CONTEXT LOGIN:PASS 20 tests executed in 12.239s, 20 passed, 0 failed, 0 dubious, 0 skipped.';
			//stderr1 = stderr1.toString();
			var descriptionRes = 0;
			var failTestResult = stderr1.split(' ');
			for(var i=0;i<failTestResult.length;i++) {
				if(failTestResult[i+1]=='tests') {
					//var description = description[i].split(' ');
					console.log("\ni :::::::::::" +i+ "......." +failTestResult[i]);
					descriptionRes = parseInt(descriptionRes)+parseInt(failTestResult[i]);
					console.log("$$$$$$$$$$ : " +descriptionRes);
				}
			}
			var result = descriptionRes;
			console.log("######### : " +result);
			
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
						if(fileSize != 0){
							var description = stderr.split(':');
							var description = description[1].split(' ');
							var descriptionRes = description[2];
							createStatus.failure(commitDetails, descriptionRes, function(status) {
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
							console.log("Result In Else::::::::: " +result);
							createStatus.success(commitDetails, result, function(status) {
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
