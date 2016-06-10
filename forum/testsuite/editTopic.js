/****This script is dedicated for user to edit topic on the forum. It covers testing of edit topic page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var editTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'editTopic/';

editTopic.featureTest = function(casper) {

	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle(), 'info');
	});

	//LOGIN TO APP  

	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.log('User has been successfuly login to application', 'info');
		});
	});
	
	//Getting Screenshot After Clicking On 'Log In' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	//EDIT TOPIC TITLE
 
	casper.then(function(){
		editTopicTitle(json['editTopic'].title, casper, function() {
			casper.log('editing topic title', 'info');		
		});
	});

	//Getting Screenshot After edited Topic title 

	casper.wait(7000,function(){
		this.capture(screenShotsDir+ 'editedTopicTitle.png');
	});

	//VERIFY TOPIC TITLE

	casper.then(function(){
		checkEditedTopicTitle(json['editTopic'].title, casper, function() {
			casper.log('verified topic title', 'info');
		});
	});

	//EDIT TOPIC CONTENT

	casper.then(function(){
		editTopicContent(json['editTopic'].content, casper, function() {
			casper.log('edited topic content', 'info');
		});
	});

	//Getting Screenshot After editing topic content 

	casper.wait(7000,function(){
		this.capture(screenShotsDir+ 'editedTopicContent.png');
	});


	//VERIFY EDIT TOPIC CONTENT

	casper.then(function() {
		verifyEditTopicContent(json['editTopic'].content, casper, function() {
			casper.log('verified edit topic content', 'info');		
		});
	});

	//LOGOUT FROM APP

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Log Out' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});
};


/************************************PRIVATE METHODS***********************************/


// method for edit topic title to application

var editTopicTitle = function(title, driver, callback){
	driver.click('form[name="posts"] h4 a');
	driver.then(function(){
		driver.click('#editTopic');
		this.capture(screenShotsDir+ 'editTopicTitle.png');
	});
	driver.then(function(){
		driver.sendKeys('.input-sm', title, {reset:true});
		this.capture(screenShotsDir+ 'setTopicTitle.png');
	});
	driver.then(function(){
		driver.click('div.editable-buttons .editable-submit');	
	});
	return callback();
};


// method for verify edit topic title to application

var checkEditedTopicTitle = function(title, driver, callback) {
	var getTitle = driver.fetchText('#editable_subjuct');
	driver.log('******* getTitle : ' +getTitle, 'info');
	driver.log('******* title : ' +title, 'info');
	if(getTitle.trim() == title.trim()) {
		driver.log('Title verified', 'info');
	} else {
		driver.log('Error Occured in verifying Title ', 'error');
		driver.capture(screenShotsDir+ 'titleError.png');
	}
	return callback();
};

// method for edit topic content to application

var editTopicContent = function(content, driver, callback){
	
	driver.then(function(){
		this.click('div.post-body .panel-dropdown .pull-right a.dropdown-toggle');
		this.wait(7000, function(){
			driver.capture(screenShotsDir+ 'editPopUp.png');
		});
	});
	
	driver.then(function(){
		this.click('div.post-body .panel-dropdown .pull-right ul.dropdown-menu li a#edit_post_request');
		this.wait(7000, function(){
			driver.capture(screenShotsDir+ 'edit.png');
		});
	});	
	
	driver.wait(7000, function(){
		this.withFrame('message1_ifr', function() {
			driver.log('enter message in iframe', 'info');
 			driver.sendKeys('#tinymce', content, {reset:true});
			driver.capture(screenShotsDir+ 'editedTopicContent.png');	
		});
	});

	driver.then(function(){
		this.click('div.form-group input.btn-primary');	
	});

	return callback();
};

// method for verify edit topic content to application

var verifyEditTopicContent = function(content, driver, callback){
	var getContent = driver.fetchText('div.post-body-content span');
	driver.log('******* getContent : ' +getContent, 'info');
	driver.log('******* content : ' +content, 'info');
	if(getContent.trim() == content.trim()){
		driver.log('Title verified', 'info');
	}
	else{
		driver.log('Error Occured in verifying edited content ','error');
		driver.capture(screenShotsDir+ 'editContentError.png');
	}
	return callback();
};













