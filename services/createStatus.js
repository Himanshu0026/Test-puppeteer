"use strict";

var Client = require("./../lib/index");
var createStatus = module.exports = {};

createStatus.success = function(commitDetails, callback) {
	console.log('hello hshhshshsh');
	var github = new Client({
    		debug: true
	});

	github.authenticate({
	    type: "oauth",
	   token: commitDetails.commitId
	});
	
	/*github.authenticate({
	    type: "basic",
	   username: "hotam-singh",
	   password: "hotam@123"
	});*/

	github.repos.createStatus({
	    owner: commitDetails.committerName,
	    repo: commitDetails.repositoryName,
	    sha: commitDetails.commitId,
	    state: "success",
	}, function(err, res) {
	   	console.log(err, res);
	    return callback(state);
	});
};

createStatus.failure = function(commitDetails, callback) {
	var github = new Client({
    		debug: true
	});

	github.authenticate({
	    type: "oauth",
	   token: commitDetails.commitId
	});

	/*github.authenticate({
	    type: "basic",
	   username: "hotam-singh",
	   password: "hotam@123"
	});*/
	
	github.repos.createStatus({
	    owner: commitDetails.committerName,
	    repo: commitDetails.repositoryName,
	    sha: commitDetails.commitId,
	    state: "failure",
	}, function(err, res) {
	    console.log(err, res);
	    return callback(state);
	});
};

