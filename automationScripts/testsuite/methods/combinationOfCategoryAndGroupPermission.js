/***These are the function which has been called in combinationOfCategoryAndGroupPermission.js and also will be used in other js file as per requirement**********/

"use strict.";

var utils = require('../utils.js');
var wait = require('../wait.js');
var combinationOfCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfCategoryAndGroupPermission.json');
var forumLoginMethod = require('../methods/login.js');
var categoryId;
var subCategoryId;
var combinationOfCategoryAndGroupPermissionsMethod = module.exports = {};

//*************************************************PRIVATE METHODS***********************************************

// Method to go to Default user group page
combinationOfCategoryAndGroupPermissionsMethod.goToUserGroup = function(callback) {
	casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('ddUsers found', 'INFO'));
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
							utils.log('Table not found', 'ERROR');
						}
					});
				} else {
					utils.log('Calendar Permissions tab not found', 'ERROR');
				}
			});
		} else {
			utils.log('Content  tooltip menu not found', 'ERROR');
		}
	});
};

// method to goto user permission
combinationOfCategoryAndGroupPermissionsMethod.goToUserPemission = function(userGroup, callback) {
	var id = casper.evaluate(function(userGroup){
		for(var i=1; i<=7; i++) {
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
combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission = function(userGroup, callback) {
	combinationOfCategoryAndGroupPermissionsMethod.goToUserGroup(function(err) {
		if(!err) {
			combinationOfCategoryAndGroupPermissionsMethod.goToUserPemission(userGroup, function(err) {
				if(!err) {
					return callback(null);
				}
			});
		}
	});
};

// method to goto custom usergroup(New Custom Group) permission
combinationOfCategoryAndGroupPermissionsMethod.goToCustomUserPemission = function(callback) {
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
	wait.waitForElement('input#view_forum', function(err, isExists) {
		if(isExists) {
			return callback(null);
		}
	});
};

//*************************Method to enable View forum for User Group from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableViewforum = function(callback) {
	casper.test.assertExists('input#view_messageboard', utils.log('enable viewforum checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('view_messageboard', true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable View category for User Group from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableViewCategory = function(callback) {
	casper.test.assertExists('input#view_forum', utils.log('View category checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('view_forum', true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to disable View category for User Group from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableViewCategory = function(callback) {
	casper.test.assertExists('input#view_forum', utils.log('View category checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('view_forum', false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Start Topics for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableStartTopics = function(callback) {
	casper.test.assertExists('input#post_threads', utils.log('New Topic checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('post_threads', true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Start Topics for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableStartTopics = function(callback) {
	casper.test.assertExists('input#post_threads', utils.log('New Topic checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('post_threads', false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Reply Topics for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableReplyTopics = function(callback) {
	casper.test.assertExists('input#other_post_replies', utils.log('Reply topic checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('other_post_replies', true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to disable Reply Topics for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopics = function(callback) {
	casper.test.assertExists('input#other_post_replies', utils.log('Reply topic checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('other_post_replies', false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Upload Attachments for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableUploadAttachments = function(callback) {
	casper.test.assertExists('input#upload_attachments', utils.log('Upload attachment checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('upload_attachments', true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable View Attachments for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableViewAttachments = function(callback) {
	casper.test.assertExists('input#view_attachments', utils.log('View attachment found', 'INFO'));
	utils.enableorDisableCheckbox('view_attachments', true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to enable Require Post Approval for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableRequirePostApproval = function(callback) {
	casper.test.assertExists('input#post_approval', utils.log('Require post approval checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('post_approval', true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to disable Require Post Approval for registered User from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableRequirePostApproval = function(callback) {
	casper.test.assertExists('input#post_approval', utils.log('Require post approval checkbox found', 'INFO'));
	utils.enableorDisableCheckbox('post_approval', false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
	casper.click('button.button.btn-m.btn-blue');
	wait.waitForElement('font[color="red"]', function(err, isExists) {
		if(isExists) {
			utils.log("Permission changed",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to create a category from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.createCategory = function(data, callback) {
	casper.test.assertExists('a#addForumButton', utils.log('Add category tab found', 'INFO'));
	casper.click('a#addForumButton');
	wait.waitForElement('form#edit_forum_form', function(err, isExists) {
		if(isExists) {
			casper.sendKeys('input[name="forum_name"]', data.title, {reset:true});
			casper.sendKeys('textarea[name="forum_description"]', data.description, {reset:true});
			casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
			casper.click('button.button.btn-m.btn-blue');
			casper.waitUntilVisible('div#loading_msg', function success() {
				utils.log(casper.fetchText('div#loading_msg'),'INFO');
				utils.log("Category created",'INFO');
				return callback(null);
			}, function fail() {
				utils.log('Category not created', 'ERROR');
				utils.log('Loading... not found', 'ERROR');
				return callback(null);
			});
		} else {
			utils.log('Form not found', 'ERROR');
		}
	});
};

//*************************Method to create a Sub Category from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.createSubCategory = function(data, callback) {
	casper.test.assertExists('a#addForumButton', utils.log('Add category tab found', 'INFO'));
	casper.click('a#addForumButton');
	wait.waitForElement('form#edit_forum_form', function(err, isExists) {
		if(isExists) {
			casper.sendKeys('input[name="forum_name"]', data.title, {reset:true});
			casper.sendKeys('textarea[name="forum_description"]', data.description, {reset:true});
			utils.enableorDisableCheckbox('isSubcategory', true, function(err) {
				if(!err) {
					utils.log('checkbox is checked', 'INFO');
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
				casper.fillSelectors('div#parentOpt', {
					'select[name="parentid"]': catId
				}, true);
				casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
				casper.click('button.button.btn-m.btn-blue');
				casper.waitUntilVisible('div.heading.error_message', function success() {
					utils.log(casper.fetchText('div.heading.error_message'),'INFO');
					utils.log("Sub Category created",'INFO');
					return callback(null);
				}, function fail() {
					utils.log('Sub Category not created', 'ERROR');
					return callback(null);
				});
			});
		} else {
			utils.log('Form not found', 'ERROR');
		}
	});
};

//*************************Method to get the id of Category and sub category from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.getIdOfCategory = function(data, callback) {
	var title = data.title;
	wait.waitForElement('a#addForumButton', function(err, isExists) {
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
			utils.log('the id of the category ='+categoryId,'INFO');
			return callback(null, categoryId);
		} else {
			utils.log('Calendar Permissions tab not found', 'ERROR');
		}
	});
};

//*************************Method to get the id of sub category from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.getIdOfSubCategory = function(data, callback) {
	var title = data.title;
	wait.waitForElement('a#addForumButton', function(err, isExists) {
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
			utils.log('the id of the subcategory ='+subCategoryId,'INFO');
			return callback(null, subCategoryId);
		} else {
			utils.log('Calendar Permissions tab not found', 'ERROR');
		}
	});
};

//*************************Method to goto the permission of Sub Category from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermission = function(id, callback) {
	casper.mouse.move('li[id="'+id+'"] div.select');
	casper.click('li[id="'+id+'"] a.manageAction span'); // click on manage of cat1
	wait.waitForTime(2000,function(err) {
		if(!err) {
		}
	});
	casper.click('div[id="forumAction'+id+'"] a.change_perm'); // click on change permission
	wait.waitForElement('span#inheritance', function(err, isExists) {
		if(isExists) {
			utils.log("Change Permission Page opened",'INFO');
			return callback(null);
		}
	});
};

//*************************Method to change permission of Sub Category for View Category from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory = function(group, callback) {
	var id = 'view_forum_'+group;
	utils.enableorDisableCheckbox(id, true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for View Category(disable) from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory = function(group, callback) {
	var id = 'view_forum_'+group;
	utils.enableorDisableCheckbox(id, false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Start topics from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory = function(group, callback) {
	var id = 'post_threads_'+group;
	utils.enableorDisableCheckbox(id, true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Start topics(disable) from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory = function(group, callback) {
	var id = 'post_threads_'+group;
	utils.enableorDisableCheckbox(id, false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Reply Topics from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory = function(group, callback) {
	var id = 'other_post_replies_'+group;
	utils.enableorDisableCheckbox(id, true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Reply Topics(disable) from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory = function(group, callback) {
	var id = 'other_post_replies_'+group;
	utils.enableorDisableCheckbox(id, false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Upload Attachments from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableUploadAttachmentsForSubCategory = function(group, callback) {
	var id = 'upload_attachments_'+group;
	utils.enableorDisableCheckbox(id, true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Upload Attachments(disable) from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableUploadAttachmentsForSubCategory = function(group, callback) {
	var id = 'upload_attachments_'+group;
	utils.enableorDisableCheckbox(id, false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for View Attachments from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enableViewAttachmentsForSubCategory = function(group, callback) {
	var id = 'view_attachments_'+group;
	utils.enableorDisableCheckbox(id, true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for View Attachments(disable) from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disableViewAttachmentsForSubCategory = function(group, callback) {
	var id = 'view_attachments_'+group;
	utils.enableorDisableCheckbox(id, false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Require Post Approval from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory = function(group, callback) {
	var id = 'post_approval_'+group;
	utils.enableorDisableCheckbox(id, true, function(err) {
		if(!err) {
			utils.log('checkbox is checked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to change permission of Sub Category for Require Post Approval(disable) from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory = function(group, callback) {
	var id = 'post_approval_'+group;
	utils.enableorDisableCheckbox(id, false, function(err) {
		if(!err) {
			utils.log('checkbox is unchecked', 'INFO');
		}
	});
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.log(casper.fetchText('div#loading_msg'),'INFO');
		return callback(null);
	}, function fail() {
		utils.log('Loading... not found', 'ERROR');
		return callback(null);
	},10000);
};

//*************************Method to enable Private Categories from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.enablePrivateCategories = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', utils.log('Setting tab found', 'INFO'));
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(1)');
							wait.waitForElement('#show_private_forums', function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('show_private_forums', true, function(err) {
										if(!err) {
											utils.log('checkbox is checked', 'INFO');
										}
									});
									casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
									casper.click('button.button.btn-m.btn-blue');
									casper.waitUntilVisible('div#ajax-msg-top', function success() {
										utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
									}, function fail() {
										utils.log('Saved not found', 'ERROR');
									},30000);
								}
							});
						} else {
							utils.log('Content  tooltip menu not found', 'ERROR');
						}
					});
					casper.then(function() {
						casper.click('a[data-tooltip-elm="ddAccount"]');
						forumLoginMethod.backEndLogout(function(err) {
							if(!err) {
								return callback(null);
							}
						});
					});
				} else {
					utils.log('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			utils.log('Error : ', 'ERROR');
		}
	});
};

//*************************Method to disable Private Categories from backend ************************
combinationOfCategoryAndGroupPermissionsMethod.disablePrivateCategories = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', utils.log('Setting tab found', 'INFO'));
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(1)');
							wait.waitForElement('#show_private_forums', function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('show_private_forums', false, function(err) {
										if(!err) {
											utils.log('checkbox is unchecked', 'INFO');
										}
									});
									casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
									casper.click('button.button.btn-m.btn-blue');
									casper.waitUntilVisible('div#ajax-msg-top', function success() {
										utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
									}, function fail() {
										utils.log('Saved not found', 'ERROR');
									},30000);
								}
							});
						} else {
							utils.log('Content  tooltip menu not found', 'ERROR');
						}
					});
					casper.then(function() {
						casper.click('a[data-tooltip-elm="ddAccount"]');
						forumLoginMethod.backEndLogout(function(err) {
							if(!err) {
								return callback(null);
							}
						});
					});
				} else {
					utils.log('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			utils.log('Error : ', 'ERROR');
		}
	});
};

// method to goto category page from backend
combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPage = function(callback) {
	casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]', utils.log('Content tab found', 'INFO'));
	casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	wait.waitForElement('div#ddContent', function(err, isExists) {
		if(isExists) {
			casper.click('div#ddContent a:nth-child(1)');
			wait.waitForElement('a#addForumButton', function(err, isExists) {
				if(isExists) {
					utils.log('Category page opened', 'INFO');
					return callback(null);
				} else {
					utils.log('Category page not opened', 'ERROR');
					return callback(null);
				}
			});
		} else {
			utils.log('Content  tooltip menu not found', 'ERROR');
		}
	});
};

// method to check cat1 is already exists or not
combinationOfCategoryAndGroupPermissionsMethod.isCategoryExists = function(data, callback) {
	var title = data.title;
	casper.test.assertExists('div#sortable ul li', utils.log('Category present', 'INFO'));
	var isCatExists = casper.evaluate(function(title) {
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
combinationOfCategoryAndGroupPermissionsMethod.isSubCategoryExists = function(data, callback) {
	var title = data.title;
	casper.test.assertExists('div#sortable ul li', utils.log('Category present', 'INFO'));
	var isSubCatExists = casper.evaluate(function(title) {
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

// method to New Topic with attachment
combinationOfCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic = function(data, callback) {
	casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
	wait.waitForElement('div.post-body.pull-left', function(err, isExists) {
		if(isExists) {
			casper.sendKeys('input[name="subject"]', data.title, {reset:true});
			casper.withFrame('message_ifr', function() {
				casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				casper.sendKeys('#tinymce',data.content);
			});
			casper.mouse.move('a#fancy_attach_');
			casper.then(function() {
				casper.mouse.move('a#fancy_attach_');
				casper.click('a#fancy_attach_');
				casper.wait(2000,function(){
					casper.mouse.move('input#autoUploadAttachment');
					casper.click('input#autoUploadAttachment');
					wait.waitForElement('ul[class="post-attachments"]', function(err, isExists) {
						if(isExists) {
						casper.wait(7000,function(){
							casper.click('#post_submit');
							wait.waitForElement('div#posts-list', function(err, isExists) {
								if(isExists) {
									utils.log('New topic Created','INFO');
								}
							});
						});
						}
					});
				});
			});
		}
	});
	casper.then(function() {
		return callback(null);
	});
};

// method to select the user group on permission page
combinationOfCategoryAndGroupPermissionsMethod.selectUserGroup = function(data, callback) {
var group = data;
	var groupId = casper.evaluate(function(group) {
		var totalGroup = document.querySelectorAll('select#list_usergroup option');
	   	for(var i=1; i<=(totalGroup.length); i++) {
			var groupText = document.querySelector('select#list_usergroup option:nth-child('+i+')');
			if (groupText.innerText == group) {
				var groupValue = document.querySelector('select#list_usergroup option:nth-child('+i+')').getAttribute('value');
				return groupValue;
			}
		}
	},group);
	utils.log('the option value of group'+groupId,'INFO');
	casper.then(function() {
		casper.test.assertExists('#list_usergroup', utils.log('#list_usergroup', 'INFO'));
		casper.click('#list_usergroup');
		casper.sendKeys('#list_usergroup',group);
		casper.wait(2000, function() {
			return callback(null,groupId);
		});
	});
};

//method to set the user's group to custom user group-> New Custom Group
combinationOfCategoryAndGroupPermissionsMethod.changeGroup = function(data, callback) {
	var user = data.username;
	wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
		if(isExists) {
			casper.fill('form#frmChangeUsersGroup', {
				'member' : user
			}, true);
			wait.waitForElement('form[name="ugfrm"]',  function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('form#frmChangeUsersGroupFinal', utils.log('Found form', 'INFO'));
					casper.fillLabels('form#frmChangeUsersGroupFinal', {
						'New Custom Group' : 'checked',
						'Registered Users' : ''
					}, true);
					wait.waitForTime(2000, function(err) {
					});
				} else {
					utils.log('Administration checkbox not found','ERROR');
				}
			});
		} else{
			utils.log('Change user group permission not found','ERROR');
		}
	});
};

// method to create a custom group
combinationOfCategoryAndGroupPermissionsMethod.createCustomGroup = function(data, callback) {
	var groupName = data;
	casper.test.assertExists('a[href="/tool/members/mb/usergroup?action=edit"]', utils.log('New User Group button found', 'INFO'));
	casper.click('a[href="/tool/members/mb/usergroup?action=edit"]');
	wait.waitForElement('input[name="title"]', function(err, isExists) {
		if(isExists) {
			casper.sendKeys('input[name="title"]', data, {reset:true});
			casper.test.assertExists('button.button.btn-m.btn-blue', utils.log('Save button found', 'INFO'));
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForElement('font[color="red"]', function(err, isExists) {
				if(isExists) {
					var messageText = casper.fetchText('font[color="red"]');
					var successMsg = "The user group has been created.";
					var failureMsg = "Error: You alredy have a user group with the same title. Please choose a different title.";
					if(messageText == successMsg) {
						utils.log("Group Created",'INFO');
						return callback(null);
					} else if(messageText == failureMsg) {
						utils.log("Group already Created",'INFO');
						return callback(null);
					} else {
						utils.log("Group not Created",'ERROR');
						return callback(null);
					}
				}
			});
		}
	});
};

//method to set the user's group to custom user group-> New Custom Group
combinationOfCategoryAndGroupPermissionsMethod.changeGroupToPendingApproval = function(data, callback) {
	var user = data.username;
	wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
		if(isExists) {
			casper.fill('form#frmChangeUsersGroup', {
				'member' : user
			}, true);
			wait.waitForElement('form[name="ugfrm"]',  function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('form#frmChangeUsersGroupFinal', utils.log('Found form', 'INFO'));
					casper.fillLabels('form#frmChangeUsersGroupFinal', {
						'Pending Approval' : 'checked',
						'Registered Users' : ''
					}, true);
					wait.waitForTime(2000, function(err) {
					});
				} else {
					utils.log('Administration checkbox not found','ERROR');
				}
			});
		} else{
			utils.log('Change user group permission not found','ERROR');
		}
	});
};

// method to delete a sub category
combinationOfCategoryAndGroupPermissionsMethod.deleteSubCategory = function(id, callback) {
	casper.mouse.move('li[id="'+id+'"] div.select');
	casper.click('li[id="'+id+'"] a.manageAction span'); // click on manage of cat1
	wait.waitForTime(2000,function(err) {
		if(!err) {
		}
	});
	casper.click('div[id="forumAction'+id+'"] a:nth-child(2)'); // click on delete of manage tab
	wait.waitForElement('input#remove_forum', function(err, isExists) {
		if(isExists) {
			casper.click('input#remove_forum');
			wait.waitForElement('div.heading.error_message', function(err, isExists) {
				if(isExists) {
					var message = casper.fetchText('div.heading.error_message');
					var expectedMsg = "The category has been deleted.";
					if(message == expectedMsg) {
						utils.log("Category Deleted",'INFO');
						return callback(null);
					} else {
						utils.log("Category not Deleted",'INFO');
						return callback(null);
					}
				}
			});
		}
	});
};

combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds = function(category, subCategory, callback) {
	combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPage(function(err) {
		if(!err) {
			combinationOfCategoryAndGroupPermissionsMethod.getIdOfCategory(category, function(err, categoryId) {
				if(!err) {
					combinationOfCategoryAndGroupPermissionsMethod.getIdOfSubCategory(subCategory, function(err, subCategoryId) {
						if(!err) {
							return callback(null, categoryId, subCategoryId);
						}
				});

				}
			});
		}
	});
};

combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup = function(userGroup, subCategory_Id, callback) {
	combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermission(subCategory_Id, function(err) {
		if(!err) {
			combinationOfCategoryAndGroupPermissionsMethod.selectUserGroup(userGroup, function(err,groupId) {
				if(!err) {
					return callback(null, groupId);
				}
			});
		}
	});
};

//method to assign login details of userGroup
combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails = function(userGroup, callback) {
	var loginUserName = "";
	var loginPassWord = "";
	if(userGroup =='Registered Users'){
		loginUserName = combinationOfCategoryAndGroupPermissionsJSON.registeredUserLogin.username;
		loginPassWord = combinationOfCategoryAndGroupPermissionsJSON.registeredUserLogin.password;
		return callback(null, loginUserName, loginPassWord);
	}
	if(userGroup =='Pending Approval'){
		loginUserName = combinationOfCategoryAndGroupPermissionsJSON.pendingUserLogin.username;
		loginPassWord = combinationOfCategoryAndGroupPermissionsJSON.pendingUserLogin.password;
		return callback(null, loginUserName, loginPassWord);
	}
	if(userGroup =='Moderators'){
		loginUserName = combinationOfCategoryAndGroupPermissionsJSON.registeredUserLogin.username;
		loginPassWord = combinationOfCategoryAndGroupPermissionsJSON.registeredUserLogin.password;
		return callback(null, loginUserName, loginPassWord);
	}
	if(userGroup =='Pending Email Verification'){
		loginUserName = combinationOfCategoryAndGroupPermissionsJSON.registeredUserLogin.username;
		loginPassWord = combinationOfCategoryAndGroupPermissionsJSON.registeredUserLogin.password;
		return callback(null, loginUserName, loginPassWord);
	}
};
