'use strict';
var queueServices = require('./queueServices.js');
var redisClient;
var gitBranchServices = module.exports = {};

gitBranchServices.deleteMatureCommitBranch = function(){
	console.log("Running deleteMatureCommitBranch");
	redisClient.keys('pendingCommit*', function(err, pendingCommits){
		console.log("Found pending commits");
		if(pendingCommits && pendingCommits.length>0){
			pendingCommits.forEach(function ( pc, index){
				redisClient.hgetall(pc, function(err, commit){
					console.log("Now checking for pending commit for branch: " + commit.branch);
					var currentTime = new Date();
					var timeDiff = currentTime - new Date(commit.entryTime);
					console.log(timeDiff + " ms ago commit had been made.");
					if(timeDiff >= 1800000){
						console.log("Now moving " + commit.branch + " in job queue.");
						console.log("Last commit details: " + commit.commitDetails);
						console.log("commitDetails: "+JSON.stringify(commit.commitDetails));
						queueServices.addNewJob(commit.commitDetails);
						redisClient.del(pc);
					}
				});
			});		
		}else{
			console.log("No pending commits");
		}
	});
};

gitBranchServices.managePendingCommits = function(redisStorageClient){
	redisClient = redisStorageClient;
	console.log("The service gitBranchServices.deleteMatureCommitBranch has been started.");
	setInterval(gitBranchServices.deleteMatureCommitBranch, 300000);
};

