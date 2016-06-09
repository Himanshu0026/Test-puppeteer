var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var editTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + "editTopic/";

editTopic.featureTest = function(casper) {
	
	
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

		/****************  EDIT TOPIC TITLE  ***********************************/
	casper.then(function(){
		editTopicTitle(json['editTopic'].title, casper, function(){});
	});
	casper.wait(7000,function(){
		this.capture(screenShotsDir+'editedTopicTitle.png');
	});

		/****************  VERIFY TOPIC TITLE  ***********************************/
	casper.then(function(){
		checkEditedTopicTitle(json['editTopic'].title, casper, function(){});
	});

		/****************  EDIT TOPIC CONTENT  ***********************************/
	casper.then(function(){
		editTopicContent(json['editTopic'].content, casper, function(){});
	});
	casper.wait(7000,function(){
		this.capture(screenShotsDir+'editedTopicContent.png');
	});


		/****************  VERIFY EDIT TOPIC CONTENT  ***********************************/
	casper.then(function(){
		verifyEditTopicContent(json['editTopic'].content, casper, function(){});
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


// method for edit topic title to application

var editTopicTitle = function(title, driver, callback){
	driver.click('form[name="posts"] h4 a');
	driver.then(function(){
		driver.click('#editTopic');
		this.capture(screenShotsDir+'editTopicTitle.png');
	});
	driver.then(function(){
		driver.sendKeys('.input-sm',title, {reset:true});
		this.capture(screenShotsDir+'setTopicTitle.png');
	});
	driver.then(function(){
		driver.click('div.editable-buttons .editable-submit');	
	});
	return callback();
};


// method for verify edit topic title to application

var checkEditedTopicTitle = function(title, driver, callback){
	var getTitle = driver.fetchText('#editable_subjuct');
	casper.log("******* getTitle : "+getTitle);
	casper.log("******* title : "+title);
	if(getTitle.trim() == title.trim()){
		casper.log("Title verified");
	}
	else{
		casper.log("Error Occured in verifying Title ","error");
		this.capture(screenShotsDir+'titleError.png');
	}
	return callback();
};


// method for edit topic content to application

var editTopicContent = function(content, driver, callback){
	//driver.click('form[name="posts"] h4 a');
	driver.then(function(){
		this.click('div.post-body .panel-dropdown .pull-right a.dropdown-toggle');
		this.wait(7000,function(){
			this.capture(screenShotsDir+'editPopUp.png');
		});
	});
	
	
	driver.then(function(){
		driver.click('div.post-body .panel-dropdown .pull-right ul.dropdown-menu li a#edit_post_request');
		driver.wait(7000,function(){
			this.capture(screenShotsDir+'edit.png');
		});
	});	
	
	/*driver.then(function(){
		driver.sendKeys('#message1',content, {reset:true});
		this.capture(screenShotsDir+'editedTopicContent.png');
	});*/
	driver.wait(7000,function(){
		driver.withFrame('message1_ifr', function() {
			this.echo("enter message in iframe");
 			this.sendKeys('#tinymce', content, {reset:true});
			this.echo("**************************************");
			driver.capture(screenShotsDir+'editedTopicContent.png');	
		});
	});
	driver.then(function(){
		driver.click('div.form-group input.btn-primary');	
	});
	return callback();
};

// method for verify edit topic content to application

var verifyEditTopicContent = function(content, driver, callback){
	var getContent = driver.fetchText('div.post-body-content span');
	casper.log("******* getContent : "+getContent);
	casper.log("******* content : "+content);
	if(getContent.trim() == content.trim()){
		casper.log("Title verified");
	}
	else{
		casper.log("Error Occured in verifying edited content ","error");
		driver.capture(screenShotsDir+'editContentError.png');
	}
	return callback();
};


















