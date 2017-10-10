'use strict.';
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var ooScript = module.exports = {};

ooScript.featureTest = function() {
		casper.start(config.url+ 'cgi/util/test_object_framework.cgi', function() {
  }).then(function() {
		casper.test.assertTextExist('PASS', 'Perl Scripts');
    casper.test.assertTextDoesntExist('FAIL', 'Perl Scripts have some errors');
  });
};
