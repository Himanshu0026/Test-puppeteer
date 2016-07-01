'use strict';
var executorServices = require('./executorServices.js');
var kue = require('kue');                                                    
var jobQueue = kue.createQueue(); 
var i=0; 

var queueServices = module.exports = {};

jobQueue.on('job enqueue', function(id, type){
	console.log( 'Job %s got queued of type %s', id, type );

}).on('job complete', function(id, result){
	kue.Job.get(id, function(err, job){
		if (err) return;
		job.remove(function(err){
			if (err) throw err;
				console.log('removed completed job #%d', job.id);
		});
	});
});

jobQueue.process('pushRequest', function(job, done){
	console.log("started job "+ job.id );
	executorServices.executeJob(job.data, done);
});

queueServices.addNewJob = function(jobArg, callback){
	var job = jobQueue.create('pushRequest', jobArg).save( function(err){
	   if( !err ) console.log( job.id );
	});
};


queueServices.tempFunction = function(){
	console.log("called temp");
	queueServices.addNewJob({"var" : i++});
};






