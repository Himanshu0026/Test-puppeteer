//----- This js file covers calendar functionlity ---------//

'use strict';

var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var fs = require('fs');
var filePath = './testdata/calendarData.json';
var json = require('../testdata/calendarData.json');
var screenShotsDir = config.screenShotsLocation + "calendar/";
var moment = require('moment');
	moment().format();
var calendar = module.exports = {};

calendar.featureTest = function(casper, test, x) {
	
	

	// this is to launch application to perform related actions
	casper.start(config.backEndUrl, function() {
		casper.echo("Title of the page : "+this.getTitle(), 'info');
		casper.echo(this.getCurrentUrl());
		casper.echo("Current month is : "+ moment.months(moment().month()));
		casper.echo("Current date is : "+ moment().date());
		casper.echo("Current year is : "+ moment().year());
		
		
	});
	
	//login to backend app by call login function
	/*casper.then(function() {

		forumRegister.loginToForumBackEnd(casper, config["backendCred"], function() {
			casper.echo(config["backendCred"].uname +"*******"+config["backendCred"].upass);
			casper.echo('Successfully login on forum back end....', 'info');
		});
	});
	
	// test case to disable calander checkbox from GEneral SEttings page
	casper.then(function() {
		calendar.gotoGeneralSettingspage(casper, function(){
			casper.echo("Navigated to General Settings page");
		});
		this.waitForSelector('#enable_calendar', function() {
			utils.enableorDisableCheckbox('enable_calendar', false, casper, function() {
				casper.echo("calendar checkbox has been disabled", 'info');
			});
		});
		this.waitForSelector('button[type="submit"]', function(){
			this.click('button[type="submit"]');
			this.wait(3000, function() {
				this.capture(screenShotsDir+'updatecalendaronGeneralSetting.png');
			});
		});
	});*/
	
	//Now login to forum and check calendar option is not visible in side menu
	casper.thenOpen(config.url);
	casper.then( function(){
		forumLogin.loginToApp(json.username, json.password, casper, function(){
			casper.echo("User has successfully login to the forum application", 'INFO');
			casper.wait(3000, function() {
				this.capture(screenShotsDir+"login.png");
			});
		});
		/*this.waitForSelector('#links-nav', function(){
			this.click('#links-nav');
			this.wait(5000, function(){
				test.assertDoesntExist('#calenders_show');
				this.capture(screenShotsDir+'CalendarnotVisible.png');
			});		
		});*/
	});

	//enable calendar checkbox from general setting page in backend
	/*casper.thenOpen(config.backEndUrl, function(){
		casper.echo("Title of the page : "+this.getTitle(), 'info');
	});
	casper.then(function() {
		calendar.gotoGeneralSettingspage(casper, function(){
			casper.echo("Navigated to General Settings page");
		});
		this.waitForSelector('#enable_calendar', function() {
			utils.enableorDisableCheckbox('enable_calendar', true, casper, function() {
				casper.echo("Calendar checkbox has been enabled", 'info');
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

	//enable all calendar related settings from user group permission for registered user
	casper.then(function(){
		utils.gotoEditUserGroupPermissionpage(x,"Registered Users", casper, function() {
			casper.echo("Successfully navigated to Edit User group Permission page");
			casper.wait(3000, function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});

		});
		this.waitForSelector('#view_calendar', function() {
			utils.enableorDisableCheckbox('view_calendar', true, casper, function() {
				casper.echo("View calendar checkbox has been enabled", 'info');
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
			casper.echo("calendar related setting has been updated for registered user fron edit User permission page");
			this.wait(3000, function(){
				test.assertExists('p[align="center"]');
				var updationMsg = this.fetchText('p[align="center"]');
				test.assertEquals(updationMsg, 'Your user group settings have been updated.');
				this.capture(screenShotsDir+'updateCalendarpermission.png');
			});
		});

	});*/

	casper.thenOpen(config.url);
	//verify calendar page and highlighted current date
	casper.then(function(){
		calendar.gotoCalendarpage(casper, function() {
			casper.wait(3000, function(){
				test.assert(this.getCurrentUrl().indexOf("calendar")>=0);
				casper.echo("Title of the page : "+ this.getTitle());
				casper.echo("Navigated to calendar page successfully");
				this.capture(screenShotsDir+'calendarpage.png');

				var highlightedDate = this.fetchText('td.this-day div span a');
				casper.echo("*** today's date *** "+highlightedDate);
				test.assertEquals(highlightedDate.trim(), moment().date().toString());
			});
		});
	});

	//Verify calendar mode
	/*casper.then(function() {

		//verify default calendar view mode after navigating to calendar page
		this.waitForSelector('#monthlyView', function() {
			test.assertExists('label.btn.btn-default.active');
			casper.echo('By default Month calendar mode is opened');
		});
		
		//verify yearly view after click on year calendar mode
		this.waitForSelector('#yearlyView', function() {
			this.click('#yearlyView');
			this.wait(5000, function() {
				var year = this.fetchText('form[action="/calendar/display"] div a');
				casper.echo("*** Current years is *** : "+year);
				test.assertEquals(year.trim(), (moment().year()).toString());
				this.capture(screenShotsDir+'calendarview_year.png');

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

						//verify today's calendar by clicking on Today option
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
				test.assertExists('div.calendar-detail-wrapper.weekly', 'Weekly calendar is verified');
				casper.echo('Weekly calendar mode is verified after clicking on Weekly calendar mode');
				this.capture(screenShotsDir+'calendarview_week.png');
			});
		});
	});

	casper.then(function() {	
		this.waitForSelector('#monthlyView', function() {
			var year = "";
			this.click('#monthlyView');
			this.wait(3000, function(){
				var month = this.fetchText('fovar img = fs.readFileSync(path.resolve('public/img/favicon.ico'));rm[action="/calendar/display"] div a');
				year = this.fetchText('form[action="/calendar/display"] div a span');
				month = (month.replace(year, '')).trim()+' ' +year.trim();
				casper.echo("*** Current month is *** : "+month);
				test.assertEquals(month, (moment.months(moment().month())+' '+moment().year()));
				this.capture(screenShotsDir+'calendarview_month.png');

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

	});	*/
	
		
	/*casper.then(function() {
		this.waitForSelector('a.btn.btn-sm.btn-primary', function() {
			this.click('a.btn.btn-sm.btn-primary');	
		});
		/*this.eachThen(json['invalidInfo'], function(response) {

		try { 
			casper.echo("=========" +JSON.stringify(response.data));
			calendar.createEvent(response.data, casper, function() {
				var responseData = response.data;
				if(responseData.validationType == "Blank Title") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message in case of blank title is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEventablankTitle.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
					
				}else if(responseData.validationType == "Blank Description") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message in case of blank description is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEventBlankdesc.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				}else if(responseData.validationType == "Allday with Previous Date") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for allDay with Previous date is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEventallDay_prevDate.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				}else if(responseData.validationType == "Start date greater than end Date") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for end date older than Start date is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_greaterStartDate.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				}else if(responseData.validationType == "Start date older than current Date") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Start date older than current Date is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_OldCurrentDate.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				}else if(responseData.validationType == "Daily Recurssion with blank day") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Start date older than current Date is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_DailywithBlankDay.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				}else if(responseData.validationType == "Weekly Recurssion with blank day") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Start date older than current Date is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_WeeklywithBlankDay.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				} else if(responseData.validationType == "Weekly Recurssion with current date but passed time") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Weekly Recurssion with current date but passed time is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_WeeklywithcurrentDaypassedTime.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				} else if(responseData.validationType == "Weekly Recurssion without selecting Weekday") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Weekly Recurssion without selecting Weekday is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_WeeklywithoutWeekday.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				} else if(responseData.validationType == "Monthly Recurssion with blank day") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Monthly Recurssion with blank day is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_MonthlywithBlankDay.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				} else if(responseData.validationType == "Monthly Recurssion with blank months") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Monthly Recurssion with blank months is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_MonthlywithBlankmonths.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				} else if(responseData.validationType == "Monthly Recurssion with less than 1 months") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Monthly Recurssion with less than 1 months is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_Monthlyless1month.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				} else if(responseData.validationType == "Monthly Recurssion with The Period with blank months") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Monthly Recurssion with The Period with blank months is : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_MonthlyTheperiodBlankmonths.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				} else if(responseData.validationType == "Yearly Recurssion with Every Period with blank years") {
					casper.wait(3000, function() {
						var ActualErrMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Error message for Yearly Recurssion with Every Period with blank years : "+casper.fetchText('div.alert.alert-danger'));
						casper.capture(screenShotsDir+'createEvent_Yearly_blankyears.png');
						test.assertEquals(ActualErrMessage, responseData.ExpectedErrMessage);
						casper.echo("-----------------------------------------------------------------");
					});
				}
			});
		} catch (err) {
			casper.echo("Error occurred: "+err);
		}
		});
		

	});*/

	/*casper.then(function() {
		/*this.waitForSelector('a.btn.btn-sm.btn-primary', function() {
			this.click('a.btn.btn-sm.btn-primary');	
		});
		//this.eachThen(json['invalidInfo'], function(response) {
			casper.echo("=========" +JSON.stringify(json["validInfo"][5]));
			calendar.createEvent(json["validInfo"][5], casper, function() {
				casper.wait(5000, function() {
					casper.echo("*****************************");
					calendar.verifyCreatedEvent(json["validInfo"][5], casper, function(){
						casper.capture(screenShotsDir+"EventwithMonthlyRepeat_The.png");
						calendar.gethrefofCreatedEvent(json["validInfo"][5], casper, function() {
							casper.echo("href value is : "+ json["validInfo"][5].calender_href, "INFO");
						});
					});
				
				});
			});

		//});
		var href = json["validInfo"][0].calender_href;
		this.click('a[href="'+href+'"]');
		casper.wait(5000, function() {
			casper.echo("*****************************");
			calendar.verifyCreatedEvent(json["validInfo"][0], casper, function(){
				casper.capture(screenShotsDir+"EventwithAllday.png");
			});
				
		});


	});*/

	/*casper.then(function() {
		this.waitForSelector('a.btn.btn-sm.btn-primary', function() {
			this.click('a.btn.btn-sm.btn-primary');	
		});
		this.eachThen(json['validInfo'], function(response) {

		try { 
			casper.echo("=========" +JSON.stringify(response.data));
			calendar.createEvent(response.data, casper, function() {
				var responseData = response.data;
				if(responseData.validationType == "Create event with Allday") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithAllday.png");
							calendar.gethrefofCreatedEvent(responseData, casper, function() {
								casper.echo("href value is : "+ responseData.calender_href, "INFO");
							});
							casper.echo("-----------------------------------------------------------------");
							casper.waitForSelector('a.btn.btn-sm.btn-primary', function() {
								this.click('a.btn.btn-sm.btn-primary');	
							});
						});
					});
					
				}else if(responseData.validationType == "Create event with ranged date") {
					casper.wait(3000, function() {
						casper.capture(screenShotsDir+"rangedDate.png");
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithRangeddate.png");
							calendar.gethrefofCreatedEvent(responseData, casper, function() {
								casper.echo("href value is : "+ responseData.calender_href, "INFO");
							});
							casper.echo("-----------------------------------------------------------------");
							casper.waitForSelector('a.btn.btn-sm.btn-primary', function() {
								this.click('a.btn.btn-sm.btn-primary');	
							});

						});
					});
				}else if(responseData.validationType == "Daily Recurssion") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithDailyRecurssion.png");
							calendar.gethrefofCreatedEvent(responseData, casper, function() {
								casper.echo("href value is : "+ responseData.calender_href, "INFO");
							});
							casper.echo("-----------------------------------------------------------------");
							casper.waitForSelector('a.btn.btn-sm.btn-primary', function() {
								this.click('a.btn.btn-sm.btn-primary');	
							});

						});
					});
				}else if(responseData.validationType == "Weekly Recurssion") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithWeeklyRecurssion.png");
							calendar.gethrefofCreatedEvent(responseData, casper, function() {
								casper.echo("href value is : "+ responseData.calender_href, "INFO");
							});
							casper.echo("-----------------------------------------------------------------");
							casper.waitForSelector('a.btn.btn-sm.btn-primary', function() {
								this.click('a.btn.btn-sm.btn-primary');	
							});

						});
					});
				} if(responseData.validationType == "Monthly Recurssion with Day Period") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithMonthlyRecDay.png");
							calendar.gethrefofCreatedEvent(responseData, casper, function() {
								casper.echo("href value is : "+ responseData.calender_href, "INFO");
							});
							casper.echo("-----------------------------------------------------------------");
							casper.waitForSelector('a.btn.btn-sm.btn-primary', function() {
								this.click('a.btn.btn-sm.btn-primary');	
							});

						});
					});
				} if(responseData.validationType == "Monthly Recurssion with The Period") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithMonthlyRecThe.png");
							calendar.gethrefofCreatedEvent(responseData, casper, function() {
								casper.echo("href value is : "+ responseData.calender_href, "INFO");
							});
							casper.echo("-----------------------------------------------------------------");
							casper.waitForSelector('a.btn.btn-sm.btn-primary', function() {
								this.click('a.btn.btn-sm.btn-primary');	
							});

						});
					});
				}
			});

			}catch(err){
				casper.echo("Error occurred :"+err);
			}

		});


	});*/

	casper.then(function() {
try { 
		this.eachThen(json['validInfo'], function(response) {
	
		
			casper.echo("=========" +JSON.stringify(response.data));
			calendar.ViewCalenderEvent(response.data, casper, function() {
				var responseData = response.data;
				if(responseData.validationType == "Create event with Allday") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithAllday_View.png");
							casper.echo("-----------------------------------------------------------------");
							casper.back();
							casper.capture(screenShotsDir+"CreateEventwithAllday_View_prev.png");
						});
					});
					
				}else if(responseData.validationType == "Create event with ranged date") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithRangeddate_view.png");
							casper.echo("-----------------------------------------------------------------");
							casper.back();

						});
					});
				}else if(responseData.validationType == "Daily Recurssion") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithDailyRecurssion_view.png");
							casper.echo("-----------------------------------------------------------------");
							casper.back();

						});
					});
				}else if(responseData.validationType == "Weekly Recurssion") {casper.echo("+++++++++++");
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithWeeklyRecurssion_view.png");
							casper.echo("-----------------------------------------------------------------");
							casper.back();

						});
					});
				} else if(responseData.validationType == "Monthly Recurssion with Day Period") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithMonthlyRecDay_view.png");
							casper.echo("-----------------------------------------------------------------");
							casper.back();
						});
					});
				}else if(responseData.validationType == "Monthly Recurssion with The Period") {
					casper.wait(3000, function() {
						calendar.verifyCreatedEvent(responseData, casper, function(){
							casper.capture(screenShotsDir+"CreateEventwithMonthlyRecThe_view.png");
							casper.echo("-----------------------------------------------------------------");
							casper.back();

						});
					});
				}
			});

			

		});

}catch(err){
				casper.echo("Error occurred :"+err);
			}

	});
	
	casper.thenOpen(config.url+'calendar/', function(){
		casper.echo("current page title is "+this.getTitle());
	});

	casper.then(function() {
		this.waitForSelector('a.btn.btn-sm.btn-primary', function() {
			this.click('a.btn.btn-sm.btn-primary');	
		});
		casper.echo("=========" +JSON.stringify(json["validInfo"][0]));
		calendar.createEvent(json["validInfo"][0], casper, function() {
			casper.wait(3000, function() {
				calendar.verifyCreatedEvent(json["validInfo"][0], casper, function(){
					var url = driver.getCurrentUrl();
					url= url.split(".com");
					var event_href = url[1];
					var cal_href = event_href.split("?");
					var cal_id =  cal_href[1].split("&");
					event_href = cal_href[0]+"?"+cal_id[2]+"&"+cal_id[0]+"&"+cal_id[1];
					casper.echo("current href is "+ event_href, "INFO");

					casper.wait(3000, function() {
						this.click('i.glyphicon.glyphicon-chevron-down');
casper.echo("*********id of delete option "+ 'a#event_delete_'+cal_id[0]);
						this.click('a#event_delete_'+cal_id[0]);
casper.echo("clicked", "INFO");

					});
					casper.echo("-----------------------------------------------------------------");
					
				});
			});

		});	


	});

	







};

//function to go to general settings page in backend
calendar.gotoGeneralSettingspage = function(driver, callback) {

	driver.waitForSelector('a[data-tooltip-elm="ddSettings"]', function(){
		this.click('a[data-tooltip-elm="ddSettings"]');
			
	});
	driver.waitForSelector('a[href="/tool/members/mb/settings?tab=General"]', function(){
		this.click('a[href="/tool/members/mb/settings?tab=General"]');
			
	});
	return callback();
};

//function to go calendar page in forum application
calendar.gotoCalendarpage = function(driver, callback) {
	driver.waitForSelector('#links-nav', function(){
		this.click('#links-nav');
			
	});
	driver.waitForSelector('a[href="/calendar"]', function(){
		this.click('a[href="/calendar"]');
			
	});
	return callback();
};

//function to create an event
calendar.createEvent = function(data, driver, callback) {
	driver.waitForSelector('input[name="event_title"]', function() {
		this.sendKeys('input[name="event_title"]', data.Title, {reset:true});
	});
	driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.description);	
	});
	driver.wait(3000, function() {
		casper.capture(screenShotsDir+"sangita123.png");
		if (data.Allday){
			utils.enableorDisableCheckbox('allDay', true, driver, function() {
				casper.echo("Allday checkbox has been enabled", 'info');
			});
			if(!data.startDate){
				this.sendKeys('#event_start_date', "1/23/2016", {reset:true});
			} else {
				this.sendKeys('#event_start_date', data.startDate, {reset:true});}
		} else {
			utils.enableorDisableCheckbox('allDay', false, driver, function() {
				casper.echo("Allday checkbox has been disabled", 'info');
			});
			this.sendKeys('#event_start_date', data.startDate, {reset:true, keepFocus: true});
		
			this.sendKeys('#event_end_date', data.endDate, {reset:true, keepFocus: true});

			this.sendKeys('#event_from_time', data.startTime, {reset:true, keepFocus: true});

			this.sendKeys('#to_time', data.endTime, {reset:true, keepFocus: true});

		}
		this.click('select[name="time_offset"]');
			this.fill('form#PostCalEvent',{
			'time_offset' : data.timeZone
			},false);

		this.test.assertExists('select[name="time_offset"]', 'Verify presence of time zone field');


		if (data.Repeat) {
			utils.enableorDisableCheckbox('repeat', true, casper, function() {
					casper.echo("Repeat checkbox has been enabled", 'INFO');
				});
			switch (data.recurrence) {
		
			case "Daily" :
				driver.click('#rb_event_1');
			
				driver.sendKeys('input[name="dailybox"]', data.days, {reset:true} );
			break;
			case "Weekly" : 
				driver.click('#rb_event_2');
				driver.sendKeys('input[name="weeklybox"]', data.weeks, {reset:true} );

				casper.echo("Length of array    **** "+data.weekday.length);
				for(var i=0; i<data.weekday.length; i++){
					switch (data.weekday[i]) {
						case "Monday" :
							driver.click('input#cb_monbox');
						break;
						case "Tuesday" :
							driver.click('input#cb_tuebox');
						break;
						case "Wednesday" :
							driver.click('input#cb_wedbox');
						break;
						case "Thursday" :
							driver.click('input#cb_thubox');
						break;
						case "Friday" :
							driver.click('input#cb_fribox');
						break;
						case "Saturday" :
							driver.click('input#cb_satbox');
						break;
						case "Sunday" :
							driver.click('input#cb_sunbox');
						break;
						default :
							casper.echo("No week day is passed in parameter");
					};
				}
	
			break;
			case "Monthly" :
				driver.click('#rb_event_3');
				switch ( data.rec_monthly) {

					case "Day" :
						driver.click('#rb_pattern_4');
						driver.sendKeys('input[name="monthly_dailybox"]', data.days, {reset:true} );
						driver.sendKeys('input[name="monthlybox"]', data.months, {reset:true} );
					break;
					case "The" :
						driver.click('#rb_pattern_5');
						this.click('select[name="monthlycombo2"]');
						this.fill('form#PostCalEvent',{
						'monthlycombo2' : data.monthlycombo   //need to pass like 'First' or 'Second' in the field
						},false);

						this.click('select[name="monthlycombo3"]');
						this.fill('form#PostCalEvent',{
						'monthlycombo3' : data.weekday
						},false);
						driver.sendKeys('input[name="monthlybox2"]', data.months, {reset:true} );
					break;
				};
			break;
			case "Yearly" :
				driver.click('#rb_event_4');
				switch ( data.rec_yearly) {

					case "Every" :
						driver.click('#rb_pattern_6');
						driver.click('select[name="yearlycombo"]');
						this.fill('form#PostCalEvent',{
						'yearlycombo' : data.monthname
						},false);
						driver.sendKeys('input[name="yearly_dailybox"]', data.years, {reset:true} );
					break;
					case "The" :
						driver.click('#rb_pattern_7');
						this.click('select[name="yearlycombo3"]');
						this.fill('form#PostCalEvent',{
						'yearlycombo3' : data.yearlycombo   //need to pass like 'First' or 'Second' in the field
						},false);

						this.click('select[name="yearlycombo4"]');
						this.fill('form#PostCalEvent',{
						'monthlycombo3' : data.weekday
						},false);

						this.click('select[name="yearlycombo5"]');
						this.fill('form#PostCalEvent',{
						'yearlycombo5' : data.monthname
						},false);
					break;
				};
			break;



			};
		}
	});
	driver.wait(3000, function(){
		this.click('button#post_event_buttton');
		casper.capture(screenShotsDir+"CreateEvent.png");	
	});
	return callback();
};


calendar.verifyCreatedEvent = function(data, driver, callback) {
	driver.waitForSelector('span h3 strong', function(){
		var title = driver.fetchText('span h3 strong');
		this.test.assertEquals(title, data.Title, "Verified title of event after creating cal event");
	});
	driver.waitForSelector('.event-description.clearfix.text-block', function(){
		var description = driver.fetchText('.event-description.clearfix.text-block');
		driver.test.assertEquals(description, data.description, 'Verify description of the event');	
	});

	if (data.Allday){
		var date = moment(new Date(data.startDate)).format("MMM DD");
		var eventstartDate = driver.fetchText('small span time');
		driver.test.assertEquals(eventstartDate, date, 'Event date is verified');	
	} else {
		var eventstartDate = moment(new Date(data.startDate+', '+data.startTime)).format('MMM DD, YYYY, HH:mm');
		var eventendDate = moment(new Date(data.endDate+', '+data.endTime)).format('MMM DD, YYYY, HH:mm');
		driver.test.assertExists('time[title="'+eventstartDate+'"]', 'Start date is verified');
		driver.test.assertExists('time[title="'+eventendDate+'"]', 'End date is verified');	
	}

	if(data.Repeat) {
		switch (data.recurrence) {
			case "Daily" :
				var rec_msg = driver.fetchText('span small[class="text-muted"]');
				var inputData = 'This event occurs every '+data.days+' day(s)';
				driver.test.assertEquals(rec_msg.trim(), inputData, 'Reccursion message for weekly event is verified');
			break;
			case "Weekly" :
				var rec_msg = driver.fetchText('span small[class="text-muted"]');
				var weekday = data.weekday.toString();
				weekday = weekday.replace(',', ', ');
				var inputData = 'This event occurs every '+data.weeks+' week(s) on '+ weekday;
				casper.echo("Recursion message on calender event page : "+inputData, 'INFO')
				driver.test.assertEquals(rec_msg.trim(), inputData, 'Reccursion message for weekly event is verified');
			break;
			case "Monthly" :
				if (data.rec_monthly == "Day") {
					var rec_msg = driver.fetchText('span small[class="text-muted"]');
					var inputData = 'This event occurs on day '+data.days+' of every '+ data.months + ' month(s)';
					driver.test.assertEquals(rec_msg.trim(), inputData, 'Reccursion message for monthly event with "Day" period is verified');
				} else if (data.rec_monthly == "The") {
					var rec_msg = driver.fetchText('span small[class="text-muted"]');
					var inputData = 'This event occurs on the '+data.monthlycombo +' '+data.weekday+' of every '+ data.months + ' month(s)';
					driver.test.assertEquals(rec_msg.trim(), inputData, 'Reccursion message for monthly event with "The" period is verified');
				}
			break;
			case "Yearly" :
				if (data.rec_yearly == "Every") {
					var rec_msg = driver.fetchText('span small[class="text-muted"]');
					casper.echo(rec_msg);
				} else if (data.rec_yearly == "The") {
					var rec_msg = driver.fetchText('span small[class="text-muted"]');
					casper.echo(rec_msg);
				}
			break;
	
		}
	}
	return callback();

};


calendar.gethrefofCreatedEvent = function(data, driver, callback) {	
	var url = driver.getCurrentUrl();
	url= url.split(".com");
	casper.echo(" href : "+url[1], "INFO");
	var event_href = url[1];
	casper.echo("current url is "+ event_href, "INFO");
	var cal_href = event_href.split("?");
	var cal_id =  cal_href[1].split("&");
	event_href = cal_href[0]+"?"+cal_id[2]+"&"+cal_id[0]+"&"+cal_id[1];
	//casper.echo("href value is : "+ event_href, "INFO");
	var read_data = fs.read(filePath)
  	var result = read_data.replace(data.calender_href, event_href);
	fs.write(filePath, result, 'w');

	return callback();

};

calendar.ViewCalenderEvent = function(data, driver, callback) {

	var href = data.calender_href;
	try{
		casper.echo("try......... : " +href);
		driver.test.assertExists('a[href="'+href+'"]');
		driver.waitForSelector('a[href="'+href+'"]', function(){
			this.click('a[href="'+href+'"]');
		});
	}catch(err) {
casper.echo("catch......... : " +href);
		//driver.click('a[data-original-title="Next Month"]');
		//this.click('a[href^="/calendar/eventdetail?date="]');
	};

	/*if (data.Repeat) {
		switch (data.recurrence) {
			case "Daily" :
				driver.click('a[href="'+href+'"]');
			break;
			case "Weekly" :
				driver.click('a[href="'+href+'"]');
			break;
			case "Monthly" :
				driver.click('a[href="'+href+'"]');
			break;
			case "Yearly" :
				driver.click('a[href="'+href+'"]');
			break;
		}

	} else {
		driver.click('a[href="'+href+'"]');

	}*/


	return callback();

};


	







