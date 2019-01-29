var globalCurrentRunningBranch = module.exports = {};
var current_running_branch;
globalCurrentRunningBranch.global = {
	currentRunningBranch: "",
	allowAutomation: true,
	setCurrentRunningBranch: function(branch) {
		globalCurrentRunningBranch.global.currentRunningBranch = branch;
	},
	getCurrentRunningBranch: function() {
		return globalCurrentRunningBranch.global.currentRunningBranch;
	},
	resetCurrentRunningBranch: function() {
		globalCurrentRunningBranch.global.currentRunningBranch = "";
	},
	skipAutomation: function() {
		globalCurrentRunningBranch.global.allowAutomation = false;
	},
  isAutomationAllowed: function() {
		return globalCurrentRunningBranch.global.allowAutomation;
	}
};
