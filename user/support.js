const mysql = require('mysql');
var unixTime = require('unix-time');
const Email = require('../../controller/common/email.js').Email
var Support = function () { };
Support.prototype.supportemail = function (req, res) {
	req.checkBody('message', 'Please enter message').notEmpty();
	req.checkBody('name', 'Please enter name').notEmpty();
	req.checkBody('email', 'Please enter email').notEmpty();
	req.checkBody('email', 'Please enter valid email').isEmail()
	var errors = req.validationErrors();
	if (errors) {
		res.send({ "status": false, errors: errors });
	} else {
		insertSupportDetails(req, res, callBack);
	}
};

function insertSupportDetails(req, res, callback) {
	var params = req.body;
	var req_email = params.email;
	var req_msg = params.message;
	var req_name = params.name;
	var insertData = { "req_name": req_name, "req_msg": req_msg, "req_email": req_email, "created_date": unixTime(new Date()) };
	tbl_name = UMS_SUPPORT;
	var query = "INSERT INTO ?? SET ? ";
	var queryData = [tbl_name, insertData];
	query = mysql.format(query, queryData);
	db.query(query, function (err, result) {
		if (err) {
			callback(err, {}, 0, req, res);
		}
		else {
			// console.log("kkk");
			Email.sendEmail(req, res, SUPPORT_EMAIL, SUPPORT_EMAIL_SUBJECT, req_msg, [], {}, callback)
			Email.sendEmail(req, res, req_email, SUPPORT_EMAIL_SUBJECT, SUPPORT_ACK_MESSAGE, [], { "ack": true }, callback)
		}
	});
}
function callBack(err, data, func_type, callbackdata, req, res) {
	if (!isEmptyObject(err)) {
		res.json({ "status": false, data: err });
	} else if (func_type == EMAIL_CALLBACK_CODE) {
		if (!isEmptyObject(callbackdata))
			res.json({ "status": true, "msg": EMAIL_SUCCESS_MSG });
	}
}
function isEmptyObject(obj) {
	for (var key in obj) {
		return false;
	}
	return true;
}
exports.Support = new Support();