'use strict.';
var config = require('../../../config/config.json');
var replyPostTests = require('../cases/replyPost.js');
var profilePageMethod= require('../methods/profilePage.js');
var forumLoginMethod = require('../methods/login.js');
var replyPost = module.exports = {};

replyPost.featureTest = function(){
  casper.start(config.backEndUrl, function() {
  utils.info(" Title of the page :"+this.getTitle());
  forumLoginMethod.loginToForumBackEnd();
  }).then(function(){
    //create Topic
    replyPostTests.createTopic();
    //setPostPerPage
    replyPostTests.postPerPage('10');
    //Verify with the  reply with quote button in case on pagination
    replyPostTests.createPagination();
    //verify with the reply with quote button when there are only some emojis are available in the post.
    replyPostTests.quoteEmoji();
    //verify error msg
    replyPostTests.checkErrorMsg();
    //setPostPerPage
    replyPostTests.postPerPage('50');
    //delete all topics
    profilePageMethod.deleteTopics();
  });
};