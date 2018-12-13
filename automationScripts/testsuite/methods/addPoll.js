'use strict.';
var topicMethod = module.exports = {};
var topicJSON = require('../../testdata/topic.json');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var thumpsUpDownJSON = require('../../testdata/thumpsUpDown.json');
var utils = require('../utils.js');
var addPollMethod = module.exports = {};


addPollMethod.createTopic = function(info) {
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

addPollMethod.addPollStartTopic = function(info) {
        casper.waitForSelector('input#poll_question', function() {
          this.sendKeys('#poll_question', info.pollQuestion);
      		this.sendKeys('#public', info.votecheckbox);
      		this.sendKeys('span#poll_option_1 div input', info.option1);
      		this.sendKeys('span#poll_option_2 div input', info.option2);
      		this.sendKeys('#multiple', info.multiplechoicebox);
      		this.click('#save_poll');
        });
};


addPollMethod.gettopicId = function(info, index) {
        var topicId= casper.evaluate(function(info, index){
                var topic=document.querySelectorAll(info);
                var topicid=topic[index].getAttribute('id');
                return topicid ;
        }, info, index);
        utils.info("message :" +topicId);
        casper.click('a#'+topicId+'');
};

addPollMethod.enableDisableModeratorPermission=function(info1, info2, info3, value){
        casper.then(function(){
                utils.enableorDisableCheckbox(info1, value);
        }).then(function(){
                utils.enableorDisableCheckbox(info2, value);
        }).then(function(){
                utils.enableorDisableCheckbox(info3, value);
        }).then(function(){
                casper.evaluate(function() {
        		document.getElementById('add_mod_form').submit();
        	});
        });

};
