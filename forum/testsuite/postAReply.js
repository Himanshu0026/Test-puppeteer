var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var postAReply = module.exports = {};
var screenShotsDir = config.screenShotsLocation + "postAReply/";

postAReply.featureTest = function(casper) {
	
	
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});

		/****************  LOGIN TO APP  ***********************************/
	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(){
			casper.log("User has successfully login to application");
		});

	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+'login.png');
	});

		/****************  REPLY TOPIC  ***********************************/
	casper.then(function(){
		replyTopic(json['replyTopic'].content, casper, function(){
			casper.log('Replied successfully');
		});
	});
	casper.wait(7000,function(){
		this.capture(screenShotsDir+'replyTopic.png');
	});

		/****************  CHECK POSTED REPLY TOPIC  ***********************************/
	casper.then(function(){
		verifyPostReply(json['replyTopic'].content, casper, function(){
			casper.log("checking reply post");
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


// method for reply topic on any post

var replyTopic = function(content, driver, callback){
	driver.click('form[name="posts"] h4 a');
	
	driver.then(function(){
		driver.sendKeys('#message',content);
	});
	driver.wait(7000,function(){
		driver.withFrame('message_ifr', function() {
		this.echo("enter message in iframe");
 		this.sendKeys('#tinymce', content);
		this.echo("**************************************");
		driver.capture(screenShotsDir+'replyContent.png');	
	});
	});

	driver.then(function(){
		driver.click('#reply_submit');
	});
	callback();
};


// method for verify latest replied topic on the post

var verifyPostReply = function(content, driver, callback){
	var elementId = driver.evaluate(function(){
		var element = document.querySelectorAll("span[id^='post_message_']");
		 var id = element[element.length-1].id;
		return id;	
	});

	var contentMsg = driver.fetchText("#"+elementId);
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

