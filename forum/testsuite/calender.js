//----- This js file covers calender functionlity ---------//

'use strict';

var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/calenderData.json');

var calenderSettings = module.exports = {};

calenderSettings.featureTest = function(casper, test,x) {
	
	var screenShotsDir = config.screenShotsLocation + "calender/";
	var date = new Date();

	// this is to lauch application to perform related actions
	casper.start(config.backEndUrl, function() {
		casper.echo("Title of the page : "+this.getTitle(), 'info');
		casper.echo(this.getCurrentUrl());
		
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
		casper.echo("Current month is : "+ monthNames[date.getMonth()]);
		casper.echo("Current year is : "+ date.getFullYear());
		casper.echo("Current date is : "+ date.getDate());

	});
	
	//login to backend app by call login function
	casper.then(function() {

		forumRegister.loginToForumBackEnd(config["backendCred"], casper, function() {
			casper.echo(config["backendCred"].uname +"*******"+config["backendCred"].upass);
			casper.echo('Successfully login on forum back end....', 'info');
		});
	});
	
	// test case to disable calander checkbox from GEneral SEttings page
	casper.then(function() {
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
			this.wait(3000, function() {
				this.capture(screenShotsDir+'updatecalenderonGeneralSetting.png');
			});
		});
	});
	
	//Now login to forum and check calender option is not visible in side menu
	casper.thenOpen(config.url);
	casper.then( function(){
		forumLogin.loginToApp(json.username, json.password, casper, function(){
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
		calenderSettings.gotoGeneralSettingspage(casper, function(){
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
	});

	//enable all calender related settings from user group permission for registered user
	casper.then(function(){
		utils.gotoEditUserGroupPermissionpage(x,"Registered Users", casper, function() {
			casper.echo("Successfully navigated to Edit User group Permission page");
			casper.wait(3000, function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});

		});
		this.waitForSelector('#view_calendar', function() {
			utils.enableorDisableCheckbox('view_calendar', true, casper, function() {
				casper.echo("View Calender checkbox has been enabled", 'info');
			});
		});
		this.waitForSelector('#post_events', function() {
			utils.enableorDisableCheckbox('post_events', true, casper, function() {
				casper.echo("post events checkbox has been enabled", 'info');
			});
		});
		this.waitForSelector('#edit_own_events', function() {
			utils.enableorDisableCheckbox('edit_own_events', true, casper, function() {
				casper.echo("Edit Own events checkbox has been enabled", 'info');
			});
		});
		this.waitForSelector('#delete_own_events', function() {
			utils.enableorDisableCheckbox('delete_own_events', true, casper, function() {
				casper.echo("Delete Own events checkbox has been enabled", 'info');
			});
		});
		this.waitForSelector('#view_others_events', function() {
			utils.enableorDisableCheckbox('view_others_events', true, casper, function() {
				casper.echo("view others events checkbox has been enabled", 'info');
			});
		});
		this.waitForSelector('button[type="submit"]', function(){
			this.click('button[type="submit"]');
			casper.echo("Calender related setting has been updtaed for registered user fron edit User permission page");
			this.wait(3000, function(){
				test.assertExists('p[align="center"]');
				this.capture(screenShotsDir+'updateCalenderpermission.png');
			});
		});

	});

	casper.thenOpen(config.url);
	//verify calender page and highlighted current date
	casper.then(function(){
		calenderSettings.gotoCalanderpage(casper, function() {
			casper.wait(3000, function(){
				test.assert(this.getCurrentUrl().indexOf("calendar")>=0);
				casper.echo("Title of the page : "+ this.getTitle());
				casper.echo("Navigated to calender page successfully");
				this.capture(screenShotsDir+'calenderpage.png');

				var highlightedDate = this.fetchText('td.this-day div span a');
				casper.echo("*** today's date *** "+highlightedDate);
				test.assertEquals(highlightedDate.trim(), date.getDate().toString());
			});
		});
	});

	//Verify calender mode
	casper.then(function() {

		//verify default calender view mode after navigating to Calender page
		



		//verify yearly view after click on year calender mode
		this.waitForSelector('#yearlyView', function() {
			this.click('#yearlyView');
			this.wait(5000, function() {
				var year = this.fetchText('form[action="/calendar/display"] div a');
				casper.echo("***Current years is *** : "+year);
				test.assertEquals(year.trim(), date.getFullYear().toString());
				this.capture(screenShotsDir+'calenderview_year.png');
				
			});
		});

		/*this.waitForSelector('#weeklyView', function() {
			this.click('#weeklyView');
			this.wait(3000, function() {
			this.capture(screenShotsDir+'calenderview_week.png');
			});
		});*/
		
		







	});	
	
		
	
			



	







};

//function to go to general settings page in backend
calenderSettings.gotoGeneralSettingspage = function(driver, callback) {

	driver.waitForSelector('a[data-tooltip-elm="ddSettings"]', function(){
		this.click('a[data-tooltip-elm="ddSettings"]');
			
	});
	driver.waitForSelector('a[href="/tool/members/mb/settings?tab=General"]', function(){
		this.click('a[href="/tool/members/mb/settings?tab=General"]');
			
	});
	return callback();
};

//function to go calender page in forum application
calenderSettings.gotoCalanderpage = function(driver, callback) {
	driver.waitForSelector('#links-nav', function(){
		this.click('#links-nav');
			
	});
	driver.waitForSelector('a[href="/calendar"]', function(){
		this.click('a[href="/calendar"]');
			
	});
	return callback();
};


