'use strict';
var moment = require('moment');
var queueServices = require('./queueServices.js');
var redisClient;
var gitBranchServices = module.exports = {};

gitBranchServices.deleteMatureCommitBranch = function(){
	redisClient.keys('pendingCommit*', function(err, pendingCommits){
		if(pendingCommits && pendingCommits.length>0){
			pendingCommits.forEach(function ( pc, index){
				redisClient.hgetall(pc, function(err, commit){
					if(moment().diff(moment(commit.entryTime))>=180000){
						queueServices.addNewJob(commitDetails);
						redisClient.del(pc);
					}
				});
			});		
		}
	});
};

gitBranchServices.managePendingCommits = function(redisStorageClient){
	redisClient = redisStorageClient;
	setInterval(gitBranchServices.deleteMatureCommitBranch, 30000);
};

