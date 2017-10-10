'use strict.';
var fs = require('fs');
var extfs = require('extfs');
var attachmentServices = module.exports = {};

//Method to Delete Old Directory
attachmentServices.removeDirs = function(path, callback) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) {
				// recurse
				attachmentServices.removeDirs(curPath, function() {
					return;
				});
			} else {
				// Delete File
				console.log('deleting file : '+curPath);
				fs.unlinkSync(curPath);
			}
		});
		console.log('deleting directory : '+path);
		fs.rmdirSync(path);
	}
	return callback();
};

//Method to Add Attachments
attachmentServices.addAttachments = function(dirPath, commitDetails, callback) {
	if( fs.existsSync(dirPath) ) {
		fs.readdirSync(dirPath).forEach(function(file, index){
			var curPath = dirPath + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) {
				// recurse
				attachmentServices.addAttachments(curPath, commitDetails, function(commitDetails) {
					return;
				});
			} else {
				//Adding Files To The Attachments
				var imagePath = {
					path: curPath
				};
				commitDetails.attachments.push(imagePath);
				console.log(curPath+' attached to the attachments');
			}
		});
	}
	return callback(commitDetails);
};

//Method to Delete Backstop Old Data
attachmentServices.removeBackstopDirs = function(path, callback) {
	console.log('path ::::::::::::::::::::::::::::::::::: '+path);
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) {
				if(curPath != path+'/casper_scripts') {
					extfs.isEmpty(curPath, function (empty) {
						if(empty) {
							console.log('deleting directory : '+curPath);
							fs.rmdir(curPath);
						}else {
							// recurse
							attachmentServices.removeDirs(curPath, function() {
								return;
							});
						}
					});
				}
			} else {
				// Delete File
				console.log('deleting file : '+curPath);
				fs.unlinkSync(curPath);
			}
		});
	}
	return callback();
};
