const mysql = require('mysql');
const md5 = require('md5');
const Email = require('../../controller/common/email.js').Email
var Forgotpwd = function () { };
Forgotpwd.prototype.forgotPassword = function (req, res) {
	req.checkBody('uname', 'Please enter username').notEmpty()
	req.checkBody('email', 'Please enter Email').notEmpty()
	req.checkBody('email', 'Please enter valid email').isEmail()
	var errors = req.validationErrors();
	if (errors) {
		res.send({ "status": false, "error": errors });
	} else {
		CheckUserExists(req, res, 1, callBack);
	}
};
function CheckUserExists(req, res, user_type, callback) {
	var params = req.body;
	var uname = params.uname;
	var email = params.email;
	var tbl_name = UMS_MOBILE_USER_REGISTER;
	var query = "SELECT fname,lname, id as user_id  FROM ??  WHERE username =? AND email_id =? AND status = 1";
	if (user_type == 1) {
		tbl_name = UMS_USER_LOGIN;
		query = "SELECT fname,lname, memberid FROM ??  WHERE  logon_name =? AND  email =? ";
	}
	var table = [tbl_name, uname, email];
	query = mysql.format(query, table);
	db.query(query, function (err, rows) {
		if (err) {
			callback(err, {}, user_type, req, res);
		} else {
			var response = rows.length > 0 ? rows[0] : {};
			callback({}, response, user_type, req, res);
		}
	})
}
function updatePassword(req, res, data, callback) {
	var params = req.body;
	var uname = params.uname;
	var email_id = params.email;
	var length = 6;
	var password = '';
	var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
	for (var i = length; i > 0; --i) password += chars[Math.round(Math.random() * (chars.length - 1))];
	if (!isEmptyObject(data)) {
		if (typeof data.user_id != "undefined" && data.user_id != null) {
			var tbl_name = UMS_MOBILE_USER_REGISTER;
			var userid = data.user_id;
			var query = "UPDATE ?? SET password= ?  WHERE id =?";
		} else if (typeof data.memberid != "undefined" && data.memberid != null) {
			var tbl_name = UMS_USER_LOGIN;
			var userid = data.memberid;
			var query = "UPDATE ?? SET password= ?  WHERE memberid=?";
		}
		var queryData = [tbl_name, md5(password), userid];
		query = mysql.format(query, queryData);
		db.query(query, function (err, result) {
			if (err) {
				callback(err, {}, 4, req, res);
			} else {
				var temp = { "user_id": userid, "pwd": password, "name": uname, "email_id": email_id };
				callback({}, temp, 3, req, res);
			}
		});
	}
}
function callBack(err, data, func_type, req, res) {
	if (!isEmptyObject(err)) {
		res.json({ "status": false, "error": err });
	} else if (func_type == 3) { //updatePassword Method callback
		if (!isEmptyObject(data)) {
			var msg = FORGOT_PWD_EMAIL_MESSAGE;
			var replacedata = [data.name, data.pwd];
			var i = 0;
			while (msg.indexOf("?") >= 0) { msg = msg.replace("?", replacedata[i++]); }
			Email.sendEmail(req, res, data.email_id, FORGOT_PWD_EMAIL_SUBJECT, msg, [], {}, emailCallBack)
		}
		else {
			res.send({ "status": false, "msg": FORGOT_PWD_ERR_MSG })
		}
	} else if (func_type == 1) {  //updatePassword Method callback
		if (!isEmptyObject(data)) {
			updatePassword(req, res, data, callBack);
		} else {
			CheckUserExists(req, res, 2, callBack);
		}
	} else if (func_type == 2) {  //updatePassword Method callback
		if (!isEmptyObject(data)) {
			updatePassword(req, res, data, callBack);
		} else {
			res.send({ "status": false, "msg": FORGOT_PWD_ERR_MSG })
		}
	} else if (func_type == 4) {  //updatePassword Method Err callback
		res.send({ "status": false, "msg": FORGOT_PWD_UPDATE_ERR_MSG })
	}
}

function emailCallBack(err, data, func_type, alertData, req, res) {
	if (!isEmptyObject(err)) {
		res.json({ "status": false, "error": err });
	} else if (func_type == EMAIL_CALLBACK_CODE) { //sendMail Method callback
		if (isEmptyObject(data)) {
			res.send({ "status": false, "msg": FORGOT_PWD_ERR_MSG })
		} else {
			res.send({ "status": true, "msg": FORGOT_PWD_SUCCESS_MSG })
		}
	}
}
function isEmptyObject(obj) {
	for (var key in obj) {
		return false;
	}
	return true;
}
exports.Forgotpwd = new Forgotpwd()