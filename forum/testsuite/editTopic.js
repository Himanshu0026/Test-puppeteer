/****This script is dedicated for user to edit topic on the forum. It covers testing of edit topic page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var editTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'editTopic/';

editTopic.featureTest = function(casper,test) {

	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle(), 'info');
		test.assertTitle('Automation Forum', 'page has the correct title');
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

	// Verify error message when user try edit with blank title

	casper.then(function() {	 
		this.on('remote.alert', testAlert1);
	});

	//Edit topic title with blank data
 
	casper.then(function(){
		editTopicTitle(json.editTopic.blankTitle.title, casper, function() {
			casper.log('editing topic title', 'info');		
		});
	});
	
	// removing listner alert1
	casper.then(function() {
			this.removeListener('remote.alert', testAlert1);
	});

	//Getting Screenshot After edited Topic title 

	casper.wait(10000,function(){
		this.capture(screenShotsDir+ 'editedBlankTopicTitle.png');
	});

	//Edit topic title with valid data
 
	casper.then(function(){
		editTopicTitle(json.editTopic.validTitle.title, casper, function() {
			casper.log('editing topic title', 'info');		
		});
	});

	//Getting Screenshot After edited Topic title 

	casper.wait(7000,function(){
		this.capture(screenShotsDir+ 'editedTopicTitle.png');
	});


	//Verify Topic Title With valid data

	casper.then(function(){
		var getTitle = this.fetchText('#editable_subjuct');
		casper.echo("getTitle : "+getTitle);
		casper.echo("json.editTopic.validTitle.title : "+json.editTopic.validTitle.title);
		test.assertEquals(getTitle.trim(), json.editTopic.validTitle.title.trim());
		casper.echo('title is verified with valid data');
	});

	//Verify eerror message  for Edit Topic Content With blank data

	casper.then(function() {
	    this.on('remote.alert', testAlert2);
	});	

	//Edit Topic Content With blank Data

	casper.then(function(){
		editTopicContent(json.editTopic.blankContent.content, casper, function() {
			casper.log('edited topic content', 'inf1o');
		});
	});

	//wait for 3 second to remove alert1 listener	
	casper.wait(3000);

	casper.then(function() {
		this.removeListener('remote.alert', testAlert2);
	});
	
	//Getting Screenshot After editing topic content 

	casper.wait(7000,function(){
		this.capture(screenShotsDir+ 'editedTopicContent.png');
	});

	

	//Edit Topic Content With Valid Data

	casper.thenOpen(config.url, function() {
		casper.log('Hit on url : '+config.url);
	});

	casper.then(function(){
		editTopicContent(json.editTopic.validContent.content, casper, function() {
			casper.log('edited topic content', 'inf1o');
		});
	});

	//Getting Screenshot After editing topic content 

	casper.wait(7000,function(){
		this.capture(screenShotsDir+ 'editedTopicContent.png');
	});


	//Verify Edit Topic Content With Valid data

	casper.then(function() {
		var getContent = this.fetchText('div.post-body-content span[id^="post_message_"]');
		casper.echo('******* getContent : ' +getContent, 'info');
		casper.echo('******* content : ' +json.editTopic.validContent.content, 'info');
		test.assertEquals(getContent.trim(), json.editTopic.validContent.content.trim());
		casper.echo("content successfully verified with valid content");

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

	function testAlert1(message) {
		console.log('message################################### : '+message);
    		this.test.assertEquals(message, json.editTopic.blankTitle.ExpectedErrorMessage.trim());
	};

	function testAlert2(message) {
		console.log('message################################### : '+message);
    		this.test.assertEquals(message, json.editTopic.blankContent.ExpectedErrorMessage.trim());
	};

};


/************************************PRIVATE METHODS***********************************/


// method for edit topic title to application

var editTopicTitle = function(title, driver, callback){ console.log("title : "+title);
	try{
		driver.click('form[name="posts"] h4 a');

		driver.then(function(){
			driver.click('#editTopic');
			this.capture(screenShotsDir+ 'editTopicTitle.png');
		});
	} catch(err) {
		casper.echo('Exception : '+err);
	}
		driver.then(function(){
			driver.sendKeys('.input-sm', title, {reset:true});
			this.capture(screenShotsDir+ 'setTopicTitle.png');
		});
		driver.then(function(){
			driver.click('div.editable-buttons .editable-submit');	
		});
	
	
	return callback();
};




// method for edit topic content to application

var editTopicContent = function(content, driver, callback){
	try{
		driver.click('form[name="posts"] h4 a');
	} catch(err) {

	}

	try{
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
				casper.echo('*****enter message in iframe', 'info');
				driver.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				driver.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 				driver.sendKeys('#tinymce', content);
				driver.capture(screenShotsDir+ 'editedTopicContent.png');	
			});
		});
	
		driver.then(function(){
			this.click('div.form-group input.btn-primary');	
		});
	} catch(err) {
		casper.echo('Exception : '+err);
	}
	

	return callback();
};

// method for verify edit topic content to application

/*var verifyEditTopicContent = function(content, driver, callback){
	var getContent = driver.fetchText('div.post-body-content span[id^="post_message_"]');
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
};*/












