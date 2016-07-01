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
		subject: emailDetails.committerId, // Subject line 
		text: 'Hello ' + emailDetails.committerName+",\n\n Please find details of the commit reult aatached herewith." , // plaintext body 
		html: '<b>Hello world</b>' // html body 
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return callback(error);
		}
		console.log('Message sent: ' + info.response);
		return callback();
	});
};

