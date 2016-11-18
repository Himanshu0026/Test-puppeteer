"use strict";

var Client = require("./../lib/index");
var createStatus = module.exports = {};

createStatus.success = function(commitDetails, callback) {
	var github = new Client({
    		debug: true
	});

	github.authenticate({
		type: "oauth",
		token: "b2e8c840886cae303ed3d1cfe0c3cdbf2143608b" 
	});

	github.repos.createStatus({
		owner: commitDetails.ownerName,
		repo: commitDetails.repositoryName,
		sha: commitDetails.commitId,
		state: "success",
	}, function(err, res) {
	   	console.log(err, res);
	    	return callback(res.state);
	});
};

createStatus.failure = function(commitDetails, callback) {
	var github = new Client({
    		debug: true
	});

	github.authenticate({
		type: "oauth",
		token: "b2e8c840886cae303ed3d1cfe0c3cdbf2143608b" 
	});

	github.repos.createStatus({
		owner: commitDetails.ownerName,
		repo: commitDetails.repositoryName,
		sha: commitDetails.commitId,
		state: "failure",
	}, function(err, res) {
		console.log(err, res);
		return callback(res.state);
	});
};

