/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var wait = require('../wait.js');
var postEventMemberApprovalTestcases = module.exports = {};

// method to create a topic 
postEventMemberApprovalTestcases.createTopic = function() {
//Open front end and logged in as register user
	try {
		casper.test.assertExists('a.topic-title','Topic found');
	} catch (e) {
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						//method to create a new topic
						postEventMemberApprovalMethod.startTopic(json.newTopic, casper, function(err) {
							if(!err) {
								casper.echo('new topic method called successfully', 'INFO');
							}else {
								casper.echo('Topic not created', 'INFO');
							}
						});	
					} else {
						casper.echo('User icon not found','ERROR');	
					}
				});
			}else {
				casper.echo('User not logged in', 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	}
};

// method to Approve a pending post from- Approval queue button 
postEventMemberApprovalTestcases.approvalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending post from- Approval queue button             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('div.post-edit.pull-right.dropdown a', function success() {
											casper.click('div.post-edit.pull-right.dropdown a i');
											casper.wait(7000, function() {
											});
										},function fail(){
											casper.echo('Approve button not found','ERROR');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2],'post is not  visible on the approval queue page');
										});
										casper.then(function() {
											postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
												casper.echo('Inside the deletePost method calling...','INFO');
											});
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// // method to Approve a pending post -By clicking on topic
postEventMemberApprovalTestcases.byClickingOnTopic = function() {
	//Open Back-End URL And Get Title and logout if logged in
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending post -By clicking on topic             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});*/
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*                   Approve a pending post -By clicking on topic             *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('form#approveMembers span.post-body-author a', function success(){
										casper.test.assertExists('form#approveMembers span.post-body-author a','topic button found');
										casper.click('form#approveMembers span.post-body-author a');
										casper.waitForSelector('div.pending-post span.text-danger', function success(){
											casper.test.assertExists('div.pending-post span.text-danger','post found');
											casper.echo(casper.fetchText('div.pending-post span.text-danger'));
											casper.echo('*****************************************', 'INFO');
											casper.test.assertExists('div.post-edit.pull-right.dropdown a.alert.alert-success.pull-left','approve tick found');
								                        casper.click('div.post-edit.pull-right.dropdown a.alert.alert-success.pull-left');
								                          
								                        casper.wait(5000,function(){
								                        casper.test.assertDoesntExist('div.post-edit.pull-right.dropdown a.alert.alert-success.pull-left' ,'All Approved and  delete options are disappear');
								                        casper.capture('removed.png');
								                        });
											casper.then(function() {
												postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
													casper.echo('Inside the deletePost method calling...','INFO');
												});
											});
										},function fail(){
											casper.echo('post not found','ERROR');
										});
									},function fail(){
										casper.echo('1st post not found','ERROR');
									});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Approve a pending post by select the pending post by  check box
postEventMemberApprovalTestcases.byCheckBox = function() {
	//Open Back-End URL And Get Title and logout if logged in
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Approve a pending post by select the pending post by  check box      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});*/
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Approve a pending post by select the pending post by  check box      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
											casper.evaluate(function() {
												document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-success i', 'approve tick on the floating menu******************');
											casper.click('div#pending-menu span.dropdown a.text-success i');
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2] ,'post is not visible on the approval queue page');
										});
										casper.then(function() {
											postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
												casper.echo('Inside the deletePost method calling...','INFO');
											});
										}); 
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Approve a pending post by select all pending post by  check box
postEventMemberApprovalTestcases.byCheckBoxAll = function() {
	//Open Back-End URL And Get Title and logout if logged in
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Approve a pending post by select all pending post by  check box      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});*/
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Approve a pending post by select all pending post by  check box      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('div.subheading input.entry-checkbox', function success(){
											casper.test.assertExists('div.subheading input.entry-checkbox','check box found');
											casper.evaluate(function(){
												document.querySelector('div.subheading input.entry-checkbox').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-success i', 'APPROVE TICK ON THE FLOATING MENU');
											casper.waitForSelector('div#pending-menu',function success(){
												casper.click('div#pending-menu span.dropdown a.text-success i');
												casper.echo('***********TEXT FETCHED***********', 'INFO');
												casper.echo(casper.fetchText('form[name="posts"] div.alert.alert-info.text-center'),'INFO');	
											}, function fail(){
												casper.echo('Floating Menu not Found','INFO');
											});
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});
										casper.then(function() {
											postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
												casper.echo('Inside the deletePost method calling...','INFO');
											});
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Delete a pending post from- Approval queue button 
postEventMemberApprovalTestcases.deleteApprovalQueueButton = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 5      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.post-edit.pull-right.dropdown a.alert.alert-danger.pull-left', function success() {
											casper.click('div.post-edit.pull-right.dropdown a.alert.alert-danger.pull-left');
										},function fail(){
											casper.echo('Delete button not found','ERROR');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2] ,'************Post is Deleted from the approval queue***************');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Delete a pending post -By clicking on  post 
postEventMemberApprovalTestcases.deleteClickingPost = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 6      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
											casper.click('form#approveMembers span.post-body-author a');
											casper.waitForSelector('div.pending-post span.text-danger', function success() {
												casper.echo(casper.fetchText('div.pending-post span.text-danger'),'INFO');
												casper.echo('*************************************', 'INFO');
												casper.test.assertExists('a[id^="delete_pending_"]','Delete tick found');
												casper.click('a[id^="delete_pending_"]');
												casper.capture('delete_pending.png');
												casper.wait(3000);
												casper.reload(function() {
													casper.test.assertDoesntExist('span#post_message_'+postId[2] ,'**********post is  not  present on the approval queue page Hence Deleted.*************');
													casper.capture('post.png');
												});
											},function fail(){
												casper.echo('post found not found','ERROR');
											});
						
										},function fail(){
											casper.echo('post found not found','ERROR');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method to Delete a pending post by select the pending post by  check box
postEventMemberApprovalTestcases.deleteByCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 7      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
											casper.evaluate(function() {
												document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', 'Delete tick on the floating menu******************');
											casper.click('div#pending-menu span.dropdown a.text-danger i');
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2] , 'post is deleted from Approval Queue  on clicking checkbox');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method to Delete a pending post by select all pending post by  check box
postEventMemberApprovalTestcases.deleteByAllCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 8      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.subheading input.entry-checkbox', function success() {
											casper.test.assertExists('div.subheading input.entry-checkbox','check box found');
											casper.evaluate(function(){
												document.querySelector('div.subheading input.entry-checkbox').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', 'DELETE TICK ON THE FLOATING MENU');
											casper.waitForSelector('div#pending-menu',function success() {
												casper.capture('allcheckboxselected.png');
												casper.click('div#pending-menu span.dropdown a.text-danger i');
												casper.echo('***********TEXT FETCHED ***********', 'INFO');
												casper.echo(casper.fetchText('form[name="posts"] div.alert.alert-info.text-center'),'INFO');
											}, function fail(){
												casper.echo('Floating Menu not Found','INFO');
											});
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});   
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method to edit a pending post from- Approval queue button 
postEventMemberApprovalTestcases.editApprovalQueueButton = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 9      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.post-edit.pull-right.dropdown a.alert.alert-gray.pull-left', function success() {
											casper.click('div.post-edit.pull-right.dropdown a.alert.alert-gray.pull-left');
												casper.waitForSelector('#message1_ifr', function success() {
													casper.test.assertExists('#message1_ifr','message1-ifr found So the post is editable');
													casper.withFrame('message1_ifr', function() {
												 		casper.sendKeys('#tinymce', "Hello I am Admin and edited the post");	
													});
												}, function fail(){
													casper.echo('message1_ifr not found','ERROR');
												});
											casper.then(function() {
												casper.click('div.form-group.cleared input[name="save"]');
												casper.wait(5000,function () {
													casper.capture('editqueue.png');
												});
											 });
										},function fail(){
											casper.echo('Edit button not found','ERROR');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to edit a pending post by clicking on it
postEventMemberApprovalTestcases.editByClickingPost = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 10     *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
											casper.click('form#approveMembers span.post-body-author a');
											casper.waitForSelector('div.pending-post span.text-danger', function success() {
												casper.echo(casper.fetchText('div.pending-post span.text-danger'));
												casper.echo('*****************************************');
												casper.click('#posttoggle_'+postId[2]+' i');
												casper.mouse.move('#post_list_' +postId[2]);
												casper.click('a[data-pid="'+postId[2]+'"]');
												casper.waitForSelector('#message1_ifr', function success() {
													test.assertExists('#message1_ifr','message1-ifr found So the post is editable');
													casper.withFrame('message1_ifr', function() {
												 		casper.sendKeys('#tinymce', "Hello I am Admin and edited the post");	
													});
												}, function fail(){
													casper.echo('message1_ifr not found','ERROR');
												});
												casper.then(function() {
													casper.click('div.form-group.cleared input[name="save"]');
													casper.wait(5000,function () {
														casper.capture('edit2.png');
													});
											 	});
											},function fail(){
												casper.echo('alert not found','ERROR');
											});
										},function fail(){
											casper.echo('post not found','ERROR');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to check the functionality of approve post for guest user
postEventMemberApprovalTestcases.unregisterUserApprovePost = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 11     *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('','INFO');
			} else {
				casper.echo('Not called compose method','INFO');
			}
		});
	});
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to disable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
	});
};

// Test cases for event approval 
// method to Approve a pending event -Approval queue button
postEventMemberApprovalTestcases.eventApprovalByApprovalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending Event from- Approval queue button             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableEventApproval(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown', function success() {
							casper.click('a#approveEvent_'+eventId+' i');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						}, function fail() {
							casper.echo('approve tick not found','ERROR');
						});
						/*casper.wait(5000, function() {
							casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
						});*/
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};

// method to Approve a pending event -By clicking on event
postEventMemberApprovalTestcases.eventApprovalByClickingOnEvent = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending event -By clicking on event                  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
							casper.click('span[data-eventid="'+eventId+'"] a');
							casper.waitForSelector('div.cleared.event-footer strong', function success(){
								casper.test.assertExists('div.cleared.event-footer strong','Event found');
								casper.echo(casper.fetchText('div.cleared.event-footer strong'),'INFO');
								casper.echo('*****************************************','INFO');
								casper.test.assertDoesntExist('a#deleteEvent_'+eventId+' i','Delete button is not available','INFO');
								casper.capture('OnEventClick.png');
							}, function fail() {
								casper.echo('Event alert not found','ERROR');
							});
						},function fail(){
							casper.echo('Event title not found','ERROR');
						});
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Approve a pending event by select the pending event by  check box
postEventMemberApprovalTestcases.eventApprovalByCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Approve a pending event by select the pending event by  check box       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
							casper.click('input#eventaction_'+eventId);
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page','INFO');
							casper.test.assertExists('i#approvePending', 'approve tick on the floating menu******************');
							casper.click('i#approvePending');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						});
						/*casper.wait(5000, function() {
							casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page by clicking on checkbox','INFO');
						});*/  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Approve a pending event by select all pending event by  check box
postEventMemberApprovalTestcases.eventApprovalByCheckBoxAll = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Approve a pending event by select all pending event by  check box      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('input#select_all_pending_events', function success() {
							casper.click('input#select_all_pending_events');
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
							casper.waitForSelector('div#pending-menu',function success() {
								casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
								casper.test.assertExists('i#approvePending', 'APPROVE TICK ON THE FLOATING MENU');
								casper.click('i#approvePending');
								casper.waitUntilVisible('form[name="posts"] div.alert.alert-info.text-center', function success() {
									var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
									var expectedText = "There's currently nothing that needs your approval.";	
									casper.test.assert(actualText.indexOf(expectedText) > -1);
								}, function fail() { 
									casper.echo('events not deleted from the page','INFO');
								});
								/*casper.wait(5000, function() {
									casper.echo(' ***********TEXT FETCHED***********','INFO');
									casper.echo(casper.fetchText('form[name="posts"] div.alert.alert-info.text-center'),'INFO');	
								});*/
							}, function fail(){
								casper.echo('Floating Menu not Found','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						});  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event from- Approval queue button 
postEventMemberApprovalTestcases.eventdeleteByApprovalQueueButton = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                Delete a pending event from- Approval queue button                *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown', function success() {
							casper.click('a#deleteEvent_'+eventId+' i');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						}, function fail() {
							casper.echo('approve tick not found','ERROR');
						});
						/*casper.wait(5000, function() {
							casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
						});*/  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event -By clicking on it 
postEventMemberApprovalTestcases.eventdeleteByClickingEvent = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Delete a pending event -By clicking on it                      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
							casper.click('span[data-eventid="'+eventId+'"] a');
							casper.waitForSelector('div.cleared.event-footer strong', function success(){
								casper.test.assertExists('div.cleared.event-footer strong','Event found');
								casper.echo(casper.fetchText('div.cleared.event-footer strong'),'INFO');
								this.echo('*****************************************','INFO');
								casper.test.assertDoesntExist('a#deleteEvent_'+eventId+' i','Delete button is not available','INFO');
								this.capture('DeleteOnEventClick.png');
							}, function fail() {
								casper.echo('Event alert not found','ERROR');
							});
						},function fail(){
							casper.echo('Event title not found','ERROR');
						});
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event by select the pending post by  check box
postEventMemberApprovalTestcases.eventdeleteByCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*         Delete a pending event by select the pending post by  check box          *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
							casper.click('input#eventaction_'+eventId);
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page','INFO');
							casper.test.assertExists('i#decline_pending', 'Delete tick on the floating menu******************');
							casper.click('i#decline_pending');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						});
						/*casper.wait(5000, function() {
							casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page by clicking on checkbox','INFO');
						});*/  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event by select all pending post by  check box
postEventMemberApprovalTestcases.eventdeleteByAllCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Delete a pending event by select all pending post by  check box        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('input#select_all_pending_events', function success() {
							casper.click('input#select_all_pending_events');
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
							casper.waitForSelector('div#pending-menu',function success() {
								casper.test.assertExists('i#decline_pending', 'Delete TICK ON THE FLOATING MENU');
								casper.click('i#decline_pending');
								casper.waitUntilVisible('form[name="posts"] div.alert.alert-info.text-center', function success() {
									var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
									var expectedText = "There's currently nothing that needs your approval.";	
									casper.test.assert(actualText.indexOf(expectedText) > -1);
								}, function fail() { 
									casper.echo('events not deleted from the page','INFO');
								});
								/*casper.wait(5000, function() {
									casper.echo(' ***********TEXT FETCHED***********','INFO');
									casper.echo(casper.fetchText('form[name="posts"] div.alert.alert-info.text-center'),'INFO');	
								});*/
							}, function fail(){
								casper.echo('Floating Menu not Found','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						}); 
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to edit a pending event by clicking on it
postEventMemberApprovalTestcases.eventEditByClickingOnIt = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                         edit a pending event by clicking on it                   *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown', function success() {
						casper.click('a#edit_'+eventId+' i');
							casper.waitForSelector('div.editable-input textarea', function success() {
								var text = this.fetchText('div.editable-input textarea');
								casper.echo('The text of the event is--'+text,'INFO');
								casper.sendKeys('div.editable-input textarea', 'Event is edited');
								casper.wait(5000,function () {
									casper.click('a#edit_'+eventId+' i');
									var text2 = this.fetchText('div.editable-input textarea');
									casper.echo('The text of the event is--'+text2,'INFO');
									if(text2!=text){
										casper.echo('Event edited','INFO');
									} else {
										casper.echo('Event not edited','INFO');
									}
								});
								casper.click('div.editable-buttons i.glyphicon.glyphicon-ok');
								casper.click('div.editable-buttons i.glyphicon.glyphicon-ok');
							}, function fail(){
								casper.echo('Text Area not found','ERROR');
							});
						},function fail(){
							casper.echo('Edit button not found','ERROR');
						});
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		//method to disable approve new post** All posts
		postEventMemberApprovalMethod.disableEventApproval(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Disable Approve New Event functionality method called ','INFO');
			}
		});
	});
};
