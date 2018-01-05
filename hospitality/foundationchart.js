const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var auth = require('./authpage');
var Foundationchart = function () {};
Foundationchart.prototype.addfoundationchart = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    /*if(query_type == "fetch_data")
    {
        getFoundationChart(req,res,callBack);
    }else if(query_type == "set_data"){  */

       // req.checkBody('type', 'Please enter demographics type').notEmpty();
	   req.checkBody('foundation_chart_name', 'Please enter  foundation_chart_name ').notEmpty();
	   req.checkBody('foundation_chart_code', 'Please enter  foundation_chart_code ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            CheckInsertFoundationChartExists(req,res,callBack);
        }

 /*   }else if(query_type == "del_data") {
		
		DeleteFoundationChart(req,res,callBack);
	}   */
	
};

Foundationchart.prototype.setfoundationchart = function (req,res) {

	req.checkBody('foundation_chart_id', 'Please enter  foundation_chart_id ').notEmpty();
	req.checkBody('foundation_chart_name', 'Please enter  foundation_chart_name ').notEmpty();
	req.checkBody('foundation_chart_code', 'Please enter  foundation_chart_code ').notEmpty();

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		CheckUpdateFoundationChartExists(req,res,callBack);
	}

}

Foundationchart.prototype.getallfoundationchart = function (req,res) {

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		getFoundationChart(req,res,callBack)
	}
}

Foundationchart.prototype.delfoundationchart = function (req,res) {

	var errors = req.validationErrors();
	if (errors) {  
		res.send({ "status": false, errors: errors});
	}else{
		DeleteFoundationChart(req,res,callBack);
	}
}


function CheckInsertFoundationChartExists(req,res,callback){
	var params = req.body;
	var foundation_chart_name = params.foundation_chart_name;
	var foundation_chart_code = params.foundation_chart_code;
	
	var tbl_name = HMS_HOSP_FOUNDATION_CHART;

	var query1 = "select * from ?? where foundation_chart_name = ? and foundation_chart_code = ? ";
	var queryData1 = [tbl_name,foundation_chart_name,foundation_chart_code];

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
				InsertFoundationChart(req,res,rows,callBack);				
			}
		}
	});
}


function CheckUpdateFoundationChartExists(req,res,callback){
	var params = req.body;
    var foundation_chart_id = params.foundation_chart_id;
    var foundation_chart_name = params.foundation_chart_name;
	var foundation_chart_code = params.foundation_chart_code;
	
	var tbl_name = HMS_HOSP_FOUNDATION_CHART;

		var query1 = "select * from ?? where foundation_chart_name = ? and foundation_chart_code = ? and foundation_chart_id not in (?) ";
		var queryData1 = [tbl_name,foundation_chart_name,foundation_chart_code,foundation_chart_id];

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
					UpdateFoundationChart(req,res,rows,callBack);				
				}
			}
		});


}


/*
function ChcekFoundationChartExists(req,res,callback){
	var params = req.body;
    var foundation_chart_id = params.foundation_chart_id;
    var foundation_chart_name = params.foundation_chart_name;
    var foundation_chart_code = params.foundation_chart_code;
     //var type = params.type;
     //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_FOUNDATION_CHART;

	if(typeof standard_id!= "undefined"){
		var query1 = "select * from ?? where foundation_chart_name = ? and foundation_chart_code = ? and foundation_chart_id not in (?) ";
		var queryData1 = [tbl_name,foundation_chart_name,foundation_chart_code,foundation_chart_id];
	}else{
		var query1 = "select * from ?? where foundation_chart_name = ? and foundation_chart_code = ? ";
		var queryData1 = [tbl_name,foundation_chart_name,foundation_chart_code];
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
				if(typeof foundation_chart_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE foundation_chart_id= ? ";
					var queryData = [tbl_name,foundation_chart_id];
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

function InsertFoundationChart(req,res,data,callback){
	var params = req.body;
    var tbl_name = HMS_HOSP_FOUNDATION_CHART;
    
    var foundation_chart_name = params.foundation_chart_name;
    var foundation_chart_code = params.foundation_chart_code;
    var food_price = params.food_price;
	//var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (foundation_chart_name,foundation_chart_code,food_price,created_by,created_date) values (?,?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,foundation_chart_name,foundation_chart_code,food_price,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateFoundationChart(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOUNDATION_CHART;
	var foundation_chart_id = params.foundation_chart_id;
    var foundation_chart_name = params.foundation_chart_name;
    var foundation_chart_code = params.foundation_chart_code;
    var food_price = params.food_price;
	//var memberid = params.memberid;
	var auth_token = req.get(HMS_AUTHENTICATION);
	var Auth  = new auth(auth_token, HMS_AUTHSEPERATOR);
	var memberid = Auth.memberid;

    var cond1 = "";
    var cond2 = "";
    var cond3 = "";
    

    if(typeof foundation_chart_name != "undefined")
    {
       // cond1 = " menu_item = ?, ";
       cond1 = " foundation_chart_name = '"+foundation_chart_name+"', ";
        
    }

    if(typeof foundation_chart_code != "undefined")
    {
        //cond2 = " min_number_choice_meal = ?, ";
        cond2 = " foundation_chart_code = '"+foundation_chart_code+"', ";
    }

    if(typeof food_price != "undefined")
    {
        //cond3 = " minimum_serve = ?, ";
        cond3 = " food_price = '"+food_price+"', ";
    
    }

   	
	var query = "UPDATE ?? SET 	"+cond1+cond2+cond3+" modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( foundation_chart_id = ?)";
	var queryData = [tbl_name,memberid,foundation_chart_id];
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
	function DeleteFoundationChart(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOUNDATION_CHART;
    var foundation_chart_id = params.foundation_chart_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (foundation_chart_id= ?)";
	var queryData = [tbl_name,foundation_chart_id];
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
			UpdateFoundationChart(req,res,data,callBack);
		}else {
			InsertFoundationChart(req,res,data,callBack);
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


function getFoundationChart(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var foundation_chart_id = params.foundation_chart_id;
    
    var tbl1  = HMS_HOSP_FOUNDATION_CHART;
   
    if(foundation_chart_id == "0"){
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
            var query = "SELECT * from ?? where foundation_chart_id = ? ";
            var queryData = [tbl1,foundation_chart_id];
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
exports.Foundationchart = new Foundationchart();