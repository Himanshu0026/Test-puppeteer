'use strict';
var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: 'monika' });
var GitHubApi = require("github");

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    },
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
});



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
	console.log(JSON.stringify(event.payload));
	github.repos.createStatus({
		"user": "its4monika",
		"repo": "QA-automation",
		"sha": "1e8afb95d527ca52e63ec329f5baefa1ff110083",
		"state": "failure",
		"target_url": "http://chatbeta.websitetoolbox.com/",
		"description": "This is webhook testing",
		"context": "Forum automation"
	});
});

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title);
	console.log(JSON.stringify(event.payload));
});

