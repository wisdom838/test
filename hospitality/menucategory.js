const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage');
var Menucategory = function () {};
Menucategory.prototype.addmenucategory = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
 /*   if(query_type == "fetch_data")
    {
        getMenuCategories(req,res,callBack);
    }else if(query_type == "set_data"){  */

        req.checkBody('menu_categoryname', 'Please enter menu category').notEmpty();
      //  req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            checkAddMenuCategoryExists(req,res,callBack);
        }

    /*}else if(query_type == "del_data") {
		DeleteMenuCategory(req,res,callBack);
	} */
	
};


Menucategory.prototype.getmenucategory = function (req,res) {

	req.checkBody('menu_categoryid', 'Please enter menu categoryid').notEmpty();
		
	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
	getMenuCategories(req,res,callBack);

	}
}

Menucategory.prototype.delmenucategory = function (req,res) {
	
	req.checkBody('menu_categoryid', 'Please enter menu categoryid').notEmpty();
					
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteMenuCategory(req,res,callBack);
		}
	}


	Menucategory.prototype.setmenucategory = function (req,res) {
		
			req.checkBody('menu_categoryid', 'Please enter menu categoryid').notEmpty();
			req.checkBody('menu_categoryname', 'Please enter menu category').notEmpty();
						
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				checkUpdateMenuCategoryExists(req,res,callBack);
			}
		}	

	

function checkAddMenuCategoryExists(req,res,callback){
	var params = req.body;
	var menu_categoryname = params.menu_categoryname;
	var tbl_name = HMS_HOSP_MENU_CATEGORY;

	var query1 = "select * from ?? where menu_categoryname = ? ";
	var queryData1 = [tbl_name,menu_categoryname];

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
				InsertMenuCategory(req,res,rows,callBack);
			}
		}
	})
}



function checkUpdateMenuCategoryExists(req,res,callback){
	var params = req.body;
	var menu_categoryid = params.menu_categoryid;
	var menu_categoryname = params.menu_categoryname;
	var tbl_name = HMS_HOSP_MENU_CATEGORY;

	var query1 = "select * from ?? where menu_categoryname = ? and menu_categoryid not in (?) ";
	var queryData1 = [tbl_name,menu_categoryname,menu_categoryid];

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
				UpdateMenuCategory(req,res,rows,callBack);
			}
}
	});
}

/*
function ChcekMenuCategoryExists(req,res,callback){
	var params = req.body;
	var menu_categoryid = params.menu_categoryid;
	var menu_categoryname = params.menu_categoryname;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_MENU_CATEGORY;

	if(typeof menu_categoryid!= "undefined"){
		var query1 = "select * from ?? where menu_categoryname = ? and menu_categoryid not in (?) ";
		var queryData1 = [tbl_name,menu_categoryname,menu_categoryid];
	}else{
		var query1 = "select * from ?? where menu_categoryname = ? ";
		var queryData1 = [tbl_name,menu_categoryname];
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
				if(typeof menu_categoryid != "undefined"){
					var query  = " SELECT * FROM ??  WHERE menu_categoryid= ? ";
					var queryData = [tbl_name,menu_categoryid];
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

function InsertMenuCategory(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_MENU_CATEGORY;
    var menu_categoryname = params.menu_categoryname;
    var menu_description = params.menu_description;
   // var memberid = params.memberid;
   var auth_token = req.get(HMS_AUTHENTICATION);
   var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
   var memberid = Auth.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (menu_categoryname,menu_description,created_by,created_date) values (?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,menu_categoryname,menu_description,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateMenuCategory(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_MENU_CATEGORY;
	var menu_categoryid = params.menu_categoryid;
    var menu_categoryname = params.menu_categoryname;
    var menu_description = params.menu_description;
	//var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;

	var cond1 = "";
    var cond2 = "";
    
	

    if(typeof menu_categoryname != "undefined")
    {
       cond1 = " menu_categoryname = '"+menu_categoryname+"', ";
    }

    if(typeof menu_description != "undefined")
    {
        cond2 = " menu_description = '"+menu_description+"', ";        
    }
	
	var query = "UPDATE ?? SET "+cond1+cond2+"	modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( menu_categoryid = ?)";
	var queryData = [tbl_name,memberid,menu_categoryid];
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
	function DeleteMenuCategory(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_MENU_CATEGORY;
    var menu_categoryid = params.menu_categoryid;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (menu_categoryid= ?)";
	var queryData = [tbl_name,menu_categoryid];
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
			UpdateMenuCategory(req,res,data,callBack);
		}else {
			InsertMenuCategory(req,res,data,callBack);
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


function getMenuCategories(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var menu_categoryid = params.menu_categoryid;
    
    var tbl1  = HMS_HOSP_MENU_CATEGORY;
   
    if(menu_categoryid == "0"){
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
            var query = "SELECT * from ?? where menu_categoryid = ? ";
            var queryData = [tbl1,menu_categoryid];
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
exports.Menucategory = new Menucategory();