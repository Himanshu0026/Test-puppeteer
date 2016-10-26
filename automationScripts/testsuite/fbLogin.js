var config = require('../../config/config.json');
var forumLogin = require('./forum_login.js');
var forumRegister = require('./register.js');
//var json = require('../testdata/fbData.json');
var json = require('../testdata/loginData.json');
var fbLogin = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'fbLogin/';

fbLogin.fbLoginfeatureTest=function(casper,test){
	
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	//Facebook Connect-Disable
	casper.start(config.backEndUrl, function() {
		this.echo('**************************Case 1&2***************************', 'INFO');
		this.echo('Verify the visibilty of "Log In with Facebook" button on log in pop up','INFO');
		this.echo('Verify the visibilty of "Log In with Facebook" button on registration page','INFO');
		this.echo('title of the page : '+this.getTitle());
		this.capture('LoginBackEnd.png');
		this.waitForSelector('form[name="frmLogin"]', function sucess(){
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Successfully Login To Forum Back End...........', 'INFO');  
				casper.waitForSelector('div#my_account_forum_menu', function() {
					this.capture('DashboardBackEnd.png');
					ClickOnPageLinks(casper, function(err){
						if(!err){
							casper.echo('Single Sign On Page Not Found', 'INFO');									
						}
					});
					casper.waitForSelector('form#frmForumSettings', function success() {
						test.assertExists('form#frmForumSettings', 'Facebook Single Sign On Form Found');
						this.fill('form#frmForumSettings',{
							'facebook_connect':''
						}, true);
						this.capture('SingleSignOn.png');
						LogoutbackEnd(casper , function(err){
							if(!err){
								casper.echo('Logout Not Successfull','INFO');
							}	 		
						});  
					},function fail(){
						this.echo('Single Sign On Form Not Found','ERROR');
					});
			//Case-1 Verify the visibilty of "Log In with Facebook" button on log in pop up
			//Case-2 Verify the visibilty of "Log In with Facebook" button on registration page

					casper.thenOpen(config.url, function() {
						casper.waitForSelector('a[href="/register/login"]', function success(){
							test.assertExists('a[href="/register/login"]');
							this.click('a[href="/register/login"]');
							test.assertDoesntExist('form[name="frmLogin"]a#fb_login');
							this.click('a[href="/register/register"]');
							test.assertDoesntExist('form[name="PostTopic"]a#fblogin');
						},function fail(){
			        			this.echo('Login link Doesnt Available','ERROR');
						});
					});
				}, function fail() {
					this.echo('Single Sign On Form Not Found', 'ERROR');	
				});
			});
		},function fail(){
			this.echo('Login Form Doesnt Exists ','ERROR');
		});

		
		
	//Verify the profile picture of fb connected user
	casper.thenOpen(config.backEndUrl, function(){
		this.echo('**************************Case 3***************************', 'INFO');
	        this.echo('Verify the profile picture of Fb connected user');
		this.echo('title of the page : '+this.getTitle());
		this.capture('LoginBackEnd**.png');
		this.waitForSelector('form[name="frmLogin"]', function success(){
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Successfully Login To Forum Back End...........', 'INFO'); 
			}); 
			casper.waitForSelector('div#my_account_forum_menu', function success(){
				this.capture('DashboardMenu.png');
				GroupPermission(casper,function(err){
					if(!err){
						casper.echo('Group Permissions Not Allowed', 'INFO');
					}
					
				});
				this.waitForSelector('#autosuggest', function success(){
					MakeAdmin(casper,function(err){
						if(!err){
							casper.echo('Found Error In Creating Admin','INFO');
						}
					});
					LogoutbackEnd(casper , function(err){
						if(!err){
							casper.echo('Logout Not Successfull','INFO');
						}	 									
					});   
					//FrontEnd Login By Admin
					casper.thenOpen(config.url, function(){
						this.echo('Verify The Profile Picture Of Fb Connected User When Facebook Connect Disable','INFO');
			                        this.waitForSelector('a[href="/register/login"]', function success(){
				                	test.assertExists('a[href="/register/login"]', 'Login Form Found FrontEnd');
				               	 	this.click('a[href="/register/login"]');
			 	                	forumLogin.loginToApp(json['AdminLogin'].username, json['AdminLogin'].password, casper, function(err){
								if(!err){
									casper.echo('login with valid username and valid password ', 'INFO');
								}
							});
							this.waitForSelector('ul.nav.pull-right span.caret',function success(){
								this.capture('FrontEnddashboard.png');
								test.assertExists('button#searchContent','Toggle Button Found');
								this.click('button#searchContent');
								test.assertExists('a#advancedSearch','Advanced Search Label Found');
								this.click('a#advancedSearch');
								this.waitForSelector('a[href="/register/search"]',function success(){
									test.assertExists('a[href="/register/search"]', 'Member Label Found');
									this.click('a[href="/register/search"]');
									this.waitForSelector('form[name="posts"]', function success(){
                                                                        	this.capture('member.png');
                                                                                this.fill('form[name="posts"]',{
                                                                                	's_username' : 'Websitetoolbox India'														
                                                                                 }, true);
                                                                                 this.waitForSelector('a.username.usergroup20237477',function success(){
                                                                                 	test.assertExists('a.username.usergroup20237477','Username Link Found');
                                                                                        this.click('a.username.usergroup20237477');
                                                                                        forumLogin.logoutFromApp(casper, function(err) {
												if(!err){
													casper.echo('Successfully logout from application', 'INFO');
												}
											});
                                                                                 },function fail(){
                                                                                 	this.echo('Username Not Available On Forum Member Search','ERROR');
                                                                                 });
                                                                        },function fail(){
                                                                        	this.echo('Member Forum Not Found','ERROR');
                                                                        });	
								},function fail(){
									this.echo('Member Link Not Found After Advanced Search Label Click','ERROR');
								});
							},function fail(){
								this.echo('User Didnt Logged In','ERROR');
							});
				                },function fail(){
				                	this.echo('Login Link Not Available On Homepage of FrontEndUrl','ERROR');
			                        });
		                        });
							
				//Backend Selector	
			        },function fail(){
					this.echo('Change Users Group Page Not Found ','ERROR');
				});
		        },function fail(){
				this.echo('Group Permission Form Not Found','ERROR');
			});
	        },function fail(){
			this.echo('Websitetoolbox Forum Menu Not Found','ERROR');
		});	
	},function fail(){
		this.echo('Login Form Not Found Of BackEndUrl','ERROR');
	});
    	  
    	//Facebook connect Enable
        casper.thenOpen(config.backEndUrl, function(){
	    	this.echo('**************************Case 4&5***************************', 'INFO');
	    	this.echo('Verify the visibilty of "Log In with Facebook" button on log in pop up','INFO');
		this.echo('Verify the visibilty of "Log In with Facebook" button on registration page','INFO');
	    	this.echo('Facebook Connect Enable');
	    	this.echo('title of the page : '+this.getTitle());
		this.capture('LoginBackEnd**.png');
		this.waitForSelector('form[name="frmLogin"]', function success(){
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Successfully Login To Forum Back End...........', 'INFO'); 
			}); 
    	                casper.waitForSelector('div#my_account_forum_menu', function success(){
    	                	this.capture('BackEndDashboard**.png'); 
    	                        ClickOnPageLinks(casper,function(err){
					if(!err){
						casper.echo('Single Sign On Page Not Found Of Facebook Connect Enable', 'INFO');									
					}
				});
				this.waitForSelector('form#frmForumSettings', function success() {
					test.assertExists('form#frmForumSettings', 'Facebook Single Sign On Form Found');
					this.fill('form#frmForumSettings',{
						'facebook_connect':'1'
					}, true); 
					this.capture('SingleSignOnImage.png');
    	                                LogoutbackEnd(casper , function(err){
						if(!err){
							casper.echo('Logout Not Successfull','INFO');
						}	 									
					});   
					//Verify the visibilty of "Log In with Facebook" button on log in pop pup
					//Verify the visibilty of "Log In with Facebook" button on registration page
					casper.thenOpen(config.url, function() {
		                                casper.waitForSelector('#td_tab_login', function success(){
			                                test.assertExists('a[href="/register/login"]');
			                                this.click('a[href="/register/login"]');
			                                test.assertExists('a#fb_login','Facebook Login Button Found On login Page');
			                                this.click('a[href="/register/register"]');
			                                test.assertExists('a.facebook.pull-left.fb_login','Facebook Login Button Found Register Page' );
			                          },function fail(){
			                            	this.echo('Login link Doesnt Available','ERROR');
		                                  });
					});
    	                        },function fail(){
                                	this.echo('Single Sign On Form Not Found','ERROR');   	                
    	                       	});
    	                },function fail(){
    	                	this.echo('Forum Menu Not Found','ERROR');
    	                });
    	      	},function fail(){
    	       		this.echo('BackEnd Login Form Not Found','ERROR');
    	        });                  
    	});
        //Verify the profile picture of Fb connected user When Facebook Connect Enable
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('**************************Case 6***************************','INFO');
		this.echo('Verify the profile picture of fb connected user','INFO');
		this.echo('title of the page : '+this.getTitle());
		this.waitForSelector('form[name="frmLogin"]', function success(){
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Successfully Login To Forum Back End...........', 'INFO'); 
			});
			casper.waitForSelector('div#my_account_forum_menu', function success(){
				GroupPermission(casper,function(err){
					if(!err){
						casper.echo('Group Permissions Not Allowed', 'INFO');
					}
				});
				this.waitForSelector('#autosuggest', function success(){
					MakeAdmin(casper,function(err){
						if(!err){
							casper.echo('Found Error In Creating Admin','INFO');
						}
					});
					LogoutbackEnd(casper , function(err){
						if(!err){
							casper.echo('Logout Not Successfull','INFO');
						}	 									
					});   
					//FrontEnd Login By Admin
					
					casper.thenOpen(config.url, function(){
						this.echo('Verify The Profile Picture Of Fb Connected User When Facebook Enable','INFO')
			                        this.waitForSelector('a[href="/register/login"]', function success(){
				                	test.assertExists('a[href="/register/login"]', 'Login Form Found FrontEnd');
				                        this.click('a[href="/register/login"]');
			 	                        this.fill('form[name="frmLogin"]',{
						        	'member': 'hani',
						                 'pw': 'hani'
				                        },false);
				                        this.test.assertExists('button.btn.btn-primary','Submit Button found');
							this.click('button.btn.btn-primary');
				                        this.waitForSelector('ul.nav.pull-right span.caret',function success(){
				                        	this.capture('FrontEnddashboard1.png');
				                                test.assertExists('button#searchContent','Toggle Button Found');
				                                this.click('button#searchContent');
				                                test.assertExists('a#advancedSearch','Advanced Search Label Found');
				                                this.click('a#advancedSearch');
				                                casper.waitForSelector('a[href="/register/search"]', function success() {
					                        	test.assertExists('a[href="/register/search"]', 'Member Label Found');
					                        	this.click('a[href="/register/search"]');
                                                                        this.waitForSelector('form[name="posts"]', function success(){
                                                                        	this.capture('member.png');
                                                                                this.fill('form[name="posts"]',{
                                                                                	's_username' : 'Websitetoolbox India'														
                                                                                }, true);
                                                                                this.waitForSelector('a.username.usergroup20237477',function success(){
                                                                                	test.assertExists('a.username.usergroup20237477','Username Link Found');
                                                                                        this.click(' a.username.usergroup20237477');
                                                                                        forumLogin.logoutFromApp(casper, function(err) {
                                                                                        	if(!err){
													casper.echo('Successfully logout from application', 'INFO');                                                                      }
											});
                                                                                                
                                                                                                
                                                                                },function fail(){
                                                                                	this.echo('Username Not Available On Forum Member Search','ERROR');
                                                                                });
                                                                        },function fail(){
                                                                        	this.echo('Advanced Search Forum Not Found','ERROR');
                                                                        });
                                                                }, function fail() {
                                                                	this.echo('Member Link Not Found After Advanced Search Label Click','ERROR');
                                                               	});
			                                },function fail(){
				                        	this.echo('Toggle Button Not Found Didnt Login To FrontEnd','ERROR');
			                                });
			                       	},function fail(){
			                        	this.echo('Login Link Not Found on FrontEnd')
			                       }); 
			    		}); //thenopen  
			                //Backend Selector	
		                },function fail(){
					this.echo('Change Users Group Page Not Found ','ERROR');
				});
			},function fail(){
				this.echo('Group Permission Form Not Found','ERROR');
			});
		},function fail(){
			this.echo('Websitetoolbox Forum Menu Not Found','ERROR');
		});
	});      	
		  
    	//verify integration with facebook page by clickin on Fb login button
       
    	casper.thenOpen(config.url, function(){
	    	this.echo('**************************Case 7***************************','INFO');
	    	this.waitForSelector('a[href="/register/login"]', function success(){
	    		test.assertExists('a[href="/register/login"]');
			this.click('a[href="/register/login"]');
			test.assertExists('div.modal-footer a#fb_login em','Facebook Login Button Found On login Page Of FrontEndUrl');
			this.click('div.modal-footer a#fb_login em'); 
			casper.waitForPopup(/facebook/, function(popup) {
			});
			casper.withPopup(/facebook/ , function() {
				this.waitForSelector('form#login_form', function success(){
					this.capture('Facebookpopup.png')			
				},function fail(){
					this.echo('Facebook Form Not Found','ERROR');
					this.waitForSelector('a._42ft._4jy0._3-8_._4jy3._4jy1.selected._51sy',function success(){
						test.assertExists('a._42ft._4jy0._3-8_._4jy3._4jy1.selected._51sy','Login Button Found On Facebook Pop-Up');
						this.click('a._42ft._4jy0._3-8_._4jy3._4jy1.selected._51sy');
						this.wait(1000,function(){
							this.capture('Facebooklogin.png');
						});
					
					},function fail(){
						this.echo('Login Button not Found On Facebook Pop-up');
					});
				});
			});
	        },function fail(){
	        	this.echo('Login Link Not Found On FrontEnd','ERROR');	
	        });
        });
         
         //Login from Forum login page with  valid Facebook email Id and password
	casper.thenOpen(config.url, function(){
		this.echo('**************************Case 12***************************','INFO');
		this.echo('log in from forum login page with facebook email id  and password','INFO');
		this.waitForSelector('a[href="/register/login"]',function success(){
			test.assertExists('a[href="/register/login"]');
			this.click('a[href="/register/login"]');
			test.assertExists('form[name="frmLogin"]','Form found');
			this.fill('form[name="frmLogin"]',{
				'member': 'website1tool@gmail.com',
				'pw': '123@12345678'
			}, false);
			test.assertExists('form[name="frmLogin"] button','Login Button Found On ')
			this.click('form[name="frmLogin"] button');
			forumLogin.logoutFromApp(casper, function(err) {
                        	if(!err){
					casper.echo('Successfully Logout From Application', 'INFO');                                                                        }
			});
		},function fail(){
			this.echo('Login Link Not Found on Frontend','ERROR');
		});	
		
	});
	
	//Log in from Forum login page with  Invalid Facebook Email Id and password
	casper.thenOpen(config.url, function(){
		this.echo('**************************Case 13 to 18***************************','INFO');
		this.echo('log in from forum login page with facebook email id  and password','INFO');
		this.waitForSelector('a[href="/register/login"]', function success(){
			test.assertExists('a[href="/register/login"]');
			this.click('a[href="/register/login"]');
			test.assertExists('form[name="frmLogin"]','Form found');
			this.fill('form[name="frmLogin"]',{
				'member': 'website1tofdfol@gmail.com',
				'pw': 	'123@12345678'
			}, false);
			this.click('form[name="frmLogin"] button');		
			this.waitForSelector('div.alert', function success(){
				this.fill('form[name="frmLogin"]',{
					'member': 'website1tool@gmail.com',
					'pw': 	''		
				},false);
				this.click('input.btn.btn-primary');
				this.waitForSelector('div.alert', function success(){
					this.fill('form[name="frmLogin"]',{
						'member': '',
					 	'pw': 	'123@12345678'		
					},false);
					this.click('input.btn.btn-primary');
					this.waitForSelector('div.alert', function success(){
						this.fill('form[name="frmLogin"]',{
							'member': '',
							'pw': 	''		
						},false);
						this.click('input.btn.btn-primary');
						this.waitForSelector('div.alert', function success(){
							this.capture('alertmsg3.png');
							this.fill('form[name="frmLogin"]',{
								'member': 'website1tool@gmail.com',
								'pw': 	'123'		
							},false);
							this.click('input.btn.btn-primary');
				 			this.waitForSelector('div.alert', function success(){
				 				this.fill('form[name="frmLogin"]',{
									'member': 'website1tsdsool@gmail.com',
				 					'pw': 	'123'		
				 				},false);
				 				this.click('input.btn.btn-primary');
				 				this.waitForSelector('div.alert', function success(){
				 					this.capture('Invalid.png');
				 				},function fail(){
				 					this.echo('Alert Message Not Found With Invalid Emailid And Password','ERROR');
				 				});
				 		        },function fail(){
				 				this.echo('Alert Message Not Found On Forgot Password Form','ERROR');
				 			});
						},function fail(){
							this.echo('Alert Message Not Found With Valid EmailId and Invalid Password','ERROR');
						});
					},function fail(){
						this.echo('Alert Message Not Found With EmailId and Password blank  ','ERROR');	
					});
			        },function fail(){
					this.echo('Alert Message Not Found When Email Id Blank','ERROR');	
				});
		        },function fail(){
				this.echo('Alert Message Not Found When Password Blank','ERROR');	
			});
		},function fail(){
			this.echo('Login Link Not Found On FrontEnd','ERROR')
		});
	});//thenopen
	
	//log in from forum login page with facebook username and password
	casper.thenOpen(config.url, function(){
		this.echo('**************************Case 19 to 22***************************','INFO');	
		this.echo('log in from forum login page with facebook username and password','INFO');	
		this.waitForSelector('a[href="/register/login"]', function success(){
			test.assertExists('a[href="/register/login"]');
			this.click('a[href="/register/login"]');
			test.assertExists('form[name="frmLogin"]','Form found');
			this.fill('form[name="frmLogin"]',{
				'member': 'website232',
				'pw':'123@12345678'		
			},false);
			this.click('form[name="frmLogin"] button');
			this.waitForSelector('div.alert', function success(){
				this.fill('form[name="frmLogin"]',{
					'member': 'websitetool tools',
					'pw':'123'		
				},false);
				this.click('input.btn.btn-primary');	
				this.waitForSelector('div.alert', function success(){
					this.fill('form[name="frmLogin"]',{
						'member': 'websitesdstool tools',
					 	 'pw':'123'		
					},false);
					this.click('input.btn.btn-primary');
					this.waitForSelector('div.alert', function success(){
						this.capture('user.png');
						this.fill('form[name="frmLogin"]',{
							'member': 'websitetool tools',
					 	 	'pw':'123@12345678'		
						},false);
						this.click('input.btn.btn-primary');
						this.waitForSelector('a#logout', function success(){
							test.assertExists('ul.nav.pull-right span.caret');
							this.click('ul.nav.pull-right span.caret');
							test.assertExists('a#logout');			
							this.click('a#logout');
							this.waitForSelector('a#td_tab_login', function success(){
								this.capture('FrontEndImage.png');
							},function fail(){
								this.echo('Login Link Not Found After Logout','ERROR');
							});
						},function fail(){
							this.echo('Logout Link Not Found On Click Of Logout','ERROR');
						});
					},function fail(){
						this.echo('Alert Message Not Found With Valid Username And Password','ERROR');
				        });	
			        },function fail(){
					this.echo('Alert Message Not Found With Invalid Username and Valid Password','ERROR');
			        });
			},function fail(){
				this.echo('Alert Message Not Found With Valid Username and Invalid Password','ERROR');
		        });	
		},function fail(){
			this.echo('Login Link Not found On FrontEnd','ERROR');	
	        });
	});//thenopen
	
	//Verify Forgot Password
	casper.thenOpen(config.url, function(){
		this.echo('**************************Case 23 to 26***************************','INFO');
		this.echo('Verify Forgot Password','INFO');
		this.waitForSelector('a[href="/register/login"]', function success(){
			test.assertExists('a[href="/register/login"]');
			this.click('a[href="/register/login"]');
			test.assertExists('form[name="frmLogin"]');			
			this.click('a#anchor_tab_forget_password');
			this.wait(1000,function(){
				this.capture('Forgot.png');
				this.fill('form[name="lost_pw_form"]',{
					'member': 'websitetool tools'
				},false);
				this.click('input.btn.btn-primary');
			});
			this.waitForSelector('div.text-center',function success(){
				this.waitForSelector('a[href="/register/login"]', function success(){
					test.assertExists('a[href="/register/login"]');
					this.click('a[href="/register/login"]');
					test.assertExists('form[name="frmLogin"]');			
					this.click('a#anchor_tab_forget_password');
					this.waitForSelector('form[name="lost_pw_form"]', function success(){
						this.fill('form[name="lost_pw_form"]',{
							'email':'website1tool@gmail.com'
						},false);
						this.click('input.btn.btn-primary');
						this.wait(1000,function(){
							test.assertExists('a[href="/register/login"]');
							this.click('a[href="/register/login"]');
							test.assertExists('form[name="frmLogin"]');			
							this.click('a#anchor_tab_forget_password');
							this.waitForSelector('div.text-center',function succes(){								this.fill('form[name="lost_pw_form"]',{
									'email':'website1tereool@gmail.com'
								},false);
								this.click('input.btn.btn-primary');
							},function fail(){
								this.echo('The Email Alert Not Found','ERROR');
							});
						});
					},function fail(){
						this.echo('Forgot Password Page Not Found','ERROR');
					});	
				},function fail(){
					this.echo('Login Link Not Found','ERROR');	
				});
		        },function fail(){
				this.echo('Alert Message Not Found','ERROR');	
			});
		},function fail(){
			this.echo('Login Link Not Found');
		});
	});
	
    });//start braces
	 
};	 
	 
    	    
    	   
//*******************************Private Methods****************************
		
//Method  to find Single Sign On Page.
var ClickOnPageLinks=function(driver , test , callback){
	driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	driver.test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
	driver.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
	driver.echo('Single Sign On Page Found-------------------------------------------------------','INFO');
};
		
//********************************Method BackEndLogout***********************
 var LogoutbackEnd = function(driver, test, callback) {
	driver.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
	driver.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
	driver.test.assertExists('a[href="/tool/members/login?action=logout"]');
	driver.click('a[href="/tool/members/login?action=logout"]');										
   casper.echo('---------------------------------------------------------------------------','INFO');

}; 
//*****************************Method BackEndGroupPermissions*******************
var GroupPermission=function(driver,test,callback){
	driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	driver.test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	casper.echo('Group permissions ---------------------------------------------------------------------------','INFO');	
};
//*****************************Method MakeAdmin*********************
var  MakeAdmin=function(driver,test,callback){
	driver.test.assertExists('#autosuggest');
	driver.sendKeys('#autosuggest', 'hani', {keepFocus: true});
	driver.click('#autosuggest');
	driver.page.sendEvent("keypress", driver.page.event.key.Enter);
	driver.waitForSelector('form[name="ugfrm"]', function success(){
		driver.fillSelectors('form[name="ugfrm"]', {
			'input[type="checkbox"]' :'20237479'
		}, true);
		driver.test.assertExists('button[title="Close"]');
		driver.click('button[title="Close"]');
		casper.echo('MakeAdmin ---------------------------------------------------------------------------','INFO');	
	},function fail(){
		casper.echo('Form For User Permission Not Found');
	});
};
//*********************************************************************	
	casper.on("page.error", function(msg, trace) {
	    	this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		errors.push(msg);
	    });
    	   
   




