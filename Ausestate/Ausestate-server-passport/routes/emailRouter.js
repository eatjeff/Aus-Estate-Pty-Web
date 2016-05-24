var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var express = require('express');
var smtpTransport = require("nodemailer-smtp-transport");

var emailRouter = express.Router();
emailRouter.use(bodyParser.json());

emailRouter.route('/')
.post(function (req, res, next) {

    var commentorFirstname = req.body.firstName;
    var commentorLastname = req.body.lastName;
    var commentorTel = req.body.telnumber;
    var commentorEmail = req.body.email;
    var commentorAgree = req.body.agree;
    var commentorChannel = req.body.mychannel[0];
    var commentorComments = req.body.comments;

    //console.log(req.body)

    var transporter = nodemailer.createTransport(smtpTransport({
    host : "smtp.gmail.com",
    secureConnection: true,
    port: 465,
    auth : {
        user : "dabeige@gmail.com",
        pass : "15298384543"
    }
	}));

    console.log('SMTP Configured');

    var mailOptions = {
    from: '"Jeff YAO 👥" <dabeige@gmail.com>', // sender address
    to: '"ausestate" <1063083591@qq.com>', // list of receivers
    subject: 'Feedback on Website', // Subject line
    text: 'Hello world\n'+
           'guestfirstName:'+ commentorFirstname+'\n'+
           'guestlastName:'+ commentorLastname+'\n'+
           'guesttelnumber:' +commentorTel+'\n'+
           'guestemail:'+commentorEmail+'\n'+
           'guestagree:'+commentorAgree+'\n'+
           'guestpreferchannel:'+commentorChannel+'\n'+
           'guestComments:'+commentorComments
	};

	console.log('Sending Mail');

	transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log(response.response.toString());
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
        
        console.log('Send the email successfully');
        res.end('Send the email successfully');
});


module.exports = emailRouter;