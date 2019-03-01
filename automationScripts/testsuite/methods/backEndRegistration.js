/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict.';
var backEndForumRegisterMethod = module.exports = {};
var utils = require('../utils.js');

//Method For Filling Data In New User Form
backEndForumRegisterMethod.addUser = function(userInfo) {
	casper.waitForSelector('form[name="frmAddUser"]',function() {
		this.fill('form[name="frmAddUser"]', {
			'member' : userInfo.uname,
			'pw' : userInfo.upass,
			'email' : userInfo.uemail,
			'note' : userInfo.pNote
		}, false);
		this.click('form[name="frmAddUser"] button');
	});
};

//Method For Filling Data In Invite User Form
backEndForumRegisterMethod.inviteUser = function(userInfo) {
	casper.waitForSelector('form[name="frmInviteUser"]',function() {
		this.fill('form#frmInviteUser', {
			'emails' : userInfo,
			'note' : 'This is my personal note with valid inviation..'
		}, false);
		this.click('form[name="frmInviteUser"] button');
	});
};

backEndForumRegisterMethod.changeDefaultRegistrationOptions = function(info) {
	casper.waitForSelector('div#defaultRegistrationOptions form',function(){
		this.fillSelectors('div#defaultRegistrationOptions form', {
			'input[name="required_name"]' : info.fullName,
			'input[name="required_imType"]' : info.instantMessaging,
			'input[name="required_dob"]' : info.birthday,
			'input[name="required_signature"]' : info.signature,
			'input[name="required_avatar"]' : info.avatar,
			'input[name="visiblity_name_registration"]' : info.visiblity_name_registration,
			'input[name="visiblity_imType_registration"]' : info.visiblity_imType_registration,
			'input[name="visiblity_dob_registration"]' : info.visiblity_dob_registration,
			'input[name="visiblity_signature_registration"]' : info.visiblity_signature_registration,
			'input[name="visiblity_avatar_registration"]' : info.visiblity_avatar_registration,
			//required on settings page
			'input[name="visiblity_signature_settings"]':info.visiblity_signature_settings,
			'input[name="visiblity_dob_settings"]':info.visiblity_dob_settings,
			'input[name="visiblity_name_settings"]':info.visiblity_name_settings
		}, true);
	}).waitForText('Your profile fields have been updated.');
};

//Method For Filling Data In Paid Access Form
backEndForumRegisterMethod.setPaidAccess = function(info) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.fill('form#frmForumSettings',{
			'paypal_email_address' : info.email,
			'paid_access_donation' : info.donation
		},false);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableQuoteIcon = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#display_icons');
		utils.enableorDisableCheckbox('display_icons', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableCalender = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#enable_calendar');
		utils.enableorDisableCheckbox('enable_calendar', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableLikesReputation = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#reputation');
		utils.enableorDisableCheckbox('reputation', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableUserAccounts = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#REQreg');
		utils.enableorDisableCheckbox('REQreg', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisablePolls = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#aEMS');
		utils.enableorDisableCheckbox('aEMS', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisablePollsGeneralPage = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#enable_polls');
		utils.enableorDisableCheckbox('enable_polls', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      			utils.info(' Saved....');
    		}else{
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableMessages = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#allow_pm');
		utils.enableorDisableCheckbox('allow_pm', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableAttachments = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#FU');
		utils.enableorDisableCheckbox('FU', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

//Method For Set Privacy Option
backEndForumRegisterMethod.setPrivacy = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('select#privacy');
		this.fillSelectors('form[name="posts"]', {
			'select[name="privacy"]' : value
		});
		casper.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableApproveNewRegistrations = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#reqregapp');
		utils.enableorDisableCheckbox('reqregapp', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableNewRegistrations = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('#new_user_registration');
		utils.enableorDisableCheckbox('new_user_registration', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.setApproveNewPost = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('select#post_approval');
		this.fillSelectors('form[name="posts"]', {
			'select[name="post_approval"]' : value
		});
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableFacebookConnect = function(value, data) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#facebook_connect');
		utils.enableorDisableCheckbox('facebook_connect', value);
		if(value === 'true') {
			casper.waitForSelector('input#facebook_app_id', function() {
				this.sendKeys('#facebook_app_id', data[config.backendCred.uname].appId);
			});
		}
	}).then(function() {
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.addField=function(permission, value){
	casper.then(function(){
		this.sendKeys('input[name="fieldname"]', 'hell');
		utils.enableorDisableCheckbox(permission, value);
	}).then(function(){
		this.click('button.button.btn-m.btn-blue');
	}).waitForText('hell');
};

backEndForumRegisterMethod.enableDisableEmailAddressVerification = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('#confirm_email');
		utils.enableorDisableCheckbox('confirm_email', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableUserToUserEmailing = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('input#aEMS');
		utils.enableorDisableCheckbox('aEMS', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.enableDisableHumanVerification = function(value) {
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('#captcha_registration');
		utils.enableorDisableCheckbox('captcha_registration', value);
		this.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Saved....');
    } else {
			utils.info(' Saved is not displayed.');
		}
	});
};

backEndForumRegisterMethod.viewGroupPermissions = function(userGroup) {
	casper.waitForSelector('div#tab_wrapper',function() {
		var id = this.evaluate(function(userGroup){
			var rowCount = document.querySelector('table.text.fullborder').rows.length;
			for(var i=1; i<=rowCount; i++) {
				var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (group.innerText == userGroup) {
					document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
					var id = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
					return id;
				}
			}
		}, userGroup);
		this.click('a[id="'+id+'"]');
	});
};

backEndForumRegisterMethod.editGroupPermissions = function(userGroup, permission, value) {
	casper.waitForSelector('input#view_forum', function() {
		this.test.assertTextExists(userGroup, 'Category Permissions contains : ' +userGroup+ ' : so identification done');
		utils.enableorDisableCheckbox(permission, value);
		this.click('button.button.btn-m.btn-blue');
	}).waitForText('Your user group settings have been updated.');
};

// method to change username format
backEndForumRegisterMethod.changeUserNameFormat = function(format) {

};

backEndForumRegisterMethod.viewUsers = function(userGroup) {
	casper.waitForSelector('div#tab_wrapper',function() {
		this.evaluate(function(userGroup){
			var rowCount = document.querySelector('table.text.fullborder').rows.length;
			for(var i=1; i<=rowCount; i++) {
				var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (group.innerText == userGroup) {
					document.querySelector('tr:nth-child('+i+') td:nth-child(2) a').click();
				}
			}
		}, userGroup);
	});
};

backEndForumRegisterMethod.editUserActions = function(userGroup, action, usersCount) {
	casper.waitForSelector('div#tab_wrapper', function() {
		this.test.assertTextExists(userGroup, 'User groups contains : ' +userGroup+ ' : so identification done');
		if(usersCount == 'all') {
			this.click('input[name="allbox"]');
		}else{
			this.click('#groupUsersList tr td input[name^="user_id"]');

		}
		this.then(function(){
			this.test.assertExists('div#floatingActionMenu');
			this.test.assertSelectorHasText('div#floatingActionMenu', 'Selected');
			if(action == 'Delete') {
				action = 'delete_members';
			}
			this.fillSelectors('form[name="dbfrm"]', {
				'select[name="action"]': action
			}, true);
			this.wait(2000, function(){});
		});
	});
};

//method to delete all the categories from backend
backEndForumRegisterMethod.deleteAllCategories = function() {
	casper.mouse.move('li div.select');
	casper.click('li a.manageAction span');
	casper.then(function(){
		var deletehref = this.evaluate(function() {
			var del	=document.querySelector('div.tooltipMenu.forumActionbutton a:nth-child(2)').getAttribute('href');
			return del;
		});
		if(deletehref.indexOf("show_delete_forum")!=-1) {
			this.click('div.tooltipMenu.forumActionbutton a:nth-child(2)');
			this.waitForSelector('input#remove_forum', function(){
				this.click('input#remove_forum');
				this.waitForSelectorTextChange('#sortable > ul > li:first-child > div:first-child > a.forumName', function() {});
			});
		} else {
			casper.then(function(){
				this.click('div.tooltipMenu.forumActionbutton a:nth-child(2)');
				this.waitForSelectorTextChange('#sortable > ul > li:first-child > div:first-child > a.forumName', function() {});
			});
		}
	});
};

// method to goto category page from backend
backEndForumRegisterMethod.goToCategoryPage = function() {
	casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	casper.waitForSelector('div#ddContent a[href="/tool/members/mb/forums"]', function() {
		this.test.assertSelectorHasText('#ddContent', 'Categories');
		this.evaluate(function() {
		  document.querySelector('div#ddContent a[href="/tool/members/mb/forums"]').click();
		});
	});
};

//*************************Method to create a category from backend ************************
backEndForumRegisterMethod.createCategory = function(data) {
	casper.test.assertExists('a#addForumButton', 'Add category tab found');
	casper.click('a#addForumButton');
	casper.waitForSelector('form#edit_forum_form', function() {
		this.sendKeys('input[name="forum_name"]', data.title, {reset:true});
		this.sendKeys('textarea[name="forum_description"]', data.description, {reset:true});
		this.test.assertExists('[aria-describedby="addedit_forum_dialog"] .ui-dialog-buttonpane .ui-state-default', 'Save button found');
		this.click('[aria-describedby="addedit_forum_dialog"] .ui-dialog-buttonpane .ui-state-default');
	}).waitUntilVisible('div#loading_msg', function success() {
		utils.info(casper.fetchText('div#loading_msg'));
		utils.info('Category created');
	}, function fail() {
		var title = data.title;
		try{
			casper.test.assertExists('div#sortable ul li', 'Category list present');
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
				utils.info('Category created');
			} else {
				utils.error('Category not created');
			}
		} catch (e) {
			utils.error('Category not created');
		}
	});
};


backEndForumRegisterMethod.createCategoryForumListing = function(data) {
	casper.test.assertExists('a#addForumButton', 'Add category tab found');
	casper.click('a#addForumButton');
	casper.waitForSelector('form#edit_forum_form', function() {
		this.fillSelectors('form#edit_forum_form', {
			'input[name="forum_name"]': data.title,
			'textarea[name="forum_description"]': data.description
		}).then(function() {
			this.evaluate(function() {
			  document.querySelector('button.button.btn-m.btn-blue').click();
			});
		});
	}).then(function(){
		utils.info('category created succesfully');
	});
};


// method to check cat1 is already exists or not
backEndForumRegisterMethod.isCategoryExists = function(data, callback) {
	var title = data.title;
	try{
		casper.test.assertExists('div#sortable ul li', 'Category list present');
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
	} catch (e) {
		return callback(null, false);
	}
};

//*************************Method to get the id of Category and sub category from backend ************************
backEndForumRegisterMethod.getIdOfCategory = function(data, callback) {
	var title = data.title;
	utils.info('value of title is'+title);
	casper.waitForSelector('a#addForumButton', function() {
		categoryId = this.evaluate(function(title) {
			var totalCat = document.querySelectorAll('div#wrapper li a.forumName.atree');
			for(var i=1; i<=totalCat.length; i++) {
				var cat = document.querySelector('div#wrapper li:nth-child('+i+') a.forumName.atree');
				if (cat.innerText == title) {
					var catId = document.querySelector("div#wrapper li:nth-child("+i+')').getAttribute('id');
					return catId;
				}
			}
		},title);
		utils.info('the id of the category ='+categoryId);
		return callback(null, categoryId);
	});
};

//Method to Add new moderarator
backEndForumRegisterMethod.addNewModerator = function(data, category) {
	casper.waitForSelector('a[href^="/tool/members/mb/moderators?action=new"]', function() {
		this.evaluate(function() {
		  document.querySelector('a[href^="/tool/members/mb/moderators?action=new"]').click();
		});
	}).waitUntilVisible('form#add_mod_form',function() {
		backEndForumRegisterMethod.getIdOfCategory(category, function(err, category_id){
			if(!err) {
				casper.sendKeys('input[name="user"]', data, {reset:true});
				casper.fillSelectors('form[name="posts"]', {
					'select[name="forum_id"]': category_id
				}, false);
				casper.test.assertExists('div.ui-dialog-buttonset button','Save button Found');
				casper.click('div.ui-dialog-buttonset button');
				casper.wait('2000', function(err) {
				});
			}
		});
	});
};

//Method to Remove last Moderator from first category  .
backEndForumRegisterMethod.removeModerator=function() {
	backEndForumRegisterMethod.goToCategoryPage();
	casper.waitForSelector('div#tab_wrapper',function() {
		this.test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
		this.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
		var firstLiId = this.evaluate(function() {
			document.querySelector("a.moderateAction").style.display = 'block';
			var id = document.querySelector('div#sortable ul.ui-sortable li:nth-child(1)').getAttribute('id');
			return id;
		});
		this.test.assertExists('a.moderateAction[data-forumid="'+firstLiId+'"]');
		this.click('a.moderateAction[data-forumid="'+firstLiId+'"]');
		this.test.assertExists('div#forumModerator'+firstLiId + ' a:last-child');
		this.click('div#forumModerator'+firstLiId + ' a:last-child');
	}).waitForSelector('a#remove_moderator',function () {
			this.test.assertExists('a#remove_moderator');
			this.click('a#remove_moderator');
	}).then(function() {
		if(this.exists('a#remove_mod_all')){
			this.click('a#remove_mod_all');
		}
	}).wait('2000', function(err) {
	});
};

//compose topic methods.
backEndForumRegisterMethod.setTopicsPerPage=function(value){
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('select#privacy');
		this.fillSelectors('form[name="posts"]', {
			'select[name="perpage"]' : value
		});
		casper.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      			utils.info(' Saved....');
    		}else{
			utils.info(' Saved is not displayed.');
		}
	});
};


backEndForumRegisterMethod.followUnfollow=function(value){

	casper.waitForSelector('input[name="subject"]',function() {
		utils.enableorDisableCheckbox('follow_thread', value);
	});
};


backEndForumRegisterMethod.pinUnpin=function(value){

	casper.waitForSelector('input[name="subject"]',function() {
		utils.enableorDisableCheckbox('Pin', value);
	});
};


backEndForumRegisterMethod.lockUnlock=function(value){

	casper.waitForSelector('input[name="subject"]',function() {
		utils.enableorDisableCheckbox('LCK', value);
	});
};

//method to goto display page from backend
backEndForumRegisterMethod.goToDisplayPage=function(){
  casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
	  this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	  this.click('a[href="/tool/members/mb/settings?tab=Display"]');
  }).waitForText('Moderators');
};

//*************************Method to enable and disable Private Categories from Setting -> General backend ************************
backEndForumRegisterMethod.enableDisablePrivateCategories = function(value) {
	casper.waitForSelector('#show_private_forums', function() {
		utils.enableorDisableCheckbox('show_private_forums', value);
		casper.test.assertExists('button.button.btn-m.btn-blue', 'Save button found');
		casper.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function success() {
		utils.info(casper.fetchText('div#ajax-msg-top'));
	}, function fail() {
		utils.error('Saved not found');
	},30000);
};

//*************************Method to goto the permission of Category from backend ************************
backEndForumRegisterMethod.goToCategoryPermission = function(id) {
	casper.mouse.move('li[id="'+id+'"] div.select');
	casper.click('li[id="'+id+'"] a.manageAction span');
	casper.wait('2000',function() {
	}).then(function() {
		this.click('div[id="forumAction'+id+'"] a.change_perm');
	}).waitForSelector('span#inheritance', function() {
		utils.info("Change Permission Page opened");
	});
};

//*************************Method to change the permission of Category of View Category from backend ************************
backEndForumRegisterMethod.enableDisableCategoryPermissions = function(id, value) {
	utils.enableorDisableCheckbox(id, value);
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.info("Permission changed");
	}, function fail() {
		utils.info("Permission not changed");
	});
};

backEndForumRegisterMethod.enableDisableDeleteProfilePermissions = function(id, value) {
	utils.enableorDisableCheckbox(id, value);
	casper.waitUntilVisible('div#loading_msg', function success() {
		utils.info("Permission changed");
	}, function fail() {
		utils.info("Permission not changed");
	});
};

//Method for filling data in a category create form
backEndForumRegisterMethod.createCategorySubcategory= function(title, data){
	casper.then(function(){
		casper.test.assertExists('a#addForumButton', 'Add category tab found');
		casper.click('a#addForumButton');
		this.waitForSelector('form[name=frmOptions]', function(){
			this.fill('form[name=frmOptions]',{
				'forum_name': data.title,
				'forum_description': data.description,
				'isSubcategory': data.isSubcategorycheckbox,
				'parentid': data.isSubcategoryvalue,
				'forum_pw_cb': data.passwordprotectcheckbox,
				'forum_pw': data.passwordprotectvalue,
				'locked': data.lock,
				'invisible': data.invisible,
				'forum_link_cb': data.linked
			},false);
			try {
				this.test.assertExists('form#edit_forum_form input[name="forum_link"]');
				this.fill('form[name="frmOptions"]',{
					'forum_link' : data.linkedtext
				}, false);
				this.test.assertExists('form[name="frmOptions"] button', 'button found on create category page');
			}catch(e){
				utils.info('users error message cannot be found on category create form page');
			}
			try{
				this.test.assertExists('form#edit_forum_form select[name="parentid"]');
				this.click('select#parentid');
				this.fill('form[name="frmOptions"]',{
					'parentid' : data.isSubcategoryvalue
				}, false);
			}catch(e){
				utils.info('subcategory value cannot be found on forum');
			}
			this.click('form[name="frmOptions"] button');
		}).waitUntilVisible('div.heading.error_message', function(){});
	});
};

backEndForumRegisterMethod.setPostPerPage=function(value){
	casper.waitForSelector('form[name="posts"]',function() {
		this.test.assertExists('select#privacy');
		this.fillSelectors('form[name="posts"]', {
			'select[name="replies"]' : value
		});
		casper.click('button.button.btn-m.btn-blue');
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
			utils.info(' Saved....');
		}else{
			utils.info(' Saved is not displayed.');
		}
	});
};
