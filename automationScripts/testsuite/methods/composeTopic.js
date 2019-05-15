var utils = require('../utils.js');
var composeTopicJSON=require('../../testdata/composeTopic.json');
var composeTopicMethod = module.exports = {};

composeTopicMethod.startTopicPermissionForCategory=function(status){
	var registerUserId="";
	casper.then(function(){
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	}).then(function(){
		this.test.assertExists('div#ddContent div a:nth-child(1)');
		this.click('div#ddContent div a:nth-child(1)');
	}).then(function(){
		var categoryName=casper.fetchText('div.select a');
		var newCategory=categoryName.split("Manage",2);
		utils.info('value of category after split'+newCategory[0]);
		var category=newCategory[0];
		var categoriesDataUrl = casper.evaluate(function(category) {
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
				if (x1.innerText == category) {
					var x2 = document.querySelector('div#sortable ul li:nth-child('+i+') a:nth-child(3)').getAttribute('data-forumid');
					var x4 = document.querySelector('div#sortable ul li:nth-child('+i+') a:nth-child(2)');
					x4.click();
					var x3 = document.querySelector('div#forumAction'+x2+' a:nth-child(3)').getAttribute('data-url');
					return x3;
				}
			}
		} ,category);
		utils.info('message :' +categoriesDataUrl);
		this.evaluate(function(categoriesDataUrl){
			document.querySelector('a[data-url="'+categoriesDataUrl+'"]').click();
		},categoriesDataUrl);
	}).waitUntilVisible('#displayUsergroups', function(){
		this.click('div#addedit_forum_dialog button.close');
	}).wait(5000, function(){
		var registerUserId = casper.evaluate(function(){
			var len = document.querySelectorAll('ul#displayUsergroups li').length;
			for(var i=1; i<=len; i++) {
				var x1 = document.querySelector('ul#displayUsergroups li:nth-child('+i+') a');
				if (x1.innerText == 'General'){
					var x2 = document.querySelector('ul#displayUsergroups li:nth-child('+i+') a').getAttribute('href');
					return x2;
				}
			}
		});
	}).then(function(){
		casper.evaluate(function(registerUserId) {
			document.querySelector('a[href="'+registerUserId+'"]').click();
		},registerUserId);
		casper.then(function(){
			var regis_id=registerUserId.split('#');
			new_regis_id=regis_id[1];
			utils.info('value of is'+new_regis_id);
		}).wait(5000, function(){
			utils.enableorDisableCheckbox('post_threads_'+new_regis_id, status);
		});
	});
	// }).wait(2000, function(){
	// 	utils.info11('dgdgfgfhfhh');
};

//delete category
composeTopicMethod.deleteCategories= function(data) {
	casper.then(function(){
		var editCategory = casper.evaluate(function(title){
			var x1 = document.querySelectorAll('div#sortable ul li').length;
			for(var i=1; i<=x1; i++) {
				var x2 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a:nth-child(2)');
				if (x2.innerText == title) {
					var x3 = document.querySelector('div#sortable ul li:nth-child('+i+')').getAttribute('id');
					var x4 = document.querySelector('div#forumAction'+x3+' a:nth-child(1)');
					x4.click();
					return x3;
				}
			}
		},title);
		utils.info('value of edit-category is'+editCategory);
	});
};

//category post count
composeTopicMethod.getPostCount= function(data) {
	casper.then(function() {
		var categoryName = casper.evaluate(function(data) {
			var len = document.querySelectorAll('div.panel-body.table-responsive ul li').length;
			for(var i=1; i<=len; i++) {
				var x1 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a span');
				if (x1.innerText == data){
					var x2 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a').getAttribute('href');
					return x2;
				}
			}
		},data);
		utils.info('value of category name is'+categoryName);
		var catid=categoryName.split('=');
		var newid=catid[1];
		var actualPostCount=this.fetchText('li[id^="forum_'+newid+'"] a.help-tooltip.TopicsCount');
		this.test.assertEquals(actualPostCount, composeTopicJSON.expectedCount.expectedPostCount, 'both are equals');
		casper.then(function(){
			this.evaluate(function(categoryName) {
				document.querySelector('a[href="'+categoryName+'"]').click();
			},categoryName);
			this.wait(1000, function() {
				if (this.exists('div.panel-heading span input')) {
					this.test.assertExists('div.panel-heading span input');
					this.evaluate(function() {
						document.querySelector('input[name="allbox"]').click();
					});
					this.test.assertExists('a#delete');
					this.click('a#delete');
					this.wait(2000, function(){});
				}
			});
		});
	});
};

composeTopicMethod.postPreview= function(data) {
	casper.waitForSelector('div.post-body.pull-left', function(){
		this.test.assertExists('div.post-body.pull-left');
		this.sendKeys('input[name="subject"]', data.title, {reset:true});
		this.withFrame('message_ifr', function(){
			this.sendKeys('#tinymce', this.page.event.key.Ctrl, this.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', this.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce', data.content);
		});
		if(this.exists('#all_forums_dropdown')){
			this.click('#all_forums_dropdown');
			this.fill('form[name="PostTopic"]', {
				'forum' : data.category
			}, false);
		}
	}).then(function(){
		this.click('button#previewpost_sbt');
	}).waitForText(composeTopicJSON.ValidCredential.content, function(){
		this.click('#post_submit');
	});
};
