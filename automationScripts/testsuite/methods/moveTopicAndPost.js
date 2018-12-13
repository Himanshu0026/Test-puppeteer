/***These are the function which has been called in moveTopic.js and also will be used in other js file as per requirement**********/

'use strict.';
var utils = require('../utils.js');
var moveTopicAndPostJSON = require('../../testdata/moveTopicAndPost.json');
var registerMethod = require('./register.js');
var forumLoginMethod = require('./login.js');
var moveTopicAndPostMethod = module.exports = {};

// Method to fill the details of move topic form
moveTopicAndPostMethod.fillMoveTopicDetails = function(categoryId) {
  casper.waitForSelector('form[name="admindd"]', function() {
    this.fillSelectors('form[name="admindd"]',{
      'select[name="moveto"]': categoryId,
    },false);
    this.test.assertExists('form[name="admindd"] button');
    this.click('form[name="admindd"] button');
  }).waitForText('The Community Forum');
};

// Method to move the topic
moveTopicAndPostMethod.moveTopic = function(categoryId) {
  casper.waitUntilVisible('#topics-menu', function() {
    if (this.visible('#move')) {
      utils.info('Move arrow is visible!');
      this.click('#move i');
      //this.waitForText('Move Topics', function() {
        moveTopicAndPostMethod.fillMoveTopicDetails(categoryId);
      //});
    } else {
      utils.info('Move arrow not visible!');
    }
  });
};

// Method to move the posts
moveTopicAndPostMethod.movepost = function(categoryId, movedDestination) {
  casper.waitUntilVisible('#posts-menu', function() {
    if (this.visible('#moveposts')) {
      utils.info('Move arrow is visible!');
      this.click('#moveposts');
      //this.waitForText('Move Topics', function() {
        moveTopicAndPostMethod.fillMovePostDetails(categoryId, movedDestination);
      //});
    } else {
      utils.info('Move arrow not visible!');
    }
  });
};

// Method to fill the details of move post form
moveTopicAndPostMethod.fillMovePostDetails = function(data, movedDestination) {
  casper.waitForSelector('form[name="movePost"]', function() {
    var destination = movedDestination;
    if(movedDestination === 'New Topic') {
      casper.sendKeys('input[name="thread_title"]', 'Move title', {reset:true});
  		casper.fillSelectors('form[name="movePost"]', {
  			'select[name="forum"]': data
  		}, false);
    } else if (movedDestination === 'Existing Topic') {
      this.test.assertExists('input[name=type][value=exist_thread]');
      casper.then(function() {
          this.evaluate(function() {
              document.querySelector('input[name=type][value=exist_thread]').setAttribute('checked', true);
          });
          this.test.assertEval(function() {
              return document.querySelector('input[name=type][value=exist_thread]').getAttribute('checked') == "true";
          }, 'Radio button for Existing post set to true');
          casper.sendKeys('input[name="mergethreadurl"]', data, {reset:true});
      });
    }
    casper.then(function(){
      casper.test.assertExists('button#move_posts','Move Posts button Found');
      casper.click('button#move_posts');
    });
  }).waitForText('The Community Forum');
};

//method to assign login details of userGroup
moveTopicAndPostMethod.assignLoginDetails = function(userGroup) {
	var loginUserName = "";
	var loginPassWord = "";
	if(userGroup =='Registered Users') {
		loginUserName = moveTopicAndPostJSON.registeredUserLogin.username;
		loginPassWord = moveTopicAndPostJSON.registeredUserLogin.password;
	}
	if(userGroup =='Administrators') {
		loginUserName = moveTopicAndPostJSON.adminUserLogin.username;
		loginPassWord = moveTopicAndPostJSON.adminUserLogin.password;
	}
	if(userGroup =='Moderators') {
		loginUserName = moveTopicAndPostJSON.moderatorsLogin.username;
		loginPassWord = moveTopicAndPostJSON.moderatorsLogin.password;
	}
  casper.then(function() {
    forumLoginMethod.loginToApp(loginUserName, loginPassWord);
  });
};
