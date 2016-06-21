//----- This js file covers calender functionlity ---------//

'use strict';

var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/calenderData.json');

var calender = module.exports = {};

calender.featureTest = function(casper, test,x) {
	
	var screenShotsDir = config.screenShotsLocation + "calender/";
	var moment = require('moment');
	moment().format();
	

	// this is to lauch application to perform related actions
	casper.start(config.backEndUrl, function() {
		casper.echo("Title of the page : "+this.getTitle(), 'info');
		casper.echo(this.getCurrentUrl());
		casper.echo("Current month is : "+ moment.months(moment().month()));
		casper.echo("Current date is : "+ moment().date());
		casper.echo("Current year is : "+ moment().year());
		
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
		calender.gotoGeneralSettingspage(casper, function(){
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
		calender.gotoCalanderpage(casper, function() {
			casper.wait(3000, function(){
				test.assert(this.getCurrentUrl().indexOf("calendar")>=0);
				casper.echo("Title of the page : "+ this.getTitle());
				casper.echo("Navigated to calender page successfully");
				this.capture(screenShotsDir+'calenderpage.png');

				var highlightedDate = this.fetchText('td.this-day div span a');
				casper.echo("*** today's date *** "+highlightedDate);
				test.assertEquals(highlightedDate.trim(), moment().date().toString());
			});
		});
	});

	//Verify calender mode
	casper.then(function() {

		//verify default calender view mode after navigating to Calender page
		this.waitForSelector('#monthlyView', function() {
			test.assertExists('label.btn.btn-default.active');
			casper.echo('By default Month calender mode is opened');
		});
		
		//verify yearly view after click on year calender mode
		this.waitForSelector('#yearlyView', function() {
			this.click('#yearlyView');
			this.wait(5000, function() {
				var year = this.fetchText('form[action="/calendar/display"] div a');
				casper.echo("*** Current years is *** : "+year);
				test.assertEquals(year.trim(), (moment().year()).toString());
				this.capture(screenShotsDir+'calenderview_year.png');

				//verify next year after clicking on next year arrow
				this.click('a[data-original-title="Next Year"]');
				this.wait(3000, function() {
					casper.echo((moment().year()+1));
					var year = this.fetchText('form[action="/calendar/display"] div a');
					casper.echo("*** next years is *** : "+year);
					test.assertEquals(year.trim(), (moment().year()+1).toString());					
				});

				//verify previous year after clicking on previous year icon
				this.wait(3000, function() {
					this.click('a[data-original-title="Previous Year"]');
					this.wait(3000, function() {
						var year = this.fetchText('form[action="/calendar/display"] div a');
						casper.echo("*** previous year is *** : "+year);
						test.assertEquals(year.trim(), (moment().year()).toString());

						//verify today's calender by clicking on Today option
						this.click('a.btn.btn-default');
						this.wait(3000, function() {
							var highlightedDate = this.fetchText('td.this-day div span a');
							casper.echo("*** today's date *** "+highlightedDate);
							test.assertEquals(highlightedDate.trim(), moment().date().toString());
						});
					
					});
				});
				
			});
		});
	});


	casper.then(function() {
		this.waitForSelector('#weeklyView', function() {
			this.click('#weeklyView');
			this.wait(3000, function() {
				//test.assertExists('table.calendar-mini.col-md-3');
				test.assertExists('div.calendar-detail-wrapper.weekly');
				casper.echo('Weekly calender mode is verified after clicking on Weekly calender mode');
				this.capture(screenShotsDir+'calenderview_week.png');
			});
		});
	});

	casper.then(function() {	
		this.waitForSelector('#monthlyView', function() {
			var year = "";
			this.click('#monthlyView');
			this.wait(3000, function(){
				var month = this.fetchText('form[action="/calendar/display"] div a');
				year = this.fetchText('form[action="/calendar/display"] div a span');
				month = (month.replace(year, '')).trim()+' ' +year.trim();
				casper.echo("*** Current month is *** : "+month);
				test.assertEquals(month, (moment.months(moment().month())+' '+moment().year()));
				this.capture(screenShotsDir+'calenderview_month.png');

				//verify next month after clicking on next month arrow
				this.click('a[data-original-title="Next Month"]');
				this.wait(3000, function() {
					casper.echo(moment.months(moment().month()+1));
					var next_month = this.fetchText('form[action="/calendar/display"] div a');
					next_month = (next_month.replace(year, '')).trim()+' ' +year.trim();
					casper.echo("*** next month is *** : "+next_month);
					test.assertEquals(month, (moment.months(moment().month())+' '+moment().year()));					
				});

				//verify previous month after clicking on previous month icon
				this.wait(3000, function() {
					this.click('a[data-original-title="Previous Month"]');
					this.wait(3000, function() {
						var prev_month = this.fetchText('form[action="/calendar/display"] div a');
						prev_month = (prev_month.replace(year, '')).trim()+' ' +year.trim();
						casper.echo("*** previous month is *** : "+prev_month);
						test.assertEquals(month, (moment.months(moment().month())+' '+moment().year()));
						this.click('a.btn.btn-default');
					
					});
				});
			});
		});

	});	
	
		
	casper.then(function() {
		this.click('a.btn.btn-sm.btn-primary');	
		




	});
			



	







};

//function to go to general settings page in backend
calender.gotoGeneralSettingspage = function(driver, callback) {

	driver.waitForSelector('a[data-tooltip-elm="ddSettings"]', function(){
		this.click('a[data-tooltip-elm="ddSettings"]');
			
	});
	driver.waitForSelector('a[href="/tool/members/mb/settings?tab=General"]', function(){
		this.click('a[href="/tool/members/mb/settings?tab=General"]');
			
	});
	return callback();
};

//function to go calender page in forum application
calender.gotoCalanderpage = function(driver, callback) {
	driver.waitForSelector('#links-nav', function(){
		this.click('#links-nav');
			
	});
	driver.waitForSelector('a[href="/calendar"]', function(){
		this.click('a[href="/calendar"]');
			
	});
	return callback();
};

//function to create an event
calender.createEvent = function(data, driver, callback) {
	driver.fill( 'form#PostCalEvent',  {
		"event_title" : "data.title",
		"message" : data.description
	}, false);
	
	if (data.Allday){
		utils.enableorDisableCheckbox('allDay', true, casper, function() {
				casper.echo("All day checkbox has been enabled", 'info');
			});
	} else {
		driver.sendKeys('#event_start_date', data.startDate);
		driver.sendKeys('#event_end_date', data.endDate);
		driver.click('#from_time');
		driver.fill('form#PostCalEvent',{
			'from_time' : data.startTime
		},false);
		driver.click('select[name="to_time"]');
		driver.fill('form#PostCalEvent',{
		'to_time' : data.endTime
		},false);
		driver.sendKeys('', data.startTime);
		driver.sendKeys('', data.endTime);

	};

	if (data.Repeat) {
		utils.enableorDisableCheckbox('repeat', true, casper, function() {
				casper.echo("Repeat checkbox has been enabled", 'info');
			});
	};

		



};



