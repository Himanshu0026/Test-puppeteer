'use strict.';
var topicMethod = module.exports = {};
var utils = require('../utils.js');

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
