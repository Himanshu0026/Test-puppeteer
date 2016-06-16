//----- This js file covers calender functionlity ---------//

'use strict';

var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');

var calander = module.exports = {};

calander.featureTest = function(casper, test) {
	var screenShotsDir = config.screenShotsLocation + "calender/";

	// this is to lauch application to perform related actions
	casper.start(config.backEndUrl, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'info');
	});
	
	//login to backend app by call login function
	casper.then(function() {

		forumRegister.loginToForumBackEnd(config["backendCred"], casper, function() {
			casper.echo(config["backendCred"].uname +"*******"+config["backendCred"].upass);
			casper.echo('Successfully login on forum back end....', 'info');
		});
	});
	
	// test case to disable calander checkbox from GEneral SEttings page
	/*casper.then(function() {
		calander.gotoGeneralSettingspage(casper, function(){
			casper.echo("Navigated to General Settings page");
		});
		this.waitForSelector('#enable_calendar', function() {
			utils.enableorDisableCheckbox('enable_calendar', false, casper, function() {
				casper.echo("Calender checkbox has been disabled", 'info');
			});
		});
		this.waitForSelector('button[type="submit"]', function(){
			this.click('button[type="submit"]');
		});
		this.wait(3000, function() {
			this.capture(screenShotsDir+'saved.png');
		});
	});
	
	//Now login to forum and check calender option is not visible in side menu
	casper.thenOpen(config.url);
	casper.then( function(){
		forumLogin.loginToApp("sangita", "sangita", casper, function(){
			casper.echo("User has successfully login to the forum application", 'info');
		});
		this.waitForSelector('#links-nav', function(){
			this.click('#links-nav');
			this.wait(5000, function(){
				test.assertDoesntExist('#calenders_show');
				this.capture(screenShotsDir+'CalendernotVisible.png');
			});		
		});
	});

	//enable calender checkbox from general setting page in backend
	casper.thenOpen(config.backEndUrl, function(){
		casper.echo("Title of the page : "+this.getTitle(), 'info');
	});
	casper.then(function() {
		calander.gotoGeneralSettingspage(casper, function(){
			casper.echo("Navigated to General Settings page");
		});
		this.waitForSelector('#enable_calendar', function() {
			utils.enableorDisableCheckbox('enable_calendar', true, casper, function() {
				casper.echo("Calender checkbox has been enabled", 'info');
			});
		});
		this.waitForSelector('button[type="submit"]', function(){
			this.click('button[type="submit"]');
		});
		this.wait(5000, function() {
			this.capture(screenShotsDir+'chechedScreen.png');
			test.assert(this.evaluate(function () {return document.getElementById('enable_calendar').checked;}));
		});
	});*/

	//enable all calender related settings from user group permission for registered user
	casper.then(function(){

	this.waitForSelector('a[data-tooltip-elm="ddUsers"]', function(){
		this.click('a[data-tooltip-elm="ddUsers"]');
			
	});
	this.waitForSelector('a[href="/tool/members/mb/usergroup"]', function(){
		this.click('a[href="/tool/members/mb/usergroup"]');
			
	});

	this.waitForSelector('td[text="Registered Users"].parent', function(){
		casper.echo(this.fetchText('td[text="Registered Users"].parent'));
			
	});

});
	

		
	
			



	







};

//function to go to general settings page in backend
calander.gotoGeneralSettingspage = function(driver, callback) {

	driver.waitForSelector('a[data-tooltip-elm="ddSettings"]', function(){
		this.click('a[data-tooltip-elm="ddSettings"]');
			
	});
	driver.waitForSelector('a[href="/tool/members/mb/settings?tab=General"]', function(){
		this.click('a[href="/tool/members/mb/settings?tab=General"]');
			
	});
	return callback();
};

//function to go calender page in forum application
calander.fotoCalanderpage = function(driver, callback) {
	driver.waitForSelector('#links-nav', function(){
		this.click('#links-nav');
			
	});
	driver.waitForSelector('a[href="/calendar"]', function(){
		this.click('a[href="/calendar"]');
			
	});
	return callback();
};

//function to go to user group permission for registered user in backend
calander.fotoCalanderpage = function(driver, callback) {
	driver.waitForSelector('a[data-tooltip-elm="ddUsers"]', function(){
		this.click('a[data-tooltip-elm="ddUsers"]');
			
	});
	driver.waitForSelector('a[href="/tool/members/mb/usergroup"]', function(){
		this.click('a[href="/tool/members/mb/usergroup"]');
			
	});
//td[text()='Registered Users']
driver.waitForSelector('a[href="/tool/members/mb/usergroup"]', function(){
		this.click('a[href="/tool/members/mb/usergroup"]');
			
	});

	return callback();
};

