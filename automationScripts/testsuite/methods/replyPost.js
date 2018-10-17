'use strict.';
var profilePageJSON=require('../../testdata/profilePageData.json');
var replyPostMethod = module.exports = {};

//Pagination on postListingPage
replyPostMethod.createPagination= function(){
        casper.waitForSelector('a#sub_post_reply', function(){
                this.repeat(11, function(){
                        this.evaluate(function() {
                                document.querySelector('a#sub_post_reply').click();
                        });
                        casper.waitForSelector('i.mce-ico.mce-i-image', function(){
                                casper.withFrame('message_ifr', function(){
                                        casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
                                        casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
                                        casper.sendKeys('#tinymce', profilePageJSON.addPost.Post );
                                });
                        }).then(function(){
                                this.test.assertExists('input[name="submitbutton"]', 'post button found after add content in the text box');
                                this.test.assertExists('input[name="submitbutton"]');
                                this.click('input[name="submitbutton"]');
                        }).waitForText('post reply');
                });
        });
};

replyPostMethod.getQuoteIds=function(data, index){
        var quote= casper.evaluate(function(data, index){
		var quoteId=document.querySelectorAll(data);
		var quoteIds=quoteId[index].getAttribute('id');
		return quoteIds;
	}, data, index);
	utils.info("message :" +quote);
	casper.click('a#'+quote+'');
        casper.wait(1000, function(){});
};
