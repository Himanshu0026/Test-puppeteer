'use strict';
var http = require('http');
var queueServices = require('./services/queueServices.js');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: 'monika' });

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });
}).listen(80);

handler.on('error', function (err) {
	console.error('Error:', err.message);
});

handler.on('push', function (event) {
	console.log('Received a push event for %s to %s',
    	event.payload.repository.name,
    	event.payload.ref);
	//console.log(JSON.stringify(event.payload));

	var commitDetails = {};
	var commitPayload = event.payload.head_commit;
	commitDetails["commitId"] = commitPayload.id;
	commitDetails["commitMessage"] = commitPayload.message;
	commitDetails["commitUrl"] = commitPayload.url;
	commitDetails["committerName"] = commitPayload.committer.name;
	commitDetails["committerEmail"] = commitPayload.committer.email;
	var tempArr = event.payload.ref.split("/");
	var branchName = tempArr[tempArr.length-1];
	commitDetails["branchName"] = branchName;
	queueServices.addNewJob(commitDetails);
});

handler.on('issues', function (event) {
	console.log('Received an issue event for %s action=%s: #%d %s',
		event.payload.repository.name,
		event.payload.action,
		event.payload.issue.number,
		event.payload.issue.title);
	console.log(JSON.stringify(event.payload));
});
