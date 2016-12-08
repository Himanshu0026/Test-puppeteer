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

//Method to Add Attachments
removeDir.addAttacments = function(path) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			console.log('commitdetails : '+JSON.stringify(file));
			/*var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { 
				// recurse
				removeDir.addAttacments(curPath);
			} else { 
				// delete file
				//console.log('deleting file : '+curPath);
				//fs.unlinkSync(curPath);
				commitDetails['attachments'] = [
					{
						path: curPath
					}
				];
			}*/
		});
		//console.log('deleting directory : '+path);
		//fs.rmdirSync(path);
	}
};
