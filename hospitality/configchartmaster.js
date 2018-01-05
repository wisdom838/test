const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage.js');

var Configchartmaster = function () { };
Configchartmaster.prototype.addconfigchartmaster = function (req,res) {

	console.log("1");
	console.log(HMS_AUTHENTICATION);
  //var auth_token = req.get(HMS_AUTHENTICATION);
  //	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
  //  var Auth = new auth(req);
	//console.log(Auth.memberid);
        req.checkBody('chart_name', 'Please enter chart_name').notEmpty();
      //  req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {

            res.send({ "status": false, errors: errors});
        }else{
            CheckAddConfigChartMasterExists(req,res,callBack);
        }
 
};

Configchartmaster.prototype.setconfigchartmaster = function (req,res) {
	
		console.log("1");
	   		req.checkBody('chart_id', 'Please enter chart_id').notEmpty();
			req.checkBody('chart_name', 'Please enter chart_name').notEmpty();
		//	req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				CheckUpdateConfigChartMasterExists(req,res,callBack);
			}
	 
	};



Configchartmaster.prototype.getconfigchartmaster = function (req,res) {

	req.checkBody('chart_id', 'Please enter chart_id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getConfigChartMaster(req,res,callBack);
	}
	
};

Configchartmaster.prototype.delconfigchartmaster = function (req,res) {
	
	req.checkBody('chart_id', 'Please enter chart_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteConfigChartMaster(req,res,callBack);
		}	
	
};


function CheckAddConfigChartMasterExists(req,res,callback){
	var params = req.body;
	var chart_name = params.chart_name;
	var tbl_name = HMS_HOSP_CONFIG_CHART_MASTER;

	var query1 = "select * from ?? where chart_name = ? ";
	var queryData1 = [tbl_name,chart_name];

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
				InsertConfigChartMaster(req,res,rows,callBack);
			}
		}
    });

}


function CheckUpdateConfigChartMasterExists(req,res,callback){
	var params = req.body;
	var chart_id = params.chart_id;
	var chart_name = params.chart_name;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_CONFIG_CHART_MASTER;

	if(typeof chart_id!= "undefined"){
		var query1 = "select * from ?? where chart_name = ? and chart_id not in (?) ";
		var queryData1 = [tbl_name,chart_name,chart_id];
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
				UpdateConfigChartMaster(req,res,rows,callBack);
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

function InsertConfigChartMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_CHART_MASTER;
    var chart_name = params.chart_name;
    //var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	//var auth = new auth(req);
	var memberid = Auth.memberid;
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (chart_name,created_by,created_date) values (?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,chart_name,memberid];
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

function UpdateConfigChartMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_CHART_MASTER;
	var chart_id = params.chart_id;
    var chart_name = params.chart_name;
	//var memberid = params.memberid;
    var auth_token = req.get(HMS_AUTHENTICATION);
    if(auth_token.length<=0)
    {
        res.send({"status":false,"msg":HMS_INVALID_MSG});
    }
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;
		
	var query = "UPDATE ?? SET 	chart_name= ? , modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( chart_id = ?)";
	var queryData = [tbl_name,chart_name,memberid,chart_id];
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


function DeleteConfigChartMaster(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_CONFIG_CHART_MASTER;
    var chart_id = params.chart_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (chart_id= ?)";
	var queryData = [tbl_name,chart_id];
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
			UpdateConfigChartMaster(req,res,data,callBack);
		}else {
			InsertConfigChartMaster(req,res,data,callBack);
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


function getConfigChartMaster(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var chart_id = params.chart_id;
    
    var tbl1  = HMS_HOSP_CONFIG_CHART_MASTER;
   
    if(chart_id == "0"){
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
            var query = "SELECT * from ?? where chart_id = ? ";
            var queryData = [tbl1,chart_id];
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
exports.Configchartmaster = new Configchartmaster();
