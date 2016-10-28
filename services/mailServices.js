//This script is responsible for sending mails.
'use strict';
var nodemailer = require('nodemailer');
 
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
mailServices.sendMail = function(emailDetails, callback){
	// setup e-mail data with unicode symbols 
	var mailOptions = {
		"from": 'noresponse@websitetoolbox.com', // sender address 
		"to": 'shipra@websitetoolbox.com',//emailDetails.committerEmail, // list of receivers 
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

