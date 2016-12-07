//This script is responsible for sending mails.
'use strict';
var nodemailer = require('nodemailer');
var fs = require('fs');
var mailServices = module.exports = {};

//defining SMTP configuration
var smtpConfig = {
    host: 'mail.websitetoolbox.com',
    port: 587,
    secure: false // use SSL 
};
 
// create reusable transporter object using the SMTP configuration
var transporter = nodemailer.createTransport(smtpConfig);
 
// send mail with defined transport object 
fs.readdir("../automationScripts/failedScreenshots", function (err, data) {
	if(err) {
	
	}else {
		mailServices.sendMail = function(emailDetails, callback){
			// setup e-mail data with unicode symbols 
			var mailOptions = {
				"from": 'noresponse@websitetoolbox.com', // sender address 
				"to": emailDetails.committerEmail, // 'shipra@websitetoolbox.com',//list of receivers 
				"subject": "Forum test result: "+emailDetails.branchName, // Subject line 
				"text": 'Hello ' + emailDetails.committerName+",\n\n Following is the automation test result: \n"+emailDetails.testResult+"\nPlease find details of the automation test result attached herewith. \n" , // plaintext body 
				"attachments": emailDetails.attachments //attachments
			};
			console.log("mailOptions : "+JSON.stringify(mailOptions));
			//Initiating mail sending
			transporter.sendMail(mailOptions, function(error, info){
				if(error){
					return callback(error);
				}
				console.log('Message sent: ' + info.response);
				return callback();
			});
		};
	}
	mailer.send_mail({       
	sender: 'sender@sender.com',
	to: 'dest@dest.com',
	subject: 'Attachment!',
	body: 'mail content...',
	attachments: [{'filename': 'attachment.txt', 'content': data}]
	}), function(err, success) {
	if (err) {
	    // Handle error
	}

	}
});
