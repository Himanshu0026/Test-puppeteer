
//----- This js file covers all the valid and invalid scenarios for forgot functionality from login window comes from home page---------//

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var forgotPasswordMethod = require('../methods/forgotPassword.js');
var forgotPasswordTestcases = require('../cases/forgotPassword.js');
var forgotPassword = module.exports = {};

forgotPassword.featureTest = function(casper, test) {
	
	forgotPasswordTestcases.resetPasswordUsingValidUsername(); // call method to Reset password with valid user name
	
};





