'use strict.';
var editProfilePageJSON=require('../../testdata/editProfilePageData.json');
var editProfileMethod = module.exports = {};

editProfileMethod.verifyInstantMsg = function(data1, data2) {
  casper.then(function(){
    this.fillSelectors('form[name="PostTopic"]', {
      'select#imType' : data1
    });
    if (casper.visible('input#imID')) {
      utils.info('instant message textbox appeared');
      this.sendKeys('input#imID', data2);
    } else {
      utils.info('none text has been selected textbox didnt appeared');
    }
  }).then(function(){
    this.click('button[type="submit"]');
  }).waitForText(editProfilePageJSON.alertMsg.msg, function(){
    this.test.assertExists('ul.nav.pull-right span.caret', 'toggle dropdown opened successfully');
    this.click('ul.nav.pull-right span.caret');
    this.evaluate(function() {
      document.querySelector('a#user-nav-panel-profile').click();
    });
  }).waitForSelector('a#PostsOFUser', function(){
    if (casper.visible('ul.custom-list.clearfix li:nth-child(2)')) {
      utils.info('instant messages appeared on profilepage');
      this.test.assertExists('ul.custom-list.clearfix li:nth-child(2)', 'instant messenger icon found on users profilePage');
    } else {
      utils.info('none text has been selected textbox didnt appeared on profilePage');
      this.test.assertDoesntExist('ul.custom-list.clearfix li:nth-child(2)', 'instant messenger icon not found on users profilePage');
    }
  }).then(function(){
    this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
    this.click('ul.nav.pull-right span.caret');
    this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
  }).waitForSelector('div#userSignature textarea', function(){});
};
