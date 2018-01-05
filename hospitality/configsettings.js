const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage.js');

var Configsettings = function () { };
Configsettings.prototype.addconfigsettings = function (req,res) {

	console.log("1");
	console.log(HMS_AUTHENTICATION);
  //var auth_token = req.get(HMS_AUTHENTICATION);
  //	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
  //  var Auth = new auth(req);
	//console.log(Auth.memberid);
        req.checkBody('module_id', 'Please enter module_id').notEmpty();
        req.checkBody('hos_id', 'Please enter hos_id').notEmpty();
      //  req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {

            res.send({ "status": false, errors: errors});
        }else{
            CheckAddConfigsettingsExists(req,res,callBack);
        }
 
};

Configsettings.prototype.setconfigsettings = function (req,res) {
	
		console.log("1");
               req.checkBody('config_id', 'Please enter config_id').notEmpty();
               req.checkBody('module_id', 'Please enter module_id').notEmpty();
               req.checkBody('hos_id', 'Please enter hos_id').notEmpty();
			
		//	req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				CheckUpdateConfigsettingsExists(req,res,callBack);
			}
	 
	};



Configsettings.prototype.getconfigsettings = function (req,res) {

//	req.checkBody('config_id', 'Please enter config_id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getConfigsettings(req,res,callBack);
	}
	
};


Configsettings.prototype.getallconfigsettings = function (req,res) {
	
	//	req.checkBody('config_id', 'Please enter config_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			getAllConfigsettings(req,res,callBack);
		}
		
	};


Configsettings.prototype.delconfigsettings = function (req,res) {
	
	req.checkBody('config_id', 'Please enter config_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteConfigsettings(req,res,callBack);
		}	
	
};


function CheckAddConfigsettingsExists(req,res,callback){
	var params = req.body;
    var module_id = params.module_id;
    var hos_id = params.hos_id;
	var tbl_name = HMS_HOSP_CONFIG_SETTINGS;

	var query1 = "select * from ?? where module_id = ? and hos_id = ? ";
	var queryData1 = [tbl_name,module_id,hos_id];

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
				InsertConfigsettings(req,res,rows,callBack);
			}
		}
    });

}


function CheckUpdateConfigsettingsExists(req,res,callback){
	var params = req.body;
	var config_id = params.config_id;
	var module_id = params.module_id;
    var hos_id = params.hos_id;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_CONFIG_SETTINGS;

	if(typeof config_id!= "undefined"){
		var query1 = "select * from ?? where module_id = ? and  hos_id = ? and config_id not in (?) ";
		var queryData1 = [tbl_name,module_id,hos_id,config_id];
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
				UpdateConfigsettings(req,res,rows,callBack);
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

function InsertConfigsettings(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_SETTINGS;
    var module_id = params.module_id;
    var hos_id = params.hos_id;
    //var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	//var auth = new auth(req);
	var memberid = Auth.memberid;
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (hos_id,module_id,created_by,created_date) values (?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,hos_id,module_id,memberid];
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

function UpdateConfigsettings(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_SETTINGS;
	var config_id = params.config_id;
    var module_id = params.module_id;
    var hos_id = params.hos_id;
	//var memberid = params.memberid;
    var auth_token = req.get(HMS_AUTHENTICATION);
    if(auth_token.length<=0)
    {
        res.send({"status":false,"msg":HMS_INVALID_MSG});
    }
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;
		
	var query = "UPDATE ?? SET 	hos_id = ? ,module_id = ? , modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( config_id = ?)";
	var queryData = [tbl_name,hos_id,module_id,memberid,config_id];
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


function DeleteConfigsettings(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_SETTINGS;
    var config_id = params.config_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (config_id= ?)";
	var queryData = [tbl_name,config_id];
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
			UpdateConfigsettings(req,res,data,callBack);
		}else {
			InsertConfigsettings(req,res,data,callBack);
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


function getConfigsettings(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var config_id = params.config_id;
    var hos_id = params.hos_id;
    var module_id = params.module_id;
    
    var tbl1  = HMS_HOSP_CONFIG_SETTINGS;

    var query = "";
    var queryData = [tbl1];
   
    if(config_id == "0" && typeof hos_id == "undefined" && typeof module_id == "undefined"){
        query  = "SELECT * FROM  ?? ";
        queryData = [tbl1];
	}
    else if(config_id != "0" && typeof config_id != "undefined" && typeof hos_id == "undefined" && typeof module_id == "undefined"){
        query = "SELECT * from ?? where config_id = ? ";
        queryData = [tbl1,config_id];
		
    }else if(typeof config_id == "undefined" &&  hos_id > 0 && typeof module_id == "undefined"){
        query = "SELECT * from ?? where hos_id = ? ";
        queryData = [tbl1,hos_id];
    }else if(typeof config_id == "undefined" && typeof hos_id == "undefined" && module_id>0){
        query = "SELECT * from ?? where module_id = ? ";
        queryData = [tbl1,module_id];
    }
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



function getAllConfigsettings(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var config_id = params.config_id;
    var hos_id = params.hos_id;
    var module_id = params.module_id;
    
	var tbl1  = HMS_HOSP_CONFIG_SETTINGS;
	var tbl2 = HMS_HOSP_CONFIG_MODULES;
	var tbl3 = UMS_HOSPITALS;

    var query = "";
    var queryData = [];
   
    if(config_id == "0" && typeof hos_id == "undefined" && typeof module_id == "undefined"){
		query  = "SELECT * FROM  ?? ";
		query = "SELECT cs.*,umsh.hname,cm.module_name FROM ?? cs inner join ?? umsh on umsh.hid = cs.hos_id inner join ?? cm on cm.module_id = cs.module_id where umsh.is_active = 1 order by umsh.hname,cm.module_name "
        queryData = [tbl1,tbl3,tbl2];
	}
    else if(config_id != "0" && typeof config_id != "undefined" && typeof hos_id == "undefined" && typeof module_id == "undefined"){
        query = "SELECT cs.*,umsh.hname,cm.module_name FROM ?? cs inner join ?? umsh on umsh.hid = cs.hos_id inner join ?? cm on cm.module_id = cs.module_id where umsh.is_active = 1 and  cs.config_id = ? order by umsh.hname,cm.module_name ";
        queryData = [tbl1,tbl3,tbl2,config_id];
		
    }else if(typeof config_id == "undefined" &&  hos_id > 0 && typeof module_id == "undefined"){
        query = "SELECT cs.*,umsh.hname,cm.module_name FROM ?? cs inner join ?? umsh on umsh.hid = cs.hos_id inner join ?? cm on cm.module_id = cs.module_id where umsh.is_active = 1 and cs.hos_id = ?  order by umsh.hname,cm.module_name";
        queryData = [tbl1,tbl3,tbl2,hos_id];
    }else if(typeof config_id == "undefined" && typeof hos_id == "undefined" && module_id>0){
        query = "SELECT cs.*,umsh.hname,cm.module_name FROM ?? cs inner join ?? umsh on umsh.hid = cs.hos_id inner join ?? cm on cm.module_id = cs.module_id where umsh.is_active = 1 and cs.module_id = ?  order by umsh.hname,cm.module_name";
        queryData = [tbl1,tbl3,tbl2,module_id];
    }
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

function isEmptyObject(obj) {
	for (var key in obj) {		
		return false;
	}
	return true;
}
exports.Configsettings = new Configsettings();
