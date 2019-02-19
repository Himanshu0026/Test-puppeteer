//This script is responsible for creating job queue and serves each job one by one.
'use strict.';
var executorServices = require('./executorServices.js');
var globalCurrentRunningBranch = require('./globalVariable.js');
var redisClient;
var fs = require('fs');
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
			globalCurrentRunningBranch.global.resetCurrentRunningBranch();
		});
	}
);

//Initiating job processing
jobQueue.process('pushRequest', function(job, done) {
	console.log("started branch name is "+ job.data.branchName );
	globalCurrentRunningBranch.global.setCurrentRunningBranch(job.data.branchName);
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
		console.log('the message of the commit'+jobArg.commitMessage);
		var index = jobArg.commitMessage.search("inprogress");
		console.log('the vale of index'+index);
		if(index === -1 || jobArg.priorityNo === '-10') {
			var job = jobQueue.create('pushRequest', jobArg).priority(priorityNo).save( function(err){
				if( !err ) {
					console.log( job.id );
					var currentJobId = job.id;
					console.log("new added job id is "+ job.id );
					console.log('new added job branch name '+job.data.branchName);
					console.log('new added job priority is '+job.data.priorityNo);
					var globalCurrentRunningBranchData = globalCurrentRunningBranch.global.getCurrentRunningBranch();
					console.log('globalCurrentRunningBranchData is = '+globalCurrentRunningBranchData);
					var newBranch = job.data.branchName;
					if (newBranch === globalCurrentRunningBranchData) {
						exec("/etc/automation/bin/stop_phantom.sh" , function(code, stdout, stderr) {
							console.log('Exit code inside the stop_phantom.sh :', code);
							console.log( 'STOP_PHANTOMJS' );
							var stopFile = '/etc/automation/log/stop.txt';
							fs.writeFile(stopFile, 'STOP_PHANTOMJS', function (err) {
								if (err)
									console.log(err);
								else
									console.log('Write operation complete.');
							});
						});
					}
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
		} else {
			var globalCurrentRunningBranchData = globalCurrentRunningBranch.global.getCurrentRunningBranch();
			console.log('globalCurrentRunningBranchData is = '+globalCurrentRunningBranchData);
			var newBranch = jobArg.branchName;
			if (newBranch === globalCurrentRunningBranchData) {
				exec("/etc/automation/bin/stop_phantom.sh" , function(code, stdout, stderr) {
					console.log('Exit code inside the stop_phantom.sh :', code);
					console.log( 'STOP_PHANTOMJS' );
					var stopFile = '/etc/automation/log/stop.txt';
					fs.writeFile(stopFile, 'STOP_PHANTOMJS', function (err) {
						if (err)
							console.log(err);
						else
							console.log('Write operation complete.');
					});
				});
			}
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
		}
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
