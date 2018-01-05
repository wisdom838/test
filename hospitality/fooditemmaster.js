const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage.js');

var Fooditemmaster = function () { };
Fooditemmaster.prototype.addfooditemmaster = function (req,res) {

	console.log("1");
	console.log(HMS_AUTHENTICATION);
  //var auth_token = req.get(HMS_AUTHENTICATION);
  //	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
  //  var Auth = new auth(req);
	//console.log(Auth.memberid);
        req.checkBody('item_name', 'Please enter item_name').notEmpty();
    //    req.checkBody('hid', 'Please enter hospital id').notEmpty();    
      //  req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {

            res.send({ "status": false, errors: errors});
        }else{
            CheckAddFooditemMasterExists(req,res,callBack);
        }
 
};

Fooditemmaster.prototype.setfooditemmaster = function (req,res) {
	
		console.log("1");
	   		req.checkBody('item_id', 'Please enter item_id').notEmpty();
        //    req.checkBody('item_name', 'Please enter item_name').notEmpty();
        //    req.checkBody('hid', 'Please enter hospital id').notEmpty();
		//	req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				CheckUpdateFooditemMasterExists(req,res,callBack);
			}
	 
	};



Fooditemmaster.prototype.getfooditemmaster = function (req,res) {

	//req.checkBody('item_id', 'Please enter item_id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getFooditemMaster(req,res,callBack);
	}
	
};


Fooditemmaster.prototype.getallfooditemmaster = function (req,res) {
	
		//req.checkBody('item_id', 'Please enter item_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			getAllFooditemMaster(req,res,callBack);
		}
		
	};

Fooditemmaster.prototype.delfooditemmaster = function (req,res) {
	
	req.checkBody('item_id', 'Please enter item_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			DeleteFooditemMaster(req,res,callBack);
		}	
	
};

function CheckAddFooditemMasterExists(req,res,callback){
	var params = req.body;
    var item_name = params.item_name;
    //var hid = params.hid;
	var tbl_name = HMS_HOSP_FOOD_ITEM_MASTER;

	var query1 = "select * from ?? where item_name = ? ";
	var queryData1 = [tbl_name,item_name];

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
				InsertFooditemMaster(req,res,rows,callBack);
			}
		}
    });

}


function CheckUpdateFooditemMasterExists(req,res,callback){
	var params = req.body;
	var item_id = params.item_id;
    var item_name = params.item_name;
    
	var tbl_name = HMS_HOSP_FOOD_ITEM_MASTER;

	if(typeof item_id!= "undefined"){
		var query1 = "select * from ?? where item_name = ?  and item_id not in (?) ";
		var queryData1 = [tbl_name,item_name,item_id];
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
				UpdateFooditemMaster(req,res,rows,callBack);
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

function InsertFooditemMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOOD_ITEM_MASTER;
    var item_name = params.item_name;
    var item_code = params.item_code;
    var item_description = params.item_description;
	var item_image = params.item_image;
	var item_image_size = params.item_image_size;
    var item_quantity = params.item_quantity;
    var item_quantity_type = params.item_quantity_type;
    var item_category_id = params.item_category_id;
	var item_veg_type = params.item_veg_type;
	var item_veg_subtype = params.item_veg_subtype;
    var item_single = params.item_single;
    var item_price = params.item_price;
    

	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	//var auth = new auth(req);
	var memberid = Auth.memberid;
	
	var query = "insert into ?? (item_code,item_name,item_description,item_image,item_image_size,item_quantity,item_quantity_type,item_category_id,item_veg_type,item_veg_subtype,item_single,item_price,created_by,created_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,unix_timestamp(now()))";
	var queryData = [tbl_name,item_code,item_name,item_description,item_image,item_image_size,item_quantity,item_quantity_type,item_category_id,item_veg_type,item_veg_subtype,item_single,item_price,memberid];
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

function UpdateFooditemMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOOD_ITEM_MASTER;
    var item_id = params.item_id;    
    var item_name = params.item_name;
    var item_code = params.item_code;
    var item_description = params.item_description;
	var item_image = params.item_image;
	var item_image_size = params.item_image_size;
    var item_quantity = params.item_quantity;
    var item_quantity_type = params.item_quantity_type;
    var item_category_id = params.item_category_id;
	var item_veg_type = params.item_veg;
	var item_veg_subtype = params.item_veg_subtype;
    var item_single = params.item_single;
    var item_price = params.item_price;
    
    var auth_token = req.get(HMS_AUTHENTICATION);
    if(auth_token.length<=0)
    {
        res.send({"status":false,"msg":HMS_INVALID_MSG});
    }
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
    var memberid = Auth.memberid;
    
    var cond1 = cond2 = cond3 = cond4 = cond5 = cond6 = cond7 = cond8 = cond9 = cond10 = cond11 = cond12 ="";

    if(typeof item_name != "undefined"){
        cond1 = " item_name = '"+item_name+"', ";
    }

    if(typeof item_code != "undefined"){
        cond2 = " item_code = '"+item_code+"', ";
    }

    if(typeof item_description != "undefined"){
        cond3 = " item_description = '"+item_description+"', ";
    }

    if(typeof item_image != "undefined"){
        cond4 = " item_image = '"+item_image+"', ";
    }

    if(typeof item_quantity != "undefined"){
        cond5 = " item_quantity = '"+item_quantity+"', ";
    }

    if(typeof itemitem_quantity_type != "undefined"){
        cond6 = " item_quantity_type = '"+item_quantity_type+"', ";
    }

    if(typeof item_category_id != "undefined"){
        cond7 = " item_category_id = '"+item_category_id+"', ";
    }

    if(typeof item_veg_type != "undefined"){
        cond8 = " item_veg_type = '"+item_veg_type+"', ";
    }

    if(typeof item_single != "undefined"){
        cond9 = " item_single = '"+item_single+"', ";
    }

    if(typeof item_price != "undefined"){
        cond10 = " item_price = '"+item_price+"', ";
	}
	
	if(typeof item_veg_subtype != "undefined"){
        cond11 = " item_veg_subtype = '"+item_veg_subtype+"', ";
	}
	
	if(typeof item_image_size != "undefined"){
        cond12 = " item_image_size = '"+item_image_size+"', ";
    }

   		
	var query = "UPDATE ?? SET "+cond1+cond2+cond3+cond4+cond5+cond6+cond7+cond8+cond9+cond10+cond11+cond12+" modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( item_id = ?)";
	var queryData = [tbl_name,memberid,item_id];
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


function DeleteFooditemMaster(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOOD_ITEM_MASTER;
    var item_id = params.item_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (item_id= ?)";
	var queryData = [tbl_name,item_id];
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
			UpdateFooditemMaster(req,res,data,callBack);
		}else {
			InsertFooditemMaster(req,res,data,callBack);
		}
	}else if(func_type == 2){ //InsertContactInfo Method
		res.send({"status":true,"msg":INSERT_MSG})
	}else if(func_type == 3){ //UpdateContactInfo Method
		res.send({"status":true,"msg":UPDATE_MSG})
	}else if(func_type == 4){ //DeleteContactInfo Method
		res.send({"status":true,"msg":DELETE_MSG})
	}else if(func_type == 5){
         //getItemCateory/ categories details  method
			
			for(i=0;i<data.length;i++){
				var rowObject = data[i];
				var bufferstr = rowObject.item_image;
				if(bufferstr !=null){
				rowObject.imagestr = bufferstr.toString();
				}else{
				rowObject.imagestr = "";	
				}
			//	let jsonstr = JSON.stringify(bufferstr);
			//	console.log(json);
			//	console.log(bufferstr.toString('utf8'));
				//console.log(bufferstr.toString());

				//rowObject.ingredient_type_value = "Ingredient";
				//if(rowObject.ingredient_type == 1)
				//	{
				//		rowObject.ingredient_type_value = "Nutrient";
				//	}	
			 }
			 console.log(data);
            res.send({"status":true,"data":data})
   
    }
}


function getFooditemMaster(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var item_id = params.item_id;
    //var hid = params.hid;
    
    var tbl1  = HMS_HOSP_FOOD_ITEM_MASTER;

    var query = "";
    var queryData = "";
   
    if(item_id == "0" ){
        query  = "SELECT * FROM  ?? ";
        queryData = [tbl1];
		
    }
    else {
            query = "SELECT * from ?? where item_id = ? ";
            queryData = [tbl1,item_id];
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


function getAllFooditemMaster(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var item_id = params.item_id;
    //var hid = params.hid;
    
	var tbl1  = HMS_HOSP_FOOD_ITEM_MASTER;
	var tbl2 = HMS_HOSP_FOOD_ITEM_QUANTITY_TYPE;
	var tbl3 = HMS_HOSP_ITEM_CATEGORY;

    var query = "";
    var queryData = "";
   
    if(item_id == "0" ){
        query  = "SELECT fim.*,fiqt.item_quantity_type_name,fic.item_category_name,if(fim.item_veg_type=1,'VEG',if(fim.item_veg_type=2,'NON-VEG',if(fim.item_veg_type=3,'SEMI-VEG',''))) as veg_type  FROM  ?? fim left join ?? fiqt on fim.item_quantity_type = fiqt.item_quantity_type left join ?? fic on fim.item_category_id = fic.item_category_id order by fim.item_name ";
        queryData = [tbl1,tbl2,tbl3];
		
    }
    else {
        query = "SELECT fim.*,fiqt.item_quantity_type_name,fic.item_category_name,if(fim.item_veg_type=1,'VEG',if(fim.item_veg_type=2,'NON-VEG',if(fim.item_veg_type=3,'SEMI-VEG',''))) as veg_type FROM  ?? fim left join ?? fiqt on fim.item_quantity_type = fiqt.item_quantity_type left join ?? fic on fim.item_category_id = fic.item_category_id where fim.item_id = ? ";
        queryData = [tbl1,tbl2,tbl3,item_id];
		
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
exports.Fooditemmaster = new Fooditemmaster();
