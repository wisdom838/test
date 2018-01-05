	const mysql = require('mysql');
	var unixTime = require('unix-time');
	var UpdateUserProfile = function () {};
	UpdateUserProfile.prototype.validateParams = function (req,res) {
		var user_type = 0;
		var req_params = req.body;
		req.checkBody('user_type', 'User Type not available').notEmpty();
		
		if(req_params.hasOwnProperty("user_type") && req_params.user_type == 1)
		req.checkBody('member_id', 'Member Id not avilable').notEmpty();

		if(req_params.hasOwnProperty("user_type") && req_params.user_type == 2)	
			req.checkBody('user_id', 'User Id not avilable').notEmpty();

		req.checkBody('fname', 'Please enter first name').notEmpty();
		req.checkBody('lname', 'Please enter last name').notEmpty();
		req.checkBody('mobile', 'Please enter mobile number').notEmpty();
		req.checkBody('email', 'Please enter email address').notEmpty();

		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, "error": errors});
		}else{
			updateGeneralUserDetails(req,res,callBack);
		}
	};
	function updateGeneralUserDetails(req,res,callback){
		var params = req.body;
		var user_type = params.user_type;
		var userId  = 0;
		var query = "UPDATE ?? SET fname= ?,lname=?,mobile_no=?,email_id=?,modified_date=? WHERE "
		if(user_type == 1){
			userId = params.member_id
			query += " memberid=?"
		}else{
			query += " user_id=?"
			userId = params.user_id
		}
		var cur_date = unixTime(new Date());
		var queryData = [UMS_MOBILE_USER_REGISTER,params.fname,params.lname,params.mobile,params.email,cur_date,userId];
		query = mysql.format(query,queryData);
		db.query(query,function(err,result){
			if (err) {
				callback(err,{},0,req,res);
			}else{
				if(user_type == 1){					
					updateApplicationUserDetails(req,res,callBack)					
				}else {					
					res.send({"status":true,"msg":UPDATE_PROFILE_SUCCESS_MSG})
				}
			}
		});
	}

	function updateApplicationUserDetails(req,res,callback){
		var params = req.body;
		var cur_date = unixTime(new Date());
		var query = "UPDATE ?? SET fname= ?,lname=?,mobile=?,email=?,modified_date=? WHERE memberid=?"
		var queryData = [UMS_USER_LOGIN,params.fname,params.lname,params.mobile,params.email,cur_date,params.member_id];
		query = mysql.format(query,queryData);
		db.query(query,function(err,result){
			if (err) {
				callback(err,{},0,req,res);
			}else{
				if(result.changedRows > 0)					
					res.send({"status":true,"msg":UPDATE_PROFILE_SUCCESS_MSG})
				else
					res.send({"status":false,"msg":UPDATE_PROFILE_ERROR_UNKNOWN_MSG})
			}
		});
	}

	function callBack(err,data,func_type,req,res) {
		if (!isEmptyObject(err) ) {
			res.json({"status":false,"error":err});
		}else if(func_type == 2){ //updateuserprofiledetails Method
			res.send({"status":true,"msg":UPDATE_MSG})
		}
	}

	function isEmptyObject(obj) {
		for (var key in obj) {		
			return false;
		}
		return true;
	}
	exports.UpdateUserProfile = new UpdateUserProfile();