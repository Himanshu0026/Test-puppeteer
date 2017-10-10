var uploadMethods= module.exports = {};
var wait=require('../wait.js');
var utils=require('../utils.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
//var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');


uploadMethods.uploadMethod=function(data , driver , callback ){
	casper.thenOpen('data', function(){
		casper.echo('ImageUploaded','INFO');
		casper.wait(1000 , function(){
			casper.capture('uploadImage.png');
		});
	});

};

uploadMethods.BackEndSettings=function(driver , callback) {


	wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
		if(isExists) {
			//driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
			driver.evaluate(function() {
				document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 			});
			wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
				if( isExists) {
					driver.evaluate(function() {
						document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
					});
					driver.wait(1000, function(){
					var grpName = casper.evaluate(function(){
 	       						for(var i=1; i<=7; i++) {
 	        						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
 								if (x1.innerText == 'Registered Users') {
 									document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
 									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
 									return x2;
								}
 							}
 						});

 					driver.echo("message : "+grpName, 'INFO');
 					driver.click('div.tooltipMenu a[href="'+grpName+'"]');
					});
					wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
						if(isExists) {
							utils.enableorDisableCheckbox('view_calendar',true, casper, function(err) {
								if(!err)
									driver.echo('Successfully checked calendar ','INFO');
							});
							//casper.click('button.button.btn-m.btn-blue');
							/*casper.then(function(){
								utils.enableorDisableCheckbox('other_post_replies',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked post reply ','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								/*utils.enableorDisableCheckbox('upload_attachments',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');*/

							//});*/

							}
							utils.enableorDisableCheckbox('other_post_replies',true, casper, function(err) {
								if(!err)
									driver.echo('Successfully checked post reply ','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
						});
					}
				});
			}
		});

};


uploadMethods.fillDataToMessage = function(driver, callback) {

	driver.fillSelectors('form#PostPrivateMessage',{
		'input#tokenfield_typeahead-tokenfield':'hani',
		'input#pm_subject':'Message',
		//'#tinymce':'hello how are you'
	},false);

	casper.evaluate(function() {
		document.querySelector('a#send_pmsg_button').click();
	});
	//driver.click('a[href="/file?id=16747797"]');
	driver.click('a#send_pmsg_button');
	return callback(null)
};



//camera web address method
uploadMethods.Webaddress=function(driver , callback){

	wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
		if(isExists) {

			wait.waitForElement('a#web' , casper , function(err , isExists){
				if(isExists){

					casper.evaluate(function() {
						document.querySelector('a#web').click();
					});
					casper.wait(3000,function(){
						casper.capture('PopUp1.png');
						casper.test.assertExists('input[name="fname"]','Input name found');
						casper.sendKeys('input[name="fname"]', 'http://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748568');
						casper.click('button#insert_image_btn');
						/*casper.wait(2000, function(){
							casper.capture('inboxCameraButton.png');

						});*/
					});
				}
			});
      		}
     });
};

//camera web browse

uploadMethods.Webbrowse=function(driver , callback){
	wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
		if(isExists){
			casper.capture('img123.png');
			casper.echo('Method called successfully','INFO');
		}


	});
};

//private message inbox
uploadMethods.Webbrowseinbox=function(driver , callback){
	wait.waitForElement('a#insertImage_pmsDialog' , casper , function(err , isExists) {
		if(isExists){
			casper.capture('img123.png');
			casper.echo('Method called successfully','INFO');
		}


	});
};

//private message inbox webaddress
uploadMethods.Webaddressinbox=function(driver , callback){
	wait.waitForElement('a#insertImage_pmsDialog' , casper , function(err , isExists) {
		if(isExists) {
			casper.evaluate(function() {
																				document.querySelector('a#webpmsDialog').click();
});
	casper.wait(1000,function(){
		casper.capture('imagePopUp.png');
		casper.sendKeys('input[name="fname"]', 'http://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748568');
		casper.click('button#insert_image_btnpmsDialog');
		casper.wait(2000, function(){
			casper.capture('inboxCameraButton.png');

		});
	});
      }
     });
};

//camera webaddress method till login
uploadMethods.webaddresslogin=function(driver , callback) {
	//casper.echo('*************Verify with Edit topic listing page under category camera webaddress**********','INFO');
	wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
		if(isExists) {
			inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
				if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");
				}else {
					casper.echo('Processing to Login on forum.....',

 'INFO');
					wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('a[href="/categories"]');
							wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
								if(isExists) {
									casper.click('span.forum-title:nth-child(1)');
									//wait.waitForElement('a#topics_tab', casper , function(err , isExists) {
										//if(isExists) {
											//casper.click('a#topics_tab');
											wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists){
												if(isExists) {
													casper.click('span.topic-content a');
													wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists){
														if(isExists) {

															casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
														}
													});
												}
											});
										//}
									//});
								}
							});
						}
					});
				}
			});
		}
	});
};


/*uploadMethods.startTopic = function(data,driver,callback) {
	driver.click('a.pull-right.btn.btn-uppercase.btn-primary ');
	driver.waitForSelector('div.post-body.pull-left',function success() {
                //driver.test.assertExists('form#PostTopic');
		driver.test.assertExists('div.post-body.pull-left', 'div.post-body.pull-left selector exists');
		driver.sendKeys('input[name="subject"]', data.title, {reset:true});
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',data.content);

		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			driver.click('#all_forums_dropdown');
			driver.fill('form[name="PostTopic"]',{
				'forum' : data.category
			},false);
			driver.then(function() {
				driver.click('#post_submit');


			});
		}, function fail() {
			driver.waitForSelector('#post_submit',function success() {
				driver.test.assertExists('#post_submit', ' #post_submit selector exists');
				driver.click('#post_submit');
			},function fail() {
				driver.echo('Unable to submit form','ERROR');
			});
		});
	},function fail(){
		driver.echo('Unable to Open Form To Start Topic','ERROR');
	});
	driver.then(function() {

		return callback(null);
	});
};*/

//Verify with Edit the Post from Search result page camera webaddress
uploadMethods.searchlogin=function(driver , callback) {
	//casper.echo('***********Verify with Edit the Post from Search result page camera webaddress************','INFO');
	wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
		if(isExists) {
			inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
				if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");
				}else {
					casper.echo('Processing to Login on forum.....','INFO');
					wait.waitForElement('input#inline_search_box' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('input#inline_search_box');
							casper.fill('form#inlineSearchForm', {
								'keywords' :'NewTopic'
							},true);
							try {
								wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
									if(isExists){
										//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
										/*var grp = casper.evaluate(function(){
											document.querySelector('div.post-body.pull-left span:nth-child(2) a').getAttribute('href');
										});
										casper.echo("message :" +grp,'INFO');
										casper.click('a[href="'+grp+'"]');*/
										casper.click('div.post-body.pull-left span:nth-child(2) a');
										wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
											if(isExists) {
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary');

											}
										});
									}
								});
							} catch (e) {
								wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
									if(isExists) {
										//method to create a new topic
										uploadMethods.startTopic(json['newtopic'], casper, function(err) {
											if(!err) {
												casper.echo('new topic created', 'INFO');
											}else {
												casper.echo('Topic not created', 'INFO');
											}
										});
									} else {
										casper.echo('User icon not found','ERROR');
									}
								});
							}
						}
					});
				}
			});
		}
	});
};


// Method for creating subcategory

/*uploadMethods.createSubCategory=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists) {
					if(isExists){
						casper.click('a[href="/categories"]');
						wait.waitForElement('li#forum_190578 span.forum-title' , casper , function(err , isExists){
							if(isExists) {
								casper.click('li#forum_190578 span.forum-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function(err , isExists) {
									if(isExists) {
										try {
											casper.test.assertExists('a.topic-title','Subcategory found');
										 }catch(e){
											casper.echo('Subcategory not found' , 'INFO');
											casper.thenOpen(config.backEndUrl , function(){
												loginPrivacyOptionMethod.loginToForumBackEnd	(casper , function(err) {
													if (!err)
														casper.echo('LoggedIn to forum backend....', 'INFO');
												});

												wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]', casper , function(err , isExists) {
													if(isExists) {
														driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
														wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
															if( isExists) {
																driver.evaluate(function() {
																document.querySelector('div.tooltipMenu.text a[title="Organize discussions into categories"]').click();
});
														   wait.waitForElement('div#forum-manager-heading-actions a' , casper , function(err , isExists) {
															if(isExists) {
																casper.click('div#forum-manager-heading-actions a');
																wait.waitForElement('input#isSubcategory' , casper , function(err , isExists){
																	if(isExists) {
																	casper.fillSelectors('form#edit_forum_form',{
																			'input[name="forum_name"]':'hello subcategory',
																			'textarea#forum_description':'India',
																																},false);
																			casper.click('input[name="isSubcategory"]');
																		casper.click('select#parentid')
																	casper.capture('555.png');
																		casper.wait(2000, function(){
																	casper.sendKeys('select[name="parentid"] option[value="190578"]', 'General');
																	casper.capture('133.png');
																		casper.click('form[name="frmOptions"] button');
																			casper.wait(2000, function(){
																					casper.capture('button.png');
																					});
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										});
									}
								}
							});
						}
					});
				}
			});
   	 	}
	});


	});



};*/

uploadMethods.createSubTopic=function(driver , callback) {

		try {
			wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
				if(isExists){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});
				}
			});
		} catch (e) {
			casper.then(function(){
				driver.echo('catch block called' ,'INFO');
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						//method to create a new topic
						uploadMethods.startTopic(json['newTopic'], casper, function(err) {
							if(!err)
								casper.echo('new topic created', 'INFO');

						});
					} else {
						casper.echo('User icon not found','ERROR');
					}
				});
			});
		}

};


//*********************************Combine all forum cases Methods********************************************

//Create Category General

uploadMethods.createCategory=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....','INFO');

				casper.waitForSelector('a[href="/categories"]' , function success(){
					casper.test.assertExists('a[href="/categories"]' , 'Category Found');
				}, function fail(){
					casper.echo('Failed case called' , 'INFO');
					casper.echo('Categories not found' ,'ERROR');
					casper.thenOpen(config.backEndUrl , function(){
						loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
							if (!err)
								casper.echo('LoggedIn to forum backend....', 'INFO');
						});
						wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]' , casper , function(err , isExists) {
							if(isExists) {
								driver.evaluate(function() {
									document.querySelector('div.tooltipMenu.text a[title="Organize discussions into categories"]').click();
								});
								wait.waitForElement('div#forum-manager-heading-actions a' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('div#forum-manager-heading-actions a');
										wait.waitForElement('input#isSubcategory' , casper , function(err , isExists){
											if(isExists) {
																																						casper.fillSelectors('form#edit_forum_form',{
	'input[name="forum_name"]':'General',
	'textarea#forum_description':'India',
},false);

																													casper.capture('555.png');
																		casper.wait(2000, function(){
																	//casper.sendKeys('select[name="parentid"] option[value="190578"]', 'General');
																	casper.capture('133.png');
																		casper.click('form[name="frmOptions"] button');
																			casper.wait(2000, function(){
																					casper.capture('button.png');

});
});
											}
										});
									}
								});
							}
						});
					});
				});
				casper.then(function(){
					casper.thenOpen(config.backEndUrl , function(){
						loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
							if (!err)
								casper.echo('LoggedIn to forum backend....', 'INFO');
						});
						wait.waitForElement('div#account_sub_menu a[data-tooltip-elm="ddAccount"]' , casper , function(err , isExists) {
							if(isExists){
								casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
								casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
								casper.test.assertExists('div#ddAccount a:nth-child(6)');
								casper.click('div#ddAccount a:nth-child(6)');
								casper.echo('                    Logout Form BackEnd                     ' ,'INFO');
							}
						});
					});
				});
			}
		});
	});
};






//**************************Method to Enable Approve new Posts******************************

uploadMethods.enableApproveAllPost=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err , isExists){
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				/*casper.evaluate(function() {
																														document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings').click();
});*/
				casper.capture('88.png');
				casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
				wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('select#post_approval');
						casper.sendKeys('select[name="post_approval"] option[value="99"]', 'All posts');
						casper.wait(2000 , function(){
							casper.click('button.button.btn-m.btn-blue');
						});
						casper.wait(20000 , function(){
							casper.capture('Enableallpost.png');

						});
					}
				});
			}
		});
	});
};

//**************************************create sub-category method **********************************************
uploadMethods.createSubCategory=function(driver , callback) {
	loginPrivacyOptionMethod.loginToForumBackEnd	(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]', casper , function(err , isExists) {
			if(isExists) {
				driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						driver.evaluate(function() {
																			document.querySelector('div.tooltipMenu.text a[title="Organize discussions into categories"]').click();
});
						wait.waitForElement('div#forum-manager-heading-actions a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('div#forum-manager-heading-actions a');
								wait.waitForElement('input#isSubcategory' , casper , function(err , isExists){
									if(isExists) {
										casper.fillSelectors('form#edit_forum_form',{
'input[name="forum_name"]':'hello subcategory',
'textarea#forum_description':'India',
},false);
casper.click('input[name="isSubcategory"]');
																			casper.click('select#parentid');

	var post= casper.evaluate(function(){
		var aa=document.querySelector('select#parentid option:nth-child(2)').getAttribute('value');

		return aa;
	 });
	 casper.echo("message :" +post,'INFO');
	 casper.sendKeys('select[name="parentid"] option[value="'+post+'"]', 'General');
	 wait.waitForTime(2000 , casper , function(err){
	 	casper.click('form[name="frmOptions"] button');
	});

										}
									});
								}
							});
						}
					});
				}
			});

};

//***********************************Delete Method--- Categories******************************
uploadMethods.DeleteCategory=function(driver , callback) {

		//casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('*************Delete category*********************' , 'INFO');
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]', casper , function(err , isExists) {
				if(isExists) {
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
						if(isExists) {
							driver.evaluate(function() {
								document.querySelector('div.tooltipMenu.text a[title="Organize discussions into categories"]').click();
});
							wait.waitForElement('div#forum-manager-heading-actions a' , casper , function(err  , isExists) {
							if(isExists) {
								casper.wait(2000 , function(){
									casper.capture('166.png');
									//casper.click('a.forumName.atree');
									/*casper.evaluate(function() {
										document.querySelector('a[data-forumid="199200"]').click();
									});*/
									/*var grpName = casper.evaluate(function(){
		//for(var i=1; i<=1; i++) {
			var x1 = document.querySelector('div#sortable ul li:nth-child(1)');
			if (x1.innerText == 'hello subcategory') {
				var x2 = document.querySelector('ul.ui-sortable li:nth-child('+i+') div a:nth-child(2)');
				//x2.click();
				//var x3 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
				return x1;
			}
		//}
	});
	 casper.echo("message :" +grpName,'INFO');*/



									casper.capture('188.png');
									wait.waitForElement('div.tooltipMenu.forumActionbutton a:nth-child(2)' , casper , function(err) {
										if(isExists) {
											//casper.click('div.tooltipMenu.forumActionbutton a:nth-child(2)');
											casper.evaluate(function() {
												document.querySelector('div.tooltipMenu.forumActionbutton a:nth-child(2)').click();
											});
											casper.wait(5000 , function(){

												casper.capture('122.png');

											});
											wait.waitForElement('input[type="submit"]' , casper , function(err , isExists) {
												if(isExists) {
													casper.click('input[type="submit"]');
													casper.wait(5000 , function(){

														casper.capture('022.png');
														casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
														casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
														casper.test.assertExists('div#ddAccount a:nth-child(6)');
														casper.click('div#ddAccount a:nth-child(6)');
														casper.echo('                    Logout Form BackEnd                     ' ,'INFO');


													});

												}
											});
										}
									});
								});
							}
						});
					}

					});
				}
			});
			/*casper.then(function(){
			//delete subcategory method called
				uploadMethods.deleteSubcategory(casper , function(err){
					if(!err)
						casper.echo('subcategory deleted' ,'INFO');

				});
			});*/
};





//**************************Method to Disable Approve new Posts******************************

uploadMethods.disableApproveAllPost=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err , isExists){
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				/*casper.evaluate(function() {
																														document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings').click();
});*/
				casper.capture('88.png');
				casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
				wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('select#post_approval');
						casper.sendKeys('select[name="post_approval"] option[value="0"]', 'Disabled');
						casper.wait(2000 , function(){
							casper.click('button.button.btn-m.btn-blue');
						});
						wait.waitForTime(20000 ,casper , function(err){
							casper.capture('disableallpost.png');


						});
					}
				});
			}
		});
	});
};

//**************************Aprovval case method************************************
uploadMethods.Approvalmethods=function(driver , callback) {
	casper.then(function(){
			casper.thenOpen(config.url , function(){
				casper.echo("Title of the page :"+this.getTitle(), 'INFO');
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
					//try {
						casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
							casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
						//casper.click('span.topic-content a');
						},function fail() {
							casper.echo('Failed block called','INFO');
							wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
								if(isExists) {
									//method to create a new topic
									uploadMethods.startTopic(json['newTopic'], casper, function(err) {
										if(!err) {
											casper.echo('new topic created', 'INFO');
										}else {
											casper.echo('Topic not created', 'INFO');
										}
									});
								} else {
									casper.echo('User icon not found','ERROR');
								}
							});
						});
				//} catch(e) {

				//}
					casper.then(function() {
						inContextLoginMethod.logoutFromApp(casper, function(err){
							if (!err)
								casper.echo('Successfully logout from application', 'INFO');
						});
					});
				}
			});
    		});
	});
	casper.then(function(){
		casper.echo('*******************************Approve all post dropdown enable***************************** ','INFO');
		uploadMethods.enableApproveAllPost(casper , function(err) {
			if(!err){
				casper.echo('all post not approved','INFO');
				}
		});

	});
};





//********************profile page post**********************************************************
uploadMethods.profilePost=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('***********Method to create post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								//casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForTime(5000 , casper , function(err) {
											casper.capture('1.png');
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});
												casper.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'dragme');
											});
											casper.wait(5000 , function(){
												casper.test.assertExists('input[name="submitbutton"]','button found');
                                                                                                casper.click('input[name="submitbutton"]');
												casper.wait(5000 , function(){
													casper.capture('34.png');
													casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													});
												});
											});
										});
									}

								});
							}
						});
					}
				});
			}
		});
	});
};

//start sub-category topics
uploadMethods.subCategoryTopic = function(dataa,driver,callback) {
	driver.click('a.pull-right.btn.btn-uppercase.btn-primary ');
	driver.waitForSelector('div.post-body.pull-left',function success() {
                //driver.test.assertExists('form#PostTopic');
		driver.sendKeys('input[name="subject"]', dataa.title, {reset:true});
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',dataa.content);
                        driver.capture('23.png');
		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			driver.click('#all_forums_dropdown');
			driver.fill('form[name="PostTopic"]',{
				'forum' : dataa.category
			},false);
			driver.then(function() {
				driver.click('#post_submit');
			});
		}, function fail() {
			driver.waitForSelector('#post_submit',function success() {
				driver.test.assertExists('#post_submit');
				driver.click('#post_submit');
			},function fail() {
				driver.echo('Unable to submit form','ERROR');
			});
		});
	},function fail(){
		driver.echo('Unable to Open Form To Start Topic','ERROR');
	});
	driver.then(function() {
		return callback(null);
	});
};


//delete sub-category
uploadMethods.deleteSubcategory=function(driver , callback){
	casper.thenOpen(config.backEndUrl , function(err){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		casper.echo('----------------------------------------Delete sub-category method called------------------------------------' , 'INFO');
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]', casper , function(err , isExists) {
				if(isExists) {
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
						if(isExists) {
							driver.evaluate(function() {
								document.querySelector('div.tooltipMenu.text a[title="Organize discussions into categories"]').click();
});
							wait.waitForElement('div#forum-manager-heading-actions a' , casper , function(err  , isExists) {
							if(isExists) {
								casper.wait(2000 , function(){
									casper.capture('166.png');
									casper.click('a.forumName.atree');
									/*casper.evaluate(function() {
										document.querySelector('a[data-forumid="199200"]').click();
									});*/
									casper.capture('188.png');
									wait.waitForElement('div.tooltipMenu.forumActionbutton a:nth-child(2)' , casper , function(err) {
										if(isExists) {
											//casper.click('div.tooltipMenu.forumActionbutton a:nth-child(2)');
											casper.evaluate(function() {
												document.querySelector('div.tooltipMenu.forumActionbutton a:nth-child(2)').click();
											});
											casper.wait(5000 , function(){

												casper.capture('122.png');
												casper.echo('Subcategory deleted' ,'INFO');
												casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
												casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
												casper.test.assertExists('div#ddAccount a:nth-child(6)');
												casper.click('div#ddAccount a:nth-child(6)');
												casper.echo('                    Logout Form BackEnd                     ' ,'INFO');


											});


											/*wait.waitForElement('input[type="submit"]' , casper , function(err , isExists) {
												if(isExists) {
													casper.click('input[type="submit"]');
													casper.wait(5000 , function(){

														casper.capture('022.png');
														casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
														casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
														casper.test.assertExists('div#ddAccount a:nth-child(6)');
														casper.click('div#ddAccount a:nth-child(6)');
														casper.echo('                    Logout Form BackEnd                     ' ,'INFO');


													});

												}
											});*/
										}
									});
								});
							}
						});
					}

					});
				}
			});
		});
};
