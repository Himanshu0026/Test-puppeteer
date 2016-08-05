/*var execSync = require('child_process').execSync;
execSync("touch 1.txt");
execSync("touch 2.txt");
execSync("touch 3.txt");
execSync("touch 1.txt");
execSync("touch 1.txt");
execSync("touch 1.txt");
execSync("touch 1.txt");*/
var moment = require('moment');
var currentTime = new Date();
	var timeString = currentTime.toString();
var diff = currentTime - new Date("Fri Aug 05 2016 06:28:24 GMT-0400");
console.log("timeString : "+timeString);
			console.log("The automation had been run for the  branch "+diff+" ms ago.")

