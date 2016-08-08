var childProcess = require('child_process');
var testResult = childProcess.spawnSync("sudo bash -c '/home/monika/websitetoolbox/git/QA-automation/forumAutomation/bin/automation.sh'");
console.log('testResult : ' + testResult.pid);
	childProcess.kill(testResult.pid);

