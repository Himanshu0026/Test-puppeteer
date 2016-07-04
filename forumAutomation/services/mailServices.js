'use strict';
var nodemailer = require('nodemailer');
 
// create reusable transporter object using the default SMTP transport

var mailServices = module.exports = {};

var smtpConfig = {
    host: 'mail.websitetoolbox.com',
    port: 587,
    secure: false // use SSL 
};
 
var transporter = nodemailer.createTransport(smtpConfig);
 
// send mail with defined transport object 
mailServices.sendMail = function(emailDetails, callback){
	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: 'noresponse@websitetoolbox.com', // sender address 
		to: emailDetails.committerEmail, // list of receivers 
		subject: emailDetails.commitId, // Subject line 
		text: 'Hello ' + emailDetails.committerName+",\n\n Automation test result: "+emailDetails.testResult+"\n\nPlease find details of the automation test result attached herewith. " , // plaintext body 
		attachments: emailDetails.attachments 
	};
	console.log("mailOptions : "+JSON.stringify(mailOptions));
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return callback(error);
		}
		console.log('Message sent: ' + info.response);
		return callback();
	});
};

