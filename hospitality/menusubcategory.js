const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require("./authpage");
var Menusubcategory = function () {};
Menusubcategory.prototype.addmenusubcategory = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
  /*  if(query_type == "fetch_data")
    {
        getMenuSubCategories(req,res,callBack);
    }else if(query_type == "set_data"){  */

        req.checkBody('menu_sub_categoryname', 'Please enter menu sub category').notEmpty();
     //   req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            CheckAddMenuSubCategoryExists(req,res,callBack);
        }

  /*  }else if(query_type == "del_data") {
		
		DeleteMenuSubCategory(req,res,callBack);
	}  */
	
};


Menusubcategory.prototype.setmenusubcategory = function (req,res) {

	req.checkBody('menu_sub_categoryname', 'Please enter menu sub category').notEmpty();
	req.checkBody('menu_sub_categoryid', 'Please enter menu sub category id').notEmpty();
	
	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else {
		CheckUpdateMenuSubCategoryExists(req,res,callBack);
	}
}


Menusubcategory.prototype.getmenusubcategory = function (req,res) {

	req.checkBody('menu_sub_categoryid', 'Please enter menu sub categoryid').notEmpty();
		
	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getMenuSubCategories(req,res,callBack);
	}
}

Menusubcategory.prototype.delmenusubcategory = function (req,res) {
	
		req.checkBody('menu_sub_categoryid', 'Please enter menu sub categoryid').notEmpty();
			
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteMenuSubCategory(req,res,callBack);
		}
	}


function CheckAddMenuSubCategoryExists(req,res,callback){
	var params = req.body;
	var menu_sub_categoryname = params.menu_sub_categoryname;
	var tbl_name = HMS_HOSP_MENU_SUB_CATEGORY;

	var query1 = "select * from ?? where menu_sub_categoryname = ? ";
	var queryData1 = [tbl_name,menu_sub_categoryname];

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
				InsertMenuSubCategory(req,res,rows,callBack);
			}
		}
	})
}


function CheckUpdateMenuSubCategoryExists(req,res,callback){
	var params = req.body;
	var menu_sub_categoryid = params.menu_sub_categoryid;
	var menu_sub_categoryname = params.menu_sub_categoryname;

	var tbl_name = HMS_HOSP_MENU_SUB_CATEGORY;

	var query1 = "select * from ?? where menu_sub_categoryname = ? and menu_sub_categoryid not in (?) ";
	var queryData1 = [tbl_name,menu_sub_categoryname,menu_sub_categoryid];

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
				UpdateMenuSubCategory(req,res,rows,callBack);
			}
		}
	})
}



/*
function ChcekMenuSubCategoryExists(req,res,callback){
	var params = req.body;
	var menu_sub_categoryid = params.menu_sub_categoryid;
	var menu_sub_categoryname = params.menu_sub_categoryname;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_MENU_SUB_CATEGORY;

	if(typeof item_sub_categoryid!= "undefined"){
		var query1 = "select * from ?? where menu_sub_categoryname = ? and menu_sub_categoryid not in (?) ";
		var queryData1 = [tbl_name,menu_sub_categoryname,menu_sub_categoryid];
	}else{
		var query1 = "select * from ?? where menu_sub_categoryname = ? ";
		var queryData1 = [tbl_name,menu_sub_categoryname];
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
				if(typeof menu_sub_categoryid != "undefined"){
					var query  = " SELECT * FROM ??  WHERE menu_sub_categoryid= ? ";
					var queryData = [tbl_name,menu_sub_categoryid];
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

} */

function InsertMenuSubCategory(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_MENU_SUB_CATEGORY;
    var menu_sub_categoryname = params.menu_sub_categoryname;
    var menu_sub_description = params.menu_sub_description;
//    var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (menu_sub_categoryname,menu_sub_description,created_by,created_date) values (?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,menu_sub_categoryname,menu_sub_description,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateMenuSubCategory(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_MENU_SUB_CATEGORY;
	var menu_sub_categoryid = params.menu_sub_categoryid;
    var menu_sub_categoryname = params.menu_sub_categoryname;
    var menu_sub_description = params.menu_sub_description;
//    var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;

	var cond1 = "";
    var cond2 = "";
    
    if(typeof menu_sub_categoryname != "undefined")
    {
       cond1 = " menu_sub_categoryname = '"+menu_sub_categoryname+"', ";
    }

    if(typeof menu_sub_description != "undefined")
    {
        cond2 = " menu_sub_description = '"+menu_sub_description+"', ";        
    }
	
	
	var query = "UPDATE ?? SET 	"+cond1+cond2+" modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( menu_sub_categoryid = ?)";
	var queryData = [tbl_name,memberid,menu_sub_categoryid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},3,req,res);
		}else{
			callback({},data,3,req,res);
		}
	});
}

//function DeleteItemCategory(req,res,data,callback){
	function DeleteMenuSubCategory(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_MENU_SUB_CATEGORY;
    var menu_sub_categoryid = params.menu_sub_categoryid;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (menu_sub_categoryid= ?)";
	var queryData = [tbl_name,menu_sub_categoryid];
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
			UpdateMenuSubCategory(req,res,data,callBack);
		}else {
			InsertMenuSubCategory(req,res,data,callBack);
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


function getMenuSubCategories(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var menu_sub_categoryid = params.menu_sub_categoryid;
    
    var tbl1  = HMS_HOSP_MENU_SUB_CATEGORY;
   
    if(menu_sub_categoryid == "0"){
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
            var query = "SELECT * from ?? where menu_sub_categoryid = ? ";
            var queryData = [tbl1,menu_sub_categoryid];
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
exports.Menusubcategory = new Menusubcategory();