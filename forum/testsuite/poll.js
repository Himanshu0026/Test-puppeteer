var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var poll = module.exports = {};
var screenShotsDir = config.screenShotsLocation + "poll/";

poll.featureTest = function(casper) {
		
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});

		/****************  LOGIN TO APP  ***********************************/
	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(){
			casper.log("user has successfully login to application with valid username and password");
		});
	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+'login.png');
	});

		/****************  GO TO POLL PAGE  ***********************************/
	casper.then(function(){
		gotoNewPollpage(casper,function(){
			casper.log("redirect to Poll");
		});
	});

	casper.wait(7000, function(){
		this.capture(screenShotsDir+'newPoll.png');
	});

		/****************  POST POLL DATA  ***********************************/
	casper.then(function(){
		savePollPage(json['poll'].pollQues, json['poll'].publicCheckbox, json['poll'].option1, json['poll'].option2, json['poll'].multiple, json['poll'].timeoutFormate, casper, function(){
		casper.log("poll posted successfully");
		});
	});

	/*casper.wait(7000,function(){
		this.capture(screenShotsDir+'savePoll.png');
	});*/
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


// method for go to new poll  to application

var gotoNewPollpage = function(driver, callback) {
	driver.click('a[href="/post/printadd"]');
	//driver.click('form[name="PostTopic"]');
	driver.then(function() {
		//this.wait(7000, function() {
			this.capture(screenShotsDir+'TopicDetails.png');
			this.click('ul li a[href="#poll"]');
		//});
	});
	//driver.capture(screenShotsDir+'TopicDetails.png');
	
	return callback();
};


// method for go to save new poll  to application

var savePollPage = function(pollQues, publicCheckbox, option1, option2, multiple, timeoutFormate, driver, callback){
	driver.sendKeys('#poll_question',pollQues);
	driver.sendKeys('input[name="public"]',publicCheckbox);
	driver.sendKeys('#poll_option_1 div input',option1);
	driver.sendKeys('#poll_option_2 div input',option2);
	driver.capture(screenShotsDir+"savePoll.png");
	driver.wait(5000,function(){
		driver.click('a[href="#poll-timeout"]');
	});
};

