
/****This script is dedicated for view calendar event from calendar.****/

"use strict";

var utils = require('./utils.js');
var calendar = require('./calendar.js');
var json = require('../testdata/calendarData.json');
var screenShotsDir = config.screenShotsLocation + "calendar/";
var moment = require('moment');
	moment().format();
var RRule = require('rrule').RRule;
var RRuleSet = require('rrule').RRuleSet;
var rrulestr = require('rrule').rrulestr;

var viewCalendarEvent = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'calendar/';

viewCalendarEvent.viewCalendarEventFeature = function(casper, test, x, callback) {
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url+'calendar/', function() {
		this.log('Title of the page :' +this.getTitle());
	});

	
	/*casper.then(function() {
	
		//this.eachThen(json['invalidInfo'], function(response) {
			casper.echo("=========" +JSON.stringify(json["validInfo"][0]));
					//casper.echo("*****************************");
					viewCalendarEvent.ViewEvent(json["validInfo"][0], casper, function(){
						casper.echo("*****************View calendar recursion event ******************");
						casper.wait(3000, function() {
							//calendar.verifyCreatedEvent(json["validInfo"][0], casper, function(){
								casper.echo("*********************INFO***********************", "INFO");
							//});	

						});
						
					});


	});*/




	casper.wait(7000);
	//Verify link of created event in the calendar and also verify all details on the respective event page after clicking on respective link
	casper.then(function() {
		casper.echo("VERIFY LINK ON CALENDAR PAGE AND VERIFY ALL RESPECTIVE DETAILS ON THE EVENT DETAILS PAGE", "INFO");
		casper.echo("****************************************************************************************", "INFO");
		try { 
		this.eachThen(json['validInfo'], function(response) {
		
			casper.echo("=========> " +JSON.stringify(response.data));
			viewCalendarEvent.ViewEvent(response.data, casper, function() {
				var responseData = response.data;
				if(responseData.validationType == "Create event with Allday") {
					casper.wait(3000, function() {
						this.capture(screenShotsDir+'ViewAllDayEvent.png')
						this.click('a.btn.btn-default[href^="/calendar?"]');
						casper.echo("  VERIFY LINK OF ALLDAY CALENDAR EVENT IN CALENDAR  ", "INFO");
						casper.echo("*********************************************************", "INFO");
					});	
				}else if(responseData.validationType == "Create event with ranged date") {
					casper.wait(3000, function() {
						this.capture(screenShotsDir+'ViewRangedDateEvent.png')
						this.click('a.btn.btn-default[href^="/calendar?"]');
						casper.echo(" VERIFY LINK FOR RANGED DATE CALENDAR EVENT IN CALENDAR ", "INFO");
						casper.echo("*********************************************************", "INFO");
					});
				}else if(responseData.validationType == "Daily Recurssion") {
					casper.wait(3000, function() {
						casper.echo("ALL RECURSION DATE FOR DAILY RECURSION EVENT HAVE BEEN VERIFIED", "INFO");
						casper.echo("***************************************************************", "INFO");
					});
				}else if(responseData.validationType == "Weekly Recurssion") {
					casper.wait(3000, function() {
						casper.echo("ALL RECURSION DATE FOR WEEKLY RECURSION EVENT HAVE BEEN VERIFIED", "INFO");
						casper.echo("***************************************************************", "INFO");
					});
				} else if(responseData.validationType == "Monthly Recurssion with Day Period") {
					casper.wait(3000, function() {
						casper.echo("ALL RECURSION DATE FOR MONTHLY RECURSION WITH DAY PERIOD HAVE BEEN VERIFIED", "INFO");
						casper.echo("***************************************************************************", "INFO");
					});
				}else if(responseData.validationType == "Monthly Recurssion with The Period") {
					casper.wait(3000, function() {
						casper.echo("ALL RECURSION DATE FOR MONTHLY RECURSION WITH THE PERIOD HAVE BEEN VERIFIED", "INFO");
						casper.echo("***************************************************************************", "INFO");
					});
				} else if(responseData.validationType == "Yearly Recurssion with Every Period") {
					casper.wait(3000, function() {
						casper.echo("ALL RECURSION DATE FOR YEARLY RECURSION WITH EVERY PERIOD HAVE BEEN VERIFIED", "INFO");
						casper.echo("****************************************************************************", "INFO");
					});
				} else if(responseData.validationType == "Yearly Recurssion with The Period") {
					casper.wait(3000, function() {
						casper.echo("ALL RECURSION DATE FOR YEARLY RECURSION WITH THE PERIOD HAVE BEEN VERIFIED", "INFO");
						casper.echo("***************************************************************************", "INFO");
					});
				}
			});

			

		});

		}catch(err){
			casper.echo("Error occurred :"+err);
		}

	});


	return callback();

};


viewCalendarEvent.ViewEvent = function(data, driver, callback) {

	var href = data.calender_href;
	if(data.Repeat) {
		switch (data.recurrence) {
			case "Daily" :
				var StDate = new Date(data.startDate);
				var EdDate = new Date(data.endDate);
				
				var rule = new RRule({
			 	freq: RRule.DAILY,
			  	interval: parseInt(data.days),
			  	dtstart: StDate,
			  	until: EdDate
				})

				var dateArr = rule.all();
				driver.eachThen(dateArr, function(response) {
					var data_href = moment(response.data).format("YYYY-M-D");
					var jumpDate = moment(data_href, "YYYY-M-D").format("M-YYYY");
					var href_start = (data.calender_href).indexOf("=");
					var href_last = (data.calender_href).indexOf("&");
					var calendar_href = (data.calender_href).replace((data.calender_href).substring(href_start+1,href_last), data_href);
					casper.echo(calendar_href, 'INFO');
					viewCalendarEvent.jumpTocalendar(jumpDate, driver, function() {
						driver.wait(3000, function() {
							driver.test.assertExists('a[href="'+calendar_href+'"]');
							this.click('a[href="'+calendar_href+'"]');
							this.wait(3000, function() {
								this.capture(screenShotsDir+data_href+'DailyEvent.png')
								this.click('a.btn.btn-default[href^="/calendar?"]');
							});
						});	
					});
						
				});
			break;
			case "Weekly" :
				var StDate = new Date(data.startDate);
				var EdDate = new Date(data.endDate);

				var W = [];
	
				casper.echo("Length of array    **** "+data.weekday.length);
				for(var i=0; i<data.weekday.length; i++){
					switch (data.weekday[i]) {

						case "Monday" :
						  	W.push(RRule.MO);
						break;
						case "Tuesday" :
							W.push(RRule.TU); 
						break;
						case "Wednesday" :
							W.push(RRule.WE);
						break;
						case "Thursday" :
							W.push(RRule.TH);
						break;
						case "Friday" :
							W.push(RRule.FR);
						break;
						case "Saturday" :
							W.push(RRule.SA);
						break;
						case "Sunday" :
							W.push(RRule.SU);
						break;
						}
					}

					var rule = new RRule({
			 		 freq: RRule.WEEKLY,
			  		interval: parseInt(data.weeks),
			  		byweekday: W,
			  		dtstart: StDate,
			  		until: EdDate
					})
					var dateArr = rule.all();
					driver.eachThen(dateArr, function(response) {
						var data_href = moment(response.data).format("YYYY-M-D");
						var jumpDate = moment(data_href, "YYYY-M-D").format("M-YYYY");
						var href_start = (data.calender_href).indexOf("=");
						var href_last = (data.calender_href).indexOf("&");
						var calendar_href = (data.calender_href).replace((data.calender_href).substring(href_start+1,href_last), data_href);
						casper.echo(calendar_href, 'INFO');
						viewCalendarEvent.jumpTocalendar(jumpDate, driver, function() {
							driver.wait(3000, function() {
								driver.test.assertExists('a[href="'+calendar_href+'"]');
								this.click('a[href="'+calendar_href+'"]');
									this.wait(3000, function() {
										this.capture(screenShotsDir+data_href+'WeeklyEvent.png')
										this.click('a.btn.btn-default[href^="/calendar?"]');
									});
							});	
						});
						
					});


			break;
			case "Monthly" :
				if (data.rec_monthly == "Day") {
					var StDate = new Date(data.startDate);
					var EdDate = new Date(data.endDate);

					var rule = new RRule({
			 		 freq: RRule.MONTHLY,
			  		interval: parseInt(data.months),
			  		bymonthday: parseInt(data.days),
			  		dtstart: StDate,
			  		until: EdDate
					})
					var dateArr = rule.all();
					driver.eachThen(dateArr, function(response) {
						var data_href = moment(response.data).format("YYYY-M-D");
						var jumpDate = moment(data_href, "YYYY-M-D").format("M-YYYY");
						var href_start = (data.calender_href).indexOf("=");
						var href_last = (data.calender_href).indexOf("&");
						var calendar_href = (data.calender_href).replace((data.calender_href).substring(href_start+1,href_last), data_href);
						casper.echo(calendar_href, 'INFO');
						viewCalendarEvent.jumpTocalendar(jumpDate, driver, function() {
							driver.wait(3000, function() {
								driver.test.assertExists('a[href="'+calendar_href+'"]');
								this.click('a[href="'+calendar_href+'"]');
									this.wait(3000, function() {
										this.capture(screenShotsDir+data_href+'monthlyDayEvent.png')
										this.click('a.btn.btn-default[href^="/calendar?"]');
									});
							});	
						});
						
					});
				} else if (data.rec_monthly == "The") {
					var StDate = new Date(data.startDate);
					var EdDate = new Date(data.endDate);
					var rec, W;
					if(data.monthlycombo == "5") {
						rec = -1;
					} else {
						rec = parseInt(data.monthlycombo);
					}
					//var rule;
					switch(data.weekday) {

						case "Monday" : 
					  		W = [RRule.MO.nth(rec)];
						break;
						case "Tuesday" :
							var W = [RRule.TU.nth(rec)]; 
						break;
						case "Wednesday" :
							W = [RRule.WE.nth(rec)];
						break;
						case "Thursday" :
							W = [RRule.TH.nth(rec)];
						break;
						case "Friday" :
							W = [RRule.FR.nth(rec)];
						break;
						case "Saturday" :
							W = [RRule.SA.nth(rec)];
						break;
						case "Sunday" :
							W = [RRule.SU.nth(rec)];
						break;
					}

					var rule = new RRule({
			 		 freq: RRule.MONTHLY,
			  		interval: parseInt(data.months),
			  		byweekday: W,
			  		dtstart: StDate,
			  		until: EdDate
					})
					var dateArr = rule.all();
					driver.eachThen(dateArr, function(response) {
						var data_href = moment(response.data).format("YYYY-M-D");
						casper.echo("***** "+data_href, "INFO");
						var jumpDate = moment(data_href, "YYYY-M-D").format("M-YYYY");
						var href_start = (data.calender_href).indexOf("=");
						var href_last = (data.calender_href).indexOf("&");
						var calendar_href = (data.calender_href).replace((data.calender_href).substring(href_start+1,href_last), data_href);
						casper.echo(calendar_href, 'INFO');
						viewCalendarEvent.jumpTocalendar(jumpDate, driver, function() {
							driver.wait(3000, function() {
								driver.test.assertExists('a[href="'+calendar_href+'"]');
								this.click('a[href="'+calendar_href+'"]');
									this.wait(3000, function() {
										this.capture(screenShotsDir+data_href+'monthlyTheEvent.png')
										this.click('a.btn.btn-default[href^="/calendar?"]');
									});
							});	
						});
						
					});

				}
			break;
			case "Yearly" :
				if (data.rec_yearly == "Every") {
					var StDate = new Date(data.startDate);
					var EdDate = new Date(data.endDate);

					var rule = new RRule({
			 		freq: RRule.YEARLY,
			  		bymonth: parseInt(moment().month(data.monthname).format("M")),
		  			bymonthday: parseInt(data.monthday),
			  		dtstart: StDate,
			  		until: EdDate
					})
					
					var dateArr = rule.all();
					driver.eachThen(dateArr, function(response) {
						var data_href = moment(response.data).format("YYYY-M-D");
						var jumpDate = moment(data_href, "YYYY-M-D").format("M-YYYY");
						var href_start = (data.calender_href).indexOf("=");
						var href_last = (data.calender_href).indexOf("&");
						var calendar_href = (data.calender_href).replace((data.calender_href).substring(href_start+1,href_last), data_href);
						casper.echo(calendar_href, 'INFO');
						viewCalendarEvent.jumpTocalendar(jumpDate, driver, function() {
							driver.wait(3000, function() {
								driver.test.assertExists('a[href="'+calendar_href+'"]');
								this.click('a[href="'+calendar_href+'"]');
									this.wait(3000, function() {
										this.capture(screenShotsDir+data_href+'YearlyEveryEvent.png')
										this.click('a.btn.btn-default[href^="/calendar?"]');
									});
							});	
						});
						
					});
				} else if (data.rec_yearly == "The") {
					var StDate = new Date(data.startDate);
					var EdDate = new Date(data.endDate);
					var rec, W;
					if(data.yearlycombo == "5") {
						rec = -1;
					} else {
						rec = parseInt(data.yearlycombo);
					}
					//var rule;
					switch(data.weekday) {

						case "Monday" : 
					  		W = [RRule.MO.nth(rec)];
						break;
						case "Tuesday" :
							W = [RRule.TU.nth(rec)]; 
						break;
						case "Wednesday" :
							W = [RRule.WE.nth(rec)];
						break;
						case "Thursday" :
							W = [RRule.TH.nth(rec)];
						break;
						case "Friday" :
							W = [RRule.FR.nth(rec)];
						break;
						case "Saturday" :
							W = [RRule.SA.nth(rec)];
						break;
						case "Sunday" :
							W = [RRule.SU.nth(rec)];
						break;
					}

					var rule = new RRule({
			 		freq: RRule.YEARLY,
			  		bymonth: parseInt(moment().month(data.monthname).format("M")),
		  			byweekday: W,
			  		dtstart: StDate,
			  		until: EdDate
					})
					
					var dateArr = rule.all();
					driver.eachThen(dateArr, function(response) {
						var data_href = moment(response.data).format("YYYY-M-D");
						var jumpDate = moment(data_href, "YYYY-M-D").format("M-YYYY");
						var href_start = (data.calender_href).indexOf("=");
						var href_last = (data.calender_href).indexOf("&");
						var calendar_href = (data.calender_href).replace((data.calender_href).substring(href_start+1,href_last), data_href);
						casper.echo(calendar_href, 'INFO');
						viewCalendarEvent.jumpTocalendar(jumpDate, driver, function() {
							driver.wait(3000, function() {
								driver.test.assertExists('a[href="'+calendar_href+'"]');
								this.click('a[href="'+calendar_href+'"]');
									this.wait(3000, function() {
										this.capture(screenShotsDir+data_href+'YearlyTheEvent.png')
										this.click('a.btn.btn-default[href^="/calendar?"]');
									});
							});	
						});
						
					});
				}
			break;
	
		}
	}else {
		casper.echo(" href --> "+href, "INFO");
		driver.waitForSelector('a[href="'+href+'"]', function(){
			this.click('a[href="'+href+'"]');
		});

	}
	return callback();

};

viewCalendarEvent.jumpTocalendar = function(Caldate, driver, callback) {
	driver.click('form[action="/calendar/display"] a');
	driver.sendKeys('input#jumpTo', Caldate, {reset:true} );
	driver.click('input#jumpTodate');
	driver.wait(3000, function(){
		var month = this.fetchText('form[action="/calendar/display"] div a');
		var year = this.fetchText('form[action="/calendar/display"] div a span');
		month = (month.replace(year, '')).trim()+' ' +year.trim();
		casper.echo("*** Actual month is under function *** : "+month);
		var expectedDate = (moment(Caldate,"M-YYYY")).format("MMMM YYYY");
		casper.echo("Expected month is under function :"+expectedDate);
		driver.test.assertEquals(month, expectedDate);
		casper.echo("Jump to calendar   : "+ Caldate +" , "+month, 'INFO');
	});
	return callback();

};


	
