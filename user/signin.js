const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Signin = function () {};
Signin.prototype.validateUser = function (req,res) {
	req.checkBody('uname', 'Please enter username').notEmpty()
	req.checkBody('upwd', 'Please enter password').notEmpty()
	req.checkBody('device_id', 'Please send app device token').notEmpty()
	req.checkBody('device_os', 'Please send device os').notEmpty()
	req.checkBody('device_type', 'Please send device type 1 for ios And 2 for android').notEmpty()
	var errors = req.validationErrors();
	if (errors) {        
		res.send({ "status": false, "error": errors});
	}else{
		isUMSUser(req,res,callBack)
	}
};
function isUMSUser(req,res,callback){
	var params = req.body;
		var uname = params.uname;
		var upwd = params.upwd;
		var query = "SELECT concat(CONCAT(UCASE(LEFT(ul.fname, 1)), SUBSTRING(ul.fname, 2)),' ',upper(ul.lname)) name,ul.fname,ul.lname,ul.memberid,ul.logon_name,ul.email,ul.mobile,mr.id as user_id,1 as 'user_type',mr.profile_pic FROM ?? as ul JOIN ?? as ur ON ul.memberid=ur.user_memberid LEFT JOIN ?? as mr ON mr.memberid = ul.memberid WHERE ul.logon_name=? AND ul.password=? AND ul.active=1 AND ur.status =1 GROUP BY ur.user_memberid";
		var table = [UMS_USER_LOGIN,UMS_USER_TO_ROLES,UMS_MOBILE_USER_REGISTER,uname,md5(upwd)];
		query = mysql.format(query,table);
		console.log(query);
		db.query(query,function(err,rows){
			if (err) {
				callback(err,{},1,req,res);
			}else{
				var response = rows.length>0?rows[0]:{};
				callback({},response,1,req,res);
			}
		})
}
function isGeneralUser(req,res,callback){
		var params = req.body;
		var uname = params.uname;
		var upwd = params.upwd;
		var query = "SELECT concat(CONCAT(UCASE(LEFT(fname, 1)), SUBSTRING(fname, 2)),' ',upper(lname)) name, id as user_id,fname,lname,mobile_no as mobile,username as logon_name,email_id as email,2 as 'user_type' FROM ?? as mr WHERE username=? AND password=? AND status=1";
		var table = [UMS_MOBILE_USER_REGISTER,uname,md5(upwd)];
		query = mysql.format(query,table);
		console.log(query);
		db.query(query,function(err,rows){
			if (err) {
				callback(err,{},2,req,res);
			}else{
				var response = rows.length>0?rows[0]:{};
				callback({},response,2,req,res);
			}
		})
}

function registerGeneralUser(req,res,params,callback) {
	var cur_date = unixTime(new Date());
	var insertData= {"username":params.logon_name,"fname":params.fname,"lname":params.lname,"email_id":params.email,"mobile_no":params.mobile,"memberid":params.memberid,"created_date":cur_date,"activation_status":1}
	var query = "INSERT INTO ?? SET ? ";
	var queryData = [UMS_MOBILE_USER_REGISTER,insertData];
	query = mysql.format(query,queryData);
	// console.log(query);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},4,req,res);
			console.log(err);
		}else{
			var reqParams = req.body;
			reqParams['user_id'] = result.insertId;
			checkDeviceTokenExist(reqParams);			
			console.log(result.insertId+":Application User Added as general user");
		}
	})
}

function checkDeviceTokenExist(params){
	var query = "SELECT user_id FROM ?? WHERE user_id=? AND device_id=?"
	var queryData = [UMS_USER_DEVICE_TOKENS,params.user_id,params.device_id];
	query = mysql.format(query,queryData);
	console.log(query);
	db.query(query,function(err,rows){
		if (err) {
			devicetokencallback(err,{},{},1);
		}else{
			console.log(rows.length);
			insertDeviceToken(params,rows.length);
			// devicetokencallback({},params,rows,1);
		}
	})
}
function insertDeviceToken(params,rec_count){	
	var cur_date = unixTime(new Date());
	var query = "UPDATE ?? SET status=0,modified_date=?,device_os=?,on_device_status=0 WHERE device_id=?"
	var queryData = [UMS_USER_DEVICE_TOKENS,cur_date,params.device_os,params.device_id];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			console.log(err);
		}else{
			console.log(rec_count);
			if (rec_count > 0) {
				query = "UPDATE ?? SET status=1,modified_date=?,device_os=?,on_device_status=1 WHERE user_id=? AND device_id=?"
				queryData = [UMS_USER_DEVICE_TOKENS,cur_date,params.device_os,params.user_id,params.device_id];				
				query = mysql.format(query,queryData);
				console.log(query);
				db.query(query,function(err,result){
					if (err) {
						console.log(err);
					}
				})
			}else{
				query = "INSERT INTO ?? SET user_id=?,status=1,created_date=?,device_os=?,on_device_status=1,device_id=?,device_type=?"
				queryData = [UMS_USER_DEVICE_TOKENS,params.user_id,cur_date,params.device_os,params.device_id,params.device_type];
				query = mysql.format(query,queryData);
				db.query(query,function(err,result){
					if (err) {
						console.log(err);
					}
				})
			}
		}
	})
	
}

function getMobileAppLinks(req,res,login_data,callback){
	var params = req.body;
	
	// if (params.hasOwnProperty('env_type')) {
		// env_type =params['env_type'];
	// }
	var query = "SELECT api_name,CONCAT(aht.api_base_path,ap.api_path) as api_path,is_custom,api_custom_path FROM ?? as ht INNER JOIN ?? as aht ON ht.id = aht.host_type_id INNER JOIN ?? as ap  ON aht.id = ap.api_host_type_id WHERE ht.host_type=?";
	var table = [UMS_HOST_TYPES,UMS_API_HOST_TYPES,UMS_API_PATHS,envType];
	query = mysql.format(query,table);
	console.log(query)
	db.query(query,function(err,rows){
		if (err) {
			callback(err,{},3,req,res);
		}else{
			each(rows,function (obj, key, array) {
				var api_name = obj['api_name'];
				var is_custom = obj['is_custom'];
				api_name = api_name.replace(/\s/g, '');
				if(is_custom == 1){
					login_data[api_name] = obj['api_custom_path']
				}else {
					login_data[api_name] = obj['api_path'];
				}
			}); 		
			callback({},login_data,3,req,res);
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
	}else if (func_type == 1) { //isUMSUser Method callback
		if (!isEmptyObject(data)) {
			var user_id = data.user_id;
			if (user_id == null) {
				registerGeneralUser(req,res,data,callBack)
			}else{
				var reqParams = req.body;
				reqParams['user_id'] = user_id;
				checkDeviceTokenExist(reqParams,deviceTokenCallBack);
			}
			getMobileAppLinks(req,res,data,callBack)
		}else{
			isGeneralUser(req,res,callBack)
		}
	}else if (func_type ==2) {//isGeneralUser Method callback
		if (!isEmptyObject(data)) {
			var reqParams = req.body;
			reqParams['user_id'] = data.user_id;
			checkDeviceTokenExist(reqParams,deviceTokenCallBack);
			getMobileAppLinks(req,res,data,callBack)
		}else{
			res.json({"status":false,"msg":SIGNIN_ERR_MSG});
		}
	}else if (func_type == 3) { //getMobileAppLinks Method callback
		if (!isEmptyObject(data)) {			
			res.json({"status":true,"data":data});
		}else{
			res.json({"status":false,"msg":"Invalid username & password"});
		}
	}
}
function deviceTokenCallBack(err,params,data,func_type){
	if (!isEmptyObject(err) ) {
		res.json({"status":false,data:err});
	}else{
		// insertDeviceToken(params)
	}
}
exports.Signin = new Signin();