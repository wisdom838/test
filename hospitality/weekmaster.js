const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Weekmaster = function () {};
/*
Weekmaster.prototype.weekmaster = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    if(query_type == "fetch_data")
    {
        getWeekMasterDetails(req,res,callBack);
    }else if(query_type == "set_data"){

        req.checkBody('week_name', 'Please enter week name').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            ChcekWeekNameExists(req,res,callBack);
        }

    }else if(query_type == "del_data") {
		
		DeleteWeek(req,res,callBack);
	}
	
};  */


Weekmaster.prototype.addweekmaster = function (req,res) {
	
		console.log("1");
	   
		req.checkBody('week_name', 'Please enter week name').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				ChcekAddWeekMasterExists(req,res,callBack);
			}
	 
	};
	
Weekmaster.prototype.setweekmaster = function (req,res) {
		
		console.log("1");
			   req.checkBody('week_id', 'Please enter week_id').notEmpty();
				req.checkBody('week_name', 'Please enter week_name').notEmpty();
				req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
				
				var errors = req.validationErrors();
				if (errors) {  
					res.send({ "status": false, errors: errors});
				}else{
					ChcekUpdateWeekMasterExists(req,res,callBack);
				}
		 
		};
	
	
	
Weekmaster.prototype.getweekmaster = function (req,res) {
	
		req.checkBody('week_id', 'Please enter week_id').notEmpty();
	
		var errors = req.validationErrors();
		if (errors) {  
			res.send({ "status": false, errors: errors});
		}else{
			getWeekMasterDetails(req,res,callBack);
		}
		
	};
	
	Weekmaster.prototype.delweekmaster = function (req,res) {
		
		req.checkBody('week_id', 'Please enter week_id').notEmpty();
		
			var errors = req.validationErrors();
			if (errors) {  
				res.send({ "status": false, errors: errors});
			}else{
				DeleteWeek(req,res,callBack);
			}	
		
	};
	
	
	function ChcekAddWeekMasterExists(req,res,callback){
		var params = req.body;
		var week_name = params.item_category;
		var tbl_name = HMS_HOSP_WEEK_MASTER;
	
		var query1 = "select * from ?? where week_name = ? ";
		var queryData1 = [tbl_name,week_name];
	
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
					InsertWeekMaster(req,res,rows,callBack);
				}
			}
		});
	
	}
	
	
	
	function ChcekUpdateWeekMasterExists(req,res,callback){
		var params = req.body;
		var week_id = params.week_id;
		var week_name = params.week_name;
		//item_category = item_category.trim();
		
		var tbl_name = HMS_HOSP_WEEK_MASTER;
	
		if(typeof week_id!= "undefined"){
			var query1 = "select * from ?? where week_name = ? and week_id not in (?) ";
			var queryData1 = [tbl_name,week_name,week_id];
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
					UpdateWeekMaster(req,res,rows,callBack);
				}			
			}
	
		});
	
	}


/*
function ChcekWeekNameExists(req,res,callback){
	var params = req.body;
	var week_id = params.week_id;
	var week_name = params.week_name;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_WEEK_MASTER;

	if(typeof week_id != "undefined"){
		var query1 = "select * from ?? where week_name = ? and week_id not in (?) ";
		var queryData1 = [tbl_name,week_name,week_id];
	}else{
		var query1 = "select * from ?? where week_name = ? ";
		var queryData1 = [tbl_name,week_name];
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
				if(typeof week_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE week_id= ? ";
					var queryData = [tbl_name,week_id];
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

function InsertWeekMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_WEEK_MASTER;
    var week_name = params.week_name;
    var memberid = params.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (week_name,created_by,created_date) values (?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,week_name,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateWeekMaster(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_WEEK_MASTER;
	var week_id = params.week_id;
    var week_name = params.week_name;
    var memberid = params.memberid;
	
	var query = "UPDATE ?? SET 	week_name= ? ,	modified_by= ?, modified_date = unix_timestamp(now()) WHERE (	week_id = ?)";
	var queryData = [tbl_name,week_name,memberid,week_id];
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
	function DeleteWeek(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_WEEK_MASTER;
    var week_id = params.week_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (week_id= ?)";
	var queryData = [tbl_name,week_id];
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
			UpdateWeekMaster(req,res,data,callBack);
		}else {
			InsertWeekMaster(req,res,data,callBack);
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


function getWeekMasterDetails(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var week_id = params.week_id;
    
    var tbl1  = HMS_HOSP_WEEK_MASTER;
   
    if(week_id == "0"){
        var query  = "SELECT * FROM  ?? ";
        var queryData = [tbl1];
    }else{
        var query = "SELECT * from ?? where week_id = ? ";
        var queryData = [tbl1,week_id];
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
   /* }
    else {
           
			query = mysql.format(query,queryData);
			console.log(query);
            db.query(query,function(err,rows){
                if (err) {
                    callback(err,{},5,req,res);
                }else{
                    callback({},rows,5,req,res);
                }
            }); 
          }   */
    
}

function isEmptyObject(obj) {
	for (var key in obj) {		
		return false;
	}
	return true;
}
exports.Weekmaster = new Weekmaster();