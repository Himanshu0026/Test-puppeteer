
// method for login to application
exports.loginToApp = function(username, password, driver,callback) {
driver.click('#td_tab_login');
driver.fill('form[name="frmLogin"]', {
        'member': username,
	'pw' : password
    }, false); //incase of true, it will submit the form and for false, it will not submit form

        driver.click('form[name="frmLogin"] button');
	return callback();
};

// method for click on user's icon
exports.clickOnUserIcon = function(driver,callback) {
	driver.click('.default-user');
	return callback();
};

// method for click on user's edit profile
exports.clickOnEditProfile = function(driver,callback) {
	driver.click('a[href="/register/register?edit=1&userid=24440696"]');
	return callback();
};

// method for click on user's account setting
exports.clickOnAccountSetting = function(driver,callback) {
	driver.click('a[href="/register?action=preferences&userid=24440696"]');
	return callback();
};

//method for logout from application
exports.logoutFromApp = function(driver, callback) {
	driver.click('button.dropdown-toggle span span.username');
	driver.click('#logout');
	return callback();
};

//method to go to new Topic page
exports.gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	//driver.wait(3000);
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	return callback();
};

exports.postTopicpage = function(title, content, category, driver, callback){
driver.fill('form[name="PostTopic"]',{
		'subject' : title,
		'message' : content
	},false);
	
	driver.click('#post_submit');
	return callback();
};

//method to post New Topic 
exports.postTopicpage = function(title, content, category, driver, callback){
/*driver.fill('form[name="PostTopic"]',{
		'subject' : title,
	},false);*/
	driver.sendKeys('input[name="subject"]', title);

	 driver.withFrame('message_ifr', function() {
		this.echo("enter message in iframe");
 		this.sendKeys('#tinymce', content);
		this.echo("**************************************");
		driver.capture('Screenshots/content.png');	
	});

	driver.click('#all_forums_dropdown')
	driver.fill('form[name="PostTopic"]',{
		'forum' : category
	},false);
	//driver.sendKeys('input[name="forum"]', category);
	driver.click('#insert_image_dialog_');
    	driver.then(function() {
		this.waitForSelector('div#insertimagemodal', function() {
			this.echo('****************************************see the modal!');
			this.wait(7000, function() {
				this.capture('Screenshots/screenshotofmodal.png');
			});
		});
	});
	driver.then(function(){
		driver.click('div#uploadImage a#insertImage_');
		this.wait(10000,function(){
			this.capture('Screenshots/browse.png');
		});	
	});
	/*driver.then(function(){
		this.page.uploadFile('input[type="file"]', '/home/rajatk/Pictures/JavascriptPart1.png');
        	this.click('#insert_image_btn');
	});*/

	driver.then(function(){
		this.click('#previewpost_sbt');
		this.wait(10000,function(){
			driver.capture('Screenshots/previewPost.png');
		});
	});
	driver.then(function(){
		driver.click('#post_submit');
	});
	
	return callback();
};

// method to check posted new topic
exports.checkPostTopicContent = function(content, driver, callback){
console.log("#############################################################################################################");
	var contentMsg = driver.fetchText('div.post-body-content span');
		driver.echo('************ contentMsg : '+contentMsg.length);
		driver.echo('************ content : '+content.length);
		if(contentMsg.trim() == content.trim()){
			casper.log("Successfully content verified", 'error');
		} else {
			casper.log("Error occured in verifying content", 'error');
			driver.capture('contentError.png');
		}
		return callback();
};


//method for clicking on register link
exports.clickOnRegisterLink = function(driver, callback) {
	driver.click('.pull-right a');
	return callback();
};

// method for registration to application
exports.registerToApp = function(username, email, password, signature, birthday, driver, callback) {
	//driver.click('#td_tab_login');
	driver.fill('form[action="/register/create_account"]', {
		'member' : username,
		'email': email,
		'pw' : password,
		'signature' : signature,
		'input[name=birthDatepicker]' : birthday
	}, false); 
	//driver.sendKeys('input[name=birthDatepicker]', birthday);
	driver.click('form[action="/register/create_account"] button');
	return callback();
};

exports.gotoNewPollpage = function(driver, callback) {
	driver.click('a[href="/post/printadd"]');
	//driver.click('form[name="PostTopic"]');
	driver.then(function() {
		//this.wait(7000, function() {
			this.capture('Screenshots/TopicDetails.png');
			this.click('ul li a[href="#poll"]');
		//});
	});
	//driver.capture('Screenshots/TopicDetails.png');
	
	return callback();
};

exports.savePollPage = function(pollQues, publicCheckbox, option1, option2, multiple, timeoutFormate, driver, callback){
	driver.sendKeys('#poll_question',pollQues);
	driver.sendKeys('input[name="public"]',publicCheckbox);
	driver.sendKeys('#poll_option_1 div input',option1);
	driver.sendKeys('#poll_option_2 div input',option2);
	driver.capture("Screenshots/savePoll.png");
	driver.wait(5000,function(){
		driver.click('a[href="#poll-timeout"]');
	});
};

exports.replyTopic = function(content, driver, callback){
	driver.click('form[name="posts"] h4 a');
	
	/*driver.withFrame('message_ifr', function() {
		this.echo("enter message in iframe");
 		this.sendKeys('#tinymce', content);
		this.echo("**************************************");
		driver.capture('Screenshots/replyContent.png');	
	});*/
	driver.then(function(){
		driver.sendKeys('#message',content);
	});
	driver.wait(7000,function(){
		driver.withFrame('message_ifr', function() {
		this.echo("enter message in iframe");
 		this.sendKeys('#tinymce', content);
		this.echo("**************************************");
		driver.capture('Screenshots/replyContent.png');	
	});
	});

	driver.then(function(){
		driver.click('#reply_submit');
	});
	callback();
};

exports.checkPostReply = function(content, driver, callback){
console.log("#############################################################################################################");
	

var contentMsg = driver.getElementInfo('div.post-body-content:nth-last-child(2)').text;

//var contentMsg = driver.fetchText('div.post-body-content');
	/*for(var i=0;i<contentMsg.length;i++){
		console.log("\n"+contentMsg[i]);
	}*/
	/*console.log("gggbvfsdvsdsvsvsvdsvsvsvs : "+contentMsg[0]);
	console.log("gggbvfsdvsdsvsvsvdsvsvsvs : "+contentMsg[1]);
	console.log("gggbvfsdvsdsvsvsvdsvsvsvs : "+contentMsg[2]);
	console.log("gggbvfsdvsdsvsvsvdsvsvsvs : "+contentMsg[10]);*/
	driver.echo('************ contentMsg : '+contentMsg);
	driver.echo('************ content : '+content);
	if(contentMsg.trim() == content.trim()){
		casper.log("Successfully content verified", 'error');
	} else {
		casper.log("Error occured in verifying content", 'error');
		driver.capture('contentError.png');
	}
	return callback();
};

// method for editing user's profile page
exports.editToApp = function(usertitle, whoIsRobot, whoAreYou, driver, callback){
	driver.fill('form[action="/register"]', {
			'field102611' : whoAreYou
		}, false); 
		driver.sendKeys('input[id="field102587_1"]', true);
		driver.click('#change_user_title small');
		driver.fill('form[action="/register"]',{
			'usertitle' : usertitle
		},false);
		driver.click('.editable-buttons');
		driver.click('form[action="/register"] button[name="submit"]');
		return callback();
};

//method for editing user's account setting.
exports.editToAccount = function(userName, password, email, driver, callback) {
	driver.click('#change_user_name small');
	driver.fill('form[action="/register"]',{
		'new_username' : userName
	},false);
	driver.click('.editable-buttons');
	return callback();
};


//method to forgot password
exports.forgotPassword = function(username, Email, driver, callback) {
	driver.fill('form[name="lost_pw_form"]', {
		'member' : username,
		'email' : Email	
	}, true);
	return callback();
};

//method to verify forgot password link
exports.verifyForgotPasswordLink = function(driver, callback) {
	driver.click('#td_tab_login');
	driver.click('#anchor_tab_forget_password');
	driver.wait(7000, function() {
	if(driver.getTitle().indexOf("Lost Your Password?")>=0) {
		console.log("Lost Your Password page is redirected");
	}else{
		console.log("Error occurred on forgot Password");
		driver.capture("ScreenShots/ForgotPasswordError.png");
	}
	});
	return callback();

};


