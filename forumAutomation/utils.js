'use strict';

var redis = require('redis');
var psTree = require('ps-tree');
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
						redisClient.hmset("pendingCommit_"+commitBranch, {"branch": commitBranch, "commitDetails": commitDetails, "entryTime": timeString});	
					else
						redisClient.hset("pendingCommit_"+commitBranch, "commitDetails", commitDetails);
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


utils.terminateProcess = function(pid){
	console.log("Terminating process with PID : "+pid);
 	var signal   = 'SIGKILL';
    	var killTree = true;
    	if(killTree) {
        	psTree(pid, function (err, children) {
            		[pid].concat(
                		children.map(function (p) {
                    			return p.PID;
                		})
            		).forEach(function (tpid) {
                		try { process.kill(tpid, signal) }
                		catch (ex) {
					console.error("Exception occurred while terminating proess "+ tpid + ":" + ex);				
				}
            		});
        	});
    	} else {
        	try { process.kill(pid, signal) }
        	catch (ex) {
			console.error("Exception occurred while terminating proess "+ tpid + ":" + ex);						
		}
    	}
};

