/***These are the function which has been called in combinationOfSubCategoryAndGroupPermissions.js and also will be used in other js file as per requirement**********/

"use strict.";

var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var combinationOfSubCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfSubCategoryAndGroupPermissionsData.json');
var categoryId;
var subCategoryId;
var combinationOfSubCategoryAndGroupPermissionsMethod = module.exports = {};

//*************************************************PRIVATE METHODS***********************************************

// method to goto custom usergroup(New Custom Group) permission
combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions = function() {
	casper.waitForSelector('div#tab_wrapper',function() {
		var id = this.evaluate(function() {
			var rowCount = document.querySelectorAll('table.text.fullborder tr');
			for(var i=1; i<=rowCount.length; i++) {
				var group = document.querySelector('table:nth-last-of-type(1) tbody tr:nth-child('+i+') td:nth-last-of-type(3)');
				if (group.innerText == 'New Custom Group') {
					document.querySelector('table:nth-last-of-type(1) tbody tr:nth-child('+i+') td:nth-child(3) a').click();
					var id = document.querySelector('table:nth-last-of-type(1) tbody tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
					return id;
				}
			}
		});
		casper.click('a[id="'+id+'"]');
	});
};

//*************************Method to create a Sub Category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory = function(data) {
	casper.test.assertExists('a#addForumButton', 'Add category tab found');
	casper.click('a#addForumButton');
	casper.waitForSelector('form#edit_forum_form', function() {
		casper.sendKeys('input[name="forum_name"]', data.title, {reset:true});
		casper.sendKeys('textarea[name="forum_description"]', data.description, {reset:true});
		utils.enableorDisableCheckbox('isSubcategory', true);
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
			}, false);
			casper.test.assertExists('button.button.btn-m.btn-blue', 'Save button found');
			casper.click('button.button.btn-m.btn-blue');
			casper.waitForText('The category has been created.');
		});
	});
};

//*************************Method to get the id of sub category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.getIdOfSubCategory = function(data, callback) {
	var title = data.title;
	casper.waitForSelector('a#addForumButton', function() {
		subCategoryId = casper.evaluate(function(title) {
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
		utils.info('The id of the subcategory ='+subCategoryId);
		return callback(null, subCategoryId);
	});
};

// method to check cat1a is already exists or not
combinationOfSubCategoryAndGroupPermissionsMethod.isSubCategoryExists = function(data, callback) {
	var title = data.title;
	casper.test.assertExists('div#sortable ul li', 'Category present');
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

// method to select the user group on permission page of category setting
combinationOfSubCategoryAndGroupPermissionsMethod.selectUserGroup = function(data, callback) {
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
	utils.info('The option value of group'+groupId);
	casper.then(function() {
		casper.test.assertExists('#list_usergroup', '#list_usergroup');
		casper.click('#list_usergroup');
		casper.sendKeys('#list_usergroup',group);
	}).wait('2000', function() {
		return callback(null,groupId);
	});
};

// method to create a custom group
combinationOfSubCategoryAndGroupPermissionsMethod.createCustomGroup = function(data) {
	var groupName = data;
	casper.test.assertExists('a[href="/tool/members/mb/usergroup?action=edit"]', ' New User Group button found');
	casper.click('a[href="/tool/members/mb/usergroup?action=edit"]');
	casper.waitForSelector('input[name="title"]', function() {
		this.sendKeys('input[name="title"]', data, {reset:true});
		this.test.assertExists('button.button.btn-m.btn-blue', ' Save button found');
		this.click('button.button.btn-m.btn-blue');
	}).waitForSelector('font[color="red"]', function() {
		var messageText = this.fetchText('font[color="red"]');
		var successMsg = "The user group has been created.";
		var failureMsg = "Error: You alredy have a user group with the same title. Please choose a different title.";
		if(messageText == successMsg) {
			utils.info(" Group Created");
		} else if(messageText == failureMsg) {
			utils.info(" Group already Created");
		} else {
			utils.error(" Group not Created");
		}
	});
};

// method to delete a sub category
combinationOfSubCategoryAndGroupPermissionsMethod.deleteSubCategory = function(id) {
	casper.mouse.move('li[id="'+id+'"] div.select');
	casper.click('li[id="'+id+'"] a.manageAction span'); // click on manage of cat1
	casper.wait('2000',function() {
		this.click('div[id="forumAction'+id+'"] a:nth-child(2)'); // click on delete of manage tab
	}).waitForSelector('input#remove_forum', function() {
		this.click('input#remove_forum');
	}).waitForSelector('div.heading.error_message', function() {
		var message = this.fetchText('div.heading.error_message');
		var expectedMsg = "The category has been deleted.";
		if(message == expectedMsg) {
			utils.info("Category Deleted");
		} else {
			utils.error("Category not Deleted");
		}
	});
};

combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds = function(category, subCategory, callback) {
	backEndForumRegisterMethod.goToCategoryPage();
	casper.then(function() {
		backEndForumRegisterMethod.getIdOfCategory(category, function(err, categoryId) {
			if(!err) {
				combinationOfSubCategoryAndGroupPermissionsMethod.getIdOfSubCategory(subCategory, function(err, subCategoryId) {
					if(!err) {
						return callback(null, categoryId, subCategoryId);
					}
				});
			}
		});
	});
};

combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup = function(userGroup, subCategory_Id, callback) {
	backEndForumRegisterMethod.goToCategoryPermission(subCategory_Id);
	casper.then(function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.selectUserGroup(userGroup, function(err,groupId) {
			if(!err) {
				return callback(null, groupId);
			}
		});
	});
};

//method to assign login details of userGroup
combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails = function(userGroup) {
	var loginUserName = "";
	var loginPassWord = "";
	if(userGroup =='General') {
		loginUserName = combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username;
		loginPassWord = combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password;
	}
	if(userGroup =='Pending Approval') {
		loginUserName = combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username;
		loginPassWord = combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password;
	}
	if(userGroup =='Pending Email Verification') {
		loginUserName = combinationOfSubCategoryAndGroupPermissionsJSON.emailVerificationUserLogin.username;
		loginPassWord = combinationOfSubCategoryAndGroupPermissionsJSON.emailVerificationUserLogin.password;
	}
	if(userGroup =='Moderators') {
		loginUserName = combinationOfSubCategoryAndGroupPermissionsJSON.moderatorsLogin.username;
		loginPassWord = combinationOfSubCategoryAndGroupPermissionsJSON.moderatorsLogin.password;
	}
	if(userGroup =='New Custom Group') {
		loginUserName = combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username;
		loginPassWord = combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password;
	}
  casper.then(function() {
    forumLoginMethod.loginToApp(loginUserName, loginPassWord);
  });
};
