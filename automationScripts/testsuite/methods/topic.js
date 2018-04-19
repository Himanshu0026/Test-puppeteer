'use strict.';
var topicMethod = module.exports = {};
var topicJSON = require('../../testdata/topic.json');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var thumpsUpDownJSON = require('../../testdata/thumpsUpDown.json');
var utils = require('../utils.js');

//Method For Creating Topic
/*topicMethod.createTopic = function(info) {
  casper.waitForSelector('div.post-body.pull-left', function() {
    this.test.assertExists('div.post-body.pull-left');
    this.sendKeys('input[name="subject"]', info.title, {reset:true});
    this.withFrame('message_ifr', function() {
	this.sendKeys('#tinymce', this.page.event.key.Ctrl, this.page.event.key.A, {keepFocus: true});
	this.sendKeys('#tinymce', this.page.event.key.Backspace, {keepFocus: true});
	this.sendKeys('#tinymce', info.content);
   });
    if(this.exists('#all_forums_dropdown')) {
      casper.evaluate(function() {
  	        document.querySelector('#all_forums_dropdown').click();
      });
      this.fill('form[name="PostTopic"]', {
        'forum' : info.category
      }, false);
    }
  }).then(function() {
        this.click('#post_submit');
        this.wait(2000, function(){
                if(this.visible('input[name="subject"]')){
                        casper.thenOpen(config.backEndUrl, function(){
                            backEndForumRegisterMethod.goToCategoryPage();
                        }).then(function(){
                                backEndForumRegisterMethod.isCategoryExists(thumpsUpDownJSON.category, function(err, isExists) {
                                    if(isExists) {
                                            utils.info(' Category already existed');
                                     } else {
                                            utils.info(' Category not exist');
                                            casper.then(function() {
                                                    backEndForumRegisterMethod.createCategory(thumpsUpDownJSON.category);
                                            });
                                      }
                                });
                    }).thenOpen(config.url, function(){
                            this.waitForSelector('#topics a[href="/post/printadd"]', function() {
                    	        this.test.assertSelectorHasText('div#topics', 'Start New Topic');
                    	        this.click('#topics a[href="/post/printadd"]');
                            }).then(function(){
                                    topicMethod.createTopic(topicJSON.newTopic);
                            });
                    });
                }
          });
     });
};*/

//Method For Creating Topic
topicMethod.createTopic = function(info) {
  casper.waitForSelector('div.post-body.pull-left', function() {
    this.test.assertExists('div.post-body.pull-left');
    this.sendKeys('input[name="subject"]', info.title, {reset:true});
    this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', this.page.event.key.Ctrl, this.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', this.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce', info.content);
		});
    if(this.exists('#all_forums_dropdown')) {
      this.click('#all_forums_dropdown');
      this.fill('form[name="PostTopic"]', {
        'forum' : info.category
      }, false);
    }
  }).then(function() {
    this.click('#post_submit');
  });
};

topicMethod.createTopicForDifferentCategory = function(info) {
  casper.waitForSelector('div.post-body.pull-left', function() {
    this.test.assertExists('div.post-body.pull-left');
    this.sendKeys('input[name="subject"]', "My subject", {reset:true});
    this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', this.page.event.key.Ctrl, this.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', this.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce', "My text message");
		});
    if(this.exists('#all_forums_dropdown')) {
      this.click('#all_forums_dropdown');
      this.fill('form[name="PostTopic"]', {
        'forum' : info
      }, false);
    }
  }).then(function() {
    this.click('#post_submit');
  });
};
