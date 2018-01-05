const mysql = require('mysql');
const Email = require('../../controller/common/email.js').Email
var Signup = function () {};
Signup.prototype.validateParameters = function (req,res) {
	req.checkBody('uname', 'Please enter username').notEmpty()
	req.checkBody('fname', 'Please enter first name').notEmpty()
	req.checkBody('lname', 'Please enter last name').notEmpty()
	req.checkBody('country_code', 'Please enter country code').notEmpty()
	req.checkBody('mobile', 'Please enter mobile').notEmpty()
	req.checkBody('email', 'Please enter email').notEmpty()
	req.checkBody('email', 'Please enter valid email').isEmail()
	var errors = req.validationErrors();
	if (errors) {        
		res.send({ "status": false, "error": errors});
	}else{
		checkUmsUserExist(req,res,callBack)
	}
};
function registerUser(req,res,callback){
	var params = req.body;
	var insertData ={"username":params.uname,"fname":params.fname,"lname":params.lname,"email_id":params.email,"mobile_no":params.mobile,"country_code":params.country_code} 
	var query = "INSERT INTO ?? SET ? ";
	var queryData = [UMS_MOBILE_USER_REGISTER,insertData];
	query = mysql.format(query,queryData);
	console.log(query);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},3,req,res);
		}else{
			callback({},{"user_id":result.insertId},3,req,res);
		}
	})
}

function checkUmsUserExist(req,res,callback){
	var params = req.body;
	var query = "SELECT logon_name,email,mobile FROM ?? WHERE logon_name=? OR mobile=? OR email=? ";
	var queryData = [UMS_USER_LOGIN,params.uname,params.mobile,params.email];
	query = mysql.format(query,queryData);
	console.log(query);
	db.query(query,function(err,rows){
		if (err) {
			callback(err,{},1,req,res);
		}else{
			callback({},rows,1,req,res);
		}
	})
}


function checkAppUserExist(req,res,callback){
	var params = req.body;
	var query = "SELECT username,email_id as email,mobile_no as mobile FROM ?? WHERE username=? OR mobile_no=? OR email_id=?";
	var queryData = [UMS_MOBILE_USER_REGISTER,params.uname,params.mobile,params.email];
	query = mysql.format(query,queryData);
	console.log(query);
	db.query(query,function(err,rows){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},rows,2,req,res);
		}
	})
}

function isEmptyObject(obj) {
	for (var key in obj) {		
		return false;
	}
	return true;
}

function callBack(err,data,func_type,req,res) {
	if (!isEmptyObject(err) ) {
		res.json({"status":false,"error":err});
	}else if (func_type == 1) {
		if (!isEmptyObject(data) ) {
			res.send({"status":false,"msg":SIGNUP_USER_EXIST});
		}else{
			checkAppUserExist(req,res,callBack)
		}
	}else if (func_type == 2) {
		if (!isEmptyObject(data) ) {
			res.send({"status":false,"msg":SIGNUP_USER_EXIST});
		}else{
			registerUser(req,res,callBack)
		}
	}else if (func_type == 3) {
		var params = req.body;
		var email = params.email;
		var uname = params.uname;
		var chars = '0123456789';
		var length = 6;
		var verify_code = '';
		for (var i = length; i > 0; --i) verify_code += chars[Math.round(Math.random() * (chars.length - 1))];
		var msg = SIGNUP_EMAIL_MESSAGE;
		var replacedata = [verify_code,uname];
		var j = 0;
		while (msg.indexOf("??") >= 0) { msg = msg.replace("??", replacedata[j++]); }
	    Email.sendEmail(req, res, email, SIGNUP_EMAIL_SUBJECT, msg, [], {}, emailCallBack);	
	}
}
function emailCallBack(err, data, func_type, alertData, req, res) {
	if (!isEmptyObject(err)) {
		res.json({ "status": false, "error": err });
	} else if (func_type == EMAIL_CALLBACK_CODE) { //sendMail Method callback
		res.send({"status":true,"msg":SIGNUP_SUCESS_MSG});
	}
}
exports.Signup = new Signup();