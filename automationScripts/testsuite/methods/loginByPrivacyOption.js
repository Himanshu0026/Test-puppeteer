'use strict.';
var loginByPrivacyOptionMethod = module.exports = {};
var wait = require('../wait.js');
var utils = require('../utils.js');
loginByPrivacyOptionMethod.jsErrors = [];

//backend settings permission page enable view calender for guest user
loginByPrivacyOptionMethod.viewCalenderGuestUser=function(status , casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('view_calendar',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully checked calendar','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
				if(isExists) {
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedMsg = 'Your user group settings have been updated.';
					casper.test.assertEquals(message , expectedMsg);
					return callback(null);
				}else{
					wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
						if(isExists) {
							var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
							var expectedMsg = 'Your user group settings have been updated.';
							casper.test.assertEquals(message , expectedMsg);
							return callback(null);
						}
					});
				}
			});
		}
	});
};


//Method to enable donate option from backend
loginByPrivacyOptionMethod.enableDonateOption=function(casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists){
		if(isExists){
			wait.waitForElement('select#paid_access_area', casper , function(err , isExists) {
				if(isExists) {
					casper.click('select#paid_access_area');
					casper.sendKeys('select[name="paid_access_area"] option[value="entire"]', 'Entire Forum');
					wait.waitForTime(1000 , casper , function(){
						casper.click('button.button.btn-m.btn-blue');
						casper.waitUntilVisible('div#ajax-msg-top', function success() {
							utils.log(' ' +casper.fetchText('div#ajax-msg-top'),'INFO');
							return callback(null);
						}, function fail() {
							utils.log(' Saved not found', 'ERROR');
							return callback(null);
						},30000);
					});
				}
			});
		}
	});
};

//Method to disable donate option from backend
loginByPrivacyOptionMethod.disableDonateOption=function(casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists){
		if(isExists){
			wait.waitForElement('select#paid_access_area', casper , function(err , isExists) {
				if(isExists) {
					casper.click('select#paid_access_area');
					casper.sendKeys('select[name="paid_access_area"] option[value="specific"]', 'Specific Categories');
					wait.waitForTime(1000 , casper , function(){
						casper.click('button.button.btn-m.btn-blue');
						casper.waitUntilVisible('div#ajax-msg-top', function success() {
							utils.log(' ' +casper.fetchText('div#ajax-msg-top'),'INFO');
							return callback(null);
						}, function fail() {
							utils.log(' Saved not found', 'ERROR');
							return callback(null);
						},30000);
					});
				}
			});
		}
	});
};

//Method to go to paid acces page from backend settings
loginByPrivacyOptionMethod.PaidAccessPermissionPage=function(casper , callback){
	wait.waitForVisible('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExists) {
		if(isExists) {
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
				if(isExists) {
					casper.click('div#ddSettings a:nth-child(6)');
					wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists){
						if(isExists){
							utils.log(' display permission settings page found' ,'INFO');
							return callback(null);
						}
					});
				}
			});
		}
	});
};

//Method to fill paid access form
loginByPrivacyOptionMethod.fillPaidAccessForm=function(casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists){
		if(isExists){
			casper.fill('form#frmForumSettings',{
				'paypal_email_address':'support@websitetoolbox.com',
				'paid_access_donation':'1'
			},false);
			return callback(null);
		}
	});
};
