
//Requiring Modules and Global Declaration
var args = require('minimist')(process.argv.slice(2));
var config = require('../config/config.json');
var scenarios = [];

/*
	uncomment the subsequent three statements(line no. 20, 21, 22) in case we are running front-end pages
	//var pathConfig = require('./paths.js');
	//var refPaths = pathConfig.refPaths;
	//var testPaths = pathConfig.testPaths;

	and comment two lines(line no. 18, 19)
	var pathConfig = require('./paths.js');
	var paths = pathConfig;
*/

var pathConfig = require('./paths.js');
var paths = pathConfig;
/*var pathConfig = require('./paths.js');
var refPaths = pathConfig.refPaths;
var testPaths = pathConfig.testPaths;*/

//Setting Default Diractory To Save Backstop Data
if(args.branchName) {
	var backstop_data_dir = args.branchName;
}

/*
  Work out the environments that are being compared
 */

//Set Command Type
var type = args._;

//Setting Test URL to test
if (!args.testhost) {
	args.testhost  = config.testHost; 	//Default test host
}

//Setting Reference URL to test
if (!args.refhost) {
	args.refhost  = config.refHost; 	//Default reference host
}

//Generating Scenario
for (var i = 0; i < paths.length; i++) {
	/*
		uncomment both if/else condition in case we are running front-end pages
		and use path variable instead of paths[i] array in lable, referenceUrl and url property
	*/

	/*if(args._ == 'reference') {
		console.log('Page : '+refPaths[i]);
		var path = refPaths[i];
	}else {
		console.log('Page : '+testPaths[i]);
		var path = testPaths[i];
	}*/
	scenarios.push({
		"type": type,
		"label": paths[i],//path,
		"referenceUrl": args.refhost+paths[i], //args.refhost+refPaths[i],
		"url": args.testhost+paths[i], //args.testhost+testPaths[i],
		"hideSelectors": [],
		"removeSelectors": [],
		"selectors": [], //Can specify specific selectors to test
		"readyEvent": null,
		"delay": 5000,  //Set time in ms to wait before capturing screenshots
		"misMatchThreshold" : 10,
		"requireSameDimensions" : false,
		"asyncCaptureLimit": 1,
		"asyncCompareLimit" : 5,  //would use approximately 1200 MB of the RAM
		"onBeforeScript": "onBefore.js",
		"onReadyScript": "onReady.js"
	});
}

module.exports = {
	"id": "prod_test",
	"viewports": [
		{
			"name": "phone",
			"width": 280,
			"height": 532
		},

		{
			"name": "tablet_h",
			"width": 1024,
			"height": 768
		},

		{
			"name": "tablet_v",
			"width": 768,
			"height": 1024
		}
	],

	"scenarios": scenarios,

	"paths": {
    		"bitmaps_reference": "backstop_data/"+backstop_data_dir+"/bitmaps_reference",
		"bitmaps_test":      "backstop_data/"+backstop_data_dir+"/bitmaps_test",
		/*"bitmaps_reference": "backstop_data/bitmaps_reference",
		"bitmaps_test":      "backstop_data/bitmaps_test",*/
		"casper_scripts":    "backstop_data/casper_scripts",
		"html_report":       "backstop_data/html_report",
		"ci_report":         "backstop_data/ci_report"
	},

	"casperFlags": [],

	"engine": "phantomjs",

	"report": ["browser"],

	"debug": true
};
