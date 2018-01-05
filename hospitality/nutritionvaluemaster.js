const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage');
var Nutritionvaluemaster = function () {};
Nutritionvaluemaster.prototype.addnutritionvaluemaster = function (req,res) {
    //var params = req.body;
    //var query_type = params.query_type;
	//console.log("1");
 /*   if(query_type == "fetch_data")
    {
        getIngredientMasterDetails(req,res,callBack);
    }else if(query_type == "set_data"){  */

    req.checkBody('ingredient_name', 'Please enter ingredient_name').notEmpty();
    //    req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            CheckAddNutritionValueMasterExists(req,res,callBack);
        }

    /*}else if(query_type == "del_data") {
		
		DeleteIngredientMaster(req,res,callBack);
	} */
	
};


Nutritionvaluemaster.prototype.setnutritionvaluemaster = function(req,res) {
    var params = req.body;
    var ingredient_name = params.ingredient_name;
    var ingredient_id = params.ingredient_id;

    req.checkBody('ingredient_id', 'Please enter ingredient_id').notEmpty();

    if(typeof ingredient_name !="undefined" || ingredient_name !=""){
        CheckUpdateNutritionValueMasterExists(req,res,callBack);
    }else{
        UpdateNutritionValueMaster(req,res,data,callBack);
    }
};


Nutritionvaluemaster.prototype.getnutritionvaluemaster = function(req,res){
   
    req.checkBody('ingredient_id', 'Please enter ingredient_id').notEmpty();

    var errors = req.validationErrors();
    if (errors) {  
        res.send({ "status": false, errors: errors});
    }else{
        getNutritionValueMasterDetails(req,res,callBack);
    }
};

Nutritionvaluemaster.prototype.delnutritionvaluemaster = function(req,res){
   
    req.checkBody('ingredient_id', 'Please enter ingredient_id').notEmpty();

    var errors = req.validationErrors();
    if (errors) {  
        res.send({ "status": false, errors: errors});
    }else{
        DeleteNutritionValueMasterDetails(req,res,callBack);
    }
    
};


function CheckAddNutritionValueMasterExists(req,res,callback){
    var params = req.body;
    var ingredient_name = params.ingredient_name;
    var tbl_name = HMS_HOSP_NUTRITION_VALUE_MASTER;
    
    var query1 = "select * from ?? where ingredient_name = ? ";
    var queryData1 = [tbl_name,ingredient_name];

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
                InsertNutritionValueMaster(req,res,rows,callBack);
            }
        }
    });
}

function CheckUpdateNutritionValueMasterExists(req,res,callback){
    var params = req.body;
    var ingredient_id = params.ingredient_id;
    var ingredient_name = params.ingredient_name;
    var tbl_name = HMS_HOSP_NUTRITION_VALUE_MASTER;


    var query1 = "select * from ?? where ingredient_name = ? and ingredient_id not in (?) ";
    var queryData1 = [tbl_name,ingredient_name,ingredient_id];

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
                UpdateNutritionValueMaster(req,res,rows,callBack);
            }
        }
    })
}


/*
function ChcekIngredientMasterExists(req,res,callback){
    var params = req.body;
    var ingredient_id = params.ingredient_id;
    var ingredient_type = params.ingredient_type;
    var ingredient_name = params.ingredient_name;
    
    //var type = params.type;
     //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_INGREDIENT_MASTER;

	if(typeof ingredient_id!= "undefined"){
		var query1 = "select * from ?? where ingredient_type = ? and ingredient_name = ? and ingredient_id not in (?) ";
		var queryData1 = [tbl_name,ingredient_type,ingredient_name,ingredient_id];
	}else{
		var query1 = "select * from ?? where ingredient_type = ? and ingredient_name = ? ";
		var queryData1 = [tbl_name,ingredient_type,ingredient_name];
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
				if(typeof ingredient_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE ingredient_id= ? ";
					var queryData = [tbl_name,ingredient_id];
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

function InsertNutritionValueMaster(req,res,data,callback){
	var params = req.body;
    var tbl_name = HMS_HOSP_NUTRITION_VALUE_MASTER;
	
    var ingredient_type = params.ingredient_type;
    var ingredient_name = params.ingredient_name;
    var ingredient_description = params.ingredient_description;
    //var memberid = params.memberid;
    var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
    var memberid = Auth.memberid;	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (ingredient_type,ingredient_name,ingredient_description,created_by,created_date) values (?,?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,ingredient_type,ingredient_name,ingredient_description,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	});
}

function UpdateNutritionValueMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_NUTRITION_VALUE_MASTER;
	var ingredient_id = params.ingredient_id;
    var ingredient_type = params.ingredient_type;
    var ingredient_name = params.ingredient_name;
    var ingredient_description = params.ingredient_description;
    // var memberid = params.memberid;
    var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
    var memberid = Auth.memberid;

    var cond1 = "";
    var cond2 = "";
    var cond3 = "";
    

    if(typeof ingredient_type != "undefined")
    {
       // cond1 = " menu_item = ?, ";
       cond1 = " ingredient_type = '"+ingredient_type+"', ";
    }

    if(typeof ingredient_name != "undefined")
    {
        //cond2 = " min_number_choice_meal = ?, ";
        cond2 = " ingredient_name = '"+ingredient_name+"', ";        
    }

    if(typeof ingredient_description != "undefined")
    {
        //cond2 = " min_number_choice_meal = ?, ";
        cond3 = " ingredient_description = '"+ingredient_description+"', ";        
    }
       	
	var query = "UPDATE ?? SET 	"+cond1+cond2+cond3+" modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( ingredient_id = ?)";
	var queryData = [tbl_name,memberid,ingredient_id];
    query = mysql.format(query,queryData);
    console.log("update query: "+ query);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},3,req,res);
		}else{
			callback({},data,3,req,res);
		}
	});
}

//function DeleteItemCategory(req,res,data,callback){
	function DeleteNutritionValueMasterDetails(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_NUTRITION_VALUE_MASTER;;
    var ingredient_id = params.ingredient_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (ingredient_id= ?)";
	var queryData = [tbl_name,ingredient_id];
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
			UpdateIngredientMaster(req,res,data,callBack);
		}else {
			InsertIngredientMaster(req,res,data,callBack);
		}
	}else if(func_type == 2){ //InsertContactInfo Method
		res.send({"status":true,"msg":INSERT_MSG})
	}else if(func_type == 3){ //UpdateContactInfo Method
		res.send({"status":true,"msg":UPDATE_MSG})
	}else if(func_type == 4){ //DeleteContactInfo Method
		res.send({"status":true,"msg":DELETE_MSG})
	}else if(func_type == 5){
		 //getItemCateory/ categories details  method
		 console.log(data.length);

		 for(i=0;i<data.length;i++){
			var rowObject = data[i];
			rowObject.ingredient_type_value = "Ingredient";
			if(rowObject.ingredient_type == 1)
			    {
					rowObject.ingredient_type_value = "Nutrient";
				}	
		 }

            console.log(data);
            res.send({"status":true,"data":data})
   
    }
}


function getNutritionValueMasterDetails(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var ingredient_id = params.ingredient_id;
    
    var tbl1  = HMS_HOSP_NUTRITION_VALUE_MASTER;
   
    if(ingredient_id == "0"){
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
            var query = "SELECT * from ?? where ingredient_id = ? ";
            var queryData = [tbl1,ingredient_id];
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
exports.Nutritionvaluemaster = new Nutritionvaluemaster();