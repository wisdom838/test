const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Additemcategory = function () {};
Additemcategory.prototype.additemcategory = function (req,res) {
	req.checkBody('item_category', 'Please enter item_category').notEmpty();
	req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		ChcekItemCategoryExists(req,res,callBack);
	}
};

function ChcekItemCategoryExists(req,res,callback){
	var params = req.body;
    var item_category = params.item_category;
    item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_ITEM_CATEGORY;
	var query  = " SELECT * FROM ??  WHERE item_category_name= '?' ";
	var queryData = [tbl_name,item_category];
	query = mysql.format(query,queryData);
	db.query(query,function(err,rows){
		if (err) {
			callback(err,{},1,req,res);
		}else{
			callback({},rows,1,req,res);
		}
	});
}

function InsertItemCategory(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_ITEM_CATEGORY;
    var item_category = params.item_category;
    var memberid = params.memberid;
	   
	var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":CURRENT_TIMESTAMP()}
	var query = "INSERT INTO ?? SET ? ";
	var queryData = [tbl_name,insertData];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateItemCategory(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_ITEM_CATEGORY;
	var item_category_id = params.item_category_id;
    var item_category = params.item_category;
    var memberid = params.memberid;
	
	var query = "UPDATE ?? SET 	item_category_name= ? ,	modified_by= ?, modified_date = current_timestamp() WHERE (	item_category_id = ?)";
	var queryData = [tbl_name,item_category,memberid,item_category_id];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},3,req,res);
		}else{
			callback({},data,3,req,res);
		}
	});
}

function DeleteItemCategory(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_ITEM_CATEGORY;
    var item_category_id = params.item_category_id;
    var item_category = params.item_category;
    var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (item_category_id= ?)";
	var queryData = [tbl_name,item_category_id];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},4,req,res);
		}else{
			callback({},data,4,req,res);
		}
	});
}
function callBack(err,data,func_type,req,res) {
	if (!isEmptyObject(err) ) {
		res.json({"status":false,"error":err});
	}else if(func_type == 1){ 
		if (!isEmptyObject(data)) {
			var params = req.body;
			var delete_flag = params.is_delete;
			if(typeof delete_flag == "undefined"){
				UpdateItemCategory(req,res,data,callBack);
			}
			else{
				DeleteItemCategory(req,res,data,callBack);
			}
		}else {
			InsertItemCategory(req,res,data,callBack);
		}
	}else if(func_type == 2){ //InsertContactInfo Method
		res.send({"status":true,"msg":INSERT_MSG})
	}else if(func_type == 3){ //UpdateContactInfo Method
		res.send({"status":true,"msg":UPDATE_MSG})
	}else if(func_type == 4){ //DeleteContactInfo Method
		res.send({"status":true,"msg":DELETE_MSG})
	}
}
function isEmptyObject(obj) {
	for (var key in obj) {		
		return false;
	}
	return true;
}
exports.Additemcategory = new Additemcategory();