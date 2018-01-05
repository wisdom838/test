const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Communicationtypes = function () {};
Communicationtypes.prototype.communicationtypes = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    if(query_type == "fetch_data")
    {
        getCommunicationTypes(req,res,callBack);
    }else if(query_type == "set_data"){

        req.checkBody('type', 'Please enter communication type').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            CheckCommunicationTypeExists(req,res,callBack);
        }

    }else if(query_type == "del_data") {
		
		DeleteCommunicationType(req,res,callBack);
	}
	
};


function CheckCommunicationTypeExists(req,res,callback){
	var params = req.body;
	var id = params.id;
	var type = params.type;
    //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_COMMUNICATION_TYPES;

	if(typeof id!= "undefined"){
		var query1 = "select * from ?? where type = ? and id not in (?) ";
		var queryData1 = [tbl_name,type,id];
	}else{
		var query1 = "select * from ?? where type = ? ";
		var queryData1 = [tbl_name,type];
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
				if(typeof id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE id= ? ";
					var queryData = [tbl_name,id];
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

function InsertCommunicationType(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_COMMUNICATION_TYPES;
    var type = params.type;
    var description = params.description;
    var memberid = params.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (type,description,created_by,created_date) values (?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,type,description,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateCommunicationType(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_COMMUNICATION_TYPES;
	var id = params.id;
    var type = params.type;
    var description = params.description;
    var memberid = params.memberid;
	
	var query = "UPDATE ?? SET 	type= ? , description = ?,	modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( id = ?)";
	var queryData = [tbl_name,type,description,memberid,id];
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
	function DeleteCommunicationType(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_COMMUNICATION_TYPES;
    var id = params.id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (id= ?)";
	var queryData = [tbl_name,id];
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
			UpdateCommunicationType(req,res,data,callBack);
		}else {
			InsertCommunicationType(req,res,data,callBack);
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


function getCommunicationTypes(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var id = params.id;
    
    var tbl1  = HMS_HOSP_COMMUNICATION_TYPES;
   
    if(id == "0"){
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
            var query = "SELECT * from ?? where id = ? ";
            var queryData = [tbl1,id];
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
exports.Communicationtypes = new Communicationtypes();