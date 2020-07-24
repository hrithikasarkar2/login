var express       = require('express');
var bodyParser    = require('body-parser');
//var mysql_conn     = require('../db_connection/db_connection');
var UV            = require('./router/user_validation');
const {stringify} = require('querystring');
const nodemailer    = require("nodemailer");
const bcrypt      =require("bcrypt");
var session       = require('express-session')

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
const TWO_HOURS = 1000*60*60*2;
const {
    PORT = 3000,
    NODE_ENV      = 'development',
    SESS_NAME     = 'sid',
    SESS_SECRET   = 'QWERTYUIOPASDFGHJKLZXCVBNM',
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV==='producton';
app.use(session({
    name : SESS_NAME,
    resave : false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie :{
        maxAge : SESS_LIFETIME,
        sameSite :true,
        secure :IN_PROD
    }
}))
// User login page
app.get('/',function(req,resp){

     console.log('welcome to login page');
	resp.render('loginnew')
    //resp.render('success',{title:'Home Page',status:'Successfully logged in'})

});

app.post('/',function(req,resp){

    ///  here you write login validation and sedn otp in mobile

    console.log('Login validation page');

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
			//console.log(data)

			req.session.user = data;

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
					                    resp.render('otp',{msg:'success',otp:'otp send'});

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

app.get('/otp',function(req,resp){

	resp.render('otp');
})

app.post('/otp',function(req,resp){
	// here you have to validate otp 


   var otp = req.body.otp
   if(otp!=''){

   	UV.OtpValidation(otp,function(data){
   		if(data==0){
   			console.log('enter error message here')
   			resp.send('database error')
   		}else{
   			console.log('successfully entered otp');
   			console.log(req.session.user)
   			resp.render('passpage')
   		}
   	})
   }

	//console.log(req.body);
	//resp.send('check otp valid or not ')

})

  


app.get('/pass',function(req,resp){

	resp.render('passpage');
})

app.post('/pass',function(req,resp){
	// here you have to validate otp 

    var newpassword2=bcrypt.hashSync(req.body.newpassword2,10);
    console.log(req.session.user[0].USER_ID)
    var pno=req.session.user[0].USER_ID


   // here  you need to creat session for that how to do that sir
   	UV.PassUpdate(newpassword2,pno,function(data){
   		if(data==0){
   			console.log('enter error message here')
   			resp.send('database error')
   		}else if(data==1){
   			console.log('wrong userid');
   			resp.send('invalid userid')
   		}else{
   			console.log('Password Changed');
   			resp.render('success',{msg:'Your password has been changed successfully'})
   		}
   	})
   
})
	
app.listen('90',()=>console.log('Server running at port 90'));