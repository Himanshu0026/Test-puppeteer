var utils = module.exports = {};
var count = 1;
utils.jsErrorsCount = 1;
utils.jsErrors = [];
utils.resourceErrorsCount = 1;
utils.resourceErrors = [];
utils.newTheme = 0;

//pass the id of the element in element parameter and for status true or false
utils.enableorDisableCheckbox = function(element, status) {
	var checkbox_value = casper.evaluate(function (element) {
		return document.getElementById(element).checked;
	}, element);
	if (checkbox_value) {
		if (checkbox_value != status) {
			casper.evaluate(function(element) {
				document.querySelector('#'+element).click();
			},element);
		}
	} else {
		if (status) {
			casper.evaluate(function(element) {
				document.querySelector('#'+element).click();
			},element);
		}
	}
};

utils.randomString = function() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for( var i=0; i < 10; i++ )
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};

utils.info = function(msg) {
	casper.echo(commitId + msg, 'INFO');
};

utils.debug = function(msg) {
	casper.echo(commitId + msg, 'DEBUG');
};

utils.error = function(msg) {
	casper.echo(commitId + msg, 'ERROR');
};

//Logging Message On The Console
casper.on('log', function(data) {
	utils.debug(' ['+data.level+'] [phantomjs] '+data.message);
});

//Method To Abort unnecessary Requests
casper.on('resource.requested', function(requestData, networkRequest) {
	var str = requestData.url;
	var res = str.match('https://static.olark.com');
	if(res) {
		utils.info(' aborting url : ' + requestData.url);
		networkRequest.abort();
	}
});

casper.on("resource.error", function(resourceError) {
	var resourceScreenshotsPath = config.failedScreenShotsLocation+branchName+'/' +commitId+ '/' +feature+ '/' + 'resourceErrors/resourceError' +utils.resourceErrorsCount;
	var msg = '';
	if(resourceError.status == 404) {
		msg = 'ResourceError: ' + resourceError.url + ' failed to load (' + resourceError.status + ')';
		utils.resourceErrorsCount++;
		utils.error(' Error : ' + msg);
		casper.capture(resourceScreenshotsPath + '.png');
		utils.resourceErrors.push(msg);
	} else if(resourceError.errorCode == 203) {
		msg = 'ResourceError: ' + resourceError.url + ' failed to load (' + resourceError.errorCode + ')';
		utils.resourceErrorsCount++;
		utils.error(' Error : ' + msg);
		casper.capture(resourceScreenshotsPath + '.png');
		utils.resourceErrors.push(msg);
	} else if(resourceError.errorCode == 403) {
		msg = 'ResourceError: ' + resourceError.url + ' failed to load (' + resourceError.errorCode + ')';
		utils.resourceErrorsCount++;
		utils.error(' Error : ' + msg);
		casper.capture(resourceScreenshotsPath + '.png');
		utils.resourceErrors.push(msg);
	} else if(resourceError.errorCode == 304) {
		msg = 'ResourceError: ' + resourceError.url + ' failed to load (' + resourceError.errorCode + ')';
		utils.resourceErrorsCount++;
		utils.error(' Error : ' + msg);
		casper.capture(resourceScreenshotsPath + '.png');
		utils.resourceErrors.push(msg);
	}
});

//Method To capture Screenshots If Any Test Case Failed
casper.test.on('fail', function(failure) {
	var failedScreenshotsPath = config.failedScreenShotsLocation+branchName+'/' +commitId+ '/' +feature+ '/' + feature + 'Error' +count;
	casper.capture(failedScreenshotsPath + '.png');
	count++;
});

//Method To Catch JS Errors
casper.on("page.error", function(msg, trace) {
	var str = msg;
	console.log('Inside the js error catch method');
	str = str.match('TypeError:');
	if(str) {
		msg = msg + ' at line ' + trace[0].line + ' in ' + trace[0].function + ' function occurred in ' + trace[0].file + ' file';
		var jsScreenshotsPath = config.failedScreenShotsLocation+branchName+'/' +commitId+ '/' +feature+ '/' + 'jsErrors/jsError' +utils.jsErrorsCount;
		casper.capture(jsScreenshotsPath+'.png');
		utils.jsErrorsCount++;
		utils.error(' Error : ' + msg);
		utils.jsErrors.push(msg);
	}
});

casper.on('http.status.404' || 'http.status.403', function(resource) {
	casper.echo(resource.url + ' is 404 || 403');
	utils.resourceErrorsCount++;
	utils.error(' Error : ' + msg);
	casper.capture(resourceScreenshotsPath + '.png');
	utils.resourceErrors.push(msg);
});

//Method To Display JS Errors
utils.displayError = function() {
	if(utils.jsErrors.length) {
		utils.error(' ' +utils.jsErrors.length+' javaScript errors found');
		//jsErrorCount = jsErrorCount + utils.jsErrors.length;
	} else {
		utils.info(' ' +utils.jsErrors.length+' javascript errors found');
	}

	if(utils.resourceErrors.length) {
		utils.error(' ' +utils.resourceErrors.length+' resources errors found');
	} else {
		utils.error(' ' +utils.resourceErrors.length+' resources errors found');
	}
};

utils.activateNewTheme = function() {
	utils.newTheme = 1;
};

utils.deActivateNewTheme = function() {
	utils.newTheme = 0;
};

utils.isNewThemeActivated = function() {
	return utils.newTheme;
};

utils.setNewTheme = function() {
	if(!utils.isNewThemeActivated()) {
		casper.thenOpen(config.url+'tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=51&search_skin=Angela&sorted=', function() {
		}).waitForText("The Angela theme has been activated.", function() {
			utils.activateNewTheme();
			utils.info("New Theme Activated :" +utils.isNewThemeActivated());
		});
	}
};
