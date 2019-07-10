var config = require('../../../config/config.json');
var deletePostTests = require('../cases/deletePost.js');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var forumLoginMethod = require('../methods/login.js');
var topicsCountTests = require('../cases/topicscount.js');
var profilePageMethod= require('../methods/profilePage.js');
var topicsCount = module.exports = {};


topicsCount.featureTest = function(){
	casper.start(config.backEndUrl, function() {
		utils.info(" Title of the page :"+this.getTitle());
		//forumLoginMethod.loginToForumBackEnd();
		utils.info(phantom.cookies);
	    phantom.cookies.forEach(function (v) {
	        // if (v.name === name) {
					//
	        //     ret = v.value;
	        // }
					utils.info(v.name + "  "+ v.value);

					//data printed by the cookie
					// undefined[object Object],[object Object],[object Object],[object Object]
					// undefined_gat  1
					// undefined_gid  GA1.3.1330483733.1562679033
					// undefined_ga  GA1.3.685015053.1562679033
					// undefinedhascookies  1

	    });
	}).then(function(){
	//create category--
	topicsCountTests.createCategory();
	//Verify by delete multiple topic-selecting by check box
	//create topic-
	topicsCountTests.createTopic();

	topicsCountTests.topicsCount();
	//Verify the Number of Topics for a category
	topicsCountTests.countTopicsCategorySubCategory ();
	//combine all forum
	//Verify with Number of Topics in latest topics page
	//topicsCountTests.combineallforumTopicCount();
        });
};
