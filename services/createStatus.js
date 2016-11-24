"use strict";

var Client = require("./../lib/index");
var testAuth = require("../lib/userData.json");
var createStatus = module.exports = {};

//Method For Creating Status If All Automation Test Cases Are Passed.
createStatus.success = function(commitDetails, callback) {
	var github = new Client({
    		debug: true
	});

	github.authenticate({
	    type: "token",
	    token: testAuth.userToken.token
	});
	
	github.repos.createStatus({
		owner: commitDetails.ownerName,
		repo: commitDetails.repositoryName,
		sha: commitDetails.commitId,
		state: "success",
		description: "Passed automation testing."
	}, function(err, res) {
	   	console.log(err, res);
	    	return callback(res.state);
	});
};

//Method For Creating Status If Any Automation Test Case Is Failed.
createStatus.failure = function(commitDetails, num, callback) {
	var github = new Client({
    		debug: true
	});

	github.authenticate({
	    type: "token",
	    token: testAuth.userToken.token
	});
	
	github.repos.createStatus({
		owner: commitDetails.ownerName,
		repo: commitDetails.repositoryName,
		sha: commitDetails.commitId,
		state: "failure",
		description: "Failed "+num+" automation test cases."
	}, function(err, res) {
		console.log(err, res);
		return callback(res.state);
	});
};

