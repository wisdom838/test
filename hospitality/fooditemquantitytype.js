const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage.js');

var Fooditemquantitytype = function () { };
Fooditemquantitytype.prototype.addfooditemquantitytype = function (req,res) {

	console.log("1");
	console.log(HMS_AUTHENTICATION);
  //var auth_token = req.get(HMS_AUTHENTICATION);
  //	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
  //  var Auth = new auth(req);
	//console.log(Auth.memberid);
        req.checkBody('item_quantity_type_name', 'Please enter item_quantity_type_name').notEmpty();
      //  req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {

            res.send({ "status": false, errors: errors});
        }else{
            ChcekAddFoodItemQuantityTypeExists(req,res,callBack);
        }
 
};

Fooditemquantitytype.prototype.setfooditemquantitytype = function (req,res) {
	
		console.log("1");
	   		req.checkBody('item_quantity_type', 'Please enter item_quantity_type').notEmpty();
			req.checkBody('item_quantity_type_name', 'item_quantity_type_name').notEmpty();
		//	req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				ChcekUpdateFoodItemQuantityTypeExists(req,res,callBack);
			}
	 
	};



Fooditemquantitytype.prototype.getfooditemquantitytype = function (req,res) {

	req.checkBody('item_quantity_type', 'Please enter item_quantity_type').notEmpty();

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getFoodItemQuantityType(req,res,callBack);
	}
	
};

Fooditemquantitytype.prototype.delfooditemquantitytype = function (req,res) {
	
	req.checkBody('item_quantity_type', 'Please enter item_quantity_type').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteFoodItemQuantityType(req,res,callBack);
		}	
	
};


function ChcekAddFoodItemQuantityTypeExists(req,res,callback){
	var params = req.body;
	var item_quantity_type_name = params.item_quantity_type_name;
	var tbl_name = HMS_HOSP_FOOD_ITEM_QUANTITY_TYPE;

	var query1 = "select * from ?? where item_quantity_type_name = ? ";
	var queryData1 = [tbl_name,item_quantity_type_name];

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
				InsertFoodItemQuantityType(req,res,rows,callBack);
			}
		}
    });

}


function ChcekUpdateFoodItemQuantityTypeExists(req,res,callback){
	var params = req.body;
	var item_quantity_type = params.item_quantity_type;
	var item_quantity_type_name = params.item_quantity_type_name;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_FOOD_ITEM_QUANTITY_TYPE;

	if(typeof item_quantity_type!= "undefined"){
		var query1 = "select * from ?? where item_quantity_type_name = ? and item_quantity_type not in (?) ";
		var queryData1 = [tbl_name,item_quantity_type_name,item_quantity_type];
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
				UpdateFoodItemQuantityType(req,res,rows,callBack);
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

function InsertFoodItemQuantityType(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOOD_ITEM_QUANTITY_TYPE;
    var item_quantity_type_name = params.item_quantity_type_name;
    //var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	//var auth = new auth(req);
	var memberid = Auth.memberid;
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (item_quantity_type_name,created_by,created_date) values (?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,item_quantity_type_name,memberid];
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

function UpdateFoodItemQuantityType(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOOD_ITEM_QUANTITY_TYPE;
	var item_quantity_type = params.item_quantity_type;
    var item_quantity_type_name = params.item_quantity_type_name;
	//var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;
		
	var query = "UPDATE ?? SET 	item_quantity_type_name= ? ,	modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( item_quantity_type = ?)";
	var queryData = [tbl_name,item_quantity_type_name,memberid,item_quantity_type];
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


function DeleteFoodItemQuantityType(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOOD_ITEM_QUANTITY_TYPE;
    var item_quantity_type = params.item_quantity_type;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (item_quantity_type= ?)";
	var queryData = [tbl_name,item_quantity_type];
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
			UpdateFoodItemQuantityType(req,res,data,callBack);
		}else {
			InsertFoodItemQuantityType(req,res,data,callBack);
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


function getFoodItemQuantityType(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var item_quantity_type = params.item_quantity_type;
    
    var tbl1  = HMS_HOSP_FOOD_ITEM_QUANTITY_TYPE;
   
    if(item_quantity_type == "0"){
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
            var query = "SELECT * from ?? where item_quantity_type = ? ";
            var queryData = [tbl1,item_quantity_type];
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
exports.Fooditemquantitytype = new Fooditemquantitytype();
