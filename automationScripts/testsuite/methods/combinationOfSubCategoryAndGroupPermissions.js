/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

"use strict.";

var utils = require('../utils.js');
var wait = require('../wait.js');
var forumLoginMethod = require('../methods/login.js');
var categoryId;
var subCategoryId;
var combinationOfSubCategoryAndGroupPermissionsMethod = module.exports = {};

//*************************************************PRIVATE METHODS***********************************************

// Method to go to Default user group page
combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup = function(callback) {
	casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	wait.waitForElement('div#ddUsers', function(err, isExists) {
		if(isExists) {
			casper.click('div#ddUsers a:nth-child(1)');
			wait.waitForElement('div#tab_wrapper', function(err, isExists) {
				if(isExists) {
					wait.waitForElement('table.text.fullborder', function(err, isExists) {
						if(isExists) {
							return callback(null);
						} else {
							utils.error('Table not found');
						}
					});
				} else {
					utils.error('Calendar Permissions tab not found');
				}
			});
		} else {
			utils.error('Content  tooltip menu not found');
		}
	});
};

// method to goto user permission
combinationOfSubCategoryAndGroupPermissionsMethod.goToUserPemission = function(userGroup, callback) {
	var id = casper.evaluate(function(userGroup){
		var rowCount = document.querySelector('table.text.fullborder').rows.length;
		for(var i=1; i<=rowCount; i++) {
			var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
			if (group.innerText == userGroup) {
				document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
				var id = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
				return id;
			}
		}
	},userGroup);
	casper.click('a[id="'+id+'"]');
	wait.waitForElement('input#view_forum', function(err, isExists) {
		if(isExists) {
			return callback(null);
		}
	});
};

// method to goto user Group And User Pemission
combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission = function(userGroup, callback) {
	combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(function(err) {
		if(!err) {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToUserPemission(userGroup, function(err) {
				if(!err) {
					return callback(null);
				}
			});
		}
	});
};

// method to goto custom usergroup(New Custom Group) permission
combinationOfSubCategoryAndGroupPermissionsMethod.goToCustomUserPemission = function(driver, callback) {
	var id = casper.evaluate(function(){
		for(var i=1; i<=7; i++) {
			var group = document.querySelector('table:nth-last-of-type(1) tbody tr:nth-child('+i+') td:nth-last-of-type(3)');
			if (group.innerText == 'New Custom Group') {
				document.querySelector('table:nth-last-of-type(1) tbody tr:nth-child('+i+') td:nth-child(3) a').click();
				var id = document.querySelector('table:nth-last-of-type(1) tbody tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
				return id;
			}
		}
	});
	casper.click('a[id="'+id+'"]');
	wait.waitForElement('input#view_forum', casper, function(err, isExists) {
		if(isExists) {
			return callback(null);
		}
	});
};

//*************************Method to enable View forum for User Group from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewforum = function(callback) {
	casper.test.assertExists('input#view_messageboard');
	utils.enableorDisableCheckbox('view_messageboard', true, function(err) {
		if(!err) {
			utils.info('checkbox is checked');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue');
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.info("Permission changed");
			return callback(null);
		}
	});
};

//*************************Method to enable View category for User Group from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory = function(driver, callback) {
	driver.test.assertExists('input#view_forum');
	utils.enableorDisableCheckbox('view_forum', true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	driver.test.assertExists('button.button.btn-m.btn-blue');
	driver.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Start Topics for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics = function(driver, callback) {
	driver.test.assertExists('input#post_threads');
	utils.enableorDisableCheckbox('post_threads', true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	driver.test.assertExists('button.button.btn-m.btn-blue');
	driver.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Reply Topics for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopics = function(driver, callback) {
	driver.test.assertExists('input#other_post_replies');
	utils.enableorDisableCheckbox('other_post_replies', true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	driver.test.assertExists('button.button.btn-m.btn-blue');
	driver.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to disable Reply Topics for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disableReplyTopics = function(driver, callback) {
	driver.test.assertExists('input#other_post_replies');
	utils.enableorDisableCheckbox('other_post_replies', false, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is unchecked', 'INFO');
		}
	});
	driver.test.assertExists('button.button.btn-m.btn-blue');
	driver.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Upload Attachments for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachments = function(driver, callback) {
	driver.test.assertExists('input#upload_attachments');
	utils.enableorDisableCheckbox('upload_attachments', true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	driver.test.assertExists('button.button.btn-m.btn-blue');
	driver.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable View Attachments for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachments = function(driver, callback) {
	driver.test.assertExists('input#view_attachments');
	utils.enableorDisableCheckbox('view_attachments', true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	driver.test.assertExists('button.button.btn-m.btn-blue');
	driver.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Require Post Approval for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableRequirePostApproval = function(driver, callback) {
	driver.test.assertExists('input#post_approval');
	utils.enableorDisableCheckbox('post_approval', true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	driver.test.assertExists('button.button.btn-m.btn-blue');
	driver.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to create a category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.createCategory = function(data, driver, callback) {
	driver.test.assertExists('a#addForumButton');
	driver.click('a#addForumButton');
	wait.waitForElement('form#edit_forum_form', casper, function(err, isExists) {
		if(isExists) {
			casper.sendKeys('input[name="forum_name"]', data.title, {reset:true});
			casper.sendKeys('textarea[name="forum_description"]', data.description, {reset:true});
			casper.test.assertExists('button.button.btn-m.btn-blue');
			casper.click('button.button.btn-m.btn-blue');
			casper.waitUntilVisible('div#loading_msg', function success() {
				casper.echo(casper.fetchText('div#loading_msg'),'INFO');
				casper.echo("Category created",'INFO');
				return callback(null);
			}, function fail() {
				casper.echo('Category not created', 'ERROR');
				casper.echo('Loading... not found', 'ERROR');
				return callback(null);
			});
		} else {
			driver.echo('Form not found', 'ERROR');
		}
	});
};

//*************************Method to create a Sub Category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory = function(data, driver, callback) {
	driver.test.assertExists('a#addForumButton');
	driver.click('a#addForumButton');
	wait.waitForElement('form#edit_forum_form', casper, function(err, isExists) {
		if(isExists) {
			casper.sendKeys('input[name="forum_name"]', data.title, {reset:true});
			casper.sendKeys('textarea[name="forum_description"]', data.description, {reset:true});
			utils.enableorDisableCheckbox('isSubcategory', true, casper, function(err) {
				if(!err) {
					casper.echo('checkbox is checked', 'INFO');
				}
			});
			casper.then(function() {
				var catId = casper.evaluate(function() {
					var id = document.querySelectorAll('#parentid option');
					var len = id.length;
					for(var i =1; i<=len; i++) {
						var cat = document.querySelector('#parentid option:nth-child('+i+')');
						if(cat.innerText == 'cat1') {
							var catValue = document.querySelector('#parentid option:nth-child('+i+')').getAttribute('value');
							return catValue;
						}
					}
				});
				casper.echo('Total category available= '+catId, 'INFO');
				casper.fillSelectors('div#parentOpt', {
					'select[name="parentid"]': catId
				}, true);
				casper.test.assertExists('button.button.btn-m.btn-blue');
				casper.click('button.button.btn-m.btn-blue');
				casper.waitUntilVisible('div.heading.error_message', function success() {
					casper.echo(casper.fetchText('div.heading.error_message'),'INFO');
					casper.echo("Sub Category created",'INFO');
					return callback(null);
				}, function fail() {
					casper.echo('Sub Category not created', 'ERROR');
					return callback(null);
				});
			});
		} else {
			driver.echo('Form not found', 'ERROR');
		}
	});
};

//*************************Method to get the id of Category and sub category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.getIdOfCategory = function(data, driver, callback) {
	var title = data.title;
	wait.waitForElement('a#addForumButton', casper, function(err, isExists) {
		if(isExists) {
			categoryId = casper.evaluate(function(title){
				var totalCat = document.querySelectorAll('div#wrapper li a.forumName.atree');
				for(var i=1; i<=totalCat.length; i++) {
					var cat = document.querySelector('div#wrapper li:nth-child('+i+') a.forumName.atree');
					if (cat.innerText == title) {
						var catId = document.querySelector("div#wrapper li:nth-child("+i+')').getAttribute('id');
						return catId;
					}
				}
			},title);
			casper.echo('the id of the category ='+categoryId,'INFO');
			return callback(null, categoryId);
		} else {
			casper.echo('Calendar Permissions tab not found', 'ERROR');
		}
	});
};

//*************************Method to get the id of sub category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.getIdOfSubCategory = function(data, driver, callback) {
	var title = data.title;
	wait.waitForElement('a#addForumButton', casper, function(err, isExists) {
		if(isExists) {
			subCategoryId = casper.evaluate(function(title){
				var totalCat = document.querySelectorAll('div#wrapper li a.forumName.atree');
				for(var i=1; i<=totalCat.length; i++) {
					var cat = document.querySelector('div#wrapper li:nth-child('+i+') a.forumName.atree');
					if (cat.innerText == 'cat1') {
						var catId = document.querySelector("div#wrapper li:nth-child("+i+')').getAttribute('id');
						var totalSubCat = document.querySelectorAll('li[id="'+catId+'"] ul li');
						for(var j=1; j<=totalSubCat.length; j++) {
							var subCat = document.querySelector('li[id="'+catId+'"] ul li:nth-child('+j+') a');
							if (subCat.innerText == title) {
								var subCatId = document.querySelector('li[id="'+catId+'"] ul li:nth-child('+j+')').getAttribute('id');
								return subCatId;
							}
						}
					}
				}
			},title);
			casper.echo('the id of the subcategory ='+subCategoryId,'INFO');
			return callback(null, subCategoryId);
		} else {
			casper.echo('Calendar Permissions tab not found', 'ERROR');
		}
	});
};

//*************************Method to goto the permission of Sub Category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermission = function(id, driver, callback) {
	casper.mouse.move('li[id="'+id+'"] div.select');
	casper.click('li[id="'+id+'"] a.manageAction span'); // click on manage of cat1
	wait.waitForTime(2000,casper, function(err) {
		if(!err) {
		}
	});
	casper.click('div[id="forumAction'+id+'"] a.change_perm'); // click on change permission
	wait.waitForElement('span#inheritance', casper, function(err, isExists) {
		if(isExists) {
			casper.echo("Change Permission Page opened",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to change permission of Sub Category for View Category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory = function(group, driver, callback) {
	var id = 'view_forum_'+group;
	utils.enableorDisableCheckbox(id, true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for View Category(disable) from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory = function(group, driver, callback) {
	var id = 'view_forum_'+group;
	utils.enableorDisableCheckbox(id, false, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Start topics from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory = function(group, driver, callback) {
	var id = 'post_threads_'+group;
	utils.enableorDisableCheckbox(id, true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Start topics(disable) from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory = function(group, driver, callback) {
	var id = 'post_threads_'+group;
	utils.enableorDisableCheckbox(id, false, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Reply Topics from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory = function(group, driver, callback) {
	var id = 'other_post_replies_'+group;
	utils.enableorDisableCheckbox(id, true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Reply Topics(disable) from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory = function(group, driver, callback) {
	var id = 'other_post_replies_'+group;
	utils.enableorDisableCheckbox(id, false, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Upload Attachments from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachmentsForSubCategory = function(group, driver, callback) {
	var id = 'upload_attachments_'+group;
	utils.enableorDisableCheckbox(id, true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Upload Attachments(disable) from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disableUploadAttachmentsForSubCategory = function(group, driver, callback) {
	var id = 'upload_attachments_'+group;
	utils.enableorDisableCheckbox(id, false, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for View Attachments from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachmentsForSubCategory = function(group, driver, callback) {
	var id = 'view_attachments_'+group;
	utils.enableorDisableCheckbox(id, true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for View Attachments(disable) from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disableViewAttachmentsForSubCategory = function(group, driver, callback) {
	var id = 'view_attachments_'+group;
	utils.enableorDisableCheckbox(id, false, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Require Post Approval from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory = function(group, driver, callback) {
	var id = 'post_approval_'+group;
	utils.enableorDisableCheckbox(id, true, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Require Post Approval(disable) from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory = function(group, driver, callback) {
	var id = 'post_approval_'+group;
	utils.enableorDisableCheckbox(id, false, casper, function(err) {
		if(!err) {
			casper.echo('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		casper.echo(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		casper.echo('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to enable Private Categories from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enablePrivateCategories = function(driver, callback) {
	forumLoginMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(1)');
							wait.waitForElement('#show_private_forums', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('show_private_forums', true, casper, function(err) {
										if(!err) {
											casper.echo('checkbox is checked', 'INFO');
										}
									});
									casper.test.assertExists('button.button.btn-m.btn-blue');
									casper.click('button.button.btn-m.btn-blue');
									casper.waitUntilVisible('div#ajax-msg-top', function success() {
										casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
									}, function fail() {
										casper.echo('Saved not found', 'ERROR');
									},30000);
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
					casper.then(function() {
						casper.click('a[data-tooltip-elm="ddAccount"]');
						forumLoginMethod.backEndLogout(casper, function(err) {
							if(!err) {
								return callback(null);
							}
						});
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
};

//*************************Method to disable Private Categories from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.disablePrivateCategories = function(driver, callback) {
	forumLoginMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(1)');
							wait.waitForElement('#show_private_forums', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('show_private_forums', false, casper, function(err) {
										if(!err) {
											casper.echo('checkbox is unchecked', 'INFO');
										}
									});
									casper.test.assertExists('button.button.btn-m.btn-blue');
									casper.click('button.button.btn-m.btn-blue');
									casper.waitUntilVisible('div#ajax-msg-top', function success() {
										casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
									}, function fail() {
										casper.echo('Saved not found', 'ERROR');
									},30000);
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
					casper.then(function() {
						casper.click('a[data-tooltip-elm="ddAccount"]');
						forumLoginMethod.backEndLogout(casper, function(err) {
							if(!err) {
								return callback(null);
							}
						});
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
};

// method to goto category page from backend
combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage = function(driver, callback) {
	driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	wait.waitForElement('div#ddContent', driver, function(err, isExists) {
		if(isExists) {
			driver.click('div#ddContent a:nth-child(1)');
			wait.waitForElement('a#addForumButton', casper, function(err, isExists) {
				if(isExists) {
					casper.echo('Category page opened', 'INFO');
					return callback(null);
				} else {
					casper.echo('Category page not opened', 'ERROR');
					return callback(null);
				}
			});
		} else {
			casper.echo('Content  tooltip menu not found', 'ERROR');
		}
	});
};

// method to check cat1 is already exists or not
combinationOfSubCategoryAndGroupPermissionsMethod.isCategoryExists = function(data, driver, callback) {
	var title = data.title;
	driver.test.assertExists('div#sortable ul li','Category present');
	var isCatExists = driver.evaluate(function(title) {
		var totalCategories = document.querySelectorAll('div#sortable ul li');
	   	for(var i=1; i<=(totalCategories.length); i++) {
			var category = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
			if (category.innerText == title) {
				return true;
			}
		}
	},title);
	if(isCatExists === true) {
		return callback(null, true);
	} else {
		return callback(null, false);
	}
};

// method to check cat1a is already exists or not
combinationOfSubCategoryAndGroupPermissionsMethod.isSubCategoryExists = function(data, driver, callback) {
	var title = data.title;
	driver.test.assertExists('div#sortable ul li','Category present');
	var isSubCatExists = driver.evaluate(function(title) {
		var totalCategories = document.querySelectorAll('div#sortable ul li');
	   	for(var i=1; i<=(totalCategories.length); i++) {
			var category = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
			if (category.innerText == title) {
				return true;
			}
		}
	},title);
	if(isSubCatExists === true) {
		return callback(null, true);
	} else {
		return callback(null, false);
	}
};

// method to start new topic with attachment
combinationOfSubCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic = function(data, driver, callback) {
	driver.click('a.pull-right.btn.btn-uppercase.btn-primary ');
	wait.waitForElement('div.post-body.pull-left', driver, function(err, isExists) {
		if(isExists) {
			driver.sendKeys('input[name="subject"]', data.title, {reset:true});
			driver.withFrame('message_ifr', function() {
				driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});
				driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
				driver.sendKeys('#tinymce',data.content);
			});
			driver.mouse.move('a#fancy_attach_');
			driver.then(function() {
				driver.mouse.move('a#fancy_attach_');
				driver.click('a#fancy_attach_');
				driver.wait(2000,function(){
					driver.mouse.move('input#autoUploadAttachment');
					driver.click('input#autoUploadAttachment');
					wait.waitForElement('ul[class="post-attachments"]', driver, function(err, isExists) {
						if(isExists) {
						driver.wait(7000,function(){
							driver.click('#post_submit');
							wait.waitForElement('div#posts-list', driver, function(err, isExists) {
								if(isExists) {
									driver.echo('New topic Created','INFO');
								}
							});
						});
						}
					});
				});
			});
		}
	});
	driver.then(function() {
		return callback(null);
	});
};

// method to select the user group on permission page
combinationOfSubCategoryAndGroupPermissionsMethod.selectUserGroup = function(data, driver, callback) {
var group = data;
	var groupId = driver.evaluate(function(group) {
		var totalGroup = document.querySelectorAll('select#list_usergroup option');
	   	for(var i=1; i<=(totalGroup.length); i++) {
			var groupText = document.querySelector('select#list_usergroup option:nth-child('+i+')');
			if (groupText.innerText == group) {
				var groupValue = document.querySelector('select#list_usergroup option:nth-child('+i+')').getAttribute('value');
				return groupValue;
			}
		}
	},group);
	driver.echo('the option value of group'+groupId,'INFO');
	driver.then(function() {
		driver.test.assertExists('#list_usergroup');
		driver.click('#list_usergroup');
		driver.sendKeys('#list_usergroup',group);
		driver.wait(2000, function() {
			return callback(null,groupId);
		});
	});
};

//method to set the user's group to custom user group-> New Custom Group
combinationOfSubCategoryAndGroupPermissionsMethod.changeGroup = function(data, driver, callback) {
	var user = data.username;
	wait.waitForElement('form#frmChangeUsersGroup', driver, function(err, isExists) {
		if(isExists) {
			driver.fill('form#frmChangeUsersGroup', {
				'member' : user
			}, true);
			wait.waitForElement('form[name="ugfrm"]',  driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('form#frmChangeUsersGroupFinal', 'Found form');
					driver.fillLabels('form#frmChangeUsersGroupFinal', {
						'New Custom Group' : 'checked',
						'Registered Users' : ''
					}, true);
					wait.waitForTime(2000, casper, function(err) {
					});
				} else {
					driver.echo('Administration checkbox not found','ERROR');
				}
			});
		} else{
			driver.echo('Change user group permission not found','ERROR');
		}
	});
};

// method to create a custom group
combinationOfSubCategoryAndGroupPermissionsMethod.createCustomGroup = function(data, driver, callback) {
	var groupName = data;
	driver.test.assertExists('a[href="/tool/members/mb/usergroup?action=edit"]','New User Group button found','INFO');
	driver.click('a[href="/tool/members/mb/usergroup?action=edit"]');
	wait.waitForElement('input[name="title"]', driver, function(err, isExists) {
		if(isExists) {
			driver.sendKeys('input[name="title"]', data, {reset:true});
			casper.test.assertExists('button.button.btn-m.btn-blue');
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
				if(isExists) {
					var messageText = casper.fetchText('font[color="red"]');
					var successMsg = "The user group has been created.";
					var failureMsg = "Error: You alredy have a user group with the same title. Please choose a different title.";
					if(messageText == successMsg) {
						casper.echo("Group Created",'INFO');
						return callback(null);
					} else if(messageText == failureMsg) {
						casper.echo("Group already Created",'INFO');
						return callback(null);
					} else {
						casper.echo("Group not Created",'ERROR');
						return callback(null);
					}
				}
			});
		}
	});
};

//method to set the user's group to custom user group-> New Custom Group
combinationOfSubCategoryAndGroupPermissionsMethod.changeGroupToPendingApproval = function(data, driver, callback) {
	var user = data.username;
	wait.waitForElement('form#frmChangeUsersGroup', driver, function(err, isExists) {
		if(isExists) {
			driver.fill('form#frmChangeUsersGroup', {
				'member' : user
			}, true);
			wait.waitForElement('form[name="ugfrm"]',  driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('form#frmChangeUsersGroupFinal', 'Found form');
					driver.fillLabels('form#frmChangeUsersGroupFinal', {
						'Pending Approval' : 'checked',
						'Registered Users' : ''
					}, true);
					wait.waitForTime(2000, casper, function(err) {
					});
				} else {
					driver.echo('Administration checkbox not found','ERROR');
				}
			});
		} else{
			driver.echo('Change user group permission not found','ERROR');
		}
	});
};

// method to delete a sub category
combinationOfSubCategoryAndGroupPermissionsMethod.deleteSubCategory = function(id, driver, callback) {
	casper.mouse.move('li[id="'+id+'"] div.select');
	casper.click('li[id="'+id+'"] a.manageAction span'); // click on manage of cat1
	wait.waitForTime(2000,casper, function(err) {
		if(!err) {
		}
	});
	casper.click('div[id="forumAction'+id+'"] a:nth-child(2)'); // click on delete of manage tab
	wait.waitForElement('input#remove_forum', casper, function(err, isExists) {
		if(isExists) {
			casper.click('input#remove_forum');
			wait.waitForElement('div.heading.error_message', casper, function(err, isExists) {
				if(isExists) {
					var message = casper.fetchText('div.heading.error_message');
					var expectedMsg = "The category has been deleted.";
					if(message == expectedMsg) {
						casper.echo("Category Deleted",'INFO');
						return callback(null);
					} else {
						casper.echo("Category not Deleted",'INFO');
						return callback(null);
					}
				}
			});
		}
	});
};

combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds = function(category, subCategory, casper, callback) {
	combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
		if(!err) {
			combinationOfSubCategoryAndGroupPermissionsMethod.getIdOfCategory(category, casper, function(err, categoryId) {
				if(!err) {
					combinationOfSubCategoryAndGroupPermissionsMethod.getIdOfSubCategory(subCategory, casper, function(err, subCategoryId) {
						if(!err) {
							return callback(null, categoryId, subCategoryId);
						}
				});

				}
			});

		}
	});
};

combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup = function(userGroup, subCategory_Id, casper, callback) {
	combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermission(subCategory_Id, casper, function(err) {
		if(!err) {
			combinationOfSubCategoryAndGroupPermissionsMethod.selectUserGroup(userGroup, casper, function(err,groupId) {
				if(!err) {
					return callback(null, groupId);
				}
			});
		}
	});
};
