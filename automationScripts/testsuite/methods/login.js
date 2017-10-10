/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict.';
var forumLoginMethod = module.exports = {};
var utils = require('../utils.js');

//Method for login to application by passing username and password
forumLoginMethod.loginToApp = function(username, password) {
	if (!casper.visible('#td_tab_login')) {
    utils.info('Login button not visible!');
  } else {
    utils.info('Login button is visible!');
  }

	casper.fill('form[name="frmLogin"]', {
		'member': username,
		'pw' : password
	}, false);

	try {
		casper.test.assertExists('form[name="frmLogin"] input[type="submit"]');
		casper.click('form[name="frmLogin"] input[type="submit"]');
	} catch(e) {
		casper.test.assertExists('form[name="frmLogin"] button[type="submit"]');
		casper.click('form[name="frmLogin"] button[type="submit"]');
	}

	casper.then(function() {
		if(casper.exists('a.default-user')) {
			this.test.assertTextExists('Search', 'Page contains "Search" : so identification done');
		}
	});
};

//Method for logout from application
forumLoginMethod.logoutFromApp = function() {
	casper.waitForSelector('ul.nav.pull-right span.caret', function() {
		this.click('ul.nav.pull-right span.caret');
	}).waitForSelector('a#logout', function() {
    this.test.assertTextExists('Log Out', 'Page contains "Log Out" : so identification done');
		this.click('a#logout');
  }).waitForText('Login');
};

//Login To Forum Back End
forumLoginMethod.loginToForumBackEnd = function() {
	casper.then(function(){
		this.test.assertExists('.button.btn-m.btn-blue', 'Login button present');
		this.fill('form[name="frmLogin"]', {
			'username': config.backendCred.uname,
			'password' : config.backendCred.upass
		}, false);
		this.click('form[name="frmLogin"] button');
		this.waitForSelector(('#my_account_forum_menu'), function() {
		  this.test.assertSelectorHasText('#ddGeneral', 'View Your Forum');
		  this.test.assertTextExists(config.backendCred.uname, 'Page contains ' +config.backendCred.uname+ ' : so identification done');
		});
	});
};

//Method BackEnd logout
forumLoginMethod.logoutFromForumBackEnd = function(){
	casper.test.assertExists('a[data-tooltip-elm="ddAccount"]');
	casper.click('a[data-tooltip-elm="ddAccount"]');
	casper.test.assertExists('a[href="/tool/members/login?action=logout"]', utils.info(' a[href="/tool/members/login?action=logout"] selector exists'));
	casper.click('a[href="/tool/members/login?action=logout"]');
	casper.waitForText('You have been logged out of your Website Toolbox account.');
};

//Method facebook login
forumLoginMethod.loginByFacebookUser = function() {
	casper.test.assertExists('a#td_tab_login', 'Login tab found');
	casper.click('a#td_tab_login');
	casper.test.assertExists('div.modal-footer a#fb_login em', 'Facebook Login Button Found On login Page Of FrontEndUrl');
	casper.click('div.modal-footer a#fb_login em');
	casper.waitForPopup(/facebook/, function(popup) {
		casper.withPopup(/facebook/ , function() {
			casper.waitForSelector('form#login_form', function success(){
				casper.test.assertExists('form#login_form', 'Form Found');
				casper.fill('form#login_form',{
					'email': config.fbInfo[config.backendCred.uname].email,
					'pass': config.fbInfo[config.backendCred.uname].pass
				}, false);
				casper.test.assertExists('form[id="login_form"] input[id="u_0_2"]', 'submit button found');
				casper.click('form[id="login_form"] input[id="u_0_2"]');
			},function fail(){
				utils.error(' Facebook Form Not Found');
			});
		},function timeout(){
			utils.error(' Facebook PopUp Not Found');
		});
	}, function timeout() {
		utils.error(' pop-up not opened in 5 seconds');
	});
	casper.waitForText('connect an existing forum account', function success() {
		this.click('form[name="fbForm"] a');
		this.wait('2000', function() {
			this.fill('form[name="fbForm"]', {
				'member': 'neha',
				'email': 'neha2top@gmail.com',
				'pw' : 'neha'
			}, false);
			this.test.assertExists('form[name="fbForm"] input.btn.btn-primary');
			this.click('form[name="fbForm"] input.btn.btn-primary');
			this.waitForSelector(('li.pull-right.user-panel button.dropdown-toggle'), function() {
		    this.test.assertExists('li.pull-right.user-panel button.dropdown-toggle', 'User logged in successfully');
		  });
		});
  }, function fail() {
		utils.info(' Fb user directly logged in');
	});
};
