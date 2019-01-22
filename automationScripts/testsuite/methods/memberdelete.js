var registerMethod = require('../methods/register.js');
var memberDeleteMethod= module.exports = {};

memberDeleteMethod.addUser = function(userInfo, data) {
	casper.waitForSelector('form[name="frmAddUser"]',function() {
		this.fill('form[name="frmAddUser"]', {
			'member' : userInfo.uname,
			'pw' : userInfo.upass,
			'email' : userInfo.uemail,
			'note' : userInfo.pNote,
		        'usergroupid' : data
                }, false);
        }).then(function(){
                this.click('form[name="frmAddUser"] button');
	});
};

memberDeleteMethod.registermembers = function(data, callback) {
	casper.then(function(){
		registerMethod.getUname(function(username){
			uname=username;
		});
	}).then(function(){
		memberRegister = {
			"uname" : uname,
			"upass" : uname,
			"uemail" : uname+ "@wt.com",
			"pNote" : "This is my personal note blank password",
		};
	}).then(function(){
		memberDeleteMethod.addUser(memberRegister, data);
	}).then(function(){
		return callback (uname);
	});
};

//----------------get attribute value of a post------------------------------------------------
memberDeleteMethod.memberCheckBoxValue=function(data, index){
	var value= casper.evaluate(function(data, index){
		var postId=document.querySelectorAll(data, index);
		var postHref=postId[index].getAttribute('value');
		return postHref;
	},data, index);
	utils.info("message:" +value);
	casper.evaluate(function(value) {
		document.querySelector('input[value="'+value+'"]').click();
	}, value);
};
