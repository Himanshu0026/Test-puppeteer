//This script is responsible for executing any external script/process.
'use strict.';
require('shelljs/global');

var fs = require('fs');
var result;
var sqlConnection = require('../connection.js');
var mysql = require('mysql');
var mailServices = require('./mailServices.js');
var createStatus = require('./createStatus.js');
var attachmentServices = require('./attachmentServices.js');
var executorServices = module.exports = {};

//It executes job. Take job details as argument, executed the job and initiates mail sending.
executorServices.executeJob = function(commitDetails, callback) {
	var path = '/var/tmp/' + commitDetails.branchName + '/' +commitDetails.commitId;
	//Executing gitdeploy.sh to update Forum's code for given branch name
	//if(commitDetails.branchName == "automation"){
	console.log("Starting execution for commitDetails : "+commitDetails);
	console.time('Automation execution time');
	if(commitDetails.branchName) {
		exec("/home/automation/gitdeploy.sh -p ssh " +commitDetails.branchName, function(code, stdout, stderr) {
			if (code !== 0) {
				console.log('Error: gitdeploy.sh failed');
				var testResult = stderr;
				commitDetails.testResult = testResult;
				commitDetails.attachments = '';
				//createStatus.failure(commitDetails, 'Failed with perl errors', function(status) {
					mailServices.sendMail(commitDetails, function(err) {
						if(err)
							console.error("error occurred while sending email: "+err);
						else
							console.log("Mail sent successfully.");
							console.timeEnd('Automation execution time');
						return callback();
					});
				//});
			} else {
				sqlConnection('UPDATE usergroups SET view_profiles =1 WHERE title = "Registered Users" AND uid =116', function(err, result){
					if(err){
						console.log(err);
					}else{
					}
				});
				sqlConnection('DELETE FROM calendar_permissions WHERE uid="116";', function(err, result){
					if(err){
						console.log(err);
					}else{
					}
				});
				sqlConnection('DELETE FROM forums WHERE uid="116";', function(err, result){
					if(err){
						console.log(err);
					}else{
					}
				});
				sqlConnection('INSERT INTO forums (uid, title, description, displayorder) VALUES ("116", "General", "General", "1")', function(err, result){
					if(err){
						console.log(err);
					}else{
					}
				});
				sqlConnection('UPDATE settings SET post_approval=0 WHERE uid=116 ', function(err, result){
					if(err){
						console.log(err);
					}else{
					}
				});
				sqlConnection('SELECT max(posts) AS posts, userid,user FROM members WHERE uid="116" and user="hani";', function(err, result){
					if(err){
						console.log(err);
					}else{
						var post = result[0].posts;
						var userid = result[0].userid;
						var deleteTopPoster = 'DELETE FROM top_posters WHERE uid="116" AND userid="'+userid+'";';
						var query = 'INSERT INTO top_posters (uid,userid,posts) VALUES ("116",'+userid+','+post+');';
						sqlConnection(deleteTopPoster, function(err, result){
							if(err){
								console.log(err);
							}else{
								console.log('the result is'+result);
								//query = mysql.format(query, values);
								sqlConnection(query, function(err, result){
									if(err){
										console.log(err);
									}else{
										console.log(result);
									}
								});
							}
						});
					}
				});
				exec("/etc/automation/bin/oo_automation.sh " +commitDetails.branchName+ ' ' +commitDetails.commitId, function(code, stdout, stderr) {
					console.log('Exit code : oo_automation : ', code);
					console.log('Program output : oo_automation : ', stdout);
					console.log('Program stderr: oo_automation : ', stderr);
					var failLogFile = '/etc/automation/log/fail.txt';
					var apacheLogFile = '/etc/automation/log/apacheLog.txt';
					fs.stat(failLogFile, function(err, fileStat) {
						if (fileStat) {
							var fileSize = fileStat.size;
							console.log("fail.txt size: "+fileSize);
							if(fileSize !== 0) {
								commitDetails.apacheLogFile = apacheLogFile;
								commitDetails.attachments = [];
								//createStatus.failure(commitDetails, 'Failed with perl errors', function(status) {

									//Sending Mail To The Committer After Adding Attachments
									fs.exists(path, function(exists) {
										if(exists) {
											attachmentServices.addAttachments(path, commitDetails, function(commitDetails) {
												console.log('attachments added successfully');
												//initiating mail sending to committer
												mailServices.sendMail(commitDetails, function(err) {
													if(err)
														console.error("error occurred while sending email: "+err);
													else
														console.log("Mail sent successfully.");
													//Deleting Old Directory That Contains Screenshots
													fs.readdir(path, function (err, data) {
														if(err) {
															console.error("Error : "+err);
														} else {
															//Deleting Old Directory That Contains Screenshots
															attachmentServices.deleteFolderRecursive(path, function() {
																//Deleting commit specific log files
																console.timeEnd('Automation execution time');
																console.log("Commit specific log files deleted.");
																return callback();
															});
														}
													});
												});
											});
										} else {
											//initiating mail sending to committer
											mailServices.sendMail(commitDetails, function(err) {
												if(err)
													console.error("error occurred while sending email: "+err);
												else
													console.log("Mail sent successfully.");
												//Deleting commit specific log files
												//fs.unlinkSync(automationLogFile);
												fs.unlinkSync(failLogFile);
												console.timeEnd('Automation execution time');
												console.log("Commit specific log files deleted.");
												return callback();
											});
										}
									});
								//});
							} else {
							//Executing automation test script
							console.log("Executing Automation Script For " + commitDetails.commitId + " CommitID");
							exec("/etc/automation/bin/automation.sh " +commitDetails.branchName+ ' ' +commitDetails.commitId, function(code, stdout, stderr) {
							console.log('Exit code:', code);
							console.log('Program output:', stdout);
							console.log('Program stderr:', stderr);
							var testResult = stdout;
							//var automationLogFile = '/etc/automation/log/automation.txt';
							var failLogFile = '/etc/automation/log/fail.txt';
							if(stdout) {
							var descriptionRes = 0;
							var jsErrorCount = 0;
							var resourceErrorCount = 0;
							var description = '';
							var jsErrors = fs.readFileSync(failLogFile).toString().split(' ');
							for(var i=0; i<jsErrors.length;i++) {
								if(jsErrors[i+1]=='tests'  && jsErrors[i+7]!==0) {
									descriptionRes = parseInt(descriptionRes)+parseInt(jsErrors[i+7]);
								}
								if(jsErrors[i] == 'TypeError:') {
									jsErrorCount = jsErrorCount+1;
								}
							}
							result = descriptionRes;
							var resourceErrors = fs.readFileSync(failLogFile).toString().split(' ');
							for(i=0; i<resourceErrors.length;i++) {
								if(resourceErrors[i] == 'ResourceError:') {
									resourceErrorCount = resourceErrorCount+1;
								}
							}
							console.error('result : ' +result);
							console.error('resourceErrorCount : ' +resourceErrorCount);
							}
							fs.stat(failLogFile, function(err, fileStat) {
							if (err) {
								if (err.code == 'ENOENT') {
									console.log('fail.log does not exist.');
								}
								console.timeEnd('Automation execution time');
								return callback();
							} else {
								if (fileStat) {
									var fileSize = fileStat.size;
									console.log("fail.txt size: "+fileSize);
									console.log("beta value : "+commitDetails.beta);
									console.log("branch : "+commitDetails.branchName);
									if(fileSize !== 0) {
										if(commitDetails.beta === 0) {
											if(result === 0) {
												description = jsErrorCount+' javaScript errors found.';
											} else {
												if(jsErrorCount === 0) {
													description = 'Failed '+result+' automation test cases.';
												} else {
													description = 'Failed '+result+' automation test cases and '+jsErrorCount+' javaScript errors found';
												}
											}

											if(resourceErrorCount !== 0) {
												description += ' ' +resourceErrorCount+' resources errors found.';
											}
											//Adding test result with commit details
											commitDetails.testResult = testResult;
											commitDetails.apacheLogFile = apacheLogFile;
											//Addling log files as attachments
											commitDetails.attachments = [
												/*{
													path: automationLogFile
												},*/
												{
													path: failLogFile
												},
												{
													path: apacheLogFile
												}
											];

											//createStatus.failure(commitDetails, description, function(status) {
												//console.log('state of failure : '+status);
												//Sending Mail To The Committer After Adding Attachments
												fs.exists(path, function(exists) {
													if(exists) {
														attachmentServices.addAttachments(path, commitDetails, function(commitDetails) {
															console.log('attachments added successfully');
															//initiating mail sending to committer
															mailServices.sendMail(commitDetails, function(err) {
																if(err)
																	console.error("error occurred while sending email: "+err);
																else
																	console.log("Mail sent successfully.");
																//Deleting Old Directory That Contains Screenshots
																fs.readdir(path, function (err, data) {
																	if(err) {
																		console.error("Error : "+err);
																	} else {
																		//Deleting Old Directory That Contains Screenshots
																		attachmentServices.deleteFolderRecursive(path, function() {
																			//Deleting commit specific log files
																			//fs.unlinkSync(automationLogFile);
																			fs.unlinkSync(failLogFile);
																			console.timeEnd('Automation execution time');
																			console.log("Commit specific log files deleted.");
																			return callback();
																		});
																	}
																});
															});
														});
													} else {
														//initiating mail sending to committer
														mailServices.sendMail(commitDetails, function(err) {
															if(err)
																console.error("error occurred while sending email: "+err);
															else
																console.log("Mail sent successfully.");
															//Deleting commit specific log files
															//fs.unlinkSync(automationLogFile);
															fs.unlinkSync(failLogFile);
															console.timeEnd('Automation execution time');
															console.log("Commit specific log files deleted.");
															return callback();
														});
													}
												});
											//});
										} else {
											console.log('you are not allowed to set the status of the branch.');
										}
									} else {
										//createStatus.success(commitDetails, function(status) {
											//console.log('state of success : '+status);
										//});
										//Deleting commit specific log files
										//fs.unlinkSync(automationLogFile);
										fs.unlinkSync(failLogFile);
										console.timeEnd('Automation execution time');
										return callback();
									}
								} else {
									console.timeEnd('Automation execution time');
									return callback();
								}
							}
							});
							});
							}
						}
					});
				});
				//return callback();
			}
		});
	} else {
		console.timeEnd('Automation execution time');
		return callback();
	}
};
