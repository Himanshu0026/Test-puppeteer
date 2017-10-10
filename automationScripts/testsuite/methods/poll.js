'use strict.';
var pollMethod = module.exports = {};
var utils = require('../utils.js');

//Method For Creating Poll
pollMethod.createPoll = function(info) {
  casper.waitForSelector('form#formEditPoll', function() {
    this.sendKeys('#poll_question', info.pollQuestion);
		this.sendKeys('#public', info.votecheckbox);
		this.sendKeys('span#poll_option_1 div input', info.option1);
		this.sendKeys('span#poll_option_2 div input', info.option2);
		this.sendKeys('#multiple', info.multiplechoicebox);
		this.click('#save_poll');
  });
};
