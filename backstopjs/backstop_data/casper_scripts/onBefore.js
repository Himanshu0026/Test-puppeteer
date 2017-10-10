 var config = require('../../../config/config.json');
module.exports = function (casper, scenario, vp) {
  	// This script runs before your app loads. Edit here to log-in, load cookies or set other states required for your test.
	if(vp.name == 'phone') {
		casper.userAgent('Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30');
	}
	console.log('*********************************************************************************************************');
	console.log('scenario : '+JSON.stringify(scenario));
	console.log('*********************************************************************************************************');
	/*if(scenario.type == 'reference') {
		casper.then(function() {
			casper.echo('login a user before backstop script for  '+scenario.referenceUrl, 'INFO');
			casper.thenOpen(config.refHost, function() {
				if (!casper.visible('#td_tab_login')) {
					casper.echo('User is logged-id already', 'INFO');
					casper.thenOpen(scenario.referenceUrl);
				} else {
					casper.echo(scenario.referenceUrl + ' opened successfully ', 'INFO');
					casper.click('#td_tab_login');
					casper.waitForSelector('#td_tab_login', function success() {
						casper.fill('form[name="frmLogin"]', {
							'member': 'liveserver',
							'pw' : 'test'
						}, false);

						casper.evaluate(function() {
							document.querySelector('form[name="frmLogin"] button[type="submit"]').click();
						});
						casper.then(function() {
							if(casper.exists('a.default-user')) {
								//this.test.assertTextExists('Search', 'Page contains "Search" : so identification done');
								casper.capture('home_page1.png');
							}
						});
					}, function fail() {
						casper.echo('login form not found', 'ERROR');
					}).waitForSelector('#private_message_notification', function success() {
						casper.echo('user is logged-in successfully', 'INFO');
						//casper.thenOpen(scenario.referenceUrl);
						casper.thenOpen(scenario.referenceUrl);
					}, function fail() {
						casper.echo('user is not logged-in', 'ERROR');
					});
				}
			});
		});
	}

	if(scenario.type == 'test') {
		casper.then(function() {
			casper.echo('login a user before backstop script for  '+scenario.url, 'INFO');
			casper.thenOpen(config.testHost, function() {

				if (!casper.visible('#td_tab_login')) {
					casper.echo('User is logged-id already', 'INFO');
					//casper.thenOpen(scenario.url);
				} else {
					casper.echo(scenario.url + ' opened successfully ', 'INFO');
					casper.click('#td_tab_login');
					casper.waitForSelector('#td_tab_login', function success() {
						casper.fill('form[name="frmLogin"]', {
							'member': 'zeba',
							'pw' : '123'
						}, false);

						casper.evaluate(function() {
							document.querySelector('form[name="frmLogin"] button[type="submit"]').click();
						});
						casper.then(function() {
							if(casper.exists('a.default-user')) {
								casper.capture('home_page2.png');
							}
						});
					}, function fail() {
						casper.echo('login form not found', 'ERROR');
					}).waitForSelector('#private_message_notification', function success() {
						casper.echo('user is logged-in successfully', 'INFO');
					}, function fail() {
						casper.echo('user is not logged-in', 'ERROR');
					});
				}
			});
		});
	}*/
};

// EXAMPLE: LOGIN BEFORE RUNNING TESTS
// module.exports = function(casper, scenario, vp) {
//   casper.thenOpen(scenario.url, function(){
//      if (this.exists('form#user-login-form')) {
//        this.fill('form#loginForm',{
//           'username': 'test',
//           'password': 'changeme'
//        }, true);
//      }
//   });
// };
