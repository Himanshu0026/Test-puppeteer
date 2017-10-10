var deletePostMethod= module.exports = {};
deletePostMethod.postId="";

//---------------------Method to click on general category from forum frontEnd-------------------------
deletePostMethod.getCategoryHrefFrontend= function(data){
	var categoryName = casper.evaluate(function(data){
		var len = document.querySelectorAll('div.panel-body.table-responsive ul li').length;
		for(var i=1; i<=len; i++) {
			var x1 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a span');
			if (x1.innerText == data){
				var x2 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a').getAttribute('href');
				return x2;
			}
		}
	},data);
	utils.info('value of category name is'+categoryName);
	casper.click('a[href="'+categoryName+'"]');
};

//delete post from postlisting page---------------
deletePostMethod.getPostId=function(data, index){
	var postId="";
	var post= casper.evaluate(function(data, index){
		var postDropDownId=document.querySelectorAll(data);
		var postDropdownIds=postDropDownId[index].getAttribute('id');
		return postDropdownIds;
	}, data, index);
	deletePostMethod.postId=post;
	utils.info("message :" +post);
	casper.click('a#'+post+'');
};
//----------------get attribute value of a post------------------------------------------------
deletePostMethod.deletePostCheckBoxId=function(data, index){
	var post= casper.evaluate(function(data, index){
		var postId=document.querySelectorAll(data, index);
			var postHref=postId[index].getAttribute('value');
			return postHref;
	},data, index);
	utils.info("message :" +post);
	casper.click('input[value="'+post+'"]');
};
