'use strict.';

var config = require('../config/config.json');
var redis = require('redis');
var psTree = require('ps-tree');
var utils = module.exports = {};
var redisClient;

utils.initRedisClient = function(){
	redisClient = redis.createClient(config.redis.port, config.redis.host);
	redisClient.on('error', function(err) {
		console.error('RedisClient has got an error: %j : ', err);
	});

	redisClient.on('connect', function() {
		console.log('Connected to redis.');
	});

	redisClient.on('ready', function() {
		console.log('Redis client ready.');
	});
	return redisClient;
};



utils.isValidJobToAdd = function(commitBranch, commitDetails, callback){
	console.log("Executing isValidJobToAdd for "+commitBranch);
	var currentTime = new Date();
	var timeString = currentTime.toString();
	redisClient.get(commitBranch, function (err, value) {
		if(value){
			var diff = currentTime - new Date(value);
			console.log("The automation had been run for the "+ commitBranch +" branch "+diff+" ms ago.");
			if(diff >= 1800000){
				console.log("Returning true to add in job queue");
				redisClient.set(commitBranch, timeString);
				return callback(true);
			}else{
				console.log("Adding "+commitBranch +" to pending list.");
				console.log("commitDetails: "+commitDetails);
				console.log("commitDetails: "+JSON.stringify(commitDetails));
				redisClient.exists("pendingCommit_"+commitBranch, function(err, isExist){
					if(!isExist)
						redisClient.hmset("pendingCommit_"+commitBranch, {"branch": commitBranch, "commitDetails": JSON.stringify(commitDetails), "entryTime": timeString});
					else
						redisClient.hset("pendingCommit_"+commitBranch, "commitDetails", JSON.stringify(commitDetails));
				});
				return callback(false);
			}
		}else{
			console.log("First time automation execution request received for the branch "+commitBranch);
			redisClient.set(commitBranch, timeString);
			return callback(true);
		}
	});
};

utils.isValidBranch = function(branchName, callback) {
	console.log("Executing isValidBranch for "+branchName);
	var currentTime = new Date();
	var timeString = currentTime.toString();
	var len = 1;
	redisClient.exists('backstopBranches', function(err, isExist) {
		if(isExist) {
			redisClient.smembers('backstopBranches', function (err, branchList) {
				if(branchList) {
					branchList.forEach(function(branch) {
						if(branch.branchName == branchName) {
							return callback(false);
						}else {
							if(len >= branchList.length) {
								var value = false;
								addNewBranch(value);
								len++;
							}
						}
					});
					function addNewBranch(value) {
						console.log('value in redis get : ' + value);
						if(!value) {
							console.log("First time backstop execution request received for the branch "+branchName);
							redisClient.sadd('backstopBranches', branchName);
							return callback(true);
						}else {
							return callback('false');
						}
					}
				}
			});
		}else {
			console.log("First time storing backstop branch details on the redis server for branch "+branchName);
			redisClient.sadd('backstopBranches', branchName);
			return callback(true);
		}
	});
};
