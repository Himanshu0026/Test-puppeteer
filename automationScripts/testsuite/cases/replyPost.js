'use strict.';
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var replyPostJSON=require('../../testdata/replyPost.json');
var topicJSON = require('../../testdata/topic.json');
var topicMethod = require('../methods/topic.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var replyPostMethod= require('../methods/replyPost.js');
var replyPostTests = module.exports = {};

//create Topic testcases.
replyPostTests.createTopic=function() {
  casper.thenOpen(config.url, function(){
    forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
  }).waitWhileVisible('#td_tab_login', function() {
  }).waitForSelector('a[href="/post/printadd"]', function(){
    this.test.assertExists('a[href="/post/printadd"]', 'New Topic selector present on forum');
    casper.evaluate(function() {
      document.querySelector('a[href="/post/printadd"]').click();
    });
  }).then(function(){
    topicMethod.createTopic(topicJSON.ValidCredential);
  }).waitForText(topicJSON.ValidCredential.content);
};

replyPostTests.postPerPage=function(value){
  casper.thenOpen(config.backEndUrl, function(){
    utils.info('******************************PostPer-Page********************************************');
    backEndForumRegisterMethod.goToDisplayPage();
  }).then(function(){
    backEndForumRegisterMethod.setPostPerPage(value);
  });
};
//Verify with the  reply with quote button in case on pagination
//add delete method
replyPostTests.createPagination=function() {
  casper.thenOpen(config.url, function(){
    utils.info('Case 1[Verify with the  reply with quote button in case on pagination]');
  }).waitForSelector('form[name="posts"] a.topic-title', function(){
    this.click('form[name="posts"] a.topic-title');
  }).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
    replyPostMethod.createPagination();
    this.reload(function(){});
  }).waitForSelector('a.btn-subtle.pagination-next-page', function(){
    this.test.assertExists('a.btn-subtle.pagination-next-page', 'pagination icon found on postlistingPage');
  }).then(function(){
    index=9;
    replyPostMethod.getQuoteIds('a[id^="reply_with_quote_"]', index);
  }).then(function(){
    index=2;
    this.test.assertExists('input[name="submitbutton"]', 'post button found after add content in the text box');
    this.click('div#reply_options input');
    this.wait(1000, function(){
      this.test.assertTextExists(replyPostJSON.quoteText.Text);
    });
  }).then(function(){
    index=1;
    replyPostMethod.getQuoteIds('a[id^="reply_with_quote_"]', index);
  }).then(function(){
    index=2;
    this.test.assertExists('input[name="submitbutton"]', 'post button found after add content in the text box');
    this.click('div#reply_options input');
    this.wait(1000, function(){
      this.test.assertTextExists(replyPostJSON.quoteText.Text);
    });
  });
};

//verify with the reply with quote button when there are only some emojis are available in the post.
replyPostTests.quoteEmoji=function() {
  casper.thenOpen(config.url, function(){
    utils.info('Case 2[verify with the reply with quote button when there are only some emojis are available in the post.]');
    this.waitForSelector('form[name="posts"] a.topic-title', function(){
      this.click('form[name="posts"] a.topic-title');
    }).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
      this.evaluate(function() {
        document.querySelector('a#sub_post_reply').click();
      });
    }).waitForSelector('i.mce-ico.mce-i-emoticons', function(){
      this.click('i.mce-ico.mce-i-emoticons');
    }).then(function(){
      this.click('ul.emojiListContent li');
      this.wait(1000, function(){});
    }).then(function(){
      this.test.assertExists('input[name="submitbutton"]', 'post button found after add content in the text box');
      this.test.assertExists('input[name="submitbutton"]');
      this.click('input[name="submitbutton"]');
    }).wait(2000, function(){
      index=5;
      replyPostMethod.getQuoteIds('a[id^="reply_with_quote_"]', index);
    }).waitForSelector('i.mce-ico.mce-i-image', function(){
      casper.withFrame('message_ifr', function(){
        casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
        casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
        casper.sendKeys('#tinymce', profilePageJSON.addPost.Post );
      });
    }).then(function(){
      this.click('div#reply_options input');
      this.wait(1000, function(){
        this.test.assertExists('img.emoji.bbc_img');
      });
    });
  });
};

replyPostTests.checkErrorMsg=function() {
  casper.thenOpen(config.url, function(){
    utils.info('Case 3[verify error msg on post button.]');
    this.waitForSelector('form[name="posts"] a.topic-title', function(){
      this.click('form[name="posts"] a.topic-title');
    }).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
      this.evaluate(function() {
        document.querySelector('a#sub_post_reply').click();
      });
    }).waitForSelector('i.mce-ico.mce-i-image', function(){
      this.click('#reply_submit');
    }).waitUntilVisible('#bootstrap-alert-box-modal div div div:nth-child(2) p', function(){
      forumLoginMethod.logoutFromApp();
    });
  });
};
