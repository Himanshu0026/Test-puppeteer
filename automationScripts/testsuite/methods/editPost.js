/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict.';
var editPostMethod = module.exports = {};



//---------------------get post href---------------------------------------------------------
editPostMethod.editPostGetHref=function(data, index){
	casper.then(function(){
		var posts= casper.evaluate(function(data, index){
			var postId=document.querySelectorAll(data);
			var postHref=postId[index].getAttribute('href');
			return postHref;
		},data, index);
		utils.info("message :" +posts);
		casper.click('a[href="'+posts+'"]');
	});
};
