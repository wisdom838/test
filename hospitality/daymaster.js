const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Daymaster = function () {};
Daymaster.prototype.daymaster = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    if(query_type == "fetch_data")
    {
        getDayMasterDetails(req,res,callBack);
    }else if(query_type == "set_data"){

        req.checkBody('day_name', 'Please enter day_name').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            ChcekDayNameExists(req,res,callBack);
        }

    }else if(query_type == "del_data"){
		
		DeleteDay(req,res,callBack);
	}
	
};


function ChcekDayNameExists(req,res,callback){
	var params = req.body;
	var day_id = params.day_id;
	var day_name = params.day_name;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_DAY_MASTER;

	if(typeof day_id!= "undefined"){
		var query1 = "select * from ?? where day_name = ? and day_id not in (?) ";
		var queryData1 = [tbl_name,day_name,day_id];
	}else{
		var query1 = "select * from ?? where day_name = ? ";
		var queryData1 = [tbl_name,day_name];
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
				if(typeof day_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE day_id= ? ";
					var queryData = [tbl_name, day_id];
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

function InsertDayMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_DAY_MASTER;
    var day_name = params.day_name;
    var memberid = params.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (day_name,created_by,created_date) values (?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,day_name,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateDayMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_DAY_MASTER;
	var day_id = params.day_id;
    var day_name = params.day_name;
    var memberid = params.memberid;
	
	var query = "UPDATE ?? SET 	day_name= ? ,	modified_by= ?, modified_date = unix_timestamp(now()) WHERE (	day_id = ?)";
	var queryData = [tbl_name,day_name,memberid,day_id];
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
	function DeleteDay(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_DAY_MASTER;
    var day_id = params.day_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (day_id= ?)";
	var queryData = [tbl_name,day_id];
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
			UpdateDayMaster(req,res,data,callBack);
		}else {
			InsertDayMaster(req,res,data,callBack);
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


function getDayMasterDetails(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var day_id = params.day_id;
    
    var tbl1  = HMS_HOSP_DAY_MASTER;
   
    if(day_id == "0"){
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
            var query = "SELECT * from ?? where day_id = ? ";
            var queryData = [tbl1,day_id];
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
exports.Daymaster = new Daymaster();