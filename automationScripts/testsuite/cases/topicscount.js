var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var topicsCountJSON = require('../../testdata/topicscount.json');
var topicJSON = require('../../testdata/topic.json');
var topicMethod = require('../methods/topic.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var deletePostMethod = require('../methods/deletePost.js');
topicsCountTests = module.exports = {};

//code written for remove the dependency issues
// method to create a category General
topicsCountTests.createCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' * Method to create category and sub category *');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		try{
			this.test.assertTextExist(topicsCountJSON.category.title, 'category found on category page');
		}catch(e){
			casper.then(function(){
				backEndForumRegisterMethod.createCategory(topicsCountJSON.category);
			}).wait(1000, function(){
				this.reload(function() {
					this.waitForText(topicsCountJSON.category.title, function(){
						backEndForumRegisterMethod.createCategorySubcategory(topicsCountJSON.topicsCountSubCategory.title, topicsCountJSON.topicsCountSubCategory);
					});
				});
			});
		}
	});
};

topicsCountTests.createTopic = function() {
	casper.thenOpen(config.url, function(){
		// phantom.addCookie({
		// 	userid: '30465757',
		// 	pw: '8400cc7d309cca7a27b4ddc9c7bab0604f9d0278c9c200',
		// 	domain: '.beta21.websitetoolbox.com'
		// });
		phantom.addCookie({
		  userid: '30465757',
		  pw: '8400cc7d309cca7a27b4ddc9c7bab0604f9d0278c9c200',
		  _fbp:'fb.1.1557744512792.280259385',
		  _gat:'1',
		  _ga:'GA1.3.1215423564.1557136584',
		  _gid:'GA1.3.1758659852.1562561880',
		  chatroom_logout_token:'',
		  di492b20Zasdh3V:'2',
		  forumuserid:'',
		  hascookies:'1',
		  lastvisit:'1562738916',
		  newvisit:'1562740731',
		  rootReferrer:'topics',
		  sm_dapi_session:'1',
		  userfrom:'xxhttp%3A//beta21.websitetoolbox.com/tool/members/mb/forumsxx',
		  username:'beta21',
		  wtsession:'3056b0457ccd0aaa0505136b0ccfeb1ef0c3f176e19c32',
		  domain: '.beta21.websitetoolbox.com'
		});
	}).waitWhileVisible('#td_tab_login', function() {
		//forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		casper.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicsCountJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content);
};

//Verify the Number of Topics listed for a category
topicsCountTests.topicsCount = function() {
	casper.thenOpen(config.url, function(){
		utils.info('Case 1[Verify the Number of Topics from the Followed content page ]');
		utils.info('Case 1[Verify the Number of posts from the Followed content page ]');
		//forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
	}).then(function(){
		this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
		this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
	}).waitForSelector('li#show_posts', function(){
		this.test.assertTextDoesntExist('input[name="allbox"]', 'checkbox found on followed content page');
		this.click('input[name="allbox"]');
	}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
		this.click('span.topic-content h4 a', 'clicked on topic of followed content page');
	}).waitForSelector('input#firstpid', function(){
		this.click('input#firstpid', 'clicked on postlistingpage checkbox');
	}).waitForText(topicsCountJSON.followedTopicsCount.count);
};

//Verify the Number of Topics for a category
topicsCountTests.countTopicsCategorySubCategory = function() {
	casper.thenOpen(config.url, function(){
		utils.info('Case 2[Verify the Number of Posts for a category ]');
		utils.info('Case 2[Verify the Number of Topics for a category ]');
		utils.info('Case 2[Verify with Number of Topics listed for a subCategory ]');
		utils.info('Case 2[ Verify with Number of Posts listed for a subCategory]');
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
			this.evaluate(function() {
				document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
			});
		}).waitForSelector('a[href="#forums"]', function(){
			deletePostMethod.getCategoryHrefFrontend(topicsCountJSON.category.title);
		}).waitForSelector('span.topic-content h4 a', function(){
			this.test.assertExists('input[name="allbox"]');
			this.evaluate(function() {
				document.querySelector('input[name="allbox"]').click();
			});
		}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
			this.click('a#topics_tab');
		}).waitForSelector('span.topic-content h4 a', function(){
			this.click('input[name="allbox"]');
		}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
			this.click('span.topic-content h4 a');
		}).waitForSelector('input#firstpid', function(){
			this.click('input#firstpid', 'clicked on postlistingpage checkbox');
		}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
			this.click('a#backArrowPost i', 'clicked on backarrow on postListingPage');
		}).waitForSelector('a#subcategories_tab', function(){
			this.click('span.forum-title', 'clicked on subcategory');
		}).waitForSelector('div#ajax_subscription_vars a', function(){
			this.click('div#ajax_subscription_vars a');
		}).then(function(){
			topicMethod.createTopic(topicJSON.ValidCredential);
		}).waitForText(topicJSON.ValidCredential.content, function(){
			this.waitForSelector('input#firstpid', function(){
				this.click('input#firstpid', 'clicked on postlistingpage checkbox');
			}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
				this.click('a#backArrowPost i', 'clicked on backarrow on postListingPage');
			}).waitForSelector('input[name="allbox"]', function(){
				this.click('input[name="allbox"]', 'clicked on postlistingpage checkbox');
			}).waitForText(topicsCountJSON.followedTopicsCount.count);
		});
	});
};

//combine all forum
//Verify with Number of Topics in latest topics page
topicsCountTests.combineallforumTopicCount=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 3[Verify with Number of Topics in latest topics page, postlistingpage]');
		utils.info('Case 3[Verify with Number of Topics in Topic listing page ]');
		utils.info('Case 3[Verify with Number of Topics in latest topics page, postlistingpage]');
		utils.info('Case 3[Verify with Number of Topics on followed topic page and followed topic postlistingpage]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('a[href="/latest"]', function(){
		this.click('a[href="/latest"]');
	}).waitForSelector('input[name="allbox"]', function(){
		this.click('input[name="allbox"]');
	}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('input#firstpid', function(){
		this.click('input#firstpid', 'clicked on postlistingpage checkbox');
	}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
	}).then(function(){
		this.test.assertExists('span.pull-right.user-nav-panel li:nth-child(5) a');
		this.click('span.pull-right.user-nav-panel li:nth-child(5) a');
	}).waitForSelector('li#show_posts', function(){
		this.test.assertTextDoesntExist('input[name="allbox"]', 'checkbox found on followed content page');
		this.click('input[name="allbox"]');
	}).waitForText(topicsCountJSON.followedTopicsCount.count, function(){
		this.click('span.topic-content h4 a', 'clicked on topic of followed content page');
	}).waitForSelector('input#firstpid', function(){
		this.click('input#firstpid', 'clicked on postlistingpage checkbox');
	}).waitForText(topicsCountJSON.followedTopicsCount.count);
};
