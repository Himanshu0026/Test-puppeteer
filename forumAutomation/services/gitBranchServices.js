'use strict';
var redisClient;
var gitBranchServices = module.export = {};

gitBranchServices.deleteMatureCommitBranch = function(redisClient, callback){
	redisClient.keys('pendingCommit*', function(err, pendingCommits){
		if(pendingCommits && pendingCommits.length>0){
			pendingCommits.forEach(function ( pc, index){
				redisClient.hgetall(pc, function(err, commit){
					if(moment().diff(commit.entryTime)>=180000){
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

