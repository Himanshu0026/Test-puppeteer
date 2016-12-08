'use strict';
var fs = require('fs');
var removeDir = module.exports = {};
var commitDetails = {};
//Method to Delete Old Directory
removeDir.deleteFolderRecursive = function(path) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { 
				// recurse
				removeDir.deleteFolderRecursive(curPath);
			} else { 
				// delete file
				console.log('deleting file : '+curPath);
				fs.unlinkSync(curPath);
			}
		});
		console.log('deleting directory : '+path);
		fs.rmdirSync(path);
	}
};
