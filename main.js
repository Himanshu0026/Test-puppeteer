//This is the main script file responsible for starting the automation server. The request from webhook will be served here only by webhook handler.
 
'use strict';
var http = require('http');
var config = require('./config/config.json');
var queueServices = require('./services/queueServices.js');
var gitBranchServices = require('./services/gitBranchServices');
var utils = require('./services/utils.js');

//Initializing Redis client
var redisClient = utils.initRedisClient();

//Creating github webhook handler
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: config.webhook.secret });

gitBranchServices.managePendingCommits(redisClient);

//Creating server to listen on port 8081
http.createServer(function (req, res) {
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
		commitDetails["commitId"] = commitPayload.id;
		commitDetails["repositoryName"] = event.payload.repository.name;
		commitDetails["ownerName"] = event.payload.repository.owner.name;
		commitDetails["beta"] = config.beta;
		commitDetails["commitMessage"] = commitPayload.message;
		commitDetails["commitUrl"] = commitPayload.url;
		commitDetails["committerName"] = commitPayload.committer.name;
		commitDetails["committerEmail"] = commitPayload.committer.email;
		var tempArr = event.payload.ref.split("/");
		var branchName = tempArr[tempArr.length-1];
		commitDetails["branchName"] = branchName;
		//Adding a new job in queue with commit details
		//queueServices.addNewJob(commitDetails);
		utils.isValidJobToAdd(branchName, commitDetails, function(valid){
			if(valid)
				queueServices.addNewJob(commitDetails);
		});
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
