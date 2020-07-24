var mysql_conn     = require('../db_connection/db_connection');
//const fetch        = require('node-fetch');
const nodemailer    = require("nodemailer");
var randomstring   = require("randomstring");
const bcrypt      =require("bcrypt");

exports.UserIdValidation = function(pno,email,pass,callback){

	mysql_conn.query('SELECT * FROM signup_table WHERE USER_ID = ?',pno,function(err,data){
		if(err){
			callback(0)
			console.log(err);
		}else if(data.length==0){
			callback(1);
		}else if(data[0].EMAIL_ID!=email){
				callback(2);    
			}
		else{
				var getPassword=data[0].PASSWORD;
				if(bcrypt.compareSync(pass,getPassword))
				{
					callback(data);
				}
				else{
					callback(3);
				}
		}
	})
}
exports.PasswordCreation = function(callback){


      var pass1 = randomstring.generate({
	             length: 3,
	             charset: 'alphabetic',
	             capitalization :'uppercase'
            })
      var k    = randomstring.generate({
	             length: 3,
	             charset: 'alphanumeric',
	             //charset: 'numeric',
	  
            });
var password = pass1+k;
callback(password)

}

exports.LogTable = function(data,callback){

	mysql_conn.query('insert into log_table set ?',data,function(up_data){
		console.log(up_data);
		callback('ok')

	})

}



exports.MessageApi = function(password,email,callback){
	var pno   = 'xxxxxxxxxx';
	var password  = 'xxxxxxxxxx';
	var sender_id = 'xxxxxxx';
	var email  = email;
	var message   = 'One Time Password Ess : ' +password;


fetch('http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID='+user_id +'&Password='+password +'&SenderID=' +sender_id + '&Phno='+phone_no+'&Msg='+message)
    .then((body) =>console.log(body),(response)=>console.log(response));
    callback('ok')

}
//  where is loin page 

exports.EmailApi=async function(email,password,callback){

	   email_id(password,email) 
	  async 	function email_id(password,email) {
  let transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
     user: 'hrithikasarkar16@gmail.com',//testAccount.user, // generated ethereal user enter your email 
     pass: 'Hrithika@123'//testAccount.pass // generated ethereal password
   }
 });

 // send mail with define transport object
 let info = await transporter.sendMail({
   from: '"Password Reset" <.com>', // sender address
   to: email, // list of receivers
   subject: "Password Reset ", // Subject line
   text: "Password has successfully reset and your password is : "+password, // plain text body
   html: "<b>Your one time password is: "+password+"</b>" // html body
 });


 console.log("Message sent: %s", info.messageId);
  
}
callback('ok')
     

}


var email_id=async function(password,email) {
  let transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
     user: '@gmail.com',//testAccount.user, // generated ethereal user
     pass: ''//testAccount.pass // generated ethereal passwor 
   }
 });

 // send mail with defined transport object
 let info = await transporter.sendMail({
   from: '"Password Rset" <.com>', // sender address
   to: 'hrithikasarkar1@gmail.com', // list of receivers
   subject: "Password Reset ", // Subject line
   text: "Password has successfully reset and your password is : "+password, // plain text body
   html: "<b>Password has successfully reset : "+password+"</b>" // html body
 });

 console.log("Message sent: %s", info.messageId);
  
}

exports.OtpValidation = function(otp,callback){

	mysql_conn.query('SELECT * FROM log_table WHERE PASSWORD = ?',otp,function(err,data){
		if(err){
			callback(0)
			console.log(err);
		}else if(data.length==0){
			callback(1);
		}
		else{
			callback(data);
		}
	})
}

exports.PassUpdate = function(newpassword2,pno,callback){
 
 console.log(newpassword2)
  console.log(pno)
	mysql_conn.query('UPDATE signup_table SET PASSWORD = ? WHERE USER_ID = ?',[newpassword2,pno],function(err,data){
		if(err){
			callback(0)
			console.log(err);
		}else if(data.length==0){
			callback(1);
		}
		else{
			callback(data);
		}
	})
}
