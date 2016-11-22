"use strict";

var Client = require("./../lib/index");
var testAuth = require("../lib/userData.json");
var createStatus = module.exports = {};

createStatus.success = function(commitDetails, callback) {
	var github = new Client({
    		debug: true
	});

	github.authenticate({
	    type: "token",
	    token: "3a07de9885c788c8ac0b639fafbe3c166018a19c",
	});
	
	/*github.authenticate({
		type: "basic",
		username: "hotam-singh",
		password:"hotam@123"    
	});*/

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
	    type: "token",
	    token: "3a07de9885c788c8ac0b639fafbe3c166018a19c",
	});
	
	/*github.authenticate({
		type: "basic",
		username: "hotam-singh",
		password:"hotam@123"    
	});*/

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

