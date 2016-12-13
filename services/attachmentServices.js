'use strict';
var fs = require('fs');
var attachmentServices = module.exports = {};
var commitDetails = {};

//Method to Delete Old Directory
attachmentServices.deleteFolderRecursive = function(path) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { 
				// recurse
				attachmentServices.deleteFolderRecursive(curPath);
			} else { 
				// Delete File
				console.log('deleting file : '+curPath);
				fs.unlinkSync(curPath);
			}
		});
		console.log('deleting directory : '+path);
		fs.rmdirSync(path);
	}
};

//Method to Add Attachments
attachmentServices.addAttachments = function(dirPath, commitDetails, callback) {
	if( fs.existsSync(dirPath) ) {
		console.log('directory path "'+dirPath+'" exists');
		fs.readdirSync(dirPath).forEach(function(file,index){
			var curPath = dirPath + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { 
				// recurse
				attachmentServices.addAttachments(curPath);
			} else { 
				//Adding Files To The Attachments
				var imagePath = { 
					path: curPath
				};
				commitDetails.attachments.push(imagePath);
			}
		});
	}
	return callback(commitDetails);
};
