var express       = require('express');
var bodyParser    = require('body-parser');
//var mysql_conn     = require('../db_connection/db_connection');
var UV            = require('./router/user_validation');
const {stringify} = require('querystring');
const nodemailer    = require("nodemailer");
const bcrypt      =require("bcrypt");

var app = express();
app.set('port', process.env.PORT || 90);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });

//console.log('log file ')
app.get('/',function(req,resp){

	resp.render('loginnew')
    //resp.render('success',{title:'Home Page',status:'Successfully logged in'})

});

/*app.get('/otpsend',function(req,resp){

	var query = "SELECT * FROM log_table WHERE USER_ID=?";
	mysql_conn.query(query,'1234',function(err,data){
		if(!err){
			console.log(data);
			resp.render('otp',{title:'Otp verification',status:'Enter OTP sent to your mobile number',data:data})


		}else{
			console.log(err)
		}
	})
})*/

app.post('/',function(req,resp){

    var pno =req.body.pno
    var email =req.body.email
    var pass=req.body.pass
    //resp.render('success',{title:'Home Page',status:'Successfully logged in'})
    UV.UserIdValidation(pno,email,pass,function(data){
		if(data==0){
			console.log('Database Error');
			resp.render('success',{error_id:0,msg:'Database Error'});

		}else if(data==1){
			console.log('Invalid User Id')
			resp.render('success',{error_id:1,msg:'Invalid User Id'});
		}else if(data==2){
			console.log('Invalid Email ID');
			resp.render('success',{error_id:2,msg:'Invalid Email ID'});
		}else if(data==3){
			console.log('Invalid Password');
			resp.render('success',{error_id:3,msg:'Invalid Password'});
		}/*else{
			resp.render('success',{error_id:3,msg:'Login Successfully'});// change msg to status
		}*/else{

			UV.PasswordCreation(function(password){ 

				/*UV.RfcConnection(pno,email,function(result){*/

					if(1){//result=='ok'){  / BY PASS RESULT STATUS
				//console.log(password)
						    UV.EmailApi(email,password,function(msg_id){  // PasswordSend
									console.log(msg_id);
									
									//UV.CaptchaVerification(capctha_vale,query,function(cap_msg){
										//console.log(cap_msg);
									//})
									
								if(1){//msg_id != 400){  BY PASS error
									var insert_data = {
										USER_ID  :pno,
										EMAIL_ID :email,
										MSG_ID   :msg_id,
										PASSWORD :password,
										IP_ADD   :req.connection.remoteAddress,
										DATE     :'',
										TIME     :''
									}
									UV.LogTable(insert_data,function(data){

										console.log('Valid Employee Id ')
					                    resp.status(200).send('ok');

									})
								} else{
									console.log('Invalid user id')
									resp.status(400).send({error_id:2,msg:'Invalid Email'});

								}
						            

						})
					}else{
						console.log('RFC Error')
					     resp.status(400).send({error_id:4,msg:'Probelm related to admin'});

					}


						
		    /*})*/

			})		
		}
		
	})
 

	
})


app.get('/email',function(req,resp){

	//                                                                                email_id('kjhskjbdf','hrithikasarkar16@gmail.com') 

  async function email_id(password,email) {
  let transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
     user: 'hrithikasarkar16@gmail.com',//testAccount.user, // generated ethereal user enter your email 
     pass: 'Hrithika@123'//testAccount.pass // generated ethereal password
   }
 });

 // send mail with defined transport object
 let info = await transporter.sendMail({
   from: '"Password Reset" <.com>', // sender address
   to: email, // list of receivers
   subject: "Password Reset ", // Subject line
   text: "Password has successfully reset and your password is : "+password, // plain text body
   html: "<b>Password has successfully reset : "+password+"</b>" // html body
 });


 console.log("Message sent: %s", info.messageId);
  
}
resp.send('checking')

})

app.post('/',function(req,resp){
 UV.OtpValidation(password,function(data){
		if(data==0){
			console.log('Database Error');
			resp.render('otp',{error_id:0,msg:'Database Error'});

		}else{
			resp.render('otp',{error_id:1,msg:'Login Successfull'});// change msg to status
			}



})
})

app.post('/pass',function(req,resp){
 UV.PassUpdate(newpassword2,pno,function(data){
		if(data==0){
			console.log('Database Error');
			resp.render('success',{error_id:0,msg:'Database Error'});

		}else if(data==1){
			console.log('Invalid User Id')
			resp.render('success',{error_id:1,msg:'Invalid User Id'});
		else{
			resp.render('success',{error_id:1,msg:'Your password has been changed successfully'});// change msg to status
			}

}
})
})




app.listen('90',()=>console.log('Server running at port 90'));