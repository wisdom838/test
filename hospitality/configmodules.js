const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage.js');

var Configmodules = function () { };
Configmodules.prototype.addconfigmodule = function (req,res) {

	console.log("1");
	console.log(HMS_AUTHENTICATION);
  //var auth_token = req.get(HMS_AUTHENTICATION);
  //	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
  //  var Auth = new auth(req);
	//console.log(Auth.memberid);
        req.checkBody('module_name', 'Please enter module_name').notEmpty();
      //  req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {

            res.send({ "status": false, errors: errors});
        }else{
            CheckAddConfigModuleExists(req,res,callBack);
        }
 
};

Configmodules.prototype.setconfigmodule = function (req,res) {
	
		console.log("1");
	   		req.checkBody('module_id', 'Please enter module_id').notEmpty();
			req.checkBody('module_name', 'Please enter module_name').notEmpty();
		//	req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				CheckUpdateConfigModuleExists(req,res,callBack);
			}
	 
	};



Configmodules.prototype.getconfigmodule = function (req,res) {

	req.checkBody('module_id', 'Please enter module_id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getConfigModule(req,res,callBack);
	}
	
};

Configmodules.prototype.delconfigmodule = function (req,res) {
	
	req.checkBody('module_id', 'Please enter module_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteConfigModule(req,res,callBack);
		}	
	
};


function CheckAddConfigModuleExists(req,res,callback){
	var params = req.body;
	var module_name = params.module_name;
	var tbl_name = HMS_HOSP_CONFIG_MODULES;

	var query1 = "select * from ?? where module_name = ? ";
	var queryData1 = [tbl_name,module_name];

	query1 = mysql.format(query1,queryData1);
	console.log(query1);
	db.query(query1,function(err,rows){
		if(err){
			console.log(err);
			callback(err,{},1,req,res);
		}else{
			console.log(rows);
			if (!isEmptyObject(rows)){
				res.send({"status":true,"msg":DATA_EXIST_MSG});
			}else{
				InsertConfigModule(req,res,rows,callBack);
			}
		}
    });

}


function CheckUpdateConfigModuleExists(req,res,callback){
	var params = req.body;
	var module_id = params.module_id;
	var module_name = params.module_name;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_CONFIG_MODULES;

	if(typeof module_id!= "undefined"){
		var query1 = "select * from ?? where module_name = ? and module_id not in (?) ";
		var queryData1 = [tbl_name,module_name,module_id];
	}

	query1 = mysql.format(query1,queryData1);
	console.log(query1);
	db.query(query1,function(err,rows){
		if(err){
			console.log(err);
			callback(err,{},1,req,res);
		}else{
			console.log(rows);
			if (!isEmptyObject(rows)){
				res.send({"status":true,"msg":DATA_EXIST_MSG});
			}else{
				//callback({},rows,1,req,res);				
				UpdateConfigModule(req,res,rows,callBack);
			}			
		}

	});

}

/*
function ChcekItemCategoryExists(req,res,callback){
	var params = req.body;
	var item_category_id = params.item_category_id;
	var item_category = params.item_category;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_ITEM_CATEGORY;

	if(typeof item_category_id!= "undefined"){
		var query1 = "select * from ?? where item_category_name = ? and item_category_id not in (?) ";
		var queryData1 = [tbl_name,item_category,item_category_id];
	}else{
		var query1 = "select * from ?? where item_category_name = ? ";
		var queryData1 = [tbl_name,item_category];
    }
	query1 = mysql.format(query1,queryData1);
	console.log(query1);
	db.query(query1,function(err,rows){
		if(err){
			console.log(err);
		}else{
			console.log(rows);
			if (!isEmptyObject(rows)){
				res.send({"status":true,"msg":DATA_EXIST_MSG});
			}else{
				//callback({},rows,1,req,res);
				if(typeof item_category_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE item_category_id= ? ";
					var queryData = [tbl_name,item_category_id];
					query = mysql.format(query,queryData);
					db.query(query,function(err,rows){
						if (err) {
							callback(err,{},1,req,res);
						}else{
							callback({},rows,1,req,res);
						}
					});
				   }else{				
				   callback({},rows,1,req,res);
				   } 
			}			
		}

	});

}  */

function InsertConfigModule(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_MODULES;
    var module_name = params.module_name;
    //var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	//var auth = new auth(req);
	var memberid = Auth.memberid;
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (module_name,created_by,created_date) values (?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,module_name,memberid];
	query = mysql.format(query,queryData);
	console.log(query);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	});
}

function UpdateConfigModule(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_MODULES;
	var module_id = params.module_id;
    var module_name = params.module_name;
	//var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;
		
	var query = "UPDATE ?? SET 	module_name= ? , modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( module_id = ?)";
	var queryData = [tbl_name,module_name,memberid,module_id];
	query = mysql.format(query,queryData);
	console.log(query);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},3,req,res);
		}else{
			callback({},data,3,req,res);
		}
	});
}


function DeleteConfigModule(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_MODULES;
    var module_id = params.module_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (module_id= ?)";
	var queryData = [tbl_name,module_id];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},4,req,res);
		}else{
			
			console.log("Number of records deleted: " + result.affectedRows);
			if(result.affectedRows>0)
			res.send({"status":true,"msg":DELETE_MSG});
			if(result.affectedRows ==0)
			res.send({"status":true,"msg":NORECORD_MSG});
			//callback({},data,4,req,res);
		}
	});
}


function callBack(err,data,func_type,req,res) {
	if (!isEmptyObject(err) ) {
		res.json({"status":false,"error":err});
	}else if(func_type == 1){ 
		if (!isEmptyObject(data)) {
			UpdateConfigModule(req,res,data,callBack);
		}else {
			InsertConfigModule(req,res,data,callBack);
		}
	}else if(func_type == 2){ //InsertContactInfo Method
		res.send({"status":true,"msg":INSERT_MSG})
	}else if(func_type == 3){ //UpdateContactInfo Method
		res.send({"status":true,"msg":UPDATE_MSG})
	}else if(func_type == 4){ //DeleteContactInfo Method
		res.send({"status":true,"msg":DELETE_MSG})
	}else if(func_type == 5){
         //getItemCateory/ categories details  method
            console.log(data);
            res.send({"status":true,"data":data})
   
    }
}


function getConfigModule(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var module_id = params.module_id;
    
    var tbl1  = HMS_HOSP_CONFIG_MODULES;
   
    if(module_id == "0"){
        var query  = "SELECT * FROM  ?? ";
        var queryData = [tbl1];
		query = mysql.format(query,queryData);
		console.log(query);
        db.query(query,function(err,rows){
            if (err) {
                callback(err,{},5,req,res);
            }else{
                callback({},rows,5,req,res);
            }
        });
    }
    else {
            var query = "SELECT * from ?? where module_id = ? ";
            var queryData = [tbl1,module_id];
			query = mysql.format(query,queryData);
			console.log(query);
            db.query(query,function(err,rows){
                if (err) {
                    callback(err,{},5,req,res);
                }else{
                    callback({},rows,5,req,res);
                }
            });
    }
    
}

function isEmptyObject(obj) {
	for (var key in obj) {		
		return false;
	}
	return true;
}
exports.Configmodules = new Configmodules();
