var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var newTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + "newTopic/";

newTopic.featureTest = function(casper) {
	
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});

		/****************  LOGIN TO APP  ***********************************/
	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(){
			casper.log("User has been successfuly login to application");
		});
	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+'login.png');
	});

		/****************  GO TO NEW TOPIC PAGE  ***********************************/
	casper.then(function(){
		gotoNewTopicpage(casper,function(){
			casper.log("redirect to new topic");
		});
	});
	casper.wait(7000, function(){
		this.capture(screenShotsDir+'newTopic.png');
	});

		/****************  POST NEW TOPIC PAGE  ***********************************/
	casper.then(function(){
		postTopicpage(json['newTopic'].title, json['newTopic'].content, json['newTopic'].category, casper, function(){});
	});
	casper.wait(7000,function(){
		this.capture(screenShotsDir+"postedTopic.png");
	});

		/****************  CHECK POST CONTENT  ***********************************/
	casper.then(function(){
		checkPostTopicContent(json['newTopic'].content, casper, function(){
			casper.log("content post topic");
		});
	});

		/****************  LOGOUT  ***********************************/
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(){
			casper.log("Successfully logout from application");
		});
	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+'logout.png');
	});
};

//private methods

// method for goto New Topic page to application

var gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	//driver.wait(3000);
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	return callback();
};


// method for goto New Topic page to application

var postTopicpage = function(title, content, category, driver, callback){
/*driver.fill('form[name="PostTopic"]',{
		'subject' : title,
	},false);*/
	driver.sendKeys('input[name="subject"]', title);

	 driver.withFrame('message_ifr', function() {
		this.echo("enter message in iframe");
 		this.sendKeys('#tinymce', content);
		this.echo("**************************************");
		driver.capture(screenShotsDir+'content.png');	
	});


	driver.click('#all_forums_dropdown')
	driver.fill('form[name="PostTopic"]',{
		'forum' : category
	},false);
	//driver.sendKeys('input[name="forum"]', category);
	/*driver.click('#insert_image_dialog_');
    	driver.then(function() {
		this.waitForSelector('div#insertimagemodal', function() {
			this.echo('****************************************see the modal!');
			this.wait(7000, function() {
				this.capture(screenShotsDir+'screenshotofmodal.png');
			});
		});
	});
	driver.then(function(){
		driver.click('div#uploadImage a#insertImage_');
		this.wait(10000,function(){
			this.capture(screenShotsDir+'browse.png');
		});	
	});*/
	/*driver.then(function(){
		this.page.uploadFile('input[type="file"]', '/home/rajatk/Pictures/JavascriptPart1.png');
        	this.click('#insert_image_btn');
	});*/

	driver.then(function(){
		this.click('#previewpost_sbt');
		this.wait(10000,function(){
			driver.capture(screenShotsDir+'previewPost.png');
		});
	});
	driver.then(function(){
		driver.click('#post_submit');
	});
	
	return callback();
};


// method for goto New Topic page to application

var checkPostTopicContent = function(content, driver, callback){

	var contentMsg = driver.fetchText('div.post-body-content span[id^="post_message_"]');
		driver.echo('************ contentMsg : '+contentMsg);
		driver.echo('************ content : '+content);
		if(contentMsg.trim() == content.trim()){
			casper.log("Successfully content verified");
		} else {
			casper.log("Error occured in verifying content", 'error');
			driver.capture(screenShotsDir+'contentError.png');
		}
		return callback();
};
