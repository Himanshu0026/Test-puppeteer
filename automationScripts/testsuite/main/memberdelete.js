var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var memberdeleteTests = require('../cases/memberdelete.js');
var memberDelete = module.exports = {};


memberDelete.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();
	}).then(function(){
		//Verify by register members for member delete-Task
                memberdeleteTests.registermembers();
		//Verify delete users from search section from backend settings
		memberdeleteTests.verifyDeleteSearchSection();
		//Verify by delete users from usergrop permission.
		//checked delete from usergroup settings.
		memberdeleteTests.verifyDeleteuserGrp();
		//Verify Delete Account Pending Email Users on Account
		//Profile page Delete own Account Disable
		memberdeleteTests.disabledeleteUsersprofilePage();
		//Verify Delete Account YES   on  Pending Email Users on Account
		//Profile  page Delete own Account Enable   with valid password
		memberdeleteTests.enabledeleteUsersprofilePage();
		//Verify admin Delete other users Account  Through
		//Members Check box on Members page
		memberdeleteTests.deleteAdminmembersPage();
	});
};
