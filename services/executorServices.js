//This script is responsible for executing any external script/process.
'use strict.';
var shell= require('shelljs');
var fs = require('fs');
var result;
var sqlConnection = require('../connection.js');
var mysql = require('mysql');
var mailServices = require('./mailServices.js');
var createStatus = require('./createStatus.js');
var attachmentServices = require('./attachmentServices.js');
var eslint_status = '';
var executorServices = module.exports = {};

//It executes job. Take job details as argument, executed the job and initiates mail sending.
executorServices.executeJob = function(commitDetails, callback) {
	var path = '/var/tmp/' + commitDetails.branchName + '/' +commitDetails.commitId;
	//Executing gitdeploy.sh to update Forum's code for given branch name
	//if(commitDetails.branchName == "automation"){
	console.log("Starting execution for commitDetails : "+commitDetails);
	console.time('Automation execution time');
	if(commitDetails.branchName) {
		shell.exec("/home/automation/gitdeploy.sh -p ssh " +commitDetails.branchName, function(code, stdout, stderr) {
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
				sqlConnection('UPDATE usergroups SET view_profiles=1, view_forum=1, post_threads=1, other_post_replies=1, upload_attachments=1, view_attachments=1, view_thread_content=1, view_others_threads=1, post_replies=1, edit_posts=1, delete_posts=1, delete_threads=1, move_own_threads=1, post_approval=1, upload_attachments=1, upload_avatar=1, view_calendar=1, post_events=1, edit_own_events=1, delete_own_events=1, view_others_events=1, edit_profile=1, delete_profile=1, allow_signature=1, allow_customtitle=1, change_username=1, memberslist_viewable=1, approval_of_events=0, post_polls=1, vote_on_polls=1, view_messageboard=1  WHERE title = "General" AND uid =116;', function(err, result){
					if(err){
						console.log(err);
					}else{
						sqlConnection('UPDATE usergroups SET view_profiles=1, view_forum=1, post_threads=1, other_post_replies=0, view_thread_content=1, view_others_threads=1, post_replies=1, view_calendar=1, post_events=0, view_others_events=1, approval_of_events=1, view_messageboard=1  WHERE title = "Not Signed Up / Not Logged In" AND uid =116;', function(err, result){
							if(err){
								console.log(err);
							}else{
								sqlConnection('UPDATE usergroups SET post_polls=1 WHERE title = "Moderators" AND uid =116;', function(err, result){
									if(err){
										console.log(err);
									}else{
									}
								});
							}
						});
					}
				});
				sqlConnection('DELETE FROM calendar_permissions WHERE uid="116";', function(err, result){
					if(err){
						console.log(err);
					}else{
					}
				});
				sqlConnection('DELETE FROM calendar_events WHERE uid="116";', function(err, result){
					if(err){
						console.log(err);
					}else{
					}
				});
				sqlConnection('DELETE FROM forums WHERE uid="116";', function(err, result){
					if(err){
						console.log(err);
					}else{
						sqlConnection('INSERT INTO forums (uid, title, description, displayorder) VALUES ("116", "General", "General", "1")', function(err, result){
							if(err){
								console.log(err);
							}else{
							}
						});
					}
				});
				sqlConnection("UPDATE settings SET post_approval=0, allow_emails='checked', threadsperpage =100, repliesperpage=50, enable_calendar='checked', reputation='checked', enable_polls='checked', enable_social_bookmarking='checked', allowpm='checked', reqreg='checked', file_uploading='checked', reqregapp='', confirmemail='checked', new_user_registration='checked'  WHERE uid=116;", function(err, result){
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
								sqlConnection(query, function(err, result){
									if(err){
										console.log(err);
									}else{
										//console.log(result);
									}
								});
							}
						});
					}
				});
				shell.exec("/etc/automation/bin/oo_automation.sh " +commitDetails.branchName+ ' ' +commitDetails.commitId, function(code, stdout, stderr) {
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
												fs.unlinkSync(failLogFile);
												console.timeEnd('Automation execution time');
												console.log("Commit specific log files deleted.");
												return callback();
											});
										}
									});
								//});
							} else {
								//var eslint_status = '';
								console.log('the value of eslint status before checkEslintStatus method '+eslint_status);
								executorServices.checkEslintStatus(commitDetails, function(err){
									if(!err){
										console.log('the eslint status after checkEslintStatus method '+eslint_status);
										if(eslint_status === '' || eslint_status === true) {
											executorServices.executeAutomation(commitDetails, function(err){
												if(err)
													console.error("error occurred while executing automation script: "+err);
												else{
													console.log("Automation script executed successfully.");
													eslint_status = '';
													return callback();
												}
											});
										}else {
											eslint_status = '';
											return callback();
										}
									}
								});
							}
						}
					});
				});
			}
		});
	} else {
		console.timeEnd('Automation execution time');
		return callback();
	}
};

executorServices.executeAutomation = function(commitDetails, callback) {
	var path = '/var/tmp/' + commitDetails.branchName + '/' +commitDetails.commitId;
	var apacheLogFile = '/etc/automation/log/apacheLog.txt';
	shell.exec("/etc/automation/bin/automation.sh " +commitDetails.branchName+ ' ' +commitDetails.commitId, function(code, stdout, stderr) {
		console.log('Exit code:', code);
		console.log('Program output:', stdout);
		console.log('Program stderr:', stderr);
		var stopFile = '/etc/automation/log/stop.txt';
		fs.stat(stopFile, function(err, fileStat) {
			if (err) {
				if (err.code == 'ENOENT') {
					console.log('stop.txt does not exist.');
				}
				console.timeEnd('Automation execution time');
				return callback();
			} else {
				if (fileStat) {
					var fileSize = fileStat.size;
					console.log('the file size of stop.txt'+fileSize);
					if(fileSize !== 0) {
						fs.truncate(stopFile, function() {});
						console.log('Automation stop because the same running branch commit again');
						console.timeEnd('Automation execution time');
						return callback();
					} else {
						var testStdout = stdout;
						var testResult1 = testStdout.replace(/\u001b\[.*?m/g, '');
						var testResult2= testResult1.replace(/\nPASS/g, 'PASS');
						var testResult3 = testResult2.replace(/\nFAIL/g, 'FAIL');
						var testResult4 = testResult3.split('\n');
						var string = '';
						var i;
						for ( i = 1; i <= (testResult4.length-1); i++) {
							var search = testResult4[i].search('FAIL');
							if ( search !== (-1)){
								string = string +'\n'+ testResult4[i];
							}
						}
						var testResult = string;
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
					}
				}
			}
		});
	});
};

executorServices.executeEslint = function(commitDetails, callback) {
	var path = '/var/tmp/' + commitDetails.branchName + '/' +commitDetails.commitId;
	shell.exec("/etc/automation/bin/eslintErrors.sh " +commitDetails.changedFiles, function(code, stdout, stderr) {
		console.log('Exit code:', code);
		console.log('Program output:', stdout);
		console.log('Program stderr:', stderr);
		var esErrorFile = '/etc/automation/log/eslintErrors.txt';
		fs.stat(esErrorFile, function(err, fileStat) {
			if (fileStat) {
				var fileSize = fileStat.size;
				console.log("esErrorFile.txt size: "+fileSize);
				if(fileSize !== 0) {
					commitDetails.attachments = [
						{
							path: esErrorFile
						}
					];
					//createStatus.failure(commitDetails, 'Failed with eslint errors', function(status) {

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
													return callback(null, false);
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
									fs.unlinkSync(esErrorFile);
									console.timeEnd('Automation execution time');
									console.log("Commit specific log files deleted.");
									return callback(null, false);
								});
							}
						});
					//});
				} else {
					return callback(null, true);
				}
			}
		});
	});
};

executorServices.checkEslintStatus = function(commitDetails, callback){
	console.log("The modified files on the commit "+commitDetails.changedFiles+" ,the length of commitDetails.changed ="+(commitDetails.changedFiles).length);
	if ((commitDetails.changedFiles).length !==0) {
		executorServices.executeEslint(commitDetails, function(err, status){
			if(!err) {
				eslint_status = status;
				console.log("Eslint script executed successfully. "+eslint_status);
				return callback();
			}
		});
	}else {
		console.log("Eslint script not executed because no modified file matched with the specified list. The status of eslint ="+eslint_status);
		return callback();
	}
};
