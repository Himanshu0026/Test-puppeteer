'use strict';

var redis = require('redis');
var moment = require('moment');
var utils = module.exports = {};
var redisClient;

utils.initRedisClient = function(){
	redisClient = redis.createClient(6379, "127.0.0.1");
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
	
	redisClient.get(commitBranch, function (err, value) {
		if(value){
			var diff = moment().diff(value);
			console.log("The automation had been run for the "+ commitBranch +" branch "+diff+" ms ago.");
			if(diff >= 180000){
				redisClient.set(commitBranch, moment(new Date()));
				return callback(true);
			}else{
				redisClient.exists("pendingCommit_"+commitBranch, function(err, isExist){
					if(!isExist)
						redisClient.hmset("pendingCommit_"+commitBranch, {"branch": commitBranch, "commitDetails": commitDetails, "entryTime": moment(new Date())});	
					else
						redisClient.hset("pendingCommit_"+commitBranch, "commitDetails", commitDetails);
				});
				return callback(false);
			}
		}else{
			console.log("First time automation execution request received for the branch "+commitBranch); 
			redisClient.set(commitBranch, moment(new Date()));
			return callback(true);
		}		
	});
};
