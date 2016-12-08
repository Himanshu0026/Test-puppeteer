'use strict';
var fs = require('fs');
var removeDir = module.exports = {};
removeDir.deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    console.log('deleting files ');
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        removeDir.deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
  console.log('directory is deleted successfully');
};
