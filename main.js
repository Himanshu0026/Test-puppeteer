//This is the main script file responsible for starting the automation server. The request from webhook will be served here only by webhook handler.

'use strict.';
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var fs = require('fs');
var request = require('request');
var moment = require('moment');
var config = require('./config/config.json');
var queueServices = require('./services/queueServices.js');
var gitBranchServices = require('./services/gitBranchServices');
var executorServices = require('./services/executorServices');
var utils = require('./services/utils.js');
var bodyParser = require('body-parser');

// Middlewares to handle Directory Structure
app.use(express.static(__dirname + '/backstopjs/backstop_data/html_report/'));
app.use(express.static(__dirname + '/backstopjs/backstop_data'));

//Initializing Redis client
var redisClient = utils.initRedisClient();
executorServices.redisClient = redisClient;

//Creating github webhook handler
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: config.webhook.secret });
app.use(handler);

gitBranchServices.managePendingCommits(redisClient);
queueServices.getRedisClient(redisClient);

//Setting views directory and view engine
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling QA Page
app.get('/qa', function(req, res) {
	res.render('index');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname+'/backstopjs/backstop_data/html_report/index.html');
});

//Handling Branches Page
app.get('/branches', function(req, res) {
	console.log('getting all branches');
	var branches = [];
	request({
		url: config.apiURL+'branches?page=1&per_page=200&access_token='+config.token,
	    	headers: { 'user-agent' : 'git-technetium' },
	    	json: true
	}, function(err, response, body) {
		 if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			var inc = 1;
			body.forEach(function(branch) {
				var branchName = branch.name;
				request({
					url: config.apiURL+'commits/'+branchName+'?access_token='+config.token,
					headers: { 'user-agent' : 'git-technetium' },
					json: true
				}, function(err, response, body1) {
					if(err) {
						console.log('err : '+err);
						res.send(err);
					}
					if(response.statusCode == 200) {
						var commitId = body1.sha;
						var date = body1.commit.author.date;
						var updateddate = moment(date);
						var time = updateddate.format('HH:mm:ss');
						var updatedDate = updateddate.format('DD/MM/YYYY');
						request({
							url: config.apiURL+'commits/'+commitId+'/statuses?access_token='+config.token,
						    	headers: { 'user-agent' : 'git-technetium' },
						    	json: true
						}, function(err, response, body2) {
							if(err) {
								console.log('err : '+err);
								res.send(err);
							}
							if(response.statusCode == 200) {
								if(branchName != 'favicon.ico') {
									if(body2.length > 0) {
										var branchStats = {
											name: branchName,
											userName: body1.commit.author.name,
											date_to_show: updatedDate + ' | ' + time,
											automationStatus: body2[0].state,
											description: body2[0].description,
											date: date
										};
										branches.push(branchStats);
									}else {
										var branchStats = {
											name: branchName,
											userName: body1.commit.author.name,
											date_to_show: updatedDate + ' | ' + time,
											automationStatus: 'null',
											description: 'null',
											date: date
										};
										branches.push(branchStats);
									}
								}
							}
							if(inc >= body.length) {
								sendBranchStats();
							}
							inc++;
						});
					}
					function sendBranchStats() {

						//Function to sort branches
						function compare(a,b) {
							if (a.date > b.date)
								return -1;
							if (a.date < b.date)
								return 1;
							return 0;
						}

						//Sorting branches
						console.log('sorting branches with date');
						branches.sort(compare);
						console.log('sending braches through ejs');
						res.render('branches', {
							branches: branches
						});
					}
		  	});
			});
		}
	});
});

//Handling Pull Requests Page
app.get('/pulls', function(req, res) {
	console.log('Getting pull requests');
	var pullRequests = [];
	request({
	url: config.apiURL+'pulls?state=open&sort=updated&direction=desc&page=1&per_page=50&access_token='+config.token,
	  	headers: { 'user-agent' : 'git-technetium' },
	  	json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			var inc = 1;
			body.forEach(function(pulls) {
				request({
					url: config.apiURL+'pulls/'+pulls.number+'?access_token='+config.token,
					headers: { 'user-agent' : 'git-technetium' },
					json: true
				}, function(err, response, body1) {
					if(err) {
						console.log('err : '+err);
						res.send(err);
					}
					if(response.statusCode == 200) {
						var date = body1.updated_at;
						//var currentTime = moment();
						date = moment(date);
						var time = date.format('HH:mm:ss');
						var updatedDate = date.format('DD/MM/YYYY');
						request({
							url: body1.statuses_url+'?access_token='+config.token,
							headers: { 'user-agent' : 'git-technetium' },
							json: true
						}, function(err, response, body2) {
							if(err) {
								console.log('err : '+err);
								res.send(err);
							}
							if(response.statusCode == 200) {
								if(body2.length > 0) {
									var pullRequest = {
										//name: pulls.title,
										name:body1.head.ref,
										number: pulls.number,
										username: pulls.user.login,
										date:updatedDate + ' | ' + time,
										state: pulls.state,
										merged: body1.merged,
										mergeable: body1.mergeable,
										automationStatus: body2[0].state
									};
									pullRequests.push(pullRequest);
								}
							}
							if(inc >= body.length) {
								sendResponse();
							}
							inc++;
						});
					}
				});
			});
			function sendResponse() {
				console.log('sending response');
				res.render('pullRequests', {
					pullRequests: pullRequests
				});
			}
		}
  });
});

//Handling unused request
app.get('/favicon.ico', function(req, res) {
  res.sendStatus(204);
});

app.get('/reviews/*', function(req, res) {
	var pullRequestReviews = [];
	var inc = 1;
	var pullNumber = req.url.split('/')[2];
	console.log('pull request number : ' + pullNumber);
	request({
		url: config.apiURL+'pulls/'+pullNumber+'/requested_reviewers?access_token='+config.token,
	    	headers: { 'user-agent' : 'git-technetium' },
	    	json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			console.log('the length of the body'+body.users);
			console.log('the length of the user'+body.users.length);
			body.users.forEach(function(users) {
				var requestedReviewer = users.login;
				var reviewer = {
					name: requestedReviewer,
					state: 'PENDING'
				};
				pullRequestReviews.push(reviewer);
			});
			if(inc >= body.users.length) {
				request({
					url: config.apiURL+'pulls/'+pullNumber+'/reviews?access_token='+config.token,
				    	headers: { 'user-agent' : 'git-technetium' },
				    	json: true
				}, function(err, response, body1) {
					if(err) {
						console.log('err : '+err);
						res.send(err);
					}
					if(response.statusCode == 200) {
						if(body1 && body1.length > 0) {
							var position1 = body1.map(function (element) {return element.user.login;}).lastIndexOf('neerajsrivastava');
							var position2 = body1.map(function (element) {return element.user.login;}).lastIndexOf('angelapaguirigan');
							var position3 = body1.map(function (element) {return element.user.login;}).lastIndexOf('webtoolbox');
							if(position1 != -1) {
								var position = pullRequestReviews.map(function (element) {return element.name;}).lastIndexOf('neerajsrivastava');
								if(position == -1) {
									var reviewer = {
										name: body1[position1].user.login,
										state: body1[position1].state
									};
									pullRequestReviews.push(reviewer);
								}
							}
							if(position2 != -1) {
								var position = pullRequestReviews.map(function (element) {return element.name;}).lastIndexOf('angelapaguirigan');
								if(position == -1) {
									var reviewer = {
										name: body1[position2].user.login,
										state: body1[position2].state
									};
									pullRequestReviews.push(reviewer);
								}
							}
							if(position3 != -1) {
								var position = pullRequestReviews.map(function (element) {return element.name;}).lastIndexOf('webtoolbox');
								if(position == -1) {
									var reviewer = {
										name: body1[position3].user.login,
										state: body1[position3].state
									};
									pullRequestReviews.push(reviewer);
								}
							}
							sendResponse();
						}else {
							sendResponse();
						}
					}
				});
			}
			inc++;
		}
	});
	function sendResponse() {
		console.log('sending review status');
		res.render('reviewStatus', {
			pullRequestReviews: pullRequestReviews,
			error: ''
		});
	}
});

app.get('/branches/*', function(req, res) {
	var url = req.url;
	url = url.split('?')[0];
	url = url.split('/');
	var branchName = url[url.length-1];
	console.log('getting branch details for '+ branchName + ' branch');
	var branchStats = {};
	request({
		url: config.apiURL+'commits/'+branchName+'?access_token='+config.token,
		headers: { 'user-agent' : 'git-technetium' },
		json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}else if(body.message) {
			console.log('body.message : '+body.message);
			res.render('branchStats', {
				branchStats: '',
				error: body.message
			});
		}
		if(response.statusCode == 200) {
			var commitId = body.sha;
			var date = body.commit.author.date;
			var currentTime = moment();
			date = moment(date);
			var duration = moment.duration(currentTime.diff(date));
			var timeString = Math.floor(duration.asHours()) +":"+duration.minutes();
			timeStringHours = timeString.split(':')[0];
			timeStringMinutes = timeString.split(':')[1];
			console.log('timeStringHours : '+timeStringHours);
			var commiter = body.commit.committer.name;
			if(timeStringHours != 0) {
				if(timeStringHours == 1) {
					if(timeStringMinutes > 30) {
						var timeDiff = 'Updated ' + (parseInt(timeStringHours) + 1) + ' hours ago by ' + commiter;
					}else {
						var timeDiff = 'Updated an hour ago by ' + commiter;
					}
				}else {
					if(timeStringMinutes > 30) {
						var timeDiff = 'Updated ' + (parseInt(timeStringHours) + 1) + ' hours ago by ' + commiter;
					}else {
						var timeDiff = 'Updated ' + timeStringHours + ' hours ago by ' + commiter;
					}
				}
			}else {
				if(timeStringMinutes == 1) {
					var timeDiff = 'Updated a minute ago by ' + commiter;
				}else {
					var timeDiff = 'Updated ' + timeStringMinutes + ' minutes ago by ' + commiter;
				}
			}
			var time = date.format('HH:mm:ss');
			var commitDate = date.format('DD/MM/YYYY');
			request({
				url: config.apiURL+'commits/'+commitId+'/statuses?access_token='+config.token,
			    	headers: { 'user-agent' : 'git-technetium' },
			    	json: true
			}, function(err, response, body1) {
				if(err) {
					console.log('err : '+err);
					res.send(err);
				}
				if(response.statusCode == 200) {
					if(branchName != 'favicon.ico') {
						if(body1 && body1.length > 0 ) {
							branchStats = {
								name: branchName,
								userName: body.commit.author.name,
								automationStatus: body1[0].state,
								description: body1[0].description,
								date: commitDate + ' | ' + time,
								commitUpdate: timeDiff
							};
							sendBranchStats();
						} else {
							branchStats = {
								name: branchName,
								userName: body.commit.author.name,
								automationStatus: 'inprogress',
								description: 'inprogress',
								date: commitDate + ' | ' + time,
								commitUpdate: timeDiff
							};
							sendBranchStats();
						}
					}
				}
			});
		}
		function sendBranchStats() {
			console.log('Automation status for branch - '+ branchName + ' : ' + JSON.stringify(branchStats));
			res.render('branchStats', {
				branchStats: branchStats,
				error: ''
			});
		}
  });
});

app.post('/backstop/*', function(req, res) {
	var url = req.url;
	url = url.split('?')[0];
	url = url.split('/');
	var branchName = url[url.length-1];
	console.log('initiating backstop process for ' + branchName + ' branch');
	request({
		url: config.apiURL+'branches/'+branchName+'?access_token='+config.token,
		headers: { 'user-agent' : 'git-technetium' },
		json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			executorServices.executeBackstop(branchName, function(err) {
				if(err) {
					console.log('Adding backstop job into queue for branch ' + branchName);
					utils.isValidBranch(branchName, function(valid) {
						if(valid) {
							queueServices.addNewJob(branchName, 'backstop', '0');
						}else {
							return callback('backstop for '+ branchName + ' branch is already in queue');
						}
					});
				} else {
					res.redirect('/');
				}
			});
		}else {
			res.send('The branch is invalid. Make sure the branch you entered is correct!');
		}
	});
});

//Creating server to listen on port 8081
http.createServer(app, function (req, res) {
	handler(req, res, function (err) {
		res.statusCode = 404;
		res.end('no such location');
	});
}).listen(config.webhook.port);

//Log error message on any error event
handler.on('error', function (err) {
	console.error('Error:', err.message);
});

//Serve push event on github repository
handler.on('push', function (event) {
	console.log('Received a push event for %s to %s',
	event.payload.repository.name,
	event.payload.ref);
	var commitPayload = event.payload.head_commit;
	if(commitPayload){
		//Preapring commit details from event's payload for further processing
		var commitDetails = {};
		commitDetails.commitId = commitPayload.id;
		commitDetails.repositoryName = event.payload.repository.name;
		commitDetails.ownerName = event.payload.repository.owner.name;
		commitDetails.beta = config.beta;
		commitDetails.commitMessage = commitPayload.message;
		commitDetails.commitUrl = commitPayload.url;
		commitDetails.committerName = commitPayload.committer.name;
		commitDetails.committerEmail = commitPayload.committer.email;
		var tempArr = event.payload.ref.split("/");
		var branchName = tempArr[tempArr.length-1];
		commitDetails.branchName = branchName;
		commitDetails.priorityNo = '0';
		console.log('the message of the commit'+commitDetails.commitMessage);
		var index = commitDetails.commitMessage.search("inprogress");
		console.log('the vale of index'+index);
		if(index === -1) {
			//utils.isValidJobToAdd(branchName, commitDetails, function(valid){
				//if(valid)
					queueServices.addNewJob(commitDetails, 'automation', '0');
			//});
		}
	}else{
		console.log("commitPayload not found");
		console.log("Event payload : "+JSON.stringify(event.payload));
	}
});

//Log details on any issue event
handler.on('issues', function (event) {
	console.log('Received an issue event for %s action=%s: #%d %s',
		event.payload.repository.name,
		event.payload.action,
		event.payload.issue.number,
		event.payload.issue.title);
	console.log(JSON.stringify(event.payload));
});

app.get('/pendingBranches', function(req,res) {
	console.log('get request for pending branches hit');
	redisClient.keys('pendingCommit*', function(err, pendingCommits){
		if(pendingCommits && pendingCommits.length>0){
			console.log("Found pending commits"+pendingCommits.length+ "........." +pendingCommits);
			res.render('pendingBranches', {
        pendingBranches: pendingCommits
      });
		}else{
			console.log("No pending commits");
			res.render('pendingBranches', {
        pendingBranches: pendingCommits
      });
		}
	});
});

app.post('/pendingBranches/*', function(req, res) {
	console.log('Inside the post method of pending branches');
	var branch = req.body.pendingBranchName;
	console.log(req.body.pendingBranchName);
	redisClient.hgetall(branch, function(err, commit) {
		console.log("Now checking for pending commit for branch: " + commit.branch);
		commit.commitDetails.priorityNo = '-10';
		console.log(commit);
		var commitInfoJSON = JSON.parse(commit.commitDetails);
		queueServices.addNewJob(commitInfoJSON, 'automation', '-10');
	});
});

app.get('/pendingBranches/*', function(req, res) {
	res.redirect('/pendingBranches/');
});

app.post('/automate/*', function(req, res) {
	var url = req.url;
	url = url.split('?')[0];
	url = url.split('/');
	var branchName = url[url.length-1];
	var commitDetails = {};
	commitDetails.branchName = branchName;
	request({
		url: config.apiURL+'branches/'+branchName+'?access_token='+config.token,
		headers: { 'user-agent' : 'git-technetium' },
		json: true
	}, function(err, response, body) {
		if(err) {
			console.log('err : '+err);
			res.send(err);
		}
		if(response.statusCode == 200) {
			commitDetails.commitId = body.commit.sha;
			commitDetails.repositoryName = "Website-Toolbox";
			commitDetails.ownerName = "webtoolbox";
			commitDetails.beta = config.beta;
			commitDetails.commitMessage = body.commit.commit.message;
			commitDetails.commitUrl = body.commit.html_url;
			commitDetails.committerName = body.commit.commit.committer.name;
			commitDetails.committerEmail = body.commit.commit.committer.email;
			commitDetails.priorityNo = '-10';
			console.log('initiating automation for ' + commitDetails.branchName + ' branch');
			queueServices.addNewJob(commitDetails, 'automation', '-10');
			res.send('Branch added to the automation queue and will execute just after the completion of current process and you will get the mail in case of failure ');
		}
	});
});
