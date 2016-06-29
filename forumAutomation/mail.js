var nodemailer = require('nodemailer');
 
// create reusable transporter object using the default SMTP transport

var smtpConfig = {
    host: 'mail.websitetoolbox.com',
    port: 587,
    secure: false // use SSL 
    
};
 
var transporter = nodemailer.createTransport(smtpConfig);
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: 'monika@websitetoolbox.com', // sender address 
    to: 'monika@websitetoolbox.com', // list of receivers 
    subject: 'Hello', // Subject line 
    text: 'Hello world', // plaintext body 
    html: '<b>Hello world</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


