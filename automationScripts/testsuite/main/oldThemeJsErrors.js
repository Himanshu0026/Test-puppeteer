
'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var loginJSON = require('../../testdata/loginData.json');
var forumLoginMethod = require('../methods/login.js');
var oldThemeJsErrors = module.exports = {};

oldThemeJsErrors.featureTest = function() {

	casper.start(config.backEndUrl, function() {

		utils.info(" Title of the page :"+this.getTitle());
		forumLoginMethod.loginToForumBackEnd();

  }).thenOpen(config.url+'tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=21&search_skin=Soft%20Gray&sorted=', function() {

  }).waitForText("The Soft Gray theme has been activated.");
  casper.thenOpen(config.url, function() {
    forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
  }).wait('3000', function() {
		this.test.assertExists('#td_tab_newpost a', ' Latest Topic found');
		this.click('#td_tab_newpost a');
	}).waitForSelector('form[name="posts"]', function() {
    utils.info(' redirected to topic listing page successfully');
    this.test.assertExists('a[href="/categories"]', ' Category found');
		this.click('a[href="/categories"]');
	}).waitForSelector('div.middle_container', function() {
    utils.info(' redirected to category listing page successfully');
  }).thenOpen(config.url+'tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=51&search_skin=Angela&sorted=', function() {

  });
};
