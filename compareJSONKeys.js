var request = require("request");
var fs = require('fs');
var writejson = require('writejson');
var os = require('os');
var spanish = "http://beta21.websitetoolbox.com/js/locales/es/translation.json";
var german = "http://beta21.websitetoolbox.com/js/locales/de/translation.json";
var newBrunswick = "http://beta21.websitetoolbox.com/js/locales/nb/translation.json";
var netherlands = "http://beta21.websitetoolbox.com/js/locales/nl/translation.json";

//var compareJSON = module.exports = {};

function compareKeys(keys1, keys2) {
    return {
        Spanish: keys1.filter(function (el) {
            return keys2.indexOf(el) === -1;
        }),
        German: keys2.filter(function (el) {
            return keys1.indexOf(el) === -1;
        })
    };
}

//compareJSON.compare = function(callback) {
  request({
      url: spanish,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
      	file1 = body;
      	var keys1 = Object.keys(file1);
        //var keys1 = ['a','b'];
      	request({
      	    url: german,
      	    json: true
      	}, function (error, response, body) {

      	    if (!error && response.statusCode === 200) {
          		file2 = body;
          		var keys2 = Object.keys(file2);
              //var keys2 = ['a','b'];
          		//console.log(compareKeys(keys1, keys2));
              var difference = compareKeys(keys1, keys2);
              var val = 0;
              fs.unlink('difference.txt', function(err){
                if (err) console.log('difference.txt was not deleted');
                console.log('Remove the existing difference.txt');
              });
              for(var language in difference) {
          			//if (language == 'Spanish') {
          				val = difference[language];
                  if(val.length !== 0) {
                    console.log('The value present in the language',val.length);
                    console.log(val);
                    fs.appendFile('difference.txt', os.EOL+'The word present in '+language+' but not present in other'+os.EOL , 'utf-8', function(err) {
                      if (err) {
                        console.log('The file has not been saved!');
                      }
                    });
                    fs.appendFile('difference.txt', JSON.stringify(val,'','\n')+os.EOL , 'utf-8', function(err) {
                      if (err) {
                        console.log('The file has not been saved!');
                      } else {
                        console.log('The file has been saved!');
                      }
                    });
                  }
          			//}
          		}
      	    }
      	});
      }
  });
//};
