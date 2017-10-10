//This script is responsible for creating job queue and serves each job one by one.
'use strict.';
var executorServices = require('./executorServices.js');
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
jobQueue.process('pushRequest', function(job, done){
	console.log("started job "+ job.id );
	executorServices.executeJob(job.data, done);
});

//Adding new job in queue of "pushRequest" type
queueServices.addNewJob = function(jobArg){
	var job = jobQueue.create('pushRequest', jobArg).save( function(err){
		if( !err ) 
			console.log( job.id );
		else
			console.log("Getting error while adding job in queue: "+err);			
	});
};




