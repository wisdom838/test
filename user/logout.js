	const mysql = require('mysql');
	var Logout = function () {};
	Logout.prototype.logout = function (req,res) {
		req.checkBody('user_id', 'Please enter user_id').notEmpty();
		req.checkBody('device_id', 'Please enter device_id').notEmpty();
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			UpdateUserStatus(req,res,callBack);
		}
	};
	function UpdateUserStatus(req,res,callback){
		var params = req.body;
		var user_id = params.user_id;
		var device_id = params.device_id;
		var tbl = UMS_USER_DEVICE_TOKENS;
		var query = " UPDATE ?? SET status = 0 WHERE user_id = ? AND device_id = ? ";
		var queryData = [tbl,user_id,device_id];
		query = mysql.format(query,queryData);
		db.query(query,function(err,rows){
			if (err) {
				callback(err,{},0,req,res);
			}else{
				callback({},1,1,req,res);
			}
		});
	}
	function callBack(err,data,func_type,req,res) {
		if (!isEmptyObject(err) ) {
			res.json({"status":false,"error":err});
		}else if(func_type == 1){ //UpdateUserStatus Method
			res.send({"status":true,"msg":UPDATE_MSG})
		}
	}
	function isEmptyObject(obj) {
		for (var key in obj) {		
			return false;
		}
		return true;
	}
	exports.Logout = new Logout();