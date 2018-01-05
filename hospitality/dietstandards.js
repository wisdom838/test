const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Dietstandards = function () {};
Dietstandards.prototype.dietstandards = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    if(query_type == "fetch_data")
    {
        getDietStandards(req,res,callBack);
    }else if(query_type == "set_data"){

       // req.checkBody('type', 'Please enter demographics type').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            ChcekDietStandardExists(req,res,callBack);
        }

    }else if(query_type == "del_data") {
		
		DeleteDietStandard(req,res,callBack);
	}
	
};


function ChcekDietStandardExists(req,res,callback){
	var params = req.body;
    var standard_id = params.standard_id;
    var menu_item = params.menu_item;
	//var type = params.type;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_DIET_STANDARDS;

	if(typeof standard_id!= "undefined"){
		var query1 = "select * from ?? where menu_item = ? and standard_id not in (?) ";
		var queryData1 = [tbl_name,menu_item,standard_id];
	}else{
		var query1 = "select * from ?? where menu_item = ? ";
		var queryData1 = [tbl_name,menu_item];
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
				if(typeof standard_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE standard_id= ? ";
					var queryData = [tbl_name,standard_id];
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

}

function InsertDietStandard(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_DIET_STANDARDS;
    var menu_item = params.menu_item;
    var min_number_choice_meal = params.min_number_choice_meal;
    var minimum_serve = params.minimum_serve;
    var menu_design_standards = params.menu_design_standards;
    var memberid = params.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (menu_item,min_number_choice_meal,minimum_serve,menu_design_standards,created_by,created_date) values (?,?,?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,menu_item,min_number_choice_meal,minimum_serve,menu_design_standards,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateDietStandard(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_DIET_STANDARDS;
	var standard_id = params.standard_id;
    var menu_item = params.menu_item;
    var min_number_choice_meal = params.min_number_choice_meal;
    var minimum_serve = params.minimum_serve;
    var menu_design_standards = params.menu_design_standards;
    var memberid = params.memberid;

    var cond1 = "";
    var data1 = "";
    var cond2 = "";
    var data2 = "";
    var cond3 = "";
    var data3 = "";
    var cond4 = "";
    var data4 = "";

    if(typeof menu_item != "undefined")
    {
       // cond1 = " menu_item = ?, ";
       cond1 = " menu_item = '"+menu_item+"', ";
        data1 = "menu_item,";
    }

    if(typeof min_number_choice_meal != "undefined")
    {
        //cond2 = " min_number_choice_meal = ?, ";
        cond2 = " min_number_choice_meal = '"+min_number_choice_meal+"', ";
        data2 = "min_number_choice_meal,";
    }

    if(typeof minimum_serve != "undefined")
    {
        //cond3 = " minimum_serve = ?, ";
        cond3 = " minimum_serve = '"+minimum_serve+"', ";
        data3 = "minimum_serve,";
    }

    if(typeof menu_design_standards != "undefined")
    {
        //cond4 = " menu_design_standards = ?, ";
        cond4 = " menu_design_standards = '"+menu_design_standards+"', ";        
        data4 = "menu_design_standards,";
    }


	
	var query = "UPDATE ?? SET 	"+cond1+cond2+cond3+cond4+"	modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( standard_id = ?)";
	var queryData = [tbl_name,memberid,standard_id];
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
	function DeleteDietStandard(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_DIET_STANDARDS;
    var standard_id = params.standard_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (standard_id= ?)";
	var queryData = [tbl_name,standard_id];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},4,req,res);
		}else{
			res.send({"status":true,"msg":DELETE_MSG});
			//callback({},data,4,req,res);
		}
	});
}


function callBack(err,data,func_type,req,res) {
	if (!isEmptyObject(err) ) {
		res.json({"status":false,"error":err});
	}else if(func_type == 1){ 
		if (!isEmptyObject(data)) {
			UpdateDietStandard(req,res,data,callBack);
		}else {
			InsertDietStandard(req,res,data,callBack);
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


function getDietStandards(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var standard_id = params.standard_id;
    
    var tbl1  = HMS_HOSP_DIET_STANDARDS;
   
    if(standard_id == "0"){
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
            var query = "SELECT * from ?? where standard_id = ? ";
            var queryData = [tbl1,standard_id];
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
exports.Dietstandards = new Dietstandards();