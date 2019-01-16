//This script is responsible for creating job queue and serves each job one by one.
'use strict.';
var executorServices = require('./executorServices.js');
var redisClient;
var kue = require('kue');

var queueServices = module.exports = {};

//Creating job queue
var jobQueue = kue.createQueue();

//Handling job enqueue event
jobQueue.on('job enqueue',
	function(id, type){
		console.log( 'Job %s got queued of type %s', id, type );

	}
).on('job complete', //Handling job completed event
	function(id, result){
		kue.Job.get(id, function(err, job){
			if (err) return;
			//Removing job from queue on completion
			job.remove(function(err){
				if (err) throw err;
					console.log('removed completed job #%d', job.id);
			});
		});
	}
);

//Initiating job processing
jobQueue.process('pushRequest', function(job, done) {
	console.log("started job id is "+ job.id );
	/*console.log('started job branch name '+job.data.branchName);
	console.log('started job priority is '+job.data.priorityNo);
	var newBranch = job.data.branchName;
	//if(job.data.priorityNo === '-10') {
		jobQueue.inactive( function( err, ids ) {
			ids.forEach( function( id ) {
				console.log("the parameter in the inactive " +id);
				console.log("the job data id " +job.id);
				console.log("the job data " +job.data.branchName);
				kue.Job.get( id, function( err, job ) {
					console.log("job Id = " +job.id+ " || name = " +job.data.branchName);
					if (job.data.branchName == newBranch) {
						job.remove(function(err){
							if (err) throw err;
								console.log('removed inactive job for the already completed job with high priority with job id #%d', job.id);
						});
					}
				});
			});
		});*/
		/*redisClient.exists("pendingCommit_"+newBranch, function(err, isExist){
			if(isExist){
				console.log('Inside the method to remove the pending branch for the same branch');
				redisClient.del("pendingCommit_"+newBranch);
			}else {
				console.log('No pending branch to remove for the same branch');
			}
		});*/
	//}
	executorServices.executeJob(job.data, done);
});

//Initiating backstop job processing
jobQueue.process('backstop', function(job, done){
	console.log("started job "+ job.id );
	console.log("started job with data  "+ job.data );
	executorServices.executeBackstop(job.data, done);
});

//Adding new job in queue of "pushRequest" type
queueServices.addNewJob = function(jobArg, type, priorityNo){
	if(type == 'automation') {
		var job = jobQueue.create('pushRequest', jobArg).priority(priorityNo).save( function(err){
			if( !err ) {
				console.log( job.id );
				var currentJobId = job.id;
				console.log("new added job id is "+ job.id );
				console.log('new added job branch name '+job.data.branchName);
				console.log('new added job priority is '+job.data.priorityNo);
				var newBranch = job.data.branchName;
				//if(job.data.priorityNo === '-10') {
					jobQueue.active(function(err, ids){
						ids.forEach( function( id ) {
							console.log("the job data " +job.data.branchName);
						});
					});
					jobQueue.inactive( function( err, ids ) {
						ids.forEach( function( id ) {
							console.log("the parameter in the inactive " +id);
							console.log("the job data id " +job.id);
							console.log("the job data " +job.data.branchName);
							kue.Job.get( id, function( err, job ) {
								console.log("job Id = " +job.id+ " || name = " +job.data.branchName);
								if (job.data.branchName == newBranch && job.id != currentJobId) {
									job.remove(function(err){
										if (err) throw err;
											console.log('removed inactive job for the already completed job with high priority with job id #%d', job.id);
									});
								}
							});
						});
					});
			} else
				console.log("Getting error while adding job in queue: "+err);
		});
	}else {
		var job = jobQueue.create('backstop', jobArg).priority(priorityNo).save( function(err){
			if( !err )
				console.log( job.id );
			else
				console.log("Getting error while adding job in queue: "+err);
		});
	}
};

queueServices.getRedisClient = function(redisStorageClient){
	redisClient = redisStorageClient;
	//return redisClient;
};
