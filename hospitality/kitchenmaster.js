const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage.js');

var Kitchenmaster = function () { };
Kitchenmaster.prototype.addkitchenmaster = function (req,res) {

	console.log("1");
	console.log(HMS_AUTHENTICATION);
  //var auth_token = req.get(HMS_AUTHENTICATION);
  //	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
  //  var Auth = new auth(req);
	//console.log(Auth.memberid);
        req.checkBody('kitchen_name', 'Please enter kitchen_name').notEmpty();
        req.checkBody('hid', 'Please enter hospital id').notEmpty();    
      //  req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {

            res.send({ "status": false, errors: errors});
        }else{
            CheckAddKitchenMasterExists(req,res,callBack);
        }
 
};

Kitchenmaster.prototype.setkitchenmaster = function (req,res) {
	
		console.log("1");
	   		req.checkBody('kitchen_id', 'Please enter kitchen_id').notEmpty();
            req.checkBody('kitchen_name', 'Please enter kitchen_name').notEmpty();
            req.checkBody('hid', 'Please enter hospital id').notEmpty();
		//	req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				CheckUpdateKitchenMasterExists(req,res,callBack);
			}
	 
	};



Kitchenmaster.prototype.getkitchenmaster = function (req,res) {

	//req.checkBody('kitchen_id', 'Please enter kitchen_id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getKitchenMaster(req,res,callBack);
	}
	
};


Kitchenmaster.prototype.getallkitchenmaster = function (req,res) {
	
		//req.checkBody('kitchen_id', 'Please enter kitchen_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			getAllKitchenMaster(req,res,callBack);
		}
		
	};

Kitchenmaster.prototype.delkitchenmaster = function (req,res) {
	
	req.checkBody('kitchen_id', 'Please enter kitchen_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteKitchenMaster(req,res,callBack);
		}	
	
};

function CheckAddKitchenMasterExists(req,res,callback){
	var params = req.body;
    var kitchen_name = params.kitchen_name;
    var hid = params.hid;
	var tbl_name = HMS_HOSP_KITCHEN_MASTER;

	var query1 = "select * from ?? where kitchen_name = ? and hid = ? ";
	var queryData1 = [tbl_name,kitchen_name,hid];

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
				InsertKitchenMaster(req,res,rows,callBack);
			}
		}
    });

}


function CheckUpdateKitchenMasterExists(req,res,callback){
	var params = req.body;
	var kitchen_id = params.kitchen_id;
    var kitchen_name = params.kitchen_name;
    var hid = params.hid
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_KITCHEN_MASTER;

	if(typeof kitchen_id!= "undefined"){
		var query1 = "select * from ?? where kitchen_name = ? and hid = ? and kitchen_id not in (?) ";
		var queryData1 = [tbl_name,kitchen_name,hid,kitchen_id];
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
				UpdateKitchenMaster(req,res,rows,callBack);
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

function InsertKitchenMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_KITCHEN_MASTER;
    var kitchen_name = params.kitchen_name;
    var hid = params.hid;
    var kitchen_type = params.kitchen_type;
    //var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	//var auth = new auth(req);
	var memberid = Auth.memberid;
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (kitchen_name,hid,kitchen_type,created_by,created_date) values (?,?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,kitchen_name,hid,kitchen_type,memberid];
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

function UpdateKitchenMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_KITCHEN_MASTER;
	var kitchen_id = params.kitchen_id;
    var kitchen_name = params.kitchen_name;
    var hid = params.hid;
    var kitchen_type = params.kitchen_type;
	//var memberid = params.memberid;
    var auth_token = req.get(HMS_AUTHENTICATION);
    if(auth_token.length<=0)
    {
        res.send({"status":false,"msg":HMS_INVALID_MSG});
    }
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;
		
	var query = "UPDATE ?? SET 	kitchen_name= ?,hid = ?, kitchen_type=? , modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( kitchen_id = ?)";
	var queryData = [tbl_name,kitchen_name,hid,kitchen_type,memberid,kitchen_id];
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


function DeleteKitchenMaster(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_KITCHEN_MASTER;
    var kitchen_id = params.kitchen_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (kitchen_id= ?)";
	var queryData = [tbl_name,kitchen_id];
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
			UpdateKitchenMaster(req,res,data,callBack);
		}else {
			InsertKitchenMaster(req,res,data,callBack);
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


function getKitchenMaster(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var kitchen_id = params.kitchen_id;
    var hid = params.hid;
    
    var tbl1  = HMS_HOSP_KITCHEN_MASTER;

    var query = "";
    var queryData = "";
   
    if(kitchen_id == "0" && typeof hid == "undefined"){
        query  = "SELECT * FROM  ?? ";
        queryData = [tbl1];
		
    }
    else if(typeof kitchen_id != "undefined" && typeof hid == "undefined"){
            query = "SELECT * from ?? where kitchen_id = ? ";
            queryData = [tbl1,kitchen_id];
		
    }
    else if(typeof kitchen_id == "undefined" && hid > 0){
        query = "SELECT * from ?? where hid = ? ";
        queryData = [tbl1,hid];
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



function getAllKitchenMaster(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var kitchen_id = params.kitchen_id;
    var hid = params.hid;
    
	var tbl1 = HMS_HOSP_KITCHEN_MASTER;
	var tbl2 = UMS_HOSPITALS;

    var query = "";
    var queryData = "";
   
    if(kitchen_id == "0" && typeof hid == "undefined"){
        query  = "SELECT km.*,if(km.kitchen_type=0,'CANTEEN','CAFE') as kitchen_type_name, uh.hname FROM  ?? km inner join ?? uh on uh.hid = km.hid order by uh.hname,km.kitchen_name ";
        queryData = [tbl1,tbl2];
		
    }
    else if(typeof kitchen_id != "undefined" && typeof hid == "undefined"){
            query = "SELECT km.*,if(km.kitchen_type=0,'CANTEEN','CAFE') as kitchen_type_name, uh.hname FROM  ?? km inner join ?? uh on uh.hid = km.hid and km.kitchen_id = ? order by uh.hname,km.kitchen_name";
            queryData = [tbl1,tbl2,kitchen_id];
		
    }
    else if(typeof kitchen_id == "undefined" && hid > 0){
        query = "SELECT km.*,if(km.kitchen_type=0,'CANTEEN','CAFE') as kitchen_type_name, uh.hname FROM  ?? km inner join ?? uh on uh.hid = km.hid and km.hid = ? order by uh.hname,km.kitchen_name ";
        queryData = [tbl1,tbl2,hid];
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
exports.Kitchenmaster = new Kitchenmaster();
