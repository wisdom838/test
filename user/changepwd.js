const mysql = require('mysql');
const md5 = require('md5');
const Email = require('../../controller/common/email.js').Email
var Changepwd = function () { };
Changepwd.prototype.changePassword = function (req, res) {
	req.checkBody('user_type', 'Please enter user_type').notEmpty();
	req.checkBody('uname', 'Please enter username').notEmpty();
	req.checkBody('current_pwd', 'Please enter  current password').notEmpty();
	req.checkBody('new_pwd', 'Please enter  new password').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.send({ "status": false, "error": errors });
	} else {
		CheckUserExists(req, res, callBack);
	}
};
function CheckUserExists(req, res, callback) {
	var params = req.body;
	var uname = params.uname;
	var user_type = params.user_type;
	var current_pwd = params.current_pwd;
	var tbl_name = UMS_MOBILE_USER_REGISTER;
	var pwd = md5(current_pwd);
	var query = "SELECT *  FROM ??  WHERE username =? AND password =? ";
	if (user_type == 1) {
		tbl_name = UMS_USER_LOGIN;
		query = "SELECT * FROM ??  WHERE  logon_name =? AND  password =? ";
	}
	var table = [tbl_name, uname, pwd];
	query = mysql.format(query, table);
	db.query(query, function (err, rows) {
		if (err) {
			callback(err, {}, 1, req, res);
		} else {
			var response = rows.length > 0 ? rows[0] : {};
			callback({}, response, 1, req, res);
		}
	})
}
function updateNewPassword(req, res, data, callback) {
	var params = req.body;
	var uname = params.uname;
	var user_type = params.user_type;
	var new_password = params.new_pwd;
	var pwd = md5(new_password);
	if (user_type == "1") {
		var tbl_name = UMS_USER_LOGIN;
		var userid = data.memberid;
		var query = "UPDATE ?? SET password= ?  WHERE logon_name=?";
	} else if (user_type == "2") {
		var tbl_name = UMS_MOBILE_USER_REGISTER;
		var query = "UPDATE ?? SET password= ? , status =1 WHERE username=?";
	}
	var queryData = [tbl_name, pwd, uname];
	query = mysql.format(query, queryData);
	db.query(query, function (err, result) {
		if (err) {
			callback(err, {}, 2, req, res);
		} else {
			if (user_type == 1) {
				callback({}, data, 3, req, res);
			} else {
				callback({}, data, 2, req, res);
			}
		}
	});

}
function updateGpwd(req, res, data, callback) {
	var params = req.body;
	var tbl_name = UMS_GPWD;
	var uname = params.uname;
	var query = "UPDATE ?? SET status= 1  WHERE username=?";
	var queryData = [tbl_name, uname];
	query = mysql.format(query, queryData);
	db.query(query, function (err, result) {
		if (err) {
			callback(err, {}, 2, req, res);
		} else {
			callback({}, data, 2, req, res);
		}
	});
}
function callBack(err, data, func_type, req, res) {
	if (!isEmptyObject(err)) {
		res.json({ "status": false, "error": err });
	} else if (func_type == 1) {  //updatePassword Method callback
		if (!isEmptyObject(data)) {
			updateNewPassword(req, res, data, callBack);
		} else {
			res.send({ "status": false, "msg": PWD_ERROR_MSG })
		}
	} else if (func_type == 2) { //Upadte success message
		var email = data.email
		if (data.hasOwnProperty("email_id")) {
			email = data.email_id
		}
		Email.sendEmail(req, res, email, CHANGE_PWD_EMAIL_SUBJECT, CHANGE_PWD_EMAIL_MESSAGE, [], {}, emailCallBack)
			res.send({ "status": true, "msg": PWD_UPDATED_MSG });

	} else if (func_type == 3) {  //updateGpwd  method callback
		updateGpwd(req, res, data, callBack);
	}
}
function emailCallBack(err, data, func_type, alertData, req, res) {
	if (!isEmptyObject(err)) {
		res.json({ "status": false, "error": err });
	} else if (func_type == EMAIL_CALLBACK_CODE) { //sendMail Method callback
		// if (isEmptyObject(data)) {
		// 	res.send({ "status": false, "msg": PWD_UPDATED_ERROR_MSG })
		// } else {
		// 	res.send({ "status": true, "msg": PWD_UPDATED_MSG })
		// }
	}
}
function isEmptyObject(obj) {
	for (var key in obj) {
		return false;
	}
	return true;
}
exports.Changepwd = new Changepwd();